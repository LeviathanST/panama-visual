<script lang="ts">
    import type { Sponsor } from "$lib/stores/sponsor";
    import * as Card from "$lib/components/ui/card/index";
    import * as Input from "$lib/components/ui/input/index";
    import * as Button from "$lib/components/ui/button/index";
    import { enhance } from "$app/forms";
    import { invalidateAll } from "$app/navigation";
    import { fade, fly } from "svelte/transition";

    // --- PROPS ---
    let { sponsors = [] }: { sponsors: Sponsor[] } = $props();

    // --- STATE MANAGEMENT (Svelte 5 Runes) ---
    let searchQuery = $state("");
    const itemsPerPage = 8;
    let currentPage = $state(1);

    // --- "ADD" MODAL STATE ---
    let showAddModal = $state(false);
    let addError = $state<string | null>(null);
    let isSubmittingAdd = $state(false);
    let newFile = $state<File | null>(null);
    let addPreviewUrl = $state<string | null>(null);
    let newSponsorAlt = $state("");

    // --- "MANAGE" (EDIT/DELETE) MODAL STATE ---
    let showManageModal = $state(false);
    let selectedSponsor = $state<Sponsor | null>(null);
    let editMode = $state(false);
    let isDeleting = $state(false);
    let isEditing = $state(false);
    let manageError = $state<string | null>(null);
    let editFile = $state<File | null>(null);
    let editPreviewUrl = $state<string | null>(null);
    let editSponsorAlt = $state("");

    // --- DERIVED STATE (Svelte 5 Runes) ---
    const searchError = $derived(() => {
        if (!searchQuery.trim()) return "";
        try {
            new RegExp(searchQuery, "i");
            return "";
        } catch (e) {
            return "Invalid search pattern";
        }
    });

    const filteredSponsors = $derived(() => {
        if (searchError()) return [];
        if (!searchQuery.trim()) return sponsors;

        const regex = new RegExp(searchQuery, "i");
        return sponsors.filter((sponsor) => regex.test(sponsor.alt));
    });

    const paginatedSponsors = $derived(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredSponsors().slice(start, start + itemsPerPage);
    });

    const totalPages = $derived(
        Math.ceil(filteredSponsors().length / itemsPerPage),
    );

    $effect(() => {
        searchQuery;
        currentPage = 1;
    });

    // --- EVENT HANDLERS ---
    function openAddModal() {
        showAddModal = true;
    }

    function closeAddModal() {
        showAddModal = false;
        if (addPreviewUrl) URL.revokeObjectURL(addPreviewUrl);
        addPreviewUrl = null;
        newFile = null;
        addError = null;
        newSponsorAlt = "";
    }

    function closeAddModalBackdrop(event: MouseEvent) {
        if (event.currentTarget === event.target) {
            closeAddModal();
        }
    }

    function handleAddFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            newFile = file;
            if (addPreviewUrl) URL.revokeObjectURL(addPreviewUrl);
            addPreviewUrl = URL.createObjectURL(newFile);
        }
    }

    function removeAddImage() {
        if (addPreviewUrl) URL.revokeObjectURL(addPreviewUrl);
        newFile = null;
        addPreviewUrl = null;
    }

    function openManageModal(sponsor: Sponsor) {
        selectedSponsor = sponsor;
        editSponsorAlt = sponsor.alt;
        editPreviewUrl = sponsor.src;
        showManageModal = true;
    }

    function closeManageModal() {
        showManageModal = false;
        editMode = false;
        manageError = null;

        if (editPreviewUrl && editPreviewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(editPreviewUrl);
        }

        selectedSponsor = null;
        editFile = null;
    }

    function closeManageModalBackdrop(event: MouseEvent) {
        if (event.currentTarget === event.target) {
            closeManageModal();
        }
    }

    function handleEditFileChange(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            editFile = file;
            if (editPreviewUrl && editPreviewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(editPreviewUrl);
            }
            editPreviewUrl = URL.createObjectURL(editFile);
        }
    }

    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
        }
    }
</script>

<div class="page-container">
    <!-- Header -->
    <div class="page-header">
        <h2 class="page-title">Our Sponsors</h2>
        <Button.Button
            onclick={openAddModal}
            class="submit-button"
            variant="default"
        >
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
                ><path d="M12 5v14" /><path d="M5 12h14" /></svg
            >
            <span>Add Sponsor</span>
        </Button.Button>
    </div>

    <!-- Search Input -->
    <div class="search-container">
        <div class="search-input-wrapper">
            <svg
                class="search-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><circle cx="11" cy="11" r="8"></circle><line
                    x1="21"
                    y1="21"
                    x2="16.65"
                    y2="16.65"
                ></line></svg
            >
            <Input.Input
                type="text"
                placeholder="Search sponsors by name..."
                bind:value={searchQuery}
                class="form-input search-input"
            />
        </div>
        {#if searchError()}
            <p class="error-text">{searchError()}</p>
        {/if}
    </div>

    <!-- Sponsors Grid -->
    {#if paginatedSponsors().length === 0 && !searchError()}
        <p class="empty-state-text">
            No sponsors found. Click "Add Sponsor" to begin.
        </p>
    {:else}
        <div class="sponsors-grid">
            {#each paginatedSponsors() as sponsor}
                <Card.Root
                    class="sponsor-card"
                    onclick={() => openManageModal(sponsor)}
                    onkeydown={(e) =>
                        e.key === "Enter" && openManageModal(sponsor)}
                    role="button"
                    tabindex="0"
                    aria-label={`Manage ${sponsor.alt}`}
                >
                    <Card.Content class="p-0">
                        <div class="image-wrapper">
                            <img
                                src={sponsor.src}
                                alt={sponsor.alt}
                                class="sponsor-image"
                                loading="lazy"
                            />
                        </div>
                        <div class="card-footer">
                            <p class="sponsor-alt">{sponsor.alt}</p>
                        </div>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    {/if}

    <!-- Pagination Controls -->
    {#if totalPages > 1}
        <div class="pagination-controls">
            <Button.Button
                onclick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                variant="outline"
                class="pagination-button"
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
                    ><polyline points="15 18 9 12 15 6"></polyline></svg
                >
            </Button.Button>
            <span class="pagination-text">
                Page {currentPage} of {totalPages}
            </span>
            <Button.Button
                onclick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                variant="outline"
                class="pagination-button"
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
                    ><polyline points="9 18 15 12 9 6"></polyline></svg
                >
            </Button.Button>
        </div>
    {/if}
</div>

<!-- Add Sponsor Modal -->
{#if showAddModal}
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        onclick={closeAddModalBackdrop}
    >
        <div class="modal-container" transition:fly={{ y: 20, duration: 300 }}>
            <div class="modal-header">
                <h3 class="modal-title">Add New Sponsor</h3>
                <button
                    onclick={closeAddModal}
                    class="close-button"
                    aria-label="Close modal"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                        /></svg
                    >
                </button>
            </div>

            <form
                action="?/addSponsor"
                method="POST"
                enctype="multipart/form-data"
                use:enhance={() => {
                    isSubmittingAdd = true;
                    return async ({ result }) => {
                        isSubmittingAdd = false;
                        if (result.type === "success") {
                            await invalidateAll();
                            closeAddModal();
                        } else if (result.type === "failure") {
                            addError =
                                result.data?.error || "Failed to add sponsor";
                        }
                    };
                }}
            >
                <div class="form-group">
                    <label for="alt" class="form-label"
                        >Sponsor Name (Alt Text)</label
                    >
                    <Input.Input
                        type="text"
                        name="alt"
                        id="alt"
                        placeholder="e.g., Acme Corporation"
                        required
                        class="form-input"
                        bind:value={newSponsorAlt}
                    />
                </div>

                <div class="form-group">
                    <label for="src" class="form-label">Sponsor Logo</label>
                    {#if addPreviewUrl}
                        <div class="preview-container mb-4">
                            <img
                                src={addPreviewUrl}
                                alt="Logo preview"
                                class="preview-image"
                            />
                            <button
                                type="button"
                                onclick={removeAddImage}
                                class="remove-button"
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
                    {/if}
                    <div class="file-dropzone">
                        <input
                            type="file"
                            name="src"
                            id="src"
                            accept="image/*"
                            required
                            onchange={handleAddFileChange}
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
                            <p><b>Click to upload</b> or drag and drop</p>
                            <p class="file-info-sm">PNG, JPG, SVG, WEBP</p>
                        </div>
                    </div>
                </div>

                {#if addError}
                    <p class="error-text text-center mb-4">{addError}</p>
                {/if}

                <div class="modal-footer">
                    <Button.Button
                        type="button"
                        onclick={closeAddModal}
                        disabled={isSubmittingAdd}
                        class="cancel-button"
                        variant="outline"
                    >
                        Cancel
                    </Button.Button>
                    <Button.Button
                        type="submit"
                        disabled={isSubmittingAdd || !newFile}
                        class="submit-button"
                        variant="default"
                    >
                        {#if isSubmittingAdd}
                            <div class="spinner" />
                            <span>Adding...</span>
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
                                ><path d="M12 5v14" /><path d="M5 12h14" /></svg
                            >
                            <span>Add Sponsor</span>
                        {/if}
                    </Button.Button>
                </div>
            </form>
        </div>
    </div>
{/if}

<!-- Manage (Edit/Delete) Sponsor Modal -->
{#if showManageModal && selectedSponsor}
    <div
        class="modal-backdrop"
        transition:fade={{ duration: 200 }}
        onclick={closeManageModalBackdrop}
    >
        <div class="modal-container" transition:fly={{ y: 20, duration: 300 }}>
            {#if !editMode}
                <!-- VIEW / DELETE MODE -->
                <div class="modal-header">
                    <h3 class="modal-title">Manage Sponsor</h3>
                    <button
                        onclick={closeManageModal}
                        class="close-button"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            ><path
                                fill="currentColor"
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                            /></svg
                        >
                    </button>
                </div>
                <div class="view-mode-content">
                    <div class="preview-container">
                        <img
                            src={selectedSponsor.src}
                            alt={selectedSponsor.alt}
                            class="preview-image"
                        />
                    </div>
                    <p class="view-mode-alt">{selectedSponsor.alt}</p>
                </div>
                {#if manageError}
                    <p class="error-text text-center mb-4">{manageError}</p>
                {/if}
                <div class="modal-footer">
                    <form
                        action="edit?/deleteSponsor"
                        method="POST"
                        class="w-full"
                        use:enhance={() => {
                            if (
                                !confirm(
                                    `Are you sure you want to delete "${selectedSponsor?.alt}"?`,
                                )
                            ) {
                                return ({ cancel }) => cancel();
                            }
                            isDeleting = true;
                            return async ({ result }) => {
                                isDeleting = false;
                                if (result.type === "success") {
                                    await invalidateAll();
                                    closeManageModal();
                                } else if (result.type === "failure") {
                                    manageError =
                                        result.data?.error ||
                                        "Failed to delete sponsor.";
                                }
                            };
                        }}
                    >
                        <input
                            type="hidden"
                            name="id"
                            value={selectedSponsor.id}
                        />
                        <input
                            type="hidden"
                            name="src"
                            value={selectedSponsor.src}
                        />
                        <Button.Button
                            type="submit"
                            disabled={isDeleting}
                            class="delete-button"
                        >
                            {#if isDeleting}
                                <div class="spinner" />
                                <span>Deleting...</span>
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
                                    ><polyline points="3 6 5 6 21 6"
                                    ></polyline><path
                                        d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                                    ></path><line
                                        x1="10"
                                        y1="11"
                                        x2="10"
                                        y2="17"
                                    ></line><line
                                        x1="14"
                                        y1="11"
                                        x2="14"
                                        y2="17"
                                    ></line></svg
                                >
                                <span>Delete</span>
                            {/if}
                        </Button.Button>
                    </form>
                    <Button.Button
                        onclick={() => (editMode = true)}
                        disabled={isDeleting}
                        class="submit-button"
                        variant="default"
                    >
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
                                d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                            ></path><path
                                d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                            ></path></svg
                        >
                        <span>Edit</span>
                    </Button.Button>
                </div>
            {:else}
                <!-- EDIT MODE -->
                <div class="modal-header">
                    <h3 class="modal-title">Edit Sponsor</h3>
                    <button
                        onclick={closeManageModal}
                        class="close-button"
                        aria-label="Close modal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            ><path
                                fill="currentColor"
                                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41z"
                            /></svg
                        >
                    </button>
                </div>
                <form
                    action="edit?/editSponsor"
                    method="POST"
                    enctype="multipart/form-data"
                    use:enhance={() => {
                        isEditing = true;
                        return async ({ result }) => {
                            isEditing = false;
                            if (result.type === "success") {
                                await invalidateAll();
                                closeManageModal();
                            } else if (result.type === "failure") {
                                manageError =
                                    result.data?.error ||
                                    "Failed to update sponsor.";
                            }
                        };
                    }}
                >
                    <input type="hidden" name="id" value={selectedSponsor.id} />
                    <input
                        type="hidden"
                        name="oldSrc"
                        value={selectedSponsor.src}
                    />
                    <div class="form-group">
                        <label for="alt-edit" class="form-label"
                            >Sponsor Name (Alt Text)</label
                        >
                        <Input.Input
                            type="text"
                            name="alt-edit"
                            id="alt-edit"
                            required
                            class="form-input"
                            value={editSponsorAlt}
                            oninput={(e) =>
                                (editSponsorAlt = e.currentTarget.value)}
                        />
                    </div>
                    <div class="form-group">
                        <label for="src-edit" class="form-label"
                            >Upload New Logo (Optional)</label
                        >
                        {#if editPreviewUrl}
                            <div class="preview-container mb-4">
                                <img
                                    src={editPreviewUrl}
                                    alt="New logo preview"
                                    class="preview-image"
                                />
                            </div>
                        {/if}
                        <div class="file-dropzone">
                            <input
                                type="file"
                                name="src-edit"
                                id="src-edit"
                                accept="image/*"
                                onchange={handleEditFileChange}
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
                                <p><b>Click to upload</b> or drag and drop</p>
                                <p class="file-info-sm">
                                    Leave blank to keep existing logo
                                </p>
                            </div>
                        </div>
                    </div>
                    {#if manageError}
                        <p class="error-text text-center mb-4">{manageError}</p>
                    {/if}
                    <div class="modal-footer">
                        <Button.Button
                            type="button"
                            onclick={() => {
                                editMode = false;
                                manageError = null;
                            }}
                            disabled={isEditing}
                            class="cancel-button"
                            variant="outline">Cancel</Button.Button
                        >
                        <Button.Button
                            type="submit"
                            disabled={isEditing}
                            class="submit-button"
                            variant="default"
                        >
                            {#if isEditing}
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
                                    ></path><polyline
                                        points="17 21 17 13 7 13 7 21"
                                    ></polyline><polyline points="7 3 7 8 15 8"
                                    ></polyline></svg
                                >
                                <span>Save Changes</span>
                            {/if}
                        </Button.Button>
                    </div>
                </form>
            {/if}
        </div>
    </div>
{/if}

<style>
    :root {
        --color-bg: #0a0a0a;
        --color-bg-surface: #1a1a1a;
        --color-bg-surface-hover: #2a2a2a;
        --color-border: #2a2a2a;
        --color-border-hover: #4a4a4a;
        --color-text-primary: #f0f0f0;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4; /* Cyan */
        --color-primary-hover: #0891b2;
        --color-danger: #ef4444;
        --color-danger-hover: #dc2626;
    }

    /* Page Layout */
    .page-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }
    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border);
    }
    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
    }
    .search-container {
        margin-bottom: 2.5rem;
    }
    .search-input-wrapper {
        position: relative;
        max-width: 500px;
        margin: 0 auto;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        color: var(--color-text-secondary);
        pointer-events: none;
    }
    .form-input.search-input {
        padding-left: 3rem !important;
    }

    /* Sponsors Grid */
    .sponsors-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 1.5rem;
    }
    .sponsor-card {
        background-color: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        overflow: hidden;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            border-color 0.2s ease;
        cursor: pointer;
    }
    .sponsor-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        border-color: var(--color-border-hover);
    }
    .sponsor-card:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
        border-color: var(--color-primary);
    }
    .image-wrapper {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem;
    }
    .sponsor-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .card-footer {
        padding: 0.75rem 1rem;
        background-color: rgba(0, 0, 0, 0.2);
        border-top: 1px solid var(--color-border);
    }
    .sponsor-alt {
        color: var(--color-text-secondary);
        font-size: 0.875rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    /* Pagination */
    .pagination-controls {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        margin-top: 2.5rem;
    }
    .pagination-button {
        background: var(--color-bg-surface);
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
        width: 2.5rem;
        height: 2.5rem;
        padding: 0;
    }
    .pagination-button:not(:disabled):hover {
        background: var(--color-bg-surface-hover);
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
    }
    .pagination-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
    .pagination-text {
        color: var(--color-text-secondary);
        font-size: 0.875rem;
    }

    /* Modal styles */
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
        max-width: 500px;
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
        color: var(--color-text-primary);
    }
    .close-button {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: var(--color-text-secondary);
        transition: color 0.2s;
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

    /* Form Elements */
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
        transition:
            border-color 0.2s,
            box-shadow 0.2s;
    }
    .form-input:focus {
        outline: none;
        border-color: var(--color-primary);
        box-shadow: 0 0 0 3px
            color-mix(in srgb, var(--color-primary) 20%, transparent);
    }
    .error-text {
        color: var(--color-danger);
        font-size: 0.875rem;
        text-align: center;
        margin-top: 0.5rem;
    }
    .empty-state-text {
        text-align: center;
        color: var(--color-text-secondary);
        padding: 4rem 0;
        border: 2px dashed var(--color-border);
        border-radius: 1rem;
    }
    .mb-4 {
        margin-bottom: 1rem;
    }

    /* File Dropzone */
    .file-input-hidden {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        opacity: 0;
        cursor: pointer;
    }
    .file-dropzone {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 2px dashed var(--color-border);
        border-radius: 0.75rem;
        padding: 1.5rem;
        transition:
            border-color 0.2s,
            background-color 0.2s;
    }
    .file-dropzone:hover {
        border-color: var(--color-primary);
        background-color: var(--color-bg-surface-hover);
    }
    .dropzone-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--color-text-secondary);
        pointer-events: none;
    }
    .dropzone-content svg {
        stroke: var(--color-text-secondary);
        margin-bottom: 0.75rem;
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

    /* Previews & Buttons */
    .preview-container {
        position: relative;
        border-radius: 0.5rem;
        overflow: hidden;
        border: 1px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 140px;
        background-color: var(--color-bg);
    }
    .preview-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }
    .remove-button,
    .submit-button,
    .cancel-button,
    .delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        border: 1px solid transparent;
        width: 100%;
    }
    .remove-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background: rgba(10, 10, 10, 0.7);
        backdrop-filter: blur(4px);
        color: white;
        border-radius: 50%;
        width: 1.75rem;
        height: 1.75rem;
        padding: 0;
    }
    .remove-button:hover {
        background: var(--color-danger);
        transform: scale(1.1);
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
    .submit-button:disabled,
    .delete-button:disabled,
    .cancel-button:disabled {
        background: var(--color-bg-surface-hover);
        border-color: var(--color-bg-surface-hover);
        color: var(--color-text-secondary);
        cursor: not-allowed;
        opacity: 0.6;
    }
    .cancel-button {
        background: transparent;
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
    }
    .cancel-button:hover:not(:disabled) {
        background: var(--color-bg-surface-hover);
        border-color: var(--color-border-hover);
        color: var(--color-text-primary);
    }
    .delete-button {
        background: var(--color-danger);
        border-color: var(--color-danger);
        color: var(--color-text-primary);
    }
    .delete-button:hover:not(:disabled) {
        background: var(--color-danger-hover);
        border-color: var(--color-danger-hover);
    }
    .spinner {
        width: 1.25em;
        height: 1.25em;
        border: 2px solid currentColor;
        border-right-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
    }
    .w-full {
        width: 100%;
    }
    .view-mode-content {
        padding: 1rem 0;
    }
    .view-mode-alt {
        text-align: center;
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text-primary);
        margin-top: 1.5rem;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>
