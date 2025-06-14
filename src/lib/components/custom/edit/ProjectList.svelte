<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Card, CardContent } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import {
        project2Store,
        deleteProject,
        type Project,
    } from "$lib/stores/project";
    import { cn } from "$lib/utils";

    // Receive the onEdit callback as a prop
    export let onEdit: (project: Project) => void;

    let selectedCategory: number | null = null;
    let searchQuery = "";

    const categoryOptions = [
        { value: 1, label: "Visuals Stage" },
        { value: 2, label: "Interact Dance" },
        { value: 3, label: "Hologram" },
        { value: 4, label: "3D Mapping" },
    ];

    $: filteredProjects = $project2Store.filter((project) => {
        const matchesCategory =
            selectedCategory === null || project.category === selectedCategory;
        let matchesSearch = true;
        if (searchQuery) {
            try {
                const regex = new RegExp(searchQuery, "i");
                matchesSearch = regex.test(project.title);
            } catch (e) {
                matchesSearch = project.title
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());
            }
        }
        return matchesCategory && matchesSearch;
    });

    function setCategory(value: number | null) {
        selectedCategory = value;
    }
</script>

<div class="space-y-6">
    <div class="flex flex-col md:flex-row gap-4 items-start md:items-center">
        <div class="flex flex-wrap gap-2">
            <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                class={cn(
                    "border-[hsl(var(--border))]",
                    selectedCategory === null
                        ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)]"
                        : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.8)]",
                )}
                onclick={() => setCategory(null)}
            >
                All
            </Button>
            {#each categoryOptions as option}
                <Button
                    variant={selectedCategory === option.value
                        ? "default"
                        : "outline"}
                    size="sm"
                    class={cn(
                        "border-[hsl(var(--border))]",
                        selectedCategory === option.value
                            ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary)/0.9)]"
                            : "bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] hover:bg-[hsl(var(--secondary)/0.8)]",
                    )}
                    onclick={() => setCategory(option.value)}
                >
                    {option.label}
                </Button>
            {/each}
        </div>
        <Input
            type="text"
            bind:value={searchQuery}
            placeholder="Search projects..."
            class="max-w-xs bg-[hsl(var(--secondary))] border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder-[hsl(var(--muted-foreground))] focus:ring-[hsl(var(--ring))] focus:border-[hsl(var(--ring))]"
        />
    </div>

    {#if filteredProjects.length > 0}
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {#each filteredProjects as project}
                <Card
                    class="overflow-hidden bg-[hsl(var(--card))] border-[hsl(var(--border))] shadow-lg hover:shadow-xl transition-shadow duration-200"
                >
                    <CardContent class="p-0">
                        {#if project.images && project.images.length > 0}
                            <img
                                src={project.images[0]}
                                alt={project.title}
                                class="w-full h-48 object-cover"
                            />
                        {:else if project.video?.thumbnail}
                            <img
                                src={project.video.thumbnail}
                                alt={project.title + " thumbnail"}
                                class="w-full h-48 object-cover"
                            />
                        {/if}
                        <div class="p-4 space-y-2">
                            <h3
                                class="text-lg font-semibold text-[hsl(var(--card-foreground))] truncate"
                            >
                                {project.title}
                            </h3>
                            <p
                                class="text-sm text-[hsl(var(--muted-foreground))]"
                            >
                                {categoryOptions.find(
                                    (c) => c.value === project.category,
                                )?.label || "Unknown"}
                            </p>
                            <div class="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    class="border-[hsl(var(--border))] text-[hsl(var(--foreground))] bg-[hsl(var(--secondary))] hover:bg-[hsl(var(--secondary)/0.8)]"
                                    onclick={() => {
                                        console.log(
                                            "Editing project:",
                                            project,
                                        );
                                        onEdit(project);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    class="bg-[hsl(var(--destructive))] text-[hsl(var(--destructive-foreground))] hover:bg-[hsl(var(--destructive)/0.9)]"
                                    onclick={() => deleteProject(project.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            {/each}
        </div>
    {:else}
        <p class="text-[hsl(var(--muted-foreground))]">No projects found.</p>
    {/if}
</div>
