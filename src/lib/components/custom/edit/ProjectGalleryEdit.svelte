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

    type Errors = string[];

    let title = "";
    let category = 1;
    let imageFiles: FileList | null = null;
    let videoFile: FileList | null = null;
    let thumbnailFile: FileList | null = null;
    let keptImageUrls: string[] = [];
    let existingVideo: { url: string; thumbnail: string } | null = null;
    let removeExistingVideo = false;
    let imageInput: HTMLInputElement | null = null;
    let videoInput: HTMLInputElement | null = null;
    let thumbnailInput: HTMLInputElement | null = null;
    let selectedImageNames: string[] = [];
    let selectedVideoName: string = "";
    let selectedThumbnailName: string = "";
    let time = "";
    let description = "";
    let editingId: number | null = null;
    let errors: Errors = [];
    let successMessage = "";
    let generalError = "";

    let selectedCategory: number | null = null;
    let searchQuery = "";
    let currentImageIndex = 0;
    let galleryScrollContainer: HTMLElement | null = null;

    const categoryOptions = [
        { value: 1, label: "Visuals Stage" },
        { value: 2, label: "Interact Dance" },
        { value: 3, label: "Hologram" },
        { value: 4, label: "3D Mapping" },
    ];

    $: filteredProjects = get(project2Store).filter((project) => {
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

    $: previewImages = [
        ...keptImageUrls,
        ...(imageFiles
            ? Array.from(imageFiles).map((file) => URL.createObjectURL(file))
            : []),
    ];

    $: previewVideo = videoFile
        ? URL.createObjectURL(videoFile[0])
        : editingId && existingVideo && !removeExistingVideo
          ? existingVideo.url
          : "";

    async function uploadFiles(formData: FormData): Promise<{
        images?: string[];
        video?: string;
        thumbnail?: string;
    }> {
        const response = await fetch("http://localhost:8080/api/test", {
            method: "POST",
            headers: {
                Authorization: "Bearer token",
            },
            body: formData,
        });
        if (!response.ok) throw new Error("Upload failed");
        return response.json();
    }

    async function createProject(
        projectData: Omit<Project, "id">,
    ): Promise<Project> {
        const response = await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error("Failed to create project");
        return response.json();
    }

    async function updateProjectApi(
        id: number,
        projectData: Omit<Project, "id">,
    ): Promise<void> {
        const response = await fetch(`/api/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projectData),
        });
        if (!response.ok) throw new Error("Failed to update project");
    }

    function handleImageChange() {
        if (imageFiles && imageFiles.length > 0) {
            selectedImageNames = Array.from(imageFiles).map(
                (file) => file.name,
            );
        } else {
            selectedImageNames = [];
        }
    }

    function handleVideoChange() {
        if (videoFile && videoFile.length > 0) {
            selectedVideoName = videoFile[0].name;
        } else {
            selectedVideoName = "";
        }
    }

    function handleThumbnailChange() {
        if (thumbnailFile && thumbnailFile.length > 0) {
            selectedThumbnailName = thumbnailFile[0].name;
        } else {
            selectedThumbnailName = "";
        }
    }

    function removeImage(index: number) {
        if (!imageFiles) return;
        const newFiles = Array.from(imageFiles).filter((_, i) => i !== index);
        selectedImageNames = selectedImageNames.filter((_, i) => i !== index);
        const dataTransfer = new DataTransfer();
        newFiles.forEach((file) => dataTransfer.items.add(file));
        imageFiles = dataTransfer.files;
        if (imageFiles.length === 0) imageFiles = null;
    }

    function removeVideo() {
        videoFile = null;
        selectedVideoName = "";
        thumbnailFile = null;
        selectedThumbnailName = "";
    }

    function removeThumbnail() {
        thumbnailFile = null;
        selectedThumbnailName = "";
    }

    function triggerImageInput() {
        imageInput?.click();
    }

    function triggerVideoInput() {
        videoInput?.click();
    }

    function triggerThumbnailInput() {
        thumbnailInput?.click();
    }

    function validateForm(): Errors {
        const newErrors: Errors = [];
        if (!title) newErrors.push("Title is required");
        if (!category) newErrors.push("Category is required");

        const willHaveImages =
            (editingId ? keptImageUrls.length : 0) +
                (imageFiles ? imageFiles.length : 0) >
            0;
        const willHaveVideo =
            videoFile || (editingId && existingVideo && !removeExistingVideo);

        if (!willHaveImages && !willHaveVideo) {
            newErrors.push("At least one image or one video is required");
        }

        if (videoFile && (!thumbnailFile || thumbnailFile.length === 0)) {
            newErrors.push("Thumbnail is required when uploading a video");
        }

        return newErrors;
    }

    async function handleSubmit() {
        errors = validateForm();
        if (errors.length > 0) return;

        const formData = new FormData();
        try {
            let newImageUrls: string[] = [];
            let newVideoUrl: string = "";
            let newThumbnailUrl: string = "";

            if (imageFiles || videoFile || thumbnailFile) {
                if (imageFiles) {
                    Array.from(imageFiles).forEach((file) =>
                        formData.append("images", file),
                    );
                }
                if (videoFile) {
                    formData.append("video", videoFile[0]);
                }
                if (thumbnailFile) {
                    formData.append("thumbnail", thumbnailFile[0]);
                }
                const uploadResult = await uploadFiles(formData);
                newImageUrls = uploadResult.images || [];
                newVideoUrl = uploadResult.video || "";
                newThumbnailUrl = uploadResult.thumbnail || "";
            }

            const finalImageUrls = [...keptImageUrls, ...newImageUrls];

            let finalVideo: { url: string; thumbnail: string } | undefined;
            if (videoFile) {
                finalVideo = {
                    url: newVideoUrl,
                    thumbnail: newThumbnailUrl,
                };
            } else if (editingId && existingVideo && !removeExistingVideo) {
                finalVideo = existingVideo;
            } else {
                finalVideo = undefined;
            }

            const projectData: Omit<Project, "id"> = {
                title,
                category,
                images: imageFiles,
                time: time || undefined,
                video: finalVideo,
                description: description || undefined,
            };

            if (editingId) {
                await updateProjectApi(editingId, projectData);
                updateProject(editingId, projectData);
                successMessage = "Project updated successfully!";
            } else {
                const newProject = await createProject(projectData);
                addProject(newProject);
                successMessage = "Project added successfully!";
            }

            handleReset();
            setTimeout(() => {
                successMessage = "";
                generalError = "";
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
            generalError = "Failed to save project. Please try again.";
        }
    }

    function handleEdit(project: Project) {
        editingId = project.id;
        title = project.title || "";
        category = project.category;
        keptImageUrls = project.images || [];
        imageFiles = null;
        selectedImageNames = [];
        existingVideo = project.video || null;
        removeExistingVideo = false;
        videoFile = null;
        thumbnailFile = null;
        selectedVideoName = "";
        selectedThumbnailName = "";
        time = project.time || "";
        description = project.description || "";
        currentImageIndex = 0;
    }

    function handleReset() {
        title = "";
        category = 1;
        imageFiles = null;
        videoFile = null;
        thumbnailFile = null;
        keptImageUrls = [];
        existingVideo = null;
        removeExistingVideo = false;
        selectedImageNames = [];
        selectedVideoName = "";
        selectedThumbnailName = "";
        time = "";
        description = "";
        editingId = null;
        errors = [];
        generalError = "";
        currentImageIndex = 0;
    }

    function setCategory(value: number | null) {
        selectedCategory = value;
    }

    function setFormCategory(value: number) {
        category = value;
        errors = [];
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
            <CardDescription class="text-muted-foreground">
                Add, edit, or delete studio projects
            </CardDescription>
        </CardHeader>

        <CardContent id="edit-area" class="space-y-8">
            {#if successMessage}
                <div transition:fade>
                    <Alert class="mb-6 bg-green-900/50 border-green-700">
                        <AlertDescription class="text-green-300">
                            {successMessage}
                        </AlertDescription>
                    </Alert>
                </div>
            {/if}

            {#if generalError}
                <div transition:fade>
                    <Alert variant="destructive" class="mb-6">
                        <AlertDescription>{generalError}</AlertDescription>
                    </Alert>
                </div>
            {/if}

            {#if errors.length > 0}
                <div transition:fade>
                    <Alert variant="destructive" class="mb-6 error-alert">
                        <AlertDescription>
                            <ul class="list-disc pl-4">
                                {#each errors as error}
                                    <li>{error}</li>
                                {/each}
                            </ul>
                        </AlertDescription>
                    </Alert>
                </div>
            {/if}

            <div
                class="grid gap-6 {title ||
                imageFiles ||
                keptImageUrls.length ||
                videoFile ||
                existingVideo
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-1'}"
            >
                <div class="space-y-4">
                    <form
                        on:submit|preventDefault={handleSubmit}
                        class="space-y-4"
                    >
                        <div class="space-y-2">
                            <label
                                for="title"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Title
                            </label>
                            <Input
                                id="title"
                                type="text"
                                bind:value={title}
                                placeholder="Enter project title"
                                class={cn(
                                    "bg-secondary border-input text-foreground",
                                    errors.includes("Title is required") &&
                                        "border-destructive",
                                )}
                            />
                        </div>

                        <div class="space-y-2">
                            <label
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Category
                            </label>
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
                        </div>

                        <div class="space-y-2">
                            <label
                                for="image_files"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Upload Images (Optional)
                            </label>
                            <div class="flex flex-col gap-3">
                                <Button
                                    type="button"
                                    onclick={triggerImageInput}
                                >
                                    Upload Images
                                </Button>
                                <input
                                    id="image_files"
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    bind:files={imageFiles}
                                    bind:this={imageInput}
                                    on:change={handleImageChange}
                                    class="hidden"
                                />
                                {#if editingId && keptImageUrls.length > 0}
                                    <div class="flex flex-wrap gap-2">
                                        {#each keptImageUrls as url, index}
                                            <Badge
                                                class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 border-input"
                                            >
                                                <span
                                                    class="truncate max-w-[150px]"
                                                >
                                                    {url.split("/").pop() ||
                                                        url}
                                                </span>
                                                <button
                                                    type="button"
                                                    class="text-destructive hover:text-destructive/80 text-sm"
                                                    on:click={() => {
                                                        keptImageUrls =
                                                            keptImageUrls.filter(
                                                                (_, i) =>
                                                                    i !== index,
                                                            );
                                                    }}
                                                >
                                                    ✕
                                                </button>
                                            </Badge>
                                        {/each}
                                    </div>
                                {/if}
                                {#if selectedImageNames.length > 0}
                                    <div class="flex flex-wrap gap-2">
                                        {#each selectedImageNames as fileName, index}
                                            <Badge
                                                class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 border-input"
                                            >
                                                <span
                                                    class="truncate max-w-[150px]"
                                                >
                                                    {fileName}
                                                </span>
                                                <button
                                                    type="button"
                                                    class="text-destructive hover:text-destructive/80 text-sm"
                                                    on:click={() =>
                                                        removeImage(index)}
                                                >
                                                    ✕
                                                </button>
                                            </Badge>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label
                                for="video_file"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Upload Video (Optional)
                            </label>
                            <div class="flex flex-col gap-3">
                                <Button
                                    type="button"
                                    onclick={triggerVideoInput}
                                >
                                    Upload Video
                                </Button>
                                <input
                                    id="video_file"
                                    type="file"
                                    accept="video/*"
                                    bind:files={videoFile}
                                    bind:this={videoInput}
                                    on:change={handleVideoChange}
                                    class="hidden"
                                />
                                {#if editingId && existingVideo && !removeExistingVideo}
                                    <div class="space-y-2">
                                        <p
                                            class="text-sm text-muted-foreground"
                                        >
                                            Existing Video: {existingVideo.url
                                                .split("/")
                                                .pop()}
                                        </p>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onclick={() =>
                                                (removeExistingVideo = true)}
                                        >
                                            Remove Video
                                        </Button>
                                    </div>
                                {/if}
                                {#if selectedVideoName}
                                    <Badge
                                        class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 border-input"
                                    >
                                        <span class="truncate max-w-[150px]">
                                            {selectedVideoName}
                                        </span>
                                        <button
                                            type="button"
                                            class="text-destructive hover:text-destructive/80 text-sm"
                                            on:click={removeVideo}
                                        >
                                            ✕
                                        </button>
                                    </Badge>
                                {/if}
                            </div>
                        </div>

                        {#if videoFile || (editingId && existingVideo && !removeExistingVideo)}
                            <div class="space-y-2">
                                <label
                                    for="thumbnail_file"
                                    class="text-sm font-medium text-muted-foreground"
                                >
                                    Upload Video Thumbnail ({videoFile
                                        ? "Required"
                                        : "Current"})
                                </label>
                                <div class="flex flex-col gap-3">
                                    {#if videoFile}
                                        <Button
                                            type="button"
                                            onclick={triggerThumbnailInput}
                                        >
                                            Upload Thumbnail
                                        </Button>
                                        <input
                                            id="thumbnail_file"
                                            type="file"
                                            accept="image/*"
                                            bind:files={thumbnailFile}
                                            bind:this={thumbnailInput}
                                            on:change={handleThumbnailChange}
                                            class="hidden"
                                        />
                                        {#if selectedThumbnailName}
                                            <Badge
                                                class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2 border-input"
                                            >
                                                <span
                                                    class="truncate max-w-[150px]"
                                                >
                                                    {selectedThumbnailName}
                                                </span>
                                                <button
                                                    type="button"
                                                    class="text-destructive hover:text-destructive/80 text-sm"
                                                    on:click={removeThumbnail}
                                                >
                                                    ✕
                                                </button>
                                            </Badge>
                                        {/if}
                                    {:else if editingId && existingVideo && !removeExistingVideo}
                                        <p
                                            class="text-sm text-muted-foreground"
                                        >
                                            Current Thumbnail: {existingVideo.thumbnail
                                                .split("/")
                                                .pop()}
                                        </p>
                                    {/if}
                                </div>
                            </div>
                        {/if}

                        <div class="space-y-2">
                            <label
                                for="time"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Time (Optional)
                            </label>
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
                                for="description"
                                class="text-sm font-medium text-muted-foreground"
                            >
                                Description (Optional)
                            </label>
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

                {#if title || imageFiles || keptImageUrls.length || videoFile || (existingVideo && !removeExistingVideo)}
                    <div class="space-y-4">
                        <h3 class="text-lg font-semibold text-foreground">
                            Preview
                        </h3>
                        {#if previewImages.length > 0}
                            <div class="relative">
                                <div
                                    class="preview-gallery-scroll snap-x snap-mandatory overflow-x-auto md:overflow-y-hidden flex md:flex-row flex-col gap-4 max-h-[400px] md:h-[300px] scroll-smooth"
                                    bind:this={galleryScrollContainer}
                                >
                                    {#each previewImages as imageUrl, index}
                                        <img
                                            src={imageUrl}
                                            alt="Preview {index + 1}"
                                            class="object-contain flex-shrink-0 snap-center md:w-full w-72 h-48 md:h-[300px] rounded-lg"
                                        />
                                    {/each}
                                </div>
                                {#if previewImages.length > 1}
                                    <div class="flex justify-center gap-2 mt-2">
                                        {#each previewImages as _, index}
                                            <button
                                                class="w-2 h-2 rounded-full {currentImageIndex ===
                                                index
                                                    ? 'bg-primary'
                                                    : 'bg-muted-foreground/50'}"
                                                on:click={() =>
                                                    scrollToImage(index)}
                                            />
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        {/if}

                        {#if previewVideo}
                            <div class="mt-4">
                                <video
                                    src={previewVideo}
                                    controls
                                    class="w-full max-h-[300px] rounded-lg"
                                />
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>

            <div class="space-y-6">
                <div
                    class="flex flex-col md:flex-row gap-4 items-start md:items-center"
                >
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
                    <Input
                        type="text"
                        bind:value={searchQuery}
                        placeholder="Search projects..."
                        class="max-w-xs bg-secondary border-input text-foreground"
                    />
                </div>

                {#if filteredProjects.length > 0}
                    <div
                        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {#each filteredProjects as project}
                            <Card class="overflow-hidden border-input">
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
                                            class="text-lg font-semibold text-foreground truncate"
                                        >
                                            {project.title}
                                        </h3>
                                        <p
                                            class="text-sm text-muted-foreground"
                                        >
                                            {categoryOptions.find(
                                                (c) =>
                                                    c.value ===
                                                    project.category,
                                            )?.label}
                                        </p>
                                        <div class="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                class="border-input text-foreground hover:bg-secondary/80"
                                                onclick={() => {
                                                    handleEdit(project);
                                                    scrollToEdit();
                                                }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onclick={() =>
                                                    deleteProject(project.id)}
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
                    <p class="text-muted-foreground">No projects found.</p>
                {/if}
            </div>
        </CardContent>
    </Card>
</div>

<style>
    .preview-gallery-scroll::-webkit-scrollbar {
        height: 8px;
    }
    .preview-gallery-scroll::-webkit-scrollbar-thumb {
        background-color: hsl(var(--muted-foreground) / 0.5);
        border-radius: 4px;
    }
    .preview-gallery-scroll::-webkit-scrollbar-track {
        background: hsl(var(--background));
    }
    .error-alert {
        animation: shake 0.5s;
    }
    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }
        25% {
            transform: translateX(-5px);
        }
        75% {
            transform: translateX(5px);
        }
    }
</style>
