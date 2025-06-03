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
        project2Store,
        addProject,
        updateProject,
        deleteProject,
        type Project,
    } from "$lib/stores/project";
    import { fade } from "svelte/transition";
    import { get } from "svelte/store";
    import { onMount, onDestroy } from "svelte";

    type Errors = Record<string, string>;

    // Form state
    let title = "";
    let category = 1;
    let files: FileList | null = null;
    let uploadedImageUrls: string[] = [];
    let fileInput: HTMLInputElement | null = null;
    let selectedFileNames: string[] = [];
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

    // Preview gallery state
    let currentImageIndex = 0;
    let galleryScrollContainer: HTMLElement | null;

    // Category options
    const categoryOptions = [
        { value: 1, label: "Visuals Stage" },
        { value: 2, label: "Interact Dance" },
        { value: 3, label: "Hologram" },
        { value: 4, label: "3D Mapping" },
    ];

    // Type options
    const typeOptions = [
        { value: "image", label: "Image" },
        { value: "video", label: "Video" },
    ];

    // Filtered projects
    $: filteredProjects = get(project2Store).filter((project) => {
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

    // Preview images
    $: previewImages = files
        ? Array.from(files).map((file) => URL.createObjectURL(file))
        : uploadedImageUrls;

    async function handleFileUpload() {
        if (!files || files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("images", file);
        });

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            if (!response.ok) throw new Error("Upload failed");
            const data = await response.json();
            uploadedImageUrls = data.urls || [];
            selectedFileNames = [];
            files = null;
            errors.files = "";
        } catch (error) {
            console.error("Upload error:", error);
            errors.files = "Failed to upload images. Please try again.";
            uploadedImageUrls = [];
        }
    }

    function handleFileChange() {
        if (files && files.length > 0) {
            selectedFileNames = Array.from(files).map((file) => file.name);
        } else {
            selectedFileNames = [];
        }
    }

    function removeFile(index: number) {
        if (!files) return;
        const newFiles = Array.from(files).filter((_, i) => i !== index);
        selectedFileNames = selectedFileNames.filter((_, i) => i !== index);
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        files = dataTransfer.files;
        if (files.length === 0) files = null;
    }

    function triggerFileInput() {
        fileInput?.click();
    }

    function validateForm(): Errors {
        const newErrors: Errors = {};
        if (!title) newErrors.title = "Title is required";
        if (!category) newErrors.category = "Category is required";
        if (type === "image" && !editingId && (!files || files.length === 0)) {
            newErrors.files = "At least one image file is required";
        }
        if (
            type === "image" &&
            editingId &&
            uploadedImageUrls.length === 0 &&
            (!files || files.length === 0)
        ) {
            newErrors.files = "At least one image is required";
        }
        if (!type) newErrors.type = "Type is required";
        if (type === "video" && !video_link)
            newErrors.video_link = "Video URL is required";
        return newErrors;
    }

    async function handleSubmit() {
        errors = validateForm();
        if (Object.keys(errors).length > 0) return;

        try {
            if (files && files.length > 0) {
                await handleFileUpload();
            }

            if (
                type === "image" &&
                !editingId &&
                uploadedImageUrls.length === 0
            ) {
                errors.files = "No images uploaded";
                return;
            }

            const projectData: Omit<Project, "id"> = {
                title,
                category,
                images: type === "image" ? uploadedImageUrls : null,
                time: time || undefined,
                video:
                    type === "video"
                        ? { url: video_link, thumbnail: "thumbnail.jpg" } // Placeholder
                        : undefined,
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
        title = project.title || "";
        category = project.category;
        uploadedImageUrls = project.images || [];
        selectedFileNames =
            project.images?.map((url) => url.split("/").pop() || "") || [];
        files = null;
        time = project.time || "";
        video_link = project.video?.url || "";
        description = project.description || "";
        type = project.type;
        currentImageIndex = 0; // Reset image index
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
        files = null;
        uploadedImageUrls = [];
        selectedFileNames = [];
        time = "";
        video_link = "";
        description = "";
        type = "video";
        editingId = null;
        errors = {};
        currentImageIndex = 0;
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
            errors.video_link = "";
        }
    }

    function updateCurrentImageIndex() {
        if (!galleryScrollContainer || !previewImages) return;
        const isMobile = window.innerWidth <= 767;
        if (isMobile) {
            const containerRect =
                galleryScrollContainer.getBoundingClientRect();
            let closestIndex = 0;
            let minDistance = Infinity;
            Array.from(galleryScrollContainer.children).forEach(
                (child, index) => {
                    const childRect = child.getBoundingClientRect();
                    const distance = Math.abs(
                        childRect.top - containerRect.top,
                    );
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestIndex = index;
                    }
                },
            );
            currentImageIndex = Math.max(
                0,
                Math.min(closestIndex, previewImages.length - 1),
            );
        } else {
            const scrollLeft = galleryScrollContainer.scrollLeft;
            const containerWidth = galleryScrollContainer.clientWidth;
            const newIndex = Math.round(scrollLeft / containerWidth);
            currentImageIndex = Math.max(
                0,
                Math.min(newIndex, previewImages.length - 1),
            );
        }
    }

    function scrollToImage(index: number) {
        if (!galleryScrollContainer || !previewImages) return;
        const isMobile = window.innerWidth <= 767;
        if (isMobile) {
            const targetChild = galleryScrollContainer.children[
                index
            ] as HTMLElement;
            if (targetChild) {
                galleryScrollContainer.scrollTo({
                    top: targetChild.offsetTop,
                    behavior: "smooth",
                });
            }
        } else {
            galleryScrollContainer.scrollTo({
                left: index * galleryScrollContainer.clientWidth,
                behavior: "smooth",
            });
        }
    }

    function debounce(fn: () => void, ms: number) {
        let timeoutId: number | null = null;
        return () => {
            if (timeoutId !== null) {
                clearTimeout(timeoutId);
            }
            timeoutId = setTimeout(() => {
                fn();
                timeoutId = null;
            }, ms);
        };
    }

    const debouncedUpdateIndex = debounce(updateCurrentImageIndex, 100);

    $: if (previewImages && previewImages.length > 1) {
        setTimeout(() => {
            galleryScrollContainer = document.querySelector(
                ".preview-gallery-scroll",
            );
            if (galleryScrollContainer) {
                galleryScrollContainer.addEventListener(
                    "scroll",
                    debouncedUpdateIndex,
                );
            }
        }, 0);
    } else if (galleryScrollContainer) {
        galleryScrollContainer.removeEventListener(
            "scroll",
            debouncedUpdateIndex,
        );
        galleryScrollContainer = null;
    }

    let edit: HTMLElement | null;
    onMount(() => {
        edit = document.getElementById("edit-area");
        return () => {
            if (galleryScrollContainer) {
                galleryScrollContainer.removeEventListener(
                    "scroll",
                    debouncedUpdateIndex,
                );
            }
        };
    });
    const scrollToEdit = () => {
        edit?.scrollIntoView({ behavior: "smooth" });
    };
</script>

<div class="container mx-auto py-8 px-4">
    <Card class="w-full max-w-5xl mx-auto shadow-lg">
        <CardHeader>
            <CardTitle class="text-2xl font-bold">Project Manager</CardTitle>
            <CardDescription class="text-muted-foreground"
                >Add, edit, or delete studio projects</CardDescription
            >
        </CardHeader>

        <CardContent id="edit-area" class="space-y-8">
            {#if successMessage}
                <div transition:fade>
                    <Alert class="mb-6 bg-green-900/50 border-green-700">
                        <AlertDescription class="text-green-300"
                            >{successMessage}</AlertDescription
                        >
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
                class="grid gap-6 {title ||
                files ||
                uploadedImageUrls.length ||
                video_link
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
                            <label
                                for="title"
                                class="text-sm font-medium text-muted-foreground"
                                >Title</label
                            >
                            <Input
                                id="title"
                                type="text"
                                bind:value={title}
                                placeholder="Enter project title"
                                class={cn(
                                    "bg-secondary border-input text-foreground",
                                    errors.title && "border-destructive",
                                )}
                            />
                            {#if errors.title}
                                <p class="text-destructive text-xs">
                                    {errors.title}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium text-muted-foreground"
                                >Category</label
                            >
                            <div class="flex flex-wrap gap-2">
                                {#each categoryOptions as option}
                                    <Button
                                        type="button"
                                        variant={category === option.value
                                            ? "default"
                                            : "outline"}
                                        size="sm"
                                        class={cn(
                                            "border-input",
                                            category === option.value
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                        )}
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
                            <label
                                class="text-sm font-medium text-muted-foreground"
                                >Type</label
                            >
                            <div class="flex gap-2">
                                {#each typeOptions as option}
                                    <Button
                                        type="button"
                                        variant={type === option.value
                                            ? "default"
                                            : "outline"}
                                        size="sm"
                                        class={cn(
                                            "border-input",
                                            type === option.value
                                                ? "bg-primary text-primary-foreground"
                                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                        )}
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
                            <label
                                for="files"
                                class="text-sm font-medium text-muted-foreground"
                                >Upload Images</label
                            >
                            <div class="flex flex-col gap-3">
                                <Button
                                    type="button"
                                    class="bg-[var(--general-color)] hover:bg-[var(--general-color)]/80 text-black w-fit px-4 py-2 rounded-md transition-colors"
                                    onclick={triggerFileInput}
                                >
                                    Upload Images
                                </Button>
                                <input
                                    id="files"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    bind:files
                                    bind:this={fileInput}
                                    on:change={handleFileChange}
                                    class="hidden"
                                />
                                {#if selectedFileNames.length > 0}
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedFileNames as fileName, index}
                                            <Badge
                                                class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 border-input"
                                            >
                                                <span
                                                    class="truncate max-w-[150px]"
                                                    >{fileName}</span
                                                >
                                                <button
                                                    type="button"
                                                    class="text-destructive hover:text-destructive/80 text-sm"
                                                    on:click={() =>
                                                        removeFile(index)}
                                                >
                                                    ✕
                                                </button>
                                            </Badge>
                                        {/each}
                                    </div>
                                {/if}
                                {#if errors.files}
                                    <p class="text-destructive text-xs">
                                        {errors.files}
                                    </p>
                                {/if}
                                {#if uploadedImageUrls.length > 0}
                                    <p class="text-muted-foreground text-sm">
                                        {uploadedImageUrls.length} image(s) uploaded
                                    </p>
                                {/if}
                                {#if editingId && uploadedImageUrls.length > 0}
                                    <div class="flex flex-wrap gap-2">
                                        {#each uploadedImageUrls as url}
                                            <Badge
                                                class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full truncate max-w-[200px] border-input"
                                            >
                                                {url.split("/").pop() || url}
                                            </Badge>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label
                                for="time"
                                class="text-sm font-medium text-muted-foreground"
                                >Time (Optional)</label
                            >
                            <Input
                                id="time"
                                type="text"
                                bind:value={time}
                                placeholder="Enter time (e.g., 15-03-2025)"
                                class="bg-secondary border-input text-foreground"
                            />
                        </div>

                        <div class="space-y-2">
                            <label
                                for="video_link"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Video URL {type === "image" ? "(Optional)" : ""}
                            </label>
                            <Input
                                id="video_link"
                                type="text"
                                bind:value={video_link}
                                placeholder="Enter video URL"
                                class={cn(
                                    "bg-secondary border-input text-foreground",
                                    errors.video_link && "border-destructive",
                                )}
                                disabled={type === "image"}
                            />
                            {#if errors.video_link}
                                <p class="text-destructive text-xs">
                                    {errors.video_link}
                                </p>
                            {/if}
                        </div>

                        <div class="space-y-2">
                            <label
                                for="description"
                                class="text-sm font-medium text-muted-foreground"
                                >Description (Optional)</label
                            >
                            <Textarea
                                id="description"
                                bind:value={description}
                                placeholder="Enter project description"
                                rows={4}
                                class="bg-secondary border-input text-foreground"
                            />
                        </div>

                        <div class="flex gap-3 pt-2">
                            <Button
                                type="submit"
                                class="bg-primary text-primary-foreground hover:bg-primary/80"
                            >
                                {editingId ? "Update" : "Add"} Project
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                class="border-input text-foreground hover:bg-secondary/80"
                                onclick={handleReset}
                            >
                                Reset
                            </Button>
                        </div>
                    </form>
                </div>

                <!-- Preview -->
                {#if title || files || uploadedImageUrls.length || video_link}
                    <Card>
                        <CardHeader>
                            <CardTitle class="text-xl font-semibold"
                                >Preview</CardTitle
                            >
                        </CardHeader>
                        <CardContent class="p-4">
                            <div class="space-y-4">
                                {#if type === "image" && previewImages.length > 0}
                                    <div
                                        class="relative w-full max-h-[368px] sm:max-h-[500px]"
                                    >
                                        <div
                                            class="preview-gallery-scroll overflow-y-auto sm:overflow-x-auto sm:flex scroll-smooth sm:snap-x sm:snap-mandatory h-full w-full"
                                            bind:this={galleryScrollContainer}
                                        >
                                            {#each previewImages as image, index}
                                                <div
                                                    class="w-full sm:flex-shrink-0 sm:h-full flex items-center justify-center mb-4 sm:mb-0 last:mb-0 sm:snap-center"
                                                >
                                                    <img
                                                        src={image}
                                                        alt="Preview Image {index +
                                                            1}"
                                                        class="w-full max-h-[368px] sm:max-h-[500px] object-contain rounded-lg"
                                                    />
                                                </div>
                                            {/each}
                                        </div>
                                        {#if previewImages.length > 1}
                                            <div
                                                class="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-background/60 text-foreground px-3 py-1 rounded text-sm font-medium"
                                            >
                                                {currentImageIndex + 1} / {previewImages.length}
                                            </div>
                                            <!-- Navigation Arrows (Desktop Only) -->
                                            <button
                                                class="hidden cursor-pointer sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-background/60 text-foreground rounded-full w-10 h-10 items-center justify-center hover:bg-secondary/80 transition-colors"
                                                on:click={() =>
                                                    scrollToImage(
                                                        currentImageIndex - 1,
                                                    )}
                                                disabled={currentImageIndex ===
                                                    0}
                                                aria-label="Previous image"
                                            >
                                                <svg
                                                    class="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M15 19l-7-7 7-7"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-background/60 text-foreground rounded-full w-10 h-10 items-center justify-center hover:bg-background/80 transition-colors"
                                                on:click|stopPropagation={() =>
                                                    scrollToImage(
                                                        currentImageIndex + 1,
                                                    )}
                                                disabled={previewImages.length ===
                                                    0 ||
                                                    currentImageIndex ===
                                                        previewImages.length -
                                                            1}
                                                aria-label="Next image"
                                            >
                                                <svg
                                                    class="w-6 h-6"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M9 5l7 7-7 7"
                                                    />
                                                </svg>
                                            </button>
                                        {/if}
                                    </div>
                                {:else if type === "video" && video_link}
                                    <div class="space-y-4">
                                        <!-- Thumbnail -->
                                        <div
                                            class="relative aspect-video w-full bg-muted rounded-lg overflow-hidden"
                                        >
                                            {#if video_link && editingId && get(project2Store).find((p) => p.id === editingId)?.video?.thumbnail}
                                                <img
                                                    src={get(
                                                        project2Store,
                                                    ).find(
                                                        (p) =>
                                                            p.id === editingId,
                                                    )?.video?.thumbnail}
                                                    alt="Video thumbnail"
                                                    class="w-full h-full object-cover"
                                                />
                                            {:else}
                                                <div
                                                    class="flex items-center justify-center h-full"
                                                >
                                                    <span
                                                        class="text-muted-foreground"
                                                        >No thumbnail available</span
                                                    >
                                                </div>
                                            {/if}
                                        </div>
                                        <!-- Video -->
                                        <div
                                            class="aspect-video w-full bg-muted rounded-lg overflow-hidden"
                                        >
                                            <video
                                                class="w-full h-full rounded-lg"
                                                src={video_link}
                                                controls
                                            >
                                                <track kind="captions" />
                                            </video>
                                        </div>
                                    </div>
                                {:else}
                                    <div
                                        class="aspect-video bg-muted rounded-lg flex items-center justify-center"
                                    >
                                        <span class="text-muted-foreground"
                                            >No preview available</span
                                        >
                                    </div>
                                {/if}

                                <div>
                                    <h3 class="text-lg font-semibold">
                                        {title || "No title"}
                                    </h3>

                                    <div class="flex flex-wrap gap-2 mt-2">
                                        <Badge
                                            variant="border-input text-foreground"
                                        >
                                            {categoryOptions.find(
                                                (opt) => opt.value === category,
                                            )?.label || "Category"}
                                        </Badge>
                                        <Badge
                                            class="border-input text-foreground"
                                            >{type}</Badge
                                        >
                                        {#if time}
                                            <Badge
                                                class="border-input text-foreground"
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
                    <h3 class="text-sm font-medium text-muted-foreground">
                        Category
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant={selectedCategory === null
                                ? "default"
                                : "outline"}
                            size="sm"
                            class={cn(
                                "border-input",
                                selectedCategory === null
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
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
                                    "border-input",
                                    selectedCategory === option.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                )}
                                onclick={() => setCategory(option.value)}
                            >
                                {option.label}
                            </Button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-2">
                    <h3 class="text-sm font-medium text-muted-foreground">
                        Type
                    </h3>
                    <div class="flex flex-wrap gap-2">
                        <Button
                            variant={selectedType === null
                                ? "default"
                                : "outline"}
                            size="sm"
                            class={cn(
                                "border-input",
                                selectedType === null
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                            )}
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
                                class={cn(
                                    "border-input",
                                    selectedType === option.value
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
                                )}
                                onclick={() => setType(option.value)}
                            >
                                {option.label}
                            </Button>
                        {/each}
                    </div>
                </div>

                <div class="space-y-2">
                    <h3 class="text-sm font-medium text-muted-foreground">
                        Search
                    </h3>
                    <Input
                        type="text"
                        placeholder="Search by title..."
                        bind:value={searchQuery}
                        class="bg-secondary border-input text-foreground"
                    />
                </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {#each filteredProjects as project (project.id)}
                    <Card class="overflow-hidden h-full flex flex-col">
                        <div class="relative aspect-video">
                            {#if project.images && project.images.length > 0}
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    class="w-full h-full object-cover"
                                />
                            {:else if project.video?.thumbnail}
                                <img
                                    src={project.video.thumbnail}
                                    alt={project.title}
                                    class="w-full h-full object-cover"
                                />
                            {:else}
                                <div
                                    class="w-full h-full flex items-center justify-center bg-muted"
                                >
                                    <span class="text-muted-foreground"
                                        >No image</span
                                    >
                                </div>
                            {/if}
                            <Badge
                                class="absolute top-2 right-2 bg-primary text-primary-foreground"
                            >
                                {project.type}
                            </Badge>
                        </div>

                        <CardContent class="p-4 flex-1 flex flex-col">
                            <h3 class="text-lg font-semibold line-clamp-1">
                                {project.title}
                            </h3>

                            <div class="mt-1 mb-2">
                                <Badge
                                    variant="outline"
                                    class="border-input text-foreground"
                                >
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
                                    class="flex-1 border-input text-foreground hover:bg-secondary/80"
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
                            class="mt-4 border-input text-foreground hover:bg-secondary/80"
                            onclick={() => {
                                selectedCategory = null;
                                selectedType = null;
                                searchQuery = "";
                            }}
                        >
                            Clear Filters
                        </Button>
                    </div>
                {/if}
            </div>
        </CardContent>
    </Card>
</div>

<style>
    .preview-gallery-scroll {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .preview-gallery-scroll::-webkit-scrollbar {
        display: none;
    }

    button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    button:not(:disabled):hover {
        background: rgba(0, 0, 0, 0.8);
    }

    @media only screen and (max-width: 767px) {
        .preview-gallery-scroll {
            max-height: 368px;
            overflow-y: auto;
            touch-action: pan-y;
        }
        .preview-gallery-scroll > div {
            max-height: 368px;
        }
    }

    @media only screen and (min-width: 768px) {
        .preview-gallery-scroll {
            overflow-x: auto;
            touch-action: pan-x;
        }
        .preview-gallery-scroll > div {
            width: 100%;
            flex: 0 0 auto;
        }
    }
</style>
