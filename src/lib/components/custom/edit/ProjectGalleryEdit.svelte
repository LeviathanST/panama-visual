<script lang="ts">
    import {
        projectStore,
        addProject,
        updateProject,
        deleteProject,
    } from "$lib/stores/project";
    import * as Card from "$lib/components/ui/card";
    import * as Input from "$lib/components/ui/input";
    import * as Button from "$lib/components/ui/button";
    import { cn } from "$lib/utils";

    type Project = {
        id: number;
        title: string;
        category: number;
        image: string;
        time?: string;
        youtubeId?: string;
        description?: string;
        type: "image" | "video";
    };

    type Errors = Record<string, string>;

    // Form state
    let title = "";
    let category = 1;
    let image = "";
    let time = "";
    let youtubeId = "";
    let description = "";
    let type: "image" | "video" = "video";
    let editingId: number | null = null;
    let errors: Errors = {};
    let successMessage = "";

    // Filter and search state
    let selectedCategory: number | null = null;
    let selectedType: "image" | "video" | null = null;
    let searchQuery = "";

    // Filtered projects
    $: filteredProjects = $projectStore.filter((project) => {
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

    // Category options for buttons and form
    const categoryOptions = [
        { value: 1, label: "Visuals/VJ" },
        { value: 2, label: "Aftermovie" },
        { value: 3, label: "TVC/Viral" },
        { value: 4, label: "Eclips Studio" },
        { value: 5, label: "Photos" },
        { value: 6, label: "Others" },
    ];

    // Type options for buttons and form
    const typeOptions = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
    ];

    function validateForm(): Errors {
        const newErrors: Errors = {};
        if (!title) newErrors.title = "Title is required";
        if (!category) newErrors.category = "Category is required";
        if (!image) newErrors.image = "Image filename is required";
        if (!type) newErrors.type = "Type is required";
        if (type === "video" && !youtubeId)
            newErrors.youtubeId = "YouTube ID is required for videos";
        return newErrors;
    }

    function handleSubmit() {
        errors = validateForm();
        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        try {
            const projectData: Omit<Project, "id"> = {
                title,
                category,
                image, // Filename only; prefix added in store
                time: time || undefined,
                youtubeId: type === "video" ? youtubeId : undefined,
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
            title = "";
            category = 1;
            image = "";
            time = "";
            youtubeId = "";
            description = "";
            type = "video";
            editingId = null;
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
        image = project.image.replace("/images/xlarge/", ""); // Strip prefix for input
        time = project.time || "";
        youtubeId = project.youtubeId || "";
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
        youtubeId = "";
        description = "";
        type = "video";
        editingId = null;
        errors = {};
        successMessage = "";
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
            youtubeId = "";
            errors.youtubeId = "";
        }
    }
</script>

<Card.Root class="w-full max-w-4xl mx-auto">
    <Card.Header>
        <Card.Title>Manage Projects</Card.Title>
        <Card.Description
            >Add, edit, or delete studio projects.</Card.Description
        >
    </Card.Header>
    <Card.Content>
        {#if successMessage}
            <div class="text-green-500 text-sm mb-4 text-center">
                {successMessage}
            </div>
        {/if}
        {#if errors.general}
            <div class="text-red-500 text-sm mb-4 text-center">
                {errors.general}
            </div>
        {/if}

        <!-- Form and Preview -->
        <div
            class="grid gap-4 mb-6 {editingId
                ? 'md:grid-cols-2'
                : 'md:grid-cols-1'}"
        >
            <!-- Form -->
            <div>
                <form
                    id="project-form"
                    class="grid gap-4"
                    on:submit|preventDefault={handleSubmit}
                >
                    <div class="grid gap-2">
                        <label for="title" class="text-sm font-medium"
                            >Title</label
                        >
                        <Input.Input
                            id="title"
                            name="title"
                            type="text"
                            bind:value={title}
                            placeholder="Enter project title"
                            class={cn(
                                "w-full",
                                errors.title && "border-red-500",
                            )}
                        />
                        {#if errors.title}
                            <p class="text-red-500 text-sm">{errors.title}</p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label for="category" class="text-sm font-medium"
                            >Category</label
                        >
                        <div class="flex flex-wrap gap-2">
                            {#each categoryOptions as option}
                                <Button.Button
                                    onclick={() =>
                                        setFormCategory(option.value)}
                                    variant={category === option.value
                                        ? "default"
                                        : "outline"}
                                    class={cn(
                                        "cursor-pointer",
                                        errors.category && "border-red-500",
                                    )}
                                >
                                    {option.label}
                                </Button.Button>
                            {/each}
                        </div>
                        {#if errors.category}
                            <p class="text-red-500 text-sm">
                                {errors.category}
                            </p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label for="type" class="text-sm font-medium"
                            >Type</label
                        >
                        <div class="flex flex-wrap gap-2">
                            {#each typeOptions as option}
                                <Button.Button
                                    onclick={() => setFormType(option.value)}
                                    variant={type === option.value
                                        ? "default"
                                        : "outline"}
                                    class={cn(
                                        "cursor-pointer",
                                        errors.type && "border-red-500",
                                    )}
                                >
                                    {option.label}
                                </Button.Button>
                            {/each}
                        </div>
                        {#if errors.type}
                            <p class="text-red-500 text-sm">{errors.type}</p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label for="image" class="text-sm font-medium"
                            >Image Filename</label
                        >
                        <Input.Input
                            id="image"
                            name="image"
                            type="text"
                            bind:value={image}
                            placeholder="Enter image filename (e.g., xyz.jpeg)"
                            class={cn(
                                "w-full",
                                errors.image && "border-red-500",
                            )}
                        />
                        {#if errors.image}
                            <p class="text-red-500 text-sm">{errors.image}</p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label for="time" class="text-sm font-medium"
                            >Time (Optional)</label
                        >
                        <Input.Input
                            id="time"
                            name="time"
                            type="text"
                            bind:value={time}
                            placeholder="Enter time (e.g., 15-03-2025)"
                            class="w-full"
                        />
                    </div>
                    <div class="grid gap-2">
                        <label for="youtubeId" class="text-sm font-medium"
                            >YouTube ID {type === "image"
                                ? "(Optional)"
                                : ""}</label
                        >
                        <Input.Input
                            id="youtubeId"
                            name="youtubeId"
                            type="text"
                            bind:value={youtubeId}
                            placeholder="Enter YouTube video ID"
                            class={cn(
                                "w-full",
                                errors.youtubeId && "border-red-500",
                            )}
                            disabled={type === "image"}
                        />
                        {#if errors.youtubeId}
                            <p class="text-red-500 text-sm">
                                {errors.youtubeId}
                            </p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label for="description" class="text-sm font-medium"
                            >Description (Optional)</label
                        >
                        <textarea
                            id="description"
                            name="description"
                            bind:value={description}
                            placeholder="Enter project description"
                            class="w-full min-h-[100px] border rounded-md p-2"
                        />
                    </div>
                    <div class="flex gap-2">
                        <Button.Button
                            type="submit"
                            variant="default"
                            class="cursor-pointer"
                        >
                            {editingId ? "Update" : "Add"} Project
                        </Button.Button>
                        <Button.Button
                            onclick={handleReset}
                            variant="outline"
                            class="cursor-pointer"
                        >
                            Reset
                        </Button.Button>
                    </div>
                </form>
            </div>

            <!-- Preview Section -->
            {#if editingId}
                <Card.Root>
                    <Card.Header>
                        <Card.Title>Preview</Card.Title>
                        <Card.Description
                            >Preview how the project will appear.</Card.Description
                        >
                    </Card.Header>
                    <Card.Content>
                        <div class="p-4">
                            {#if type === "image"}
                                <img
                                    src={`/images/xlarge/${image}`}
                                    alt={title || "Project Image"}
                                    class="w-full h-40 object-cover rounded-md mb-2"
                                />
                            {:else if type === "video" && youtubeId}
                                <iframe
                                    class="w-full h-40 rounded-md mb-2"
                                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowfullscreen
                                    title="YouTube Video Preview"
                                ></iframe>
                            {:else}
                                <div
                                    class="w-full h-40 bg-gray-200 rounded-md mb-2 flex items-center justify-center"
                                >
                                    <span class="text-gray-500"
                                        >No video preview available</span
                                    >
                                </div>
                            {/if}
                            <h3 class="text-lg font-semibold">
                                {title || "Untitled Project"}
                            </h3>
                            <p class="text-sm text-gray-500">
                                {categoryOptions.find(
                                    (opt) => opt.value === category,
                                )?.label || "Unknown Category"}
                            </p>
                            <p class="text-sm">Type: {type}</p>
                            {#if time}
                                <p class="text-sm">Time: {time}</p>
                            {/if}
                            {#if youtubeId && type === "video"}
                                <p class="text-sm">YouTube ID: {youtubeId}</p>
                            {/if}
                            {#if description}
                                <p class="text-sm mt-2">{description}</p>
                            {/if}
                        </div>
                    </Card.Content>
                </Card.Root>
            {/if}
        </div>

        <!-- Filters -->
        <div class="grid gap-4 mb-6 md:grid-cols-3">
            <div class="grid gap-2">
                <label for="category-filter" class="text-sm font-medium"
                    >Filter by Category</label
                >
                <div class="flex flex-wrap gap-2">
                    <Button.Button
                        onclick={() => setCategory(null)}
                        variant={selectedCategory === null
                            ? "default"
                            : "outline"}
                        class="cursor-pointer"
                    >
                        All Categories
                    </Button.Button>
                    {#each categoryOptions as option}
                        <Button.Button
                            onclick={() => setCategory(option.value)}
                            variant={selectedCategory === option.value
                                ? "default"
                                : "outline"}
                            class="cursor-pointer"
                        >
                            {option.label}
                        </Button.Button>
                    {/each}
                </div>
            </div>
            <div class="grid gap-2">
                <label for="type-filter" class="text-sm font-medium"
                    >Filter by Type</label
                >
                <div class="flex flex-wrap gap-2">
                    <Button.Button
                        onclick={() => setType(null)}
                        variant={selectedType === null ? "default" : "outline"}
                        class="cursor-pointer"
                    >
                        All Types
                    </Button.Button>
                    {#each typeOptions as option}
                        <Button.Button
                            onclick={() => setType(option.value)}
                            variant={selectedType === option.value
                                ? "default"
                                : "outline"}
                            class="cursor-pointer"
                        >
                            {option.label}
                        </Button.Button>
                    {/each}
                </div>
            </div>
            <div class="grid gap-2">
                <label for="search" class="text-sm font-medium"
                    >Search by Title</label
                >
                <Input.Input
                    id="search"
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Enter regex or title (e.g., Mapping)"
                    class="w-full"
                />
            </div>
        </div>

        <!-- Projects Grid -->
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each filteredProjects as project}
                <Card.Root class="relative">
                    <Card.Content class="p-4">
                        <img
                            src="images/xlarge/{project.image}"
                            alt={project.title}
                            class="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <h3 class="text-lg font-semibold">{project.title}</h3>
                        <p class="text-sm text-gray-500">
                            {categoryOptions.find(
                                (opt) => opt.value === project.category,
                            )?.label}
                        </p>
                        <p class="text-sm">Type: {project.type}</p>
                        {#if project.time}
                            <p class="text-sm">Time: {project.time}</p>
                        {/if}
                        {#if project.youtubeId}
                            <p class="text-sm">
                                YouTube ID: {project.youtubeId}
                            </p>
                        {/if}
                        {#if project.description}
                            <p class="text-sm mt-2">{project.description}</p>
                        {/if}
                        <div class="flex gap-2 mt-4">
                            <Button.Button
                                onclick={() => handleEdit(project)}
                                variant="outline"
                                class="cursor-pointer"
                            >
                                Edit
                            </Button.Button>
                            <Button.Button
                                onclick={() => handleDelete(project.id)}
                                variant="destructive"
                                class="cursor-pointer"
                            >
                                Delete
                            </Button.Button>
                        </div>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
        {#if filteredProjects.length === 0}
            <p class="text-center text-gray-500 mt-4">No projects found.</p>
        {/if}
    </Card.Content>
</Card.Root>
