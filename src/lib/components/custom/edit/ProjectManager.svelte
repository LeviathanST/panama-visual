<script lang="ts">
    import ProjectList from "./ProjectList.svelte";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/ui/card";
    import { writable } from "svelte/store";
    import AddProjectForm from "./AddProjectForm.svelte";
    import EditProjectForm from "./EditProjectForm.svelte";
    import type { Project } from "$lib/stores/project";
    let { projects = [] } = $props();
    let showAddForm = $state(false);

    const projectToEdit = writable<Project | null>(null);
    console.log($projectToEdit);
    function handleEdit(project: Project) {
        $projectToEdit = { ...project }; // New reference
        console.log("Editing project:", $projectToEdit);
        showAddForm = false;
        document
            .getElementById("edit-form")
            ?.scrollIntoView({ behavior: "smooth" });
    }

    function toggleAddForm() {
        showAddForm = !showAddForm;
        $projectToEdit = null;
        document
            .getElementById("add-form")
            ?.scrollIntoView({ behavior: "smooth" });
    }

    // Function to handle reset
    function handleReset() {
        $projectToEdit = null;
    }

    // Function to start adding a new project
    function handleAdd() {
        $projectToEdit = null;
        document
            .getElementById("edit-form")
            ?.scrollIntoView({ behavior: "smooth" });
    }
</script>

<div class="container mx-auto py-8 px-4">
    <Card class="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader>
            <CardTitle class="text-2xl font-bold">Project Manager</CardTitle>
            <CardDescription class="text-muted-foreground">
                Add, edit, or delete studio projects
            </CardDescription>
            <button
                on:click={toggleAddForm}
                class="mb-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                {showAddForm ? "Hide Add Form" : "Show Add Form"}
            </button>
        </CardHeader>

        <CardContent class="space-y-8">
            {#if showAddForm}
                <AddProjectForm onReset={() => (showAddForm = false)} />
            {/if}

            {#if $projectToEdit}
                <EditProjectForm
                    project={$projectToEdit}
                    onReset={() => ($projectToEdit = null)}
                />
            {/if}
            <ProjectList onEdit={handleEdit} {projects} />
        </CardContent>
    </Card>
</div>
