import { env } from "$env/dynamic/private";
import { fail, type Actions } from "@sveltejs/kit";

export const load = async ({ fetch }) => {
    const res = await fetch(env.BACKEND_URL + "/projects");
    const json = await res.json();
    return {
        project: json,
    };
};

function parseFilename(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split('/').filter(segment => segment.length > 0);
        const filename = segments[segments.length - 1];
        if (!filename) {
            return null;
        }
        return filename;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}

async function removeFile(url: string, fetch: typeof globalThis.fetch): Promise<void> {
    const filename = parseFilename(url);
    if (!filename) {
        throw new Error("Invalid file URL");
    }
    console.log(env.ZIPLINE_URL + "/user/files/" + filename)
    const res = await fetch(env.ZIPLINE_URL + "/user/files/" + filename, {
        method: "GET",
        headers: {
            Authorization: env.ZIPLINE_TOKEN,
        },
    }).then(r => r.json());
    const id = res.id;

    const response = await fetch(env.ZIPLINE_URL + "/user/files/" + id, {
        method: "DELETE",
        headers: {
            Authorization: env.ZIPLINE_TOKEN,
        },
    });

    if (!response.ok) {
        console.error("Delete file failed with status:", response.status);
        throw new Error("Failed to delete file");
    }
}

async function uploadFile(file: File, fetch: typeof globalThis.fetch): Promise<string | null> {
    if (!file || file.size === 0) {
        console.error("No file provided!");
        return null;
    }
    console.log(`File: ${file.name}, ${file.size} bytes, ${file.type} `);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        return result.files[0].url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

export const actions: Actions = {
    addProject: async ({ request, cookies, fetch }) => {
        try {

            const at = cookies.get("Authorization");
            if (!at) {
                return fail(401, { error: "Authentication token missing" });
            }
            const verify = await fetch(env.BACKEND_URL + `/verify`, {
                headers: {
                    Authorization: `Bearer ${at}`,
                },
            });
            if (!verify.ok) return fail(400, { error: "Invalid token" });

            const formData = await request.formData();
            const title = formData.get("title")?.toString();
            const category = formData.get("category")?.toString();
            const description = formData.get("description")?.toString();
            const time = formData.get("time")?.toString();

            if (!title || !category) {
                return fail(400, { error: "Title and category are required" });
            }

            const images = formData.getAll("images") as File[];
            const video = formData.get("video") as File | null;
            const thumbnail = formData.get("thumbnail") as File | null;
            if (video && video.size > 0) {
                if (!(thumbnail && thumbnail.size > 0)) {
                    return fail(400, { error: "Thumbnail is required with video" });
                }
            }

            const imageIds: string[] = [];
            for (const file of images) {
                if (file.size > 0) {
                    const url = await uploadFile(file, fetch);
                    if (!url) throw new Error("Failed to upload image");
                    imageIds.push(url);
                }
            }

            let videoId: string | null = null;
            let thumbnailId: string | null = null;
            if (video && thumbnail && video.size > 0 && thumbnail.size > 0) {
                videoId = await uploadFile(video, fetch);
                if (!videoId) throw new Error("Failed to upload video");
                thumbnailId = await uploadFile(thumbnail, fetch);
                if (!thumbnailId) throw new Error("Failed to upload thumbnail");
            }

            const projectData = {
                title,
                category,
                description: description || "",
                time: time || null,
                image_urls: imageIds,
                video: videoId ? { video_url: videoId, thumbnail_url: thumbnailId } : null,
            };

            const response = await fetch(env.BACKEND_URL + "/projects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${at} `,
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.message || "Failed to create project");
            }

            const result = await response.json();
            console.log("New Project:", result);

            return { success: true };
        } catch (error) {
            console.error("Error submitting project:", error);
            return fail(500, { error: error instanceof Error ? error.message : "Server error" });
        }
    },

    editProject: async ({ request, cookies, fetch }) => {
        try {
            const at = cookies.get("Authorization");
            if (!at) {
                return fail(401, { error: "Authentication token missing" });
            }
            const verify = await fetch(env.BACKEND_URL + `/verify`, {
                headers: {
                    Authorization: `Bearer ${at}`,
                },
            });
            if (!verify.ok) return fail(400, { error: "Invalid token" });
            const formData = await request.formData();
            const projectId = formData.get("project_id")?.toString();
            const title = formData.get("title")?.toString();
            const category = formData.get("category")?.toString();
            const description = formData.get("description")?.toString();
            const time = formData.get("time")?.toString();

            if (!projectId || !title || !category) {
                return fail(400, { error: "Project ID, title, and category are required" });
            }

            // Extract deleted media
            const deletedImageUrls = formData.getAll("deleted_image_urls") as string[];
            const deletedVideo = formData.get("deleted_video")?.toString() || null;
            const thumbnailUrl = formData.get("thumbnail_url")?.toString() || null;

            // Attempt to delete files and track successes
            const successfullyDeletedImageUrls: string[] = [];
            for (const url of deletedImageUrls) {
                try {
                    await removeFile(url, fetch);
                    successfullyDeletedImageUrls.push(url);
                } catch (error) {
                    console.warn(`Failed to delete image ${url}: `, error);
                }
            }

            let successfullyDeletedVideo: string | null = null;
            if (deletedVideo) {
                try {
                    await removeFile(deletedVideo, fetch);
                    successfullyDeletedVideo = deletedVideo;
                    if (thumbnailUrl) {
                        try {
                            await removeFile(thumbnailUrl, fetch);
                        } catch (error) {
                            console.warn(`Failed to delete thumbnail ${thumbnailUrl}: `, error);
                        }
                    }
                } catch (error) {
                    console.warn(`Failed to delete video ${deletedVideo}: `, error);
                }
            }

            // Extract and upload new files
            const images = formData.getAll("images") as File[];
            const video = formData.get("video") as File | null;
            const thumbnail = formData.get("thumbnail") as File | null;

            if (video && !thumbnail) {
                return fail(400, { error: "Thumbnail is required with video" });
            }

            const insertedImageUrls: string[] = [];
            for (const file of images) {
                if (file.size > 0) {
                    const url = await uploadFile(file, fetch);
                    if (!url) throw new Error("Failed to upload image");
                    insertedImageUrls.push(url);
                }
            }

            let insertedVideoId: string | null = null;
            let insertedThumbnailId: string | null = null;
            if (video && thumbnail && video.size > 0 && thumbnail.size > 0) {
                insertedVideoId = await uploadFile(video, fetch);
                if (!insertedVideoId) throw new Error("Failed to upload video");
                insertedThumbnailId = await uploadFile(thumbnail, fetch);
                if (!insertedThumbnailId) throw new Error("Failed to upload thumbnail");
            }

            // Prepare project data with only successfully deleted files
            const projectData = {
                title,
                category,
                description: description || "",
                time: time || null,
                deleted_image_urls: successfullyDeletedImageUrls,
                inserted_image_urls: insertedImageUrls,
                deleted_video: successfullyDeletedVideo,
                inserted_video: insertedVideoId ? { video_url: insertedVideoId, thumbnail_url: insertedThumbnailId } : null,
            };


            console.log(projectData)

            const response = await fetch(env.BACKEND_URL + `/projects/${projectId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${at}`,
                },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                const json = await response.json();
                throw new Error(json.message || "Failed to update project");
            }

            const result = await response.json();
            console.log("Updated Project:", result);

            return { success: true };
        } catch (error) {
            console.error("Error updating project:", error);
            return fail(500, { error: error instanceof Error ? error.message : "Server error" });
        }
    },
};
