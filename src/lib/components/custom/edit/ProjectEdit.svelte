<script lang="ts">
    import type { RequestProject, Project } from "$lib/stores/project";
    import { categoryStore } from "$lib/stores/category";

    export let project: Project | null = null;
    export let onReset: (() => void) | undefined = undefined;

    // Initialize form data
    let formData: RequestProject = project || {
        title: "",
        category: "PANAMA_VISUAL",
        description: "",
        time: "",
        images: undefined,
        video: undefined,
    };
    let images: FileList | null = null;
    let videoFile: File | null = null;
    let thumbnailFile: File | null = null;
    let imageUrls: string[] = []; // To store image URLs for display
    let videoUrl: string | null = null; // To store video URL for display
    let thumbnailUrl: string | null = null; // To store thumbnail URL for display
    let imageIds: string[] = []; // To store uploaded image IDs
    let videoId: string | null = null; // To store uploaded video ID
    let thumbnailId: string | null = null; // To store uploaded thumbnail ID
    let videoProgress: number = 0; // To track video upload progress

    // Update form data and media URLs when project changes
    $: if (project) {
        formData = { ...project, images: undefined, video: undefined };
        imageUrls = project.images || [];
        videoUrl = project.video?.url || null;
        thumbnailUrl = project.video?.thumbnail || null;
        images = null;
        videoFile = null;
        thumbnailFile = null;
        imageIds = [];
        videoId = null;
        thumbnailId = null;
        videoProgress = 0;
    } else {
        resetForm();
    }

    // Reset form fields
    function resetForm() {
        formData = {
            title: "",
            category: "PANAMA_VISUAL",
            description: "",
            time: "",
            images: undefined,
            video: undefined,
        };
        images = null;
        videoFile = null;
        thumbnailFile = null;
        imageUrls = [];
        videoUrl = null;
        thumbnailUrl = null;
        imageIds = [];
        videoId = null;
        thumbnailId = null;
        videoProgress = 0;
    }
    async function uploadFile(file: File | null): Promise<string | null> {
        if (!file) {
            console.error("No file provided!");
            return null;
        }
        console.log(`File: ${file.name}, ${file.size} bytes, ${file.type}`);

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
            alert("Upload error:" + error);
            console.log("Error uploading file");
            return null;
        }
    }

    async function handleSubmit() {
        try {
            // Upload images, video, and thumbnail to get IDs
            if (images) {
                for (const file of Array.from(images)) {
                    const img = await uploadFile(file);
                    console.log(img);
                    if (!img) throw new Error("Failed to upload images");
                    imageIds.push(img);
                }
            }

            if (videoFile) {
                if (!thumbnailFile) {
                    alert("Please attach a thumbnail with video!");
                    return;
                }
                videoId = await uploadFile(videoFile);
                if (!videoId) throw new Error("Failed to upload video");
                thumbnailId = await uploadFile(thumbnailFile);
                if (!thumbnailId) throw new Error("Failed to upload thumbnail");
            }
            console.log("Image url: " + imageIds);
            console.log("Video url: " + videoId);
            console.log("Thumbnail url: " + thumbnailId);

            // Prepare project data with IDs
            const projectData = {
                title: formData.title,
                category: formData.category,
                description: formData.description,
                time: formData.time,
                image_urls: imageIds,
                video: videoId
                    ? { video_url: videoId, thumbnail_url: thumbnailId }
                    : null,
            };

            const url = project
                ? `http://localhost:8080/api/projects/${project.id}`
                : "http://localhost:8080/api/projects";
            const method = project ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(projectData),
            });

            if (!response.ok) {
                throw new Error("Failed to submit project");
            }

            const result = await response.json();
            console.log(project ? "Updated Project:" : "New Project:", result);

            console.log("Resetting form");
            resetForm();
            if (onReset) {
                console.log("Calling onReset");
                onReset();
            }
            console.log("Submission complete");
        } catch (error) {
            console.error("Error submitting project:", error);
        }
    }

    // Handle cancel/reset
    function handleCancel() {
        resetForm();
        if (onReset) onReset();
    }

    // Handle file input changes
    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        images = input.files;
        imageUrls = images
            ? Array.from(images).map((file) => URL.createObjectURL(file))
            : [];
    }

    function handleVideoChange(event: Event) {
        const input = event.target as HTMLInputElement;
        videoFile = input.files ? input.files[0] : null;
        videoUrl = videoFile ? URL.createObjectURL(videoFile) : null;
        videoProgress = 0; // Reset progress when selecting new video
    }

    function handleThumbnailChange(event: Event) {
        const input = event.target as HTMLInputElement;
        thumbnailFile = input.files ? input.files[0] : null;
        thumbnailUrl = thumbnailFile
            ? URL.createObjectURL(thumbnailFile)
            : null;
    }
</script>

<div id="edit-form" class="space-y-6">
    <h3 class="text-lg font-semibold">
        {project ? "Edit Project" : "Add Project"}
    </h3>
    <form
        on:submit|preventDefault|stopPropagation={handleSubmit}
        class="space-y-4"
    >
        <div class="space-y-2">
            <label for="title" class="block text-sm font-medium text-gray-700"
                >Title</label
            >
            <input
                type="text"
                id="title"
                bind:value={formData.title}
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

        <div class="space-y-2">
            <label
                for="category_id"
                class="block text-sm font-medium text-gray-700">Category</label
            >
            <select
                id="category"
                bind:value={formData.category}
                required
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
                {#each $categoryStore as category}
                    <option value={category.name}>
                        {category.name.replace(/_/g, " ")}
                    </option>
                {/each}
            </select>
        </div>

        <div class="space-y-2">
            <label
                for="description"
                class="block text-sm font-medium text-gray-700"
                >Description</label
            >
            <textarea
                id="description"
                bind:value={formData.description}
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-24"
            ></textarea>
        </div>

        <div class="space-y-2">
            <label for="time" class="block text-sm font-medium text-gray-700"
                >Time</label
            >
            <input
                type="text"
                id="time"
                bind:value={formData.time}
                class="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
        </div>

        <div class="space-y-2">
            <label for="images" class="block text-sm font-medium text-gray-700"
                >Images</label
            >
            <input
                type="file"
                id="images"
                multiple
                accept="image/*"
                on:change={handleImageChange}
                class="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {#if imageUrls.length}
                <div class="grid grid-cols-3 gap-2">
                    {#each imageUrls as url}
                        <img
                            src={url}
                            alt="Preview"
                            class="w-full h-24 object-cover rounded"
                        />
                    {/each}
                </div>
                <p class="text-sm text-gray-600">
                    {imageUrls.length} image(s) selected
                </p>
            {/if}
        </div>

        <div class="space-y-2">
            <label for="video" class="block text-sm font-medium text-gray-700"
                >Video</label
            >
            <input
                type="file"
                id="video"
                accept="video/*"
                on:change={handleVideoChange}
                class="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {#if videoUrl}
                <video
                    src={videoUrl}
                    controls
                    class="w-full h-48 object-cover rounded"
                ></video>
                <p class="text-sm text-gray-600">
                    Video: {videoFile?.name || "Existing video"}
                </p>
                {#if videoProgress > 0 && videoProgress < 100}
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            class="bg-blue-600 h-2.5 rounded-full"
                            style="width: {videoProgress}%"
                        ></div>
                    </div>
                    <p class="text-sm text-gray-600">
                        Upload Progress: {videoProgress.toFixed(2)}%
                    </p>
                {/if}
            {/if}
        </div>

        <div class="space-y-2">
            <label
                for="thumbnail"
                class="block text-sm font-medium text-gray-700"
                >Video Thumbnail</label
            >
            <input
                type="file"
                id="thumbnail"
                accept="image/*"
                on:change={handleThumbnailChange}
                class="w-full p-2 border border-gray-300 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {#if thumbnailUrl}
                <img
                    src={thumbnailUrl}
                    alt="Thumbnail Preview"
                    class="w-24 h-24 object-cover rounded"
                />
                <p class="text-sm text-gray-600">
                    Thumbnail: {thumbnailFile?.name || "Existing thumbnail"}
                </p>
            {/if}
        </div>

        <div class="flex space-x-4">
            <button
                type="submit"
                class="flex-1 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {project ? "Save" : "Add"}
            </button>
            <button
                type="button"
                on:click={handleCancel}
                class="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
                Cancel
            </button>
        </div>
    </form>
</div>
