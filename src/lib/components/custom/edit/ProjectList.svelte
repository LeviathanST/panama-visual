<script lang="ts">
    import * as Button from "$lib/components/ui/button/index";
    import * as Card from "$lib/components/ui/card/index";
    import * as Input from "$lib/components/ui/input/index";
    import type { Project } from "$lib/stores/project"; // Ensure your Project type has a unique `id` property
    import { categoryStore } from "$lib/stores/category";
    import { invalidateAll } from "$app/navigation";

    // --- PROPS & STATE (Svelte 5 Runes) ---
    let {
        projects = [],
        onEdit,
    }: { projects: Project[]; onEdit: (project: Project) => void } = $props();

    let selectedCategory = $state<string | null>(null);
    let searchQuery = $state("");
    let deletingProjectId = $state<string | null>(null); // State to track the project being deleted

    // --- DERIVED STATE ---
    const filteredProjects = $derived(() => {
        return projects.filter((project) => {
            const matchesCategory =
                selectedCategory === null ||
                project.category === selectedCategory;
            if (!matchesCategory) return false;

            if (searchQuery.trim()) {
                try {
                    const regex = new RegExp(searchQuery, "i");
                    return regex.test(project.title);
                } catch (e) {
                    return project.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase());
                }
            }
            return true;
        });
    });

    // --- EVENT HANDLERS ---
    async function deleteProject(project: Project) {
        if (confirm(`Please confirm to delete project "${project.title}".`)) {
            deletingProjectId = project.id;

            try {
                const res = await fetch("/api/projects", {
                    method: "DELETE",
                    body: JSON.stringify(project),
                    headers: { "Content-Type": "application/json" },
                });

                if (!res.ok) {
                    const errorData = await res.json();
                    alert(
                        `Failed to delete project: ${errorData.message || res.statusText}`,
                    );
                } else {
                    window.location.reload();
                }
            } catch (error) {
                alert("An error occurred while communicating with the server.");
                console.error("Delete project error:", error);
            } finally {
                deletingProjectId = null;
            }
        }
    }
</script>

<div class="project-list-container">
    <!-- Filter Controls -->
    <div class="filter-controls">
        <div class="category-filters">
            <Button.Button
                variant={selectedCategory === null ? "default" : "outline"}
                class="filter-button"
                onclick={() => (selectedCategory = null)}
            >
                All
            </Button.Button>
            {#each $categoryStore as category}
                <Button.Button
                    variant={selectedCategory === category.name
                        ? "default"
                        : "outline"}
                    class="filter-button"
                    onclick={() => (selectedCategory = category.name)}
                >
                    {category.name.replace(/_/g, " ")}
                </Button.Button>
            {/each}
        </div>
        <div class="search-wrapper">
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
                bind:value={searchQuery}
                placeholder="Search by project title..."
                class="form-input search-input"
            />
        </div>
    </div>

    <!-- Project Grid -->
    {#if filteredProjects().length > 0}
        <div class="project-grid">
            {#each filteredProjects() as project}
                <Card.Root class="project-card">
                    <Card.Content class="p-0">
                        <div class="image-container">
                            <img
                                src={project.thumbnail}
                                alt="{project.title} thumbnail"
                                class="card-image"
                                loading="lazy"
                            />
                        </div>
                        <div class="card-body">
                            <h3 class="card-title" title={project.title}>
                                {project.title}
                            </h3>
                            <div class="card-meta">
                                <!-- Meta items -->
                                <div class="meta-item">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        ><path
                                            d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"
                                        ></path></svg
                                    >
                                    <span
                                        >{project.category.replace(
                                            /_/g,
                                            " ",
                                        )}</span
                                    >
                                </div>
                                {#if project.time}
                                    <div class="meta-item">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            ><circle cx="12" cy="12" r="10"
                                            ></circle><polyline
                                                points="12 6 12 12 16 14"
                                            ></polyline></svg
                                        >
                                        <span>{project.time}</span>
                                    </div>
                                {/if}
                            </div>
                        </div>
                        <div class="card-footer">
                            {#if deletingProjectId === project.id}
                                <div class="loading-container">
                                    <div class="spinner"></div>
                                    <span>Deleting...</span>
                                </div>
                            {:else}
                                <Button.Button
                                    variant="outline"
                                    size="sm"
                                    class="action-button edit-button"
                                    onclick={() => onEdit(project)}
                                    disabled={deletingProjectId !== null}
                                >
                                    Edit
                                </Button.Button>
                                <Button.Button
                                    variant="destructive"
                                    size="sm"
                                    class="action-button delete-button"
                                    onclick={() => deleteProject(project)}
                                    disabled={deletingProjectId !== null}
                                >
                                    Delete
                                </Button.Button>
                            {/if}
                        </div>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    {:else}
        <div class="empty-state">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                ><path
                    d="M21.5 12c0-5.25-4.25-9.5-9.5-9.5S2.5 6.75 2.5 12s4.25 9.5 9.5 9.5"
                /><path
                    d="M12.5 12.5a2.5 2.5 0 0 0-5 0 2.5 2.5 0 0 0 5 0Z"
                /><path
                    d="M12.5 12.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1-5 0Z"
                /></svg
            >
            <h4 class="empty-state-title">No Projects Found</h4>
            <p class="empty-state-subtitle">
                Try adjusting your search or filter settings.
            </p>
        </div>
    {/if}
</div>

<style>
    :root {
        --color-bg: #000000;
        --color-bg-surface: #111111;
        --color-bg-surface-hover: #1f1f1f;
        --color-border: #2a2a2a;
        --color-border-hover: #4a4a4a;
        --color-text-primary: #ffffff;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4;
        --color-primary-hover: #0891b2;
        --color-danger: #991b1b;
        --color-danger-hover: #ef4444;
    }

    .project-list-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    /* Filter Controls */
    .filter-controls {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }
    .category-filters {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    :global(.filter-button) {
        font-size: 0.875rem;
        padding: 0.5rem 1rem;
        border-radius: 9999px;
        transition: all 0.2s ease-in-out; /* Smoother transition */
    }
    :global(.filter-button[data-variant="outline"]) {
        background-color: transparent;
        border: 1px solid var(--color-border);
        color: var(--color-text-secondary);
    }
    :global(.filter-button[data-variant="outline"]:hover) {
        background-color: var(--color-bg-surface-hover);
        border-color: var(--color-primary); /* Change border to cyan */
        color: var(--color-primary); /* Change text to cyan */
        transform: translateY(-3px); /* Increased lift */
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
    }

    :global(.filter-button[data-variant="default"]) {
        background-color: var(--color-primary);
        color: var(--color-bg);
        border-color: var(--color-primary);
        transform: translateY(-2px);
        box-shadow:
            0 4px 10px rgba(0, 0, 0, 0.3),
            0 0 20px color-mix(in srgb, var(--color-primary) 40%, transparent);
    }

    :global(.filter-button[data-variant="default"]:hover) {
        transform: translateY(-3px); /* Match hover lift */
        box-shadow:
            0 6px 15px rgba(0, 0, 0, 0.4),
            0 0 25px color-mix(in srgb, var(--color-primary) 50%, transparent); /* Brighter glow on hover */
    }
    :global(.filter-button:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    .search-wrapper {
        position: relative;
        min-width: 250px;
    }
    .search-icon {
        position: absolute;
        top: 50%;
        left: 0.875rem;
        transform: translateY(-50%);
        color: var(--color-text-secondary);
        pointer-events: none;
    }
    .form-input.search-input {
        padding-left: 2.75rem !important;
        background: var(--color-bg-surface);
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

    /* Project Grid */
    .project-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1.5rem;
    }
    .project-card {
        background-color: var(--color-bg-surface);
        border: 1px solid var(--color-border);
        border-radius: 0.75rem;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
    }
    .project-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
        border-color: var(--color-border-hover);
    }
    .image-container {
        overflow: hidden;
        aspect-ratio: 16 / 9;
    }
    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    .project-card:hover .card-image {
        transform: scale(1.05);
    }
    .card-body {
        padding: 1rem;
        flex-grow: 1;
    }
    .card-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-text-primary);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .card-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        margin-top: 0.75rem;
        color: var(--color-text-secondary);
        font-size: 0.875rem;
    }
    .meta-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .card-footer {
        display: flex;
        gap: 0.75rem;
        padding: 0 1rem 1rem;
        border-top: 1px solid var(--color-border);
        padding-top: 1rem;
        margin-top: 1rem;
        min-height: 40px; /* Ensure consistent footer height */
        align-items: center;
    }
    :global(.action-button) {
        flex-grow: 1;
        font-size: 0.875rem;
        transition: all 0.2s ease;
    }
    :global(.edit-button) {
        background-color: var(--color-bg-surface-hover);
        border: 1px solid var(--color-border-hover);
        color: var(--color-text-primary);
    }
    :global(.edit-button:hover) {
        border-color: var(--color-text-primary);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }
    :global(.delete-button) {
        background-color: var(--color-danger);
        color: var(--color-text-primary);
        border-color: var(--color-danger);
    }
    :global(.delete-button:hover) {
        background-color: var(--color-danger-hover);
        border-color: var(--color-danger-hover);
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(153, 27, 27, 0.3);
    }
    :global(.action-button:focus-visible) {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
    }

    /* --- Loading Spinner --- */
    .loading-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        gap: 0.75rem;
        color: var(--color-text-secondary);
        font-size: 0.875rem;
    }
    .spinner {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    /* Empty State */
    .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 4rem 2rem;
        border: 2px dashed var(--color-border);
        border-radius: 1rem;
        color: var(--color-text-secondary);
    }
    .empty-state svg {
        margin-bottom: 1.5rem;
    }
    .empty-state-title {
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--color-text-primary);
    }
    .empty-state-subtitle {
        margin-top: 0.25rem;
        max-width: 300px;
    }
</style>
