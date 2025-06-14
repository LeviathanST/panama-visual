<script lang="ts">
    import ProjectList from "./ProjectList.svelte";
    import ProjectEdit from "./ProjectEdit.svelte";
    import {
        Card,
        CardHeader,
        CardTitle,
        CardDescription,
        CardContent,
    } from "$lib/components/ui/card";
    import type { Project } from "$lib/stores/project2";

    let projectToEdit: Project | null = null;

    // Function to handle the edit action
    function handleEdit(project: Project) {
        projectToEdit = project;
        document
            .getElementById("edit-form")
            ?.scrollIntoView({ behavior: "smooth" });
    }

    // Function to handle reset
    function handleReset() {
        projectToEdit = null;
    }

    // Function to start adding a new project
    function handleAdd() {
        projectToEdit = null;
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
                on:click={handleAdd}
                class="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Add New Project
            </button>
        </CardHeader>
        <CardContent class="space-y-8">
            <ProjectEdit project={projectToEdit} onReset={handleReset} />
            <ProjectList onEdit={handleEdit} />
        </CardContent>
    </Card>
</div>
