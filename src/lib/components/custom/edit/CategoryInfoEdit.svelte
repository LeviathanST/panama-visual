<script lang="ts">
    import { fade, fly } from "svelte/transition";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Button from "$lib/components/ui/button/index.js";
    import * as Input from "$lib/components/ui/input/index.js";

    // --- TYPE DEFINITION ---
    // Matches the type you provided
    interface ResponseCategory {
        type: string;
        name: string;
        normal_img_url: string;
        hover_img_url: string;
    }

    // --- PROPS & STATE (Svelte 5 Runes) ---
    let { categories = [] }: { categories: ResponseCategory[] } = $props();

    // Modal State
    let showEditModal = $state(false);
    let selectedCategory = $state<ResponseCategory | null>(null);
    let isSubmitting = $state(false);
    let editError = $state<string | null>(null);

    // Form Field State
    let editName = $state("");
    let editNormalFile = $state<File | null>(null);
    let editHoverFile = $state<File | null>(null);
    let editNormalPreviewUrl = $state<string | null>(null);
    let editHoverPreviewUrl = $state<string | null>(null);

    // --- EVENT HANDLERS ---

    function openEditModal(category: ResponseCategory) {
        selectedCategory = category;
        // Populate form fields with the selected category's data
        editName = category.name;
        editNormalPreviewUrl = category.normal_img_url;
        editHoverPreviewUrl = category.hover_img_url;

        showEditModal = true;
    }

    function closeEditModal() {
        showEditModal = false;

        // Clean up blob URLs to prevent memory leaks
        if (editNormalPreviewUrl?.startsWith("blob:"))
            URL.revokeObjectURL(editNormalPreviewUrl);
        if (editHoverPreviewUrl?.startsWith("blob:"))
            URL.revokeObjectURL(editHoverPreviewUrl);

        // Reset all state variables
        selectedCategory = null;
        editError = null;
        editName = "";
        editNormalFile = null;
        editHoverFile = null;
    }

    function handleFileChange(event: Event, type: "normal" | "hover") {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (!file) return;

        if (type === "normal") {
            if (editNormalPreviewUrl?.startsWith("blob:"))
                URL.revokeObjectURL(editNormalPreviewUrl);
            editNormalFile = file;
            editNormalPreviewUrl = URL.createObjectURL(file);
        } else {
            if (editHoverPreviewUrl?.startsWith("blob:"))
                URL.revokeObjectURL(editHoverPreviewUrl);
            editHoverFile = file;
            editHoverPreviewUrl = URL.createObjectURL(file);
        }
    }
</script>

<div class="page-container">
    <!-- Header -->
    <div class="page-header">
        <div>
            <h2 class="page-title">Manage Categories</h2>
            <p class="page-subtitle">
                Edit the name and images for each project category.
            </p>
        </div>
    </div>

    <!-- Category Grid -->
    <div class="category-grid">
        {#each categories as category (category.type)}
            <Card.Root class="category-card">
                <Card.Content class="p-0">
                    <div class="image-wrapper">
                        <img
                            src={category.normal_img_url}
                            alt={category.name}
                            class="category-image normal-image"
                            loading="lazy"
                        />
                        <img
                            src={category.hover_img_url}
                            alt="{category.name} hover"
                            class="category-image hover-image"
                            loading="lazy"
                        />
                    </div>
                    <div class="card-footer">
                        <p class="category-name">{category.name}</p>
                        <Button.Button
                            variant="outline"
                            class="edit-button"
                            onclick={() => openEditModal(category)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                ><path
                                    d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                                /><path
                                    d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                                /></svg
                            >
                            Edit
                        </Button.Button>
                    </div>
                </Card.Content>
            </Card.Root>
        {/each}
    </div>
</div>

<!-- Edit Category Modal -->
{#if showEditModal && selectedCategory}
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        onclick={(e) => e.currentTarget === e.target && closeEditModal()}
    >
        <div class="modal-container" transition:fly={{ y: 20, duration: 300 }}>
            <div class="modal-header">
                <h3 class="modal-title">
                    Edit Category: <span class="text-primary"
                        >{selectedCategory.name}</span
                    >
                </h3>
                <button
                    onclick={closeEditModal}
                    class="close-button"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                        /></svg
                    >
                </button>
            </div>

            <form
                action="edit?/updateCategory"
                method="POST"
                enctype="multipart/form-data"
                use:enhance={() => {
                    isSubmitting = true;
                    editError = null;
                    return async ({ result }) => {
                        isSubmitting = false;
                        if (result.type === "success") {
                            await invalidateAll(); // Reloads data from the server
                            closeEditModal();
                        } else if (result.type === "failure") {
                            editError =
                                result.data?.error ||
                                "Failed to update category.";
                        }
                    };
                }}
            >
                <!-- Hidden inputs for identifiers and old URLs -->
                <input
                    type="hidden"
                    name="type"
                    value={selectedCategory.type}
                />
                <input
                    type="hidden"
                    name="old_normal_img_url"
                    value={selectedCategory.normal_img_url}
                />
                <input
                    type="hidden"
                    name="old_hover_img_url"
                    value={selectedCategory.hover_img_url}
                />

                <!-- Category Name -->
                <div class="form-group">
                    <label for="name" class="form-label">Category Name</label>
                    <Input.Input
                        type="text"
                        name="name"
                        id="name"
                        bind:value={editName}
                        required
                        class="form-input"
                    />
                </div>

                <div class="form-grid">
                    <!-- Normal Image Upload -->
                    <div class="form-group">
                        <label for="normal_img" class="form-label"
                            >Normal Image</label
                        >
                        {#if editNormalPreviewUrl}
                            <div class="preview-container">
                                <img
                                    src={editNormalPreviewUrl}
                                    alt="Normal preview"
                                    class="preview-image"
                                />
                            </div>
                        {/if}
                        <input
                            type="file"
                            name="normal_img"
                            id="normal_img"
                            accept="image/*"
                            onchange={(e) => handleFileChange(e, "normal")}
                            class="file-input"
                        />
                    </div>

                    <!-- Hover Image Upload -->
                    <div class="form-group">
                        <label for="hover_img" class="form-label"
                            >Hover Image</label
                        >
                        {#if editHoverPreviewUrl}
                            <div class="preview-container">
                                <img
                                    src={editHoverPreviewUrl}
                                    alt="Hover preview"
                                    class="preview-image"
                                />
                            </div>
                        {/if}
                        <input
                            type="file"
                            name="hover_img"
                            id="hover_img"
                            accept="image/*"
                            onchange={(e) => handleFileChange(e, "hover")}
                            class="file-input"
                        />
                    </div>
                </div>

                {#if editError}
                    <p class="error-text">{editError}</p>
                {/if}

                <!-- Modal Actions -->
                <div class="modal-footer">
                    <Button.Button
                        type="button"
                        variant="outline"
                        class="cancel-button"
                        onclick={closeEditModal}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button.Button>
                    <Button.Button
                        type="submit"
                        class="submit-button"
                        disabled={isSubmitting}
                    >
                        {#if isSubmitting}
                            <div class="spinner" />
                            <span>Saving...</span>
                        {:else}
                            Save Changes
                        {/if}
                    </Button.Button>
                </div>
            </form>
        </div>
    </div>
{/if}

<style>
    :root {
        --color-bg: #0a0a0a;
        --color-bg-surface: #1a1a1a;
        --color-bg-surface-hover: #2a2a2a;
        --color-border: #2a2a2a;
        --color-text-primary: #f0f0f0;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4;
        --color-primary-hover: #0891b2;
        --color-danger: #ef4444;
        --color-danger-hover: #dc2626;
    }

    /* --- Page Layout --- */
    .page-container {
        width: 100%;
        max-width: 1200px;
        margin: 2rem auto;
        padding: 2rem;
    }
    .page-header {
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border);
    }
    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
    }
    .page-subtitle {
        font-size: 1rem;
        color: var(--color-text-secondary);
        margin-top: 0.25rem;
    }
    .text-primary {
        color: var(--color-primary);
    }

    /* --- Category Grid & Cards --- */
    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }

    .category-card {
        background-color: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        overflow: hidden;
        transition: all 0.2s ease;
    }
    .category-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        border-color: var(--color-primary);
    }

    .image-wrapper {
        position: relative;
        aspect-ratio: 4 / 3;
    }
    .category-image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: opacity 0.4s ease-in-out;
    }
    .hover-image {
        opacity: 0;
    }
    .category-card:hover .hover-image {
        opacity: 1;
    }

    .card-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-top: 1px solid var(--color-border);
    }
    .category-name {
        font-weight: 600;
        font-size: 1.125rem;
    }
    .edit-button {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-color: var(--color-border);
        color: var(--color-text-secondary);
    }
    .edit-button:hover {
        background-color: var(--color-bg-surface-hover);
        border-color: var(--color-primary);
        color: var(--color-primary);
    }

    /* --- Modal Styles (reused from other components) --- */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
        padding: 1rem;
    }
    .modal-container {
        width: 100%;
        max-width: 600px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 1.5rem;
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: 1rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    }
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    .modal-title {
        font-size: 1.25rem;
        font-weight: 600;
    }
    .close-button {
        background: none;
        border: none;
        padding: 0.25rem;
        cursor: pointer;
        color: var(--color-text-secondary);
        transition: color 0.2s;
        line-height: 1;
    }
    .close-button:hover {
        color: var(--color-text-primary);
    }

    .modal-footer {
        display: flex;
        gap: 1rem;
        margin-top: 2rem;
        border-top: 1px solid var(--color-border);
        padding-top: 1.5rem;
    }

    /* --- Form Styles --- */
    .form-group {
        margin-bottom: 1.5rem;
    }
    .form-label {
        display: block;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--color-text-secondary);
        margin-bottom: 0.5rem;
    }
    .form-input {
        width: 100%;
        padding: 0.75rem 1rem;
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        font-size: 1rem;
        color: var(--color-text-primary);
        background: var(--color-bg);
    }
    .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--color-primary) 20%, transparent);
    }
    .form-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1.5rem;
    }

    .preview-container {
        border: 1px solid var(--color-border);
        border-radius: 0.5rem;
        overflow: hidden;
        margin-bottom: 0.75rem;
        aspect-ratio: 4/3;
    }
    .preview-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .file-input {
        display: block;
        width: 100%;
        font-size: 0.875rem;
        color: var(--color-text-secondary);
    }
    .file-input::file-selector-button {
        background: var(--color-bg-surface-hover);
        border: 1px solid var(--color-border);
        color: var(--color-text-primary);
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: all 0.2s;
        margin-right: 1rem;
    }
    .file-input::file-selector-button:hover {
        background-color: var(--color-border);
        border-color: var(--color-primary);
    }

    .error-text {
        color: var(--color-danger);
        font-size: 0.875rem;
        text-align: center;
        margin-top: 1rem;
    }

    /* Buttons */
    .submit-button,
    .cancel-button {
        flex-grow: 1;
        padding: 0.75rem 1rem;
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
        color: var(--color-bg);
        border-color: var(--color-primary);
    }
    .submit-button:hover:not(:disabled) {
        background: var(--color-primary-hover);
    }
    .cancel-button {
        background: transparent;
        color: var(--color-text-secondary);
        border-color: var(--color-border);
    }
    .cancel-button:hover:not(:disabled) {
        background: var(--color-bg-surface-hover);
        color: var(--color-text-primary);
    }
    .submit-button:disabled,
    .cancel-button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }

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
</style>
