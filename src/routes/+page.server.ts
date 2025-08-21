import { env } from "$env/dynamic/private";
import { removeFile, uploadFile } from "$lib";
import { fail, type Actions } from "@sveltejs/kit";

export const load = async ({ fetch }) => {
    const projectsRes = await fetch(env.BACKEND_URL + "/projects");
    const sponsorsRes = await fetch(env.BACKEND_URL + "/sponsors");

    const json1 = await projectsRes.json();
    const json2 = await sponsorsRes.json();
    return {
        project: json1,
        sponsors: json2,
    };
};

export const actions: Actions = {
    addProject: async ({ request, cookies, fetch }) => {
        try {
            const at = cookies.get("at");
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
            if (!(thumbnail && thumbnail.size > 0)) {
                return fail(400, { error: "Thumbnail is required!" });
            }


            let thumbnailId: string | null = null;
            thumbnailId = await uploadFile(thumbnail, fetch);
            if (!thumbnailId) throw new Error("Failed to upload thumbnail");

            const imageIds: string[] = [];
            for (const file of images) {
                if (file.size > 0) {
                    const url = await uploadFile(file, fetch);
                    if (!url) throw new Error("Failed to upload image");
                    imageIds.push(url);
                }
            }

            let videoId: string | null = null;
            if (video && thumbnail && video.size > 0 && thumbnail.size > 0) {
                videoId = await uploadFile(video, fetch);
                if (!videoId) throw new Error("Failed to upload video");

            }

            const projectData = {
                title,
                thumbnail: thumbnailId,
                category,
                description: description || "",
                time: time || null,
                image_urls: imageIds,
                video: videoId ? { video_url: videoId } : null,
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
                console.log(`Error: ${json.error}`);
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
            const at = cookies.get("at");
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
            const thumbnailUrl = formData.get("thumbnail_url")?.toString();
            const time = formData.get("time")?.toString();

            if (!projectId || !title || !category) {
                return fail(400, { error: "Project ID, title, and category are required" });
            }

            // Extract deleted media
            const deletedImageUrls = formData.getAll("deleted_image_urls") as string[];
            const deletedVideo = formData.get("deleted_video")?.toString() || null;
            const deletedThumbnail = formData.get("deleted_thumbnail")?.toString() || null;

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
                } catch (error) {
                    console.warn(`Failed to delete video ${deletedVideo}: `, error);
                }
            }
            if (deletedThumbnail) {
                try {
                    await removeFile(deletedThumbnail, fetch);
                } catch (error) {
                    console.warn(`Failed to delete thumbnail ${deletedThumbnail}: `, error);
                }
            }

            // Extract and upload new files
            const images = formData.getAll("images") as File[];
            const video = formData.get("video") as File | null;
            const thumbnailFile = formData.get("thumbnail") as File | null;

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
            if (video && video.size > 0) {
                insertedVideoId = await uploadFile(video, fetch);
                if (!insertedVideoId) throw new Error("Failed to upload video");

            }
            if (thumbnailFile && thumbnailFile.size > 0) {
                insertedThumbnailId = await uploadFile(thumbnailFile, fetch);
                if (!insertedThumbnailId) throw new Error("Failed to upload thumbnail");
            }

            // Prepare project data with only successfully deleted files
            const projectData = {
                title,
                category,
                thumbnail: deletedThumbnail ? insertedThumbnailId : thumbnailUrl,
                description: description || "",
                time: time || null,
                deleted_image_urls: successfullyDeletedImageUrls,
                inserted_image_urls: insertedImageUrls,
                deleted_video: successfullyDeletedVideo,
                inserted_video: insertedVideoId ? { video_url: insertedVideoId } : null,
            };
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
                console.log(json.error)
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

    deleteProject: async ({ request, cookies, fetch }) => {
        const at = cookies.get("at");
        if (!at) {
            return fail(401, { error: "Authentication token missing" });
        }
        const verify = await fetch(env.BACKEND_URL + `/verify`, {
            headers: {
                Authorization: `Bearer ${at}`,
            },
        });
        if (!verify.ok) return fail(400, { error: "Invalid token" });
        const project = await request.json();
        for (const url of project.images) {
            try {
                await removeFile(url, fetch);
            } catch (error) {
                console.warn(`Failed to delete image ${url}: `, error);
            }
        }
        if (project.video.url) {
            try {
                await removeFile(project.video.url, fetch);
            } catch (error) {
                console.warn(`Failed to delete video ${project.video.url}: `, error);
            }
        }
        if (project.thumbnail) {
            try {
                await removeFile(project.thumbnail, fetch);
            } catch (error) {
                console.warn(`Failed to delete thumbnail ${project.thumbnail}: `, error);
            }
        }

        await fetch(env.BACKEND_URL + "/projects/" + project.id, {
            headers: {
                "Authorization": "Bearer" + at,
            },
            method: "DELETE",
        });
    },

    addContact: async ({ request }) => {
        const formData = await request.formData();
        await fetch(env.BACKEND_URL + "/contact-forms/", {
            method: "POST",
            body: JSON.stringify({
                name: formData.get("name"),
                email: formData.get("email"),
                interest_area: formData.get("interest_area"),
                content: formData.get("content"),
            })
        });
    },
};
