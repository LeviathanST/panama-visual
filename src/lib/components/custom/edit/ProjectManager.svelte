<script lang="ts">
    import ProjectList from "./ProjectList.svelte";
    import AddProjectForm from "./AddProjectForm.svelte";
    import EditProjectForm from "./EditProjectForm.svelte";
    import type { Project } from "$lib/stores/project";
    import { fade, fly } from "svelte/transition";
    import * as Button from "$lib/components/ui/button/index";

    // --- STATE MANAGEMENT (Svelte 5 Runes) ---
    let { projects = [] }: { projects: Project[] } = $props();

    // Use $state for reactive variables
    let projectToEdit = $state<Project | null>(null);
    let showAddForm = $state(false);

    // --- EVENT HANDLERS ---
    function handleEdit(project: Project) {
        projectToEdit = { ...project }; // Create a new reference to trigger updates
        showAddForm = false;
    }

    function handleShowAddForm() {
        projectToEdit = null;
        showAddForm = true;
    }

    function handleResetForms() {
        projectToEdit = null;
        showAddForm = false;
    }
</script>

<div class="page-container">
    <!-- Page Header: Title and Primary Action -->
    <div class="page-header">
        <div>
            <h2 class="page-title">Project Manager</h2>
            <p class="page-subtitle">
                {#if showAddForm}
                    Fill in the details for the new project.
                {:else if projectToEdit}
                    Editing project: <span class="font-bold text-primary"
                        >{projectToEdit.title}</span
                    >
                {:else}
                    Add, edit, or delete studio projects.
                {/if}
            </p>
        </div>

        <!-- Show "Add" button only when viewing the list -->
        {#if !showAddForm && !projectToEdit}
            <Button.Button
                onclick={handleShowAddForm}
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
                <span>Add New Project</span>
            </Button.Button>
        {/if}
    </div>

    <!-- Main Content: Switches between List, Edit Form, and Add Form -->
    <div class="content-area">
        {#if showAddForm}
            <div in:fly={{ y: 20, duration: 300 }} out:fade={{ duration: 200 }}>
                <AddProjectForm onReset={handleResetForms} />
            </div>
        {:else if projectToEdit}
            <div in:fly={{ y: 20, duration: 300 }} out:fade={{ duration: 200 }}>
                <EditProjectForm
                    project={projectToEdit}
                    onReset={handleResetForms}
                />
            </div>
        {:else}
            <div in:fade={{ duration: 300 }}>
                <ProjectList onEdit={handleEdit} {projects} />
            </div>
        {/if}
    </div>
</div>

<style>
    :root {
        --color-bg: #0a0a0a;
        --color-bg-surface: #1a1a1a;
        --color-border: #2a2a2a;
        --color-text-primary: #f0f0f0;
        --color-text-secondary: #a3a3a3;
        --color-primary: #06b6d4; /* Cyan */
        --color-primary-hover: #0891b2;
    }

    .page-container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    .page-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 2rem;
        padding-bottom: 1.5rem;
        border-bottom: 1px solid var(--color-border);
    }

    .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-text-primary);
        margin-bottom: 0.25rem;
    }

    .page-subtitle {
        font-size: 1rem;
        color: var(--color-text-secondary);
    }
    .text-primary {
        color: var(--color-primary);
    }
    .font-bold {
        font-weight: 600;
    }

    .content-area {
        border-radius: 1rem;
        padding: 2rem;
        min-height: 500px;
    }

    /* --- Buttons --- */
    .submit-button {
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
</style>
