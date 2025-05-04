<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from "$lib/components/ui/card";
    import { Input } from "$lib/components/ui/input";
    import { Textarea } from "$lib/components/ui/textarea";
    import { Badge } from "$lib/components/ui/badge";
    import { Alert, AlertDescription } from "$lib/components/ui/alert";
    import { cn } from "$lib/utils";
    import {
        projectStore,
        addProject,
        updateProject,
        deleteProject,
    } from "$lib/stores/project";
    import { fade } from "svelte/transition";
    import { get } from "svelte/store";
    import { onMount } from "svelte";

    type Project = {
        id: number;
        title: string;
        category: number;
        image: string;
        time?: string;
        video_link?: string;
        description?: string;
        type: "image" | "video";
    };

    type Errors = Record<string, string>;

    // Form state
    let title = "";
    let category = 1;
    let image = "";
    let time = "";
    let video_link = "";
    let description = "";
    let type: "image" | "video" = "video";
    let editingId: number | null = null;
    let errors: Errors = {};
    let successMessage = "";

    // Filter and search state
    let selectedCategory: number | null = null;
    let selectedType: "image" | "video" | null = null;
    let searchQuery = "";

    // Category options for buttons and form
    const categoryOptions = [
        { value: 1, label: "Visuals Stage" },
        { value: 2, label: "Interact Dance" },
        { value: 3, label: "Hologram" },
        { value: 4, label: "3D Mapping" },
    ];

    // Type options for buttons and form
    const typeOptions = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
    ];

    // Filtered projects
    $: filteredProjects = get(projectStore).filter((project) => {
        const matchesCategory =
            selectedCategory === null || project.category === selectedCategory;
        const matchesType =
            selectedType === null || project.type === selectedType;
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
        return matchesCategory && matchesType && matchesSearch;
    });

    function validateForm(): Errors {
        const newErrors: Errors = {};
        if (!title) newErrors.title = "Title is required";
        if (!category) newErrors.category = "Category is required";
        if (!image) newErrors.image = "Image filename is required";
        if (!type) newErrors.type = "Type is required";
        if (type === "video" && !video_link)
            newErrors.video_link = "Video URL is required for videos";
        return newErrors;
    }

    function handleSubmit() {
        errors = validateForm();
        if (Object.keys(errors).length > 0) return;

        try {
            const projectData: Omit<Project, "id"> = {
                title,
                category,
                image, // Filename only; prefix added in store
                time: time || undefined,
                video_link: type === "video" ? video_link : undefined,
                description: description || undefined,
                type,
            };

            if (editingId) {
                updateProject(editingId, projectData);
                successMessage = "Project updated successfully!";
            } else {
                addProject(projectData);
                successMessage = "Project added successfully!";
            }

            // Reset form
            handleReset();
            setTimeout(() => (successMessage = ""), 3000);
        } catch (error) {
            console.error("Error:", error);
            errors.general = "Failed to save project. Please try again.";
        }
    }

    function handleEdit(project: Project) {
        editingId = project.id;
        title = project.title;
        category = project.category;
        image = project.image.replace("images/xlarge/", "");
        time = project.time || "";
        video_link = project.video_link || "";
        description = project.description || "";
        type = project.type;
    }

    function handleDelete(id: number) {
        if (confirm("Are you sure you want to delete this project?")) {
            deleteProject(id);
            successMessage = "Project deleted successfully!";
            setTimeout(() => (successMessage = ""), 3000);
        }
    }

    function handleReset() {
        title = "";
        category = 1;
        image = "";
        time = "";
        video_link = "";
        description = "";
        type = "video";
        editingId = null;
        errors = {};
    }

    function setCategory(value: number | null) {
        selectedCategory = value;
    }

    function setFormCategory(value: number) {
        category = value;
        errors.category = "";
    }

    function setType(value: "image" | "video" | null) {
        selectedType = value;
    }

    function setFormType(value: "image" | "video") {
        type = value;
        errors.type = "";
        if (value === "image") {
            video_link = "";
            errors.youtubeId = "";
        }
    }
    let edit: HTMLElement | null;
    onMount(() => {
        edit = document.getElementById("edit-area");
    });
    const scrollToEdit = () => {
        edit?.scrollIntoView({ behavior: "smooth" });
    };
</script>

<div class="container mx-auto py-8 px-4">
    <Card class="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader>
            <CardTitle class="text-2xl font-bold">Project Manager</CardTitle>
            <CardDescription
                >Add, edit, or delete studio projects</CardDescription
            >
        </CardHeader>

        <CardContent id="edit-area" class="space-y-8">
            {#if successMessage}
                <div transition:fade>
                    <Alert variant="success" class="mb-6">
                        <AlertDescription>{successMessage}</AlertDescription>
                    </Alert>
                </div>
            {/if}

            {#if errors.general}
                <div transition:fade>
                    <Alert variant="destructive" class="mb-6">
                        <AlertDescription>{errors.general}</AlertDescription>
                    </Alert>
                </div>
            {/if}

            <!-- Form and Preview -->
            <div
                class="grid gap-6 {title || image || video_link
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-1'}"
            >
                <!-- Form -->
                <div class="space-y-4">
                    <form
                        on:submit|preventDefault={handleSubmit}
                        class="space-y-4"
                    >
                        <div class="space-y-2">
                            <label for="title" class="text-sm font-medium"
                                >Title</label
                            >
                            <Input
                                id="title"
                                type="text"
                                bind:value={title}
                                placeholder="Enter project title"
                                class={cn(errors.title && "border-destructive")}
                            />
                            {#if errors.title}
                                <p class="text-destructive text-xs">
                                    {errors.title}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Category</label>
                            <div class="flex flex-wrap gap-2">
                                {#each categoryOptions as option}
                                    <Button
                                        type="button"
                                        variant={category === option.value
                                            ? "default"
                                            : "outline"}
                                        size="sm"
                                        onclick={() =>
                                            setFormCategory(option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                {/each}
                            </div>
                            {#if errors.category}
                                <p class="text-destructive text-xs">
                                    {errors.category}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label class="text-sm font-medium">Type</label>
                            <div class="flex gap-2">
                                {#each typeOptions as option}
                                    <Button
                                        type="button"
                                        variant={type === option.value
                                            ? "default"
                                            : "outline"}
                                        size="sm"
                                        onclick={() =>
                                            setFormType(option.value)}
                                    >
                                        {option.label}
                                    </Button>
                                {/each}
                            </div>
                            {#if errors.type}
                                <p class="text-destructive text-xs">
                                    {errors.type}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="image" class="text-sm font-medium"
                                >Image Filename</label
                            >
                            <Input
                                id="image"
                                type="text"
                                bind:value={image}
                                placeholder="Enter image filename (e.g., xyz.jpeg)"
                                class={cn(errors.image && "border-destructive")}
                            />
                            {#if errors.image}
                                <p class="text-destructive text-xs">
                                    {errors.image}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="time" class="text-sm font-medium"
                                >Time (Optional)</label
                            >
                            <Input
                                id="time"
                                type="text"
                                bind:value={time}
                                placeholder="Enter time (e.g., 15-03-2025)"
                            />
                        </div>

                        <div class="space-y-2">
                            <label for="youtubeId" class="text-sm font-medium">
                                Video URL {type === "image" ? "(Optional)" : ""}
                            </label>
                            <Input
                                id="youtubeId"
                                type="text"
                                bind:value={video_link}
                                placeholder="Enter video URL"
                                class={cn(
                                    errors.youtubeId && "border-destructive",
                                )}
                                disabled={type === "image"}
                            />
                            {#if errors.youtubeId}
                                <p class="text-destructive text-xs">
                                    {errors.youtubeId}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label for="description" class="text-sm font-medium"
                                >Description (Optional)</label
                            >
                            <Textarea
                                id="description"
                                bind:value={description}
                                placeholder="Enter project description"
                                rows={4}
                            />
                        </div>

                        <div class="flex gap-3 pt-2">
                            <Button type="submit"
                                >{editingId ? "Update" : "Add"} Project</Button
                            >
                            <Button
                                type="button"
                                variant="outline"
                                onclick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>

                <!-- Preview -->
                {#if title || image || video_link}
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div class="space-y-4">
                                {#if type === "image" && image}
                                    <div
                                        class="aspect-video bg-muted rounded-md overflow-hidden"
                                    >
                                        <img
                                            src={`images/xlarge/${image}`}
                                            alt={title || "Project Image"}
                                            class="w-full h-full object-cover"
                                        />
                                    </div>
                                {:else if type === "video" && video_link}
                                    <div
                                        class="aspect-video bg-muted rounded-md overflow-hidden"
                                    >
                                        <video
                                            class="aspect-video w-full h-auto rounded-lg"
                                            src={video_link}
                                            controls
                                            autoplay
                                        ></video>
                                    </div>
                                {:else}
                                    <div
                                        class="aspect-video bg-muted rounded-md flex items-center justify-center"
                                    >
                                        <span class="text-muted-foreground"
                                            >No preview available</span
                                        >
                                    </div>
                                {/if}

                                <div>
                                    <h3 class="text-lg font-semibold">
                                        {title || "Untitled Project"}
                                    </h3>

                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <Badge variant="outline">
                                            {categoryOptions.find(
                                                (opt) => opt.value === category,
                                            )?.label || "Category"}
                                        </Badge>
                                        <Badge variant="outline">{type}</Badge>
                                        {#if time}
                                            <Badge variant="outline"
                                                >{time}</Badge
                                            >
                                        {/if}
                                    </div>

                                    {#if description}
                                        <p
                                            class="text-sm text-muted-foreground mt-4"
                                        >
                                            {description}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                {/if}
            </div>

            <!-- Filters -->
            <div class="grid gap-6 md:grid-cols-3">
                <div class="space-y-2">
                    <h3 class="text-sm font-medium">Category</h3>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant={selectedCategory === null
                                ? "default"
                                : "outline"}
                            size="sm"
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
                                onclick={() => setCategory(option.value)}
                            >
                                {option.label}
                            </Button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-2">
                    <h3 class="text-sm font-medium">Type</h3>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant={selectedType === null
                                ? "default"
                                : "outline"}
                            size="sm"
                            onclick={() => setType(null)}
                        >
                            All
                        </Button>
                        {#each typeOptions as option}
                            <Button
                                variant={selectedType === option.value
                                    ? "default"
                                    : "outline"}
                                size="sm"
                                onclick={() => setType(option.value)}
                            >
                                {option.label}
                            </Button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-2">
                    <h3 class="text-sm font-medium">Search</h3>
                    <Input
                        type="text"
                        placeholder="Search by title..."
                        bind:value={searchQuery}
                    />
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {#each filteredProjects as project (project.id)}
                    <Card class="overflow-hidden h-full flex flex-col">
                        <div class="relative aspect-video">
                            <img
                                src="images/xlarge/{project.image}"
                                alt={project.title}
                                class="w-full h-full object-cover"
                            />
                            <Badge class="absolute top-2 right-2"
                                >{project.type}</Badge
                            >
                        </div>

                        <CardContent class="p-4 flex-1 flex flex-col">
                            <h3 class="text-lg font-semibold line-clamp-1">
                                {project.title}
                            </h3>

                            <div class="mt-1 mb-2">
                                <Badge variant="outline">
                                    {categoryOptions.find(
                                        (opt) => opt.value === project.category,
                                    )?.label}
                                </Badge>
                                {#if project.time}
                                    <span
                                        class="text-xs text-muted-foreground ml-2"
                                        >{project.time}</span
                                    >
                                {/if}
                            </div>

                            {#if project.description}
                                <p
                                    class="text-sm text-muted-foreground line-clamp-2 mb-4"
                                >
                                    {project.description}
                                </p>
                            {/if}

                            <div class="flex gap-2 mt-auto">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    class="flex-1"
                                    onclick={() => {
                                        scrollToEdit();
                                        handleEdit(project);
                                    }}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    class="flex-1"
                                    onclick={() => handleDelete(project.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                {/each}

                {#if filteredProjects.length === 0}
                    <div class="col-span-full py-12 text-center">
                        <p class="text-muted-foreground">
                            No projects found matching your criteria.
                        </p>
                        <Button
                            variant="outline"
                            class="mt-4"
                            onclick={() => {
                                selectedCategory = null;
                                selectedType = null;
                                searchQuery = "";
                            }}
                        >
                            Clear filters
                        </Button>
                    </div>
                {/if}
            </div>
        </CardContent>
    </Card>
</div>
