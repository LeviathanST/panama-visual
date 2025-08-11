<script lang="ts">
    import type { RequestProject, Project } from "$lib/stores/project";
    import { categoryStore } from "$lib/stores/category";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";

    export let project: Project;
    export let onReset: () => void;

    // Initialize form data
    let formData: RequestProject = {
        title: "",
        category: "PANAMA_VISUAL",
        thumbnail: undefined,
        description: "",
        time: "",
        images: undefined,
        video: undefined,
    };
    let images: FileList | null = null;
    let videoFile: File | null = null;
    let thumbnailFile: File | null = null;
    let imageUrls: string[] = []; // Display image URLs
    let videoUrl: string | null = null; // Display video URL
    let thumbnailUrl: string | null = null; // Display thumbnail URL
    let deletedThumbnail: string | null = null; // Deleted thumbnail URL
    let deletedImageUrls: string[] = []; // Deleted image URLs
    let deletedVideoUrl: string | null = null; // Deleted video URL
    let videoProgress: number = 0; // Video upload progress
    let errorMessage: string | null = null; // Store error for alert
    let isSubmitting = false; // Track submission state

    // Watch for errorMessage changes and show alert
    $: if (errorMessage) {
        alert(errorMessage);
        errorMessage = null; // Clear after showing alert
    }

    // Update form when project changes
    $: if (project) {
        formData = {
            title: project.title || "",
            thumbnail: undefined,
            category: project.category || "PANAMA_VISUAL",
            description: project.description || "",
            time: project.time || "",
            images: undefined,
            video: undefined,
        };
        imageUrls = project.images ? [...project.images] : [];
        videoUrl = project.video?.url || null;
        thumbnailUrl = project.thumbnail || null;
        images = null;
        videoFile = null;
        thumbnailFile = null;
        deletedImageUrls = [];
        deletedVideoUrl = null;
        videoProgress = 0;
        errorMessage = null;
    } else {
        console.log("Project is null, resetting form");
        resetForm();
    }

    // Reset form fields
    function resetForm() {
        formData = {
            title: "",
            thumbnail: undefined,
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
        deletedThumbnail = null;
        deletedImageUrls = [];
        deletedVideoUrl = null;
        videoProgress = 0;
        errorMessage = null;
    }

    // Remove an image
    function removeImage(url: string) {
        // Revoke URL if it's a local preview
        if (!project?.images?.includes(url)) {
            URL.revokeObjectURL(url);
        }
        imageUrls = imageUrls.filter((u) => u !== url);
        if (project?.images?.includes(url)) {
            deletedImageUrls = [...deletedImageUrls, url];
        }
        // Update images FileList
        if (images) {
            const dt = new DataTransfer();
            Array.from(images)
                .filter(
                    (_, i) =>
                        !imageUrls.includes(URL.createObjectURL(images[i])),
                )
                .forEach((file) => dt.items.add(file));
            images = dt.files;
        }
    }

    // Remove video and thumbnail
    function removeVideo() {
        if (project?.video?.url) {
            deletedVideoUrl = project.video.url; // Mark video for deletion
        }
        if (videoUrl && !project?.video?.url) {
            URL.revokeObjectURL(videoUrl);
        }
        videoUrl = null;
        videoFile = null;
        videoProgress = 0;
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
        if (images) {
            const newUrls = Array.from(images).map((file) =>
                URL.createObjectURL(file),
            );
            imageUrls = [...imageUrls, ...newUrls];
        }
    }

    function handleVideoChange(event: Event) {
        const input = event.target as HTMLInputElement;
        videoFile = input.files ? input.files[0] : null;
        videoUrl = videoFile ? URL.createObjectURL(videoFile) : videoUrl;
        videoProgress = 0;
    }

    function handleThumbnailChange(event: Event) {
        const input = event.target as HTMLInputElement;
        thumbnailFile = input.files ? input.files[0] : null;
        thumbnailUrl = thumbnailFile
            ? URL.createObjectURL(thumbnailFile)
            : thumbnailUrl;
    }
</script>

<div id="edit-form" class="form-container">
    <h3 class="form-title">Edit Project</h3>
    <form
        action="/?/editProject"
        method="POST"
        enctype="multipart/form-data"
        use:enhance={() => {
            isSubmitting = true;

            return async ({ result }) => {
                isSubmitting = false;
                if (result.type === "success") {
                    window.location.reload();
                } else if (result.type === "failure") {
                    errorMessage =
                        result.data?.error || "Failed to edit project";
                }
            };
        }}
    >
        <input type="hidden" name="project_id" value={project?.id} />
        {#each deletedImageUrls as url}
            <input type="hidden" name="deleted_image_urls" value={url} />
        {/each}
        <input type="hidden" name="thumbnail_url" value={project.thumbnail} />
        {#if deletedVideoUrl}
            <input type="hidden" name="deleted_video" value={deletedVideoUrl} />
        {/if}
        {#if deletedThumbnail}
            <input
                type="hidden"
                name="deleted_thumbnail"
                value={deletedThumbnail}
            />
        {/if}

        <div class="form-group">
            <label for="title" class="form-label">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                bind:value={formData.title}
                required
                class="form-input"
            />
        </div>

        <div class="form-group">
            <label for="category_id" class="form-label">Category</label>
            <select
                id="category"
                name="category"
                bind:value={formData.category}
                required
                class="form-select"
            >
                {#each $categoryStore as category}
                    <option value={category.name}>
                        {category.name.replace(/_/g, " ")}
                    </option>
                {/each}
            </select>
        </div>

        <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea
                id="description"
                name="description"
                bind:value={formData.description}
                class="form-textarea"
            ></textarea>
        </div>

        <div class="form-group">
            <label for="time" class="form-label">Time</label>
            <input
                type="text"
                id="time"
                name="time"
                bind:value={formData.time}
                class="form-input"
            />
        </div>

        <div class="form-group">
            <label for="images" class="form-label">Images</label>
            <input
                type="file"
                id="images"
                name="images"
                multiple
                accept="image/*"
                on:change={handleImageChange}
                class="file-input"
            />
            {#if imageUrls.length}
                <div class="image-grid">
                    {#each imageUrls as url}
                        <div class="image-container">
                            <img
                                src={url}
                                alt="Preview"
                                class="preview-image"
                            />
                            <button
                                type="button"
                                class="remove-button"
                                on:click={() => removeImage(url)}
                            >
                                ×
                            </button>
                        </div>
                    {/each}
                </div>
                <p class="file-info">{imageUrls.length} image(s) selected</p>
            {/if}
        </div>

        <div class="form-group">
            <label for="video" class="form-label">Video</label>
            <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                on:change={handleVideoChange}
                class="file-input"
            />
            {#if videoUrl}
                <div class="video-container">
                    <video src={videoUrl} controls class="preview-video"
                    ></video>
                    <button
                        type="button"
                        class="remove-video-button"
                        on:click={removeVideo}
                    >
                        Remove Video
                    </button>
                </div>
                <p class="file-info">
                    Video: {videoFile?.name || "Existing video"}
                </p>
                {#if videoProgress > 0 && videoProgress < 100}
                    <div class="progress-bar">
                        <div
                            class="progress-fill"
                            style="width: {videoProgress}%"
                        ></div>
                    </div>
                    <p class="file-info">
                        Upload Progress: {videoProgress.toFixed(2)}%
                    </p>
                {/if}
            {/if}
        </div>

        <div class="form-group">
            <label for="thumbnail" class="form-label">Thumbnail</label>
            <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                accept="image/*"
                on:change={handleThumbnailChange}
                class="file-input"
            />
            {#if thumbnailUrl}
                <div class="image-container">
                    <img
                        src={thumbnailUrl}
                        alt="Thumbnail Preview"
                        class="preview-thumbnail"
                    />
                    <button
                        type="button"
                        class="remove-button"
                        on:click={() => {
                            if (thumbnailUrl && !project?.thumbnail) {
                                URL.revokeObjectURL(thumbnailUrl);
                            }
                            deletedThumbnail = thumbnailUrl;
                            thumbnailFile = null;
                            thumbnailUrl = null;
                        }}
                    >
                        X
                    </button>
                </div>
            {/if}
        </div>

        <div class="button-group">
            <button type="submit" disabled={isSubmitting} class="submit-button">
                {isSubmitting ? "Saving..." : "Save"}
            </button>
            <button
                type="button"
                on:click={handleCancel}
                disabled={isSubmitting}
                class="cancel-button"
            >
                Cancel
            </button>
        </div>
    </form>
</div>

<style>
    .form-container {
        width: 100%;
        margin: 0 auto;
        padding: 1.5rem;
        background: #0a0a0a;
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    }

    .form-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #f5f5f5;
        margin-bottom: 1.5rem;
        text-align: center;
    }

    .form-group {
        margin-bottom: 1.5rem;
    }

    .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 600;
        color: #d4d4d4;
        margin-bottom: 0.5rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #404040;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        color: #f5f5f5;
        background: #1c2526;
        transition: border-color 0.3s ease;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: #06b6d4;
        box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.3);
    }

    .form-textarea {
        height: 8rem;
        resize: vertical;
    }

    .file-input {
        border: none;
        padding: 0;
        background: transparent;
    }

    .file-input::file-selector-button {
        background: #404040;
        color: #22d3ee;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .file-input::file-selector-button:hover {
        background: #525252;
    }

    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
        gap: 0.5rem;
        margin-top: 0.75rem;
    }

    .image-container {
        position: relative;
        width: 6rem;
        height: 6rem;
    }

    .preview-image,
    .preview-thumbnail {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0.5rem;
        border: 1px solid #404040;
    }

    .preview-video {
        width: 100%;
        height: 12rem;
        border-radius: 0.5rem;
        border: 1px solid #404040;
    }

    .remove-button {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        background: #ef4444;
        color: #f5f5f5;
        border: none;
        border-radius: 50%;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.875rem;
        cursor: pointer;
        line-height: 1;
    }

    .remove-button:hover {
        background: #dc2626;
    }

    .video-container {
        position: relative;
    }

    .remove-video-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: #ef4444;
        color: #f5f5f5;
        border: none;
        border-radius: 0.5rem;
        padding: 0.5rem;
        font-size: 0.875rem;
        cursor: pointer;
    }

    .remove-video-button:hover {
        background: #dc2626;
    }

    .progress-bar {
        width: 100%;
        height: 0.5rem;
        background: #404040;
        border-radius: 9999px;
        overflow: hidden;
        margin-top: 0.5rem;
    }

    .progress-fill {
        height: 100%;
        background: #06b6d4;
        transition: width 0.3s ease;
    }

    .file-info {
        font-size: 0.75rem;
        color: #a3a3a3;
        margin-top: 0.25rem;
    }

    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
    }

    .submit-button,
    .cancel-button {
        flex: 1;
        padding: 0.75rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .submit-button {
        background: #06b6d4;
        color: #0a0a0a;
    }

    .submit-button:hover {
        background: #0891b2;
    }

    .submit-button:disabled {
        background: #525252;
        cursor: not-allowed;
    }

    .cancel-button {
        background: #404040;
        color: #d4d4d4;
    }

    .cancel-button:hover {
        background: #525252;
    }

    .cancel-button:disabled {
        background: #404040;
        cursor: not-allowed;
    }
</style>
