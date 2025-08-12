<script lang="ts">
    import type { Project } from "$lib/stores/project";
    import { categoryStore } from "$lib/stores/category";
    import { enhance } from "$app/forms";
    import { fly, fade } from "svelte/transition";
    import { invalidateAll } from "$app/navigation";

    export let project: Project;
    export let onReset: () => void;

    // --- STATE MANAGEMENT ---
    // Holds the text-based form data
    let formTextData = {
        title: "",
        category: "PANAMA_VISUAL",
        description: "",
        time: "",
    };

    // State for NEW file objects to be uploaded
    let newImages: File[] = [];
    let newVideoFile: File | null = null;
    let newThumbnailFile: File | null = null;

    // State for UI previews (holds existing URLs and new blob URLs)
    let imageUrls: string[] = [];
    let videoUrl: string | null = null;
    let thumbnailUrl: string | null = null;

    // State for tracking existing media to DELETE on the server
    let deletedImageUrls: string[] = [];
    let deletedVideoUrl: string | null = null;
    let deletedThumbnailUrl: string | null = null;

    let errorMessage: string | null = null;
    let isSubmitting = false;

    // --- LIFECYCLE & WATCHERS ---
    // Populate form when the project prop is passed in
    $: if (project) {
        resetAndPopulateForm();
    }

    // Clear error message after a delay
    $: if (errorMessage) {
        setTimeout(() => {
            errorMessage = null;
        }, 5000);
    }

    // --- FORM LOGIC ---
    function resetAndPopulateForm() {
        // Revoke any existing object URLs to prevent memory leaks from a previous edit session
        revokeAllObjectUrls();

        formTextData = {
            title: project.title || "",
            category: project.category || "PANAMA_VISUAL",
            description: project.description || "",
            time: project.time || "",
        };

        // Populate previews with existing media URLs from the database
        imageUrls = project.images ? [...project.images] : [];
        videoUrl = project.video?.url || null;
        thumbnailUrl = project.thumbnail || null;

        // Clear all transient state (new files, deleted trackers)
        newImages = [];
        newVideoFile = null;
        newThumbnailFile = null;
        deletedImageUrls = [];
        deletedVideoUrl = null;
        deletedThumbnailUrl = null;
        errorMessage = null;
    }

    function handleCancel() {
        resetAndPopulateForm();
        if (onReset) onReset();
    }

    function isBlobUrl(url: string | null): boolean {
        return !!url && url.startsWith("blob:");
    }

    function revokeAllObjectUrls() {
        imageUrls.forEach((url) => {
            if (isBlobUrl(url)) URL.revokeObjectURL(url);
        });
        if (isBlobUrl(videoUrl)) URL.revokeObjectURL(videoUrl);
        if (isBlobUrl(thumbnailUrl)) URL.revokeObjectURL(thumbnailUrl);
    }

    // --- FILE HANDLING ---
    function handleImageChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const files = Array.from(input.files);
            const urls = files.map((file) => URL.createObjectURL(file));
            newImages = [...newImages, ...files];
            imageUrls = [...imageUrls, ...urls];
        }
    }

    function removeImage(urlToRemove: string, index: number) {
        // If it's a real URL from the server, mark it for deletion
        if (!isBlobUrl(urlToRemove)) {
            deletedImageUrls = [...deletedImageUrls, urlToRemove];
        } else {
            // If it's a blob URL, find the corresponding file in `newImages` and remove it
            URL.revokeObjectURL(urlToRemove);
            const fileIndex = newImages.findIndex(
                (file) => URL.createObjectURL(file) === urlToRemove,
            );
            if (fileIndex > -1) newImages.splice(fileIndex, 1);
        }
        imageUrls.splice(index, 1);
        imageUrls = imageUrls; // Trigger Svelte reactivity
    }

    function handleVideoChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            // If an existing video was present, mark it for deletion
            if (videoUrl && !isBlobUrl(videoUrl)) {
                deletedVideoUrl = videoUrl;
            }
            if (isBlobUrl(videoUrl)) URL.revokeObjectURL(videoUrl); // Revoke old blob

            newVideoFile = input.files[0];
            videoUrl = URL.createObjectURL(newVideoFile);
        }
    }

    function removeVideo() {
        if (videoUrl && !isBlobUrl(videoUrl)) {
            deletedVideoUrl = videoUrl;
        }
        if (isBlobUrl(videoUrl)) {
            URL.revokeObjectURL(videoUrl);
        }
        newVideoFile = null;
        videoUrl = null;
    }

    function handleThumbnailChange(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            // If an existing thumbnail was present, mark it for deletion
            if (thumbnailUrl && !isBlobUrl(thumbnailUrl)) {
                deletedThumbnailUrl = thumbnailUrl;
            }
            if (isBlobUrl(thumbnailUrl)) URL.revokeObjectURL(thumbnailUrl); // Revoke old blob

            newThumbnailFile = input.files[0];
            thumbnailUrl = URL.createObjectURL(newThumbnailFile);
        }
    }

    function removeThumbnail() {
        if (thumbnailUrl && !isBlobUrl(thumbnailUrl)) {
            deletedThumbnailUrl = thumbnailUrl;
        }
        if (isBlobUrl(thumbnailUrl)) {
            URL.revokeObjectURL(thumbnailUrl);
        }
        newThumbnailFile = null;
        thumbnailUrl = null;
    }
</script>

<div class="form-container">
    <h3 class="form-title">Edit Project</h3>
    <p class="form-subtitle">
        Update the details below for the selected project.
    </p>

    <form
        action="/?/editProject"
        method="POST"
        enctype="multipart/form-data"
        use:enhance={({ formData: fd }) => {
            isSubmitting = true;

            // This is where we manually build the FormData object to match the server action
            // SvelteKit's `enhance` gives us direct control.

            // 1. Add new files to the form data.
            // Clear any default entries first to avoid duplicates.
            fd.delete("images");
            for (const file of newImages) {
                fd.append("images", file);
            }

            if (newVideoFile) {
                fd.set("video", newVideoFile);
            } else {
                fd.delete("video");
            }

            if (newThumbnailFile) {
                fd.set("thumbnail", newThumbnailFile);
            } else {
                fd.delete("thumbnail");
            }

            return async ({ result }) => {
                isSubmitting = false;
                if (result.type === "success") {
                    window.location.reload();
                } else if (result.type === "failure") {
                    errorMessage =
                        result.data?.error || "An unknown error occurred.";
                }
            };
        }}
    >
        <!-- These hidden inputs send the necessary instructions to the backend -->
        <input type="hidden" name="project_id" value={project?.id} />
        <input
            type="hidden"
            name="thumbnail_url"
            value={project.thumbnail || ""}
        />

        <!-- For DELETING existing media -->
        {#each deletedImageUrls as url}
            <input type="hidden" name="deleted_image_urls" value={url} />
        {/each}

        <!-- IMPORTANT: The name "deleted_video" must match your backend -->
        {#if deletedVideoUrl}
            <input type="hidden" name="deleted_video" value={deletedVideoUrl} />
        {/if}

        <!-- IMPORTANT: The name "deleted_thumbnail" must match your backend -->
        {#if deletedThumbnailUrl}
            <input
                type="hidden"
                name="deleted_thumbnail"
                value={deletedThumbnailUrl}
            />
        {/if}

        <div class="form-grid">
            <!-- Title -->
            <div class="form-group span-2">
                <label for="title" class="form-label">Project Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    bind:value={formTextData.title}
                    required
                    class="form-input"
                    placeholder="e.g., Visual Identity"
                />
            </div>

            <!-- Category -->
            <div class="form-group">
                <label for="category" class="form-label">Category</label>
                <select
                    id="category"
                    name="category"
                    bind:value={formTextData.category}
                    required
                    class="form-select"
                >
                    {#each $categoryStore as category}
                        <option value={category.name}
                            >{category.name.replace(/_/g, " ")}</option
                        >
                    {/each}
                </select>
            </div>

            <!-- Time -->
            <div class="form-group">
                <label for="time" class="form-label">Time / Duration</label>
                <input
                    type="text"
                    id="time"
                    name="time"
                    bind:value={formTextData.time}
                    class="form-input"
                    placeholder="e.g., Q4 2025"
                />
            </div>

            <!-- Description -->
            <div class="form-group span-2">
                <label for="description" class="form-label">Description</label>
                <textarea
                    id="description"
                    name="description"
                    bind:value={formTextData.description}
                    class="form-textarea"
                    placeholder="Describe the project..."
                />
            </div>

            <!-- Image Upload -->
            <div class="form-group span-2">
                <label for="images" class="form-label">Project Images</label>
                <div class="file-dropzone">
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        accept="image/*"
                        on:change={handleImageChange}
                        class="file-input-hidden"
                    />
                    <div class="dropzone-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path
                                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
                            /><polyline points="17 8 12 3 7 8" /><line
                                x1="12"
                                x2="12"
                                y1="3"
                                y2="15"
                            /></svg
                        >
                        <p>
                            <b>Click to upload</b> or drag and drop more images
                        </p>
                        <p class="file-info-sm">PNG, JPG, GIF</p>
                    </div>
                </div>
                {#if imageUrls.length}
                    <div class="image-grid" transition:fade>
                        {#each imageUrls as url, index (url)}
                            <div
                                class="preview-container"
                                in:fly={{ y: 20, duration: 300 }}
                                out:fade={{ duration: 200 }}
                            >
                                <img
                                    src={url}
                                    alt="Preview"
                                    class="preview-image"
                                />
                                <button
                                    type="button"
                                    class="remove-button"
                                    on:click={() => removeImage(url, index)}
                                    aria-label="Remove image"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        ><path
                                            fill="currentColor"
                                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                                        /></svg
                                    >
                                </button>
                            </div>
                        {/each}
                    </div>
                {/if}
            </div>

            <!-- Video -->
            <div class="form-group">
                <label for="video" class="form-label"
                    >Project Video (Optional)</label
                >
                {#if videoUrl}
                    <div class="preview-container mb-4" transition:fade>
                        <video src={videoUrl} controls class="preview-video" />
                        <button
                            type="button"
                            class="remove-button"
                            on:click={removeVideo}
                            aria-label="Remove video"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                ><path
                                    fill="currentColor"
                                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                                /></svg
                            >
                        </button>
                    </div>
                {/if}
                <div class="file-dropzone-sm">
                    <input
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        on:change={handleVideoChange}
                        class="file-input-hidden"
                    />
                    <div class="dropzone-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><path d="m22 8-6 4 6 4V8Z" /><path
                                d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"
                            /></svg
                        >
                        <p>{newVideoFile ? "Change Video" : "Upload Video"}</p>
                    </div>
                </div>
            </div>

            <!-- Thumbnail -->
            <div class="form-group">
                <label for="thumbnail" class="form-label">Cover Thumbnail</label
                >
                {#if thumbnailUrl}
                    <div class="preview-container mb-4" transition:fade>
                        <img
                            src={thumbnailUrl}
                            alt="Thumbnail Preview"
                            class="preview-image aspect-video"
                        />
                        <button
                            type="button"
                            class="remove-button"
                            on:click={removeThumbnail}
                            aria-label="Remove thumbnail"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                ><path
                                    fill="currentColor"
                                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                                /></svg
                            >
                        </button>
                    </div>
                {/if}
                <div class="file-dropzone-sm">
                    <input
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/*"
                        on:change={handleThumbnailChange}
                        class="file-input-hidden"
                    />
                    <div class="dropzone-content">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            ><rect
                                width="18"
                                height="18"
                                x="3"
                                y="3"
                                rx="2"
                            /><circle cx="9" cy="9" r="2" /><path
                                d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
                            /></svg
                        >
                        <p>
                            {newThumbnailFile
                                ? "Change Thumbnail"
                                : "Upload Thumbnail"}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div class="button-group">
            <button
                type="button"
                on:click={handleCancel}
                disabled={isSubmitting}
                class="cancel-button"
            >
                Cancel
            </button>
            <button type="submit" disabled={isSubmitting} class="submit-button">
                {#if isSubmitting}
                    <div class="spinner" />
                    <span>Saving...</span>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        ><path
                            d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"
                        /><polyline points="17 21 17 13 7 13 7 21" /><polyline
                            points="7 3 7 8 15 8"
                        /></svg
                    >
                    <span>Save Changes</span>
                {/if}
            </button>
        </div>
    </form>

    <!-- Error Notification -->
    {#if errorMessage}
        <div class="error-toast" transition:fly={{ y: 20, duration: 300 }}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><circle cx="12" cy="12" r="10" /><line
                    x1="12"
                    y1="8"
                    x2="12"
                    y2="12"
                /><line x1="12" y1="16" x2="12.01" y2="16" /></svg
            >
            <span>{errorMessage}</span>
        </div>
    {/if}
</div>

<style>
    /* Add this utility class */
    .mb-4 {
        margin-bottom: 1rem;
    }

    :root {
        --color-bg: #0a0a0a;
        --color-bg-surface: #1a1a1a;
        --color-border: #2a2a2a;
        --color-border-hover: #4a4a4a;
        --color-text-primary: #f0f0f0;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4; /* Cyan */
        --color-primary-hover: #0891b2;
        --color-danger: #ef4444; /* Red */
    }

    .form-container {
        width: 100%;
        max-width: 800px;
        margin: 2rem auto;
        padding: 2.5rem;
        background: var(--color-bg);
        border: 1px solid var(--color-border);
        border-radius: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
        position: relative;
    }

    .form-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.25rem;
    }

    .form-subtitle {
        font-size: 1rem;
        color: var(--color-text-secondary);
        margin-bottom: 2.5rem;
    }

    .form-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }
    .span-2 {
        grid-column: span 2 / span 2;
    }

    .form-label {
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        margin-bottom: 0.5rem;
    }

    .form-input,
    .form-select,
    .form-textarea {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        font-size: 1rem;
        color: var(--color-text-primary);
        background: var(--color-bg-surface);
        transition:
            border-color 0.2s,
            box-shadow 0.2s;
    }
    .form-select {
        -webkit-appearance: none;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23a3a3a3' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 1rem center;
        background-size: 1em;
    }

    .form-input::placeholder,
    .form-textarea::placeholder {
        color: #525252;
    }

    .form-input:focus,
    .form-select:focus,
    .form-textarea:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--color-primary) 20%, transparent);
    }

    .form-textarea {
        min-height: 120px;
        resize: vertical;
    }

    /* --- File Upload Dropzone --- */
    .file-input-hidden {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }

    .file-dropzone,
    .file-dropzone-sm {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 2px dashed var(--color-border);
        border-radius: 0.75rem;
        background-color: transparent;
        transition:
            border-color 0.2s,
            background-color 0.2s;
    }
    .file-dropzone-sm {
        flex-direction: column;
    }

    .file-dropzone:hover,
    .file-dropzone-sm:hover {
        border-color: var(--color-border-hover);
        background-color: color-mix(
            in srgb,
            var(--color-bg-surface) 50%,
            transparent
        );
    }
    .dropzone-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1.5rem;
        color: var(--color-text-secondary);
        pointer-events: none;
    }
    .file-dropzone-sm .dropzone-content {
        padding: 1rem;
    }

    .dropzone-content svg {
        stroke: var(--color-text-secondary);
        margin-bottom: 0.75rem;
        transition: stroke 0.2s;
    }
    .file-dropzone:hover .dropzone-content svg,
    .file-dropzone-sm:hover .dropzone-content svg {
        stroke: var(--color-primary);
    }

    .dropzone-content b {
        color: var(--color-primary);
        font-weight: 600;
    }
    .dropzone-content p {
        margin: 0;
    }
    .file-info-sm {
        font-size: 0.8rem;
    }

    /* --- Image Previews --- */
    .image-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
    }

    .preview-container {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        border: 1px solid var(--color-border);
    }
    .preview-image {
        width: 100%;
        object-fit: cover;
        display: block;
    }
    .aspect-video {
        aspect-ratio: 16/9;
        height: auto;
    }
    .preview-video {
        width: 100%;
        height: 100%;
        display: block;
    }

    .remove-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(10, 10, 10, 0.7);
        backdrop-filter: blur(4px);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        width: 1.75rem;
        height: 1.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition:
            background-color 0.2s,
            transform 0.2s;
    }
    .remove-button:hover {
        background: var(--color-danger);
        transform: scale(1.1);
    }

    /* --- Buttons --- */
    .button-group {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        border-top: 1px solid var(--color-border);
        padding-top: 1.5rem;
    }

    .submit-button,
    .cancel-button {
        flex-grow: 1;
        padding: 0.875rem 1rem;
        border-radius: 0.5rem;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        border: 1px solid transparent;
    }

    .submit-button {
        background: var(--color-primary);
        color: black;
        border-color: var(--color-primary);
    }
    .submit-button:hover:not(:disabled) {
        background: var(--color-primary-hover);
        border-color: var(--color-primary-hover);
        box-shadow: 0 4px 15px
            color-mix(in srgb, var(--color-primary) 30%, transparent);
    }
    .submit-button:disabled {
        background: #2a2a2a;
        border-color: #2a2a2a;
        color: var(--color-text-secondary);
        cursor: not-allowed;
    }

    .cancel-button {
        background: transparent;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
    }
    .cancel-button:hover:not(:disabled) {
        background: var(--color-bg-surface);
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
    }
    .cancel-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    /* --- Spinner --- */
    .spinner {
        width: 1.25em;
        height: 1.25em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* --- Error Toast --- */
    .error-toast {
        position: fixed; /* Use fixed to show over content */
        bottom: 1.5rem;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        background-color: var(--color-danger);
        color: var(--color-text-primary);
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
        z-index: 10;
        max-width: calc(100% - 3rem);
    }

    /* --- Responsive --- */
    @media (max-width: 768px) {
        .form-grid {
            grid-template-columns: 1fr;
        }
        .form-group.span-2 {
            grid-column: span 1;
        }
        .form-container {
            padding: 1.5rem;
        }
    }
</style>
