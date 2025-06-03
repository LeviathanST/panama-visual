<script lang="ts">
    import { fade } from "svelte/transition";
    import { translate } from "$lib/stores/language";
    import { project2Store } from "$lib/stores/project";
    import { categoryStore, readCurrentCategory } from "$lib/stores/category";
    import { get } from "svelte/store";
    import Button from "./common/Button.svelte";
    import { onMount, onDestroy } from "svelte";

    export let autoLoad: boolean = true;

    let visibleCount = 5;
    let video_link: string | null = null;
    let zoomedImage: string[] | null = null;
    let currentImageIndex = 0;
    const increment = 6;
    const categories = get(categoryStore);
    const projects = get(project2Store);
    $: currentCategory = $readCurrentCategory;
    $: filteredProjects = projects.filter(
        (p) => p.category === currentCategory,
    );
    $: totalProjects = filteredProjects.length;
    $: hasMore = visibleCount < totalProjects;

    let scrollContainer: HTMLElement | null;
    let loadMoreTrigger: HTMLElement | null;
    let galleryScrollContainer: HTMLElement | null;

    readCurrentCategory.subscribe(() => {
        visibleCount = 5;
    });

    function loadMore() {
        visibleCount = Math.min(visibleCount + increment, totalProjects);
    }

    function handleProjectClick(
        event: MouseEvent,
        project: {
            type: "image" | "video";
            video?: {
                url: string;
                thumbnail: string;
            };
            images?: string[];
        },
    ) {
        event.preventDefault();
        if (project.type === "video" && project.video?.url) {
            video_link = project.video.url;
        } else if (project.type === "image") {
            if (!project.images || project.images.length === 0) {
                console.log("Image list is empty");
                zoomedImage = null;
            } else {
                zoomedImage = project.images;
                currentImageIndex = 0;
            }
        }
    }

    function closeVideo() {
        video_link = null;
    }

    function closeImage() {
        zoomedImage = null;
        currentImageIndex = 0;
    }

    function updateCurrentImageIndex() {
        if (!galleryScrollContainer || !zoomedImage) return;
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
                Math.min(closestIndex, zoomedImage.length - 1),
            );
        } else {
            const scrollLeft = galleryScrollContainer.scrollLeft;
            const containerWidth = galleryScrollContainer.clientWidth;
            const newIndex = Math.round(scrollLeft / containerWidth);
            currentImageIndex = Math.max(
                0,
                Math.min(newIndex, zoomedImage.length - 1),
            );
        }
    }

    function scrollToImage(index: number) {
        if (!galleryScrollContainer || !zoomedImage) return;
        const isMobile = window.innerWidth <= 767;
        if (isMobile) {
            // Vertical scrolling for mobile
            const targetChild = galleryScrollContainer.children[index];
            if (targetChild) {
                targetChild.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        } else {
            // Horizontal scrolling for desktop
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

    $: if (zoomedImage && zoomedImage.length > 1) {
        setTimeout(() => {
            galleryScrollContainer = document.querySelector(".gallery-scroll");
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

    onMount(() => {
        scrollContainer = document.querySelector(".overflow-auto");
        loadMoreTrigger = document.getElementById("load-more-video");

        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", checkLoadMore);
        } else {
            console.error("Scroll container not found!");
        }

        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener("scroll", checkLoadMore);
            }
            if (galleryScrollContainer) {
                galleryScrollContainer.removeEventListener(
                    "scroll",
                    debouncedUpdateIndex,
                );
            }
        };
    });

    const checkLoadMore = debounce(() => {
        if (!autoLoad || !hasMore || !scrollContainer || !loadMoreTrigger)
            return;

        const triggerRect = loadMoreTrigger.getBoundingClientRect();
        const containerRect = scrollContainer.getBoundingClientRect();

        if (
            triggerRect.top >= containerRect.top &&
            triggerRect.bottom <= containerRect.bottom
        ) {
            console.log("Reached bottom, loading more...");
            loadMore();
        }
    }, 200);
</script>

<div>
    <div id="list-video" class="bg-[#1c1d1f] flex flex-wrap">
        {#each filteredProjects.slice(0, visibleCount) as project, index}
            <a
                class="item project-gallery cursor-pointer min-[1200px]:w-[33.3%] min-[768px]:w-[50%] max-[767px]:w-[100%]"
                class:lv-big={index < 2}
                on:click={(e) => handleProjectClick(e, project)}
            >
                <div class="image-wrapper w-full h-full">
                    {#if project.type === "video" && project.video?.thumbnail}
                        <img
                            src={project.video.thumbnail}
                            class="img"
                            alt={project.title}
                        />
                    {:else if project.type === "image" && project.images?.[0]}
                        <img
                            src={project.images[0]}
                            class="img"
                            alt={project.title}
                        />
                    {:else}
                        <div
                            class="img w-full h-full flex items-center justify-center bg-[#1c1d1f]"
                        >
                            <span class="text-white/60">No image</span>
                        </div>
                    {/if}
                    <div
                        class="info transition-all duration-300 w-full bottom-0 left-0 z-1 absolute
                        min-[1200px]:pb-[50px] min-[768px]:pb-[35px] pb-[35px]
                        min-[1200px]:px-[60px] px-[20px]"
                    >
                        <div
                            class="cate text-[var(--general-color)] font-[500] text-[18px]"
                        >
                            {translate(
                                categories.find(
                                    (category) =>
                                        currentCategory == category.id,
                                )?.name ?? "Unknown",
                            )}
                        </div>
                        <h3
                            class="title text-white min-[1200px]:text-[36px] min-[768px]:text-[24px] mb-[8px]"
                        >
                            {project.title}
                        </h3>
                        {#if project.time}
                            <div class="time flex text-white items-center">
                                <img
                                    src="/images/products_ico_clock.png"
                                    alt="Clock"
                                    class="clock-icon"
                                />
                                <span class="text-center text-[14px]"
                                    >{project.time}</span
                                >
                            </div>
                        {/if}
                        <div class="des w-full hidden text-[22px] text-white">
                            {project.description}
                        </div>
                    </div>
                </div>
            </a>
        {/each}
    </div>
    {#if hasMore}
        <div
            id="load-more-video"
            class="w-full flex items-center justify-center min-[1200px]:h-[162px] min-[768px]:h-[162px] max-[767px]:h-[162px]"
        >
            <div class="w-[250px] h-[50px]">
                <Button content={translate("SEE_MORE")} onClick={loadMore} />
            </div>
        </div>
    {/if}

    {#if video_link}
        <div
            class="video-modal cursor-pointer fixed inset-0 bg-[#1e1e1e]/90 flex items-center justify-center p-4 sm:p-6 z-50"
            transition:fade={{ duration: 150 }}
            on:click={closeVideo}
        >
            <div
                class="video-container cursor-default w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-4xl relative"
            >
                <video
                    class="aspect-video w-full h-auto rounded-lg"
                    src={video_link}
                    controls
                    autoplay
                ></video>
            </div>
        </div>
    {/if}

    {#if zoomedImage}
        {#if zoomedImage.length === 1}
            <div
                class="image-modal cursor-pointer fixed inset-0 bg-[#1e1e1e]/90 flex items-center justify-center p-0 z-50"
                transition:fade={{ duration: 150 }}
                on:click={closeImage}
            >
                <div
                    class="image-container cursor-default w-full h-full relative"
                >
                    <button
                        class="absolute top-2 right-2 text-white bg-black/60 rounded-full w-8 h-8 flex items-center justify-center z-10"
                        on:click={closeImage}
                        aria-label="Close image"
                    >
                        ✕
                    </button>
                    <img
                        src={zoomedImage[0]}
                        class="w-full h-full object-contain"
                        alt="Zoomed Project Image"
                    />
                </div>
            </div>
        {:else}
            <div
                class="image-modal cursor-pointer fixed inset-0 bg-[#1e1e1e]/90 flex items-center justify-center p-0 z-50"
                transition:fade={{ duration: 150 }}
                on:click={closeImage}
            >
                <div
                    class="image-container cursor-default w-full h-full relative"
                    on:click|stopPropagation
                    on:keydown={(e) => {
                        if (e.key === "ArrowLeft" && window.innerWidth > 767) {
                            scrollToImage(currentImageIndex - 1);
                        }
                        if (e.key === "ArrowRight" && window.innerWidth > 767) {
                            scrollToImage(currentImageIndex + 1);
                        }
                    }}
                    tabindex="0"
                >
                    <!-- Close Button -->
                    <button
                        class="absolute top-4 right-4 text-white bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-10"
                        on:click={closeImage}
                        aria-label="Close gallery"
                    >
                        ✕
                    </button>
                    <!-- Image List -->
                    <div
                        class="gallery-scroll overflow-y-auto max-[767px]:snap-y max-[767px]:snap-mandatory w-full h-full touch-pan-y"
                        bind:this={galleryScrollContainer}
                    >
                        {#each zoomedImage as image, index}
                            <div
                                class="w-full h-full flex items-center justify-center max-[767px]:snap-start"
                            >
                                <img
                                    src={image}
                                    class="w-full h-full object-contain"
                                    alt="Gallery Image {index + 1}"
                                />
                            </div>
                        {/each}
                    </div>
                    <!-- Image Counter -->
                    {#if zoomedImage.length > 1}
                        <div
                            class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                            {currentImageIndex + 1} / {zoomedImage.length}
                        </div>
                        <!-- Navigation Arrows (Desktop Only) -->
                        <button
                            class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 items-center justify-center hover:bg-black/80 transition-colors"
                            on:click|stopPropagation={() =>
                                scrollToImage(currentImageIndex - 1)}
                            disabled={currentImageIndex === 0}
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
                            class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 items-center justify-center hover:bg-black/80 transition-colors"
                            on:click|stopPropagation={() =>
                                scrollToImage(currentImageIndex + 1)}
                            disabled={currentImageIndex ===
                                zoomedImage.length - 1}
                            aria-label="Next image"
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
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    {/if}
                </div>
            </div>
        {/if}
    {/if}
</div>

<style>
    .project-gallery {
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    #list-video .img {
        width: 100%;
        height: 100%;
        vertical-align: middle;
        object-fit: cover;
        transition: opacity 0.3s ease;
    }

    #list-video .item::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: url("/images/visual-vj-shadows.png") bottom no-repeat;
        background-size: 100% auto;
        z-index: 0;
    }

    #list-video .item::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 8px;
        background: hsla(0, 0%, 100%, 0.1);
        z-index: 2;
        transition: all 0.3s;
    }

    #list-video .item .info::after {
        content: "";
        display: none;
        width: 100px;
        height: 80px;
        background: url("/images/products_ico_play.png") 50% no-repeat
            var(--general-color);
        margin-top: 25px;
    }

    .video-container,
    .image-container {
        max-width: min(90vw, 960px);
    }

    .clock-icon {
        width: 16px;
        height: 16px;
        margin-right: 5px;
    }

    #load-more-video {
        background: #1c1d1f;
        border: 1px solid #2d2d2f;
        text-align: center;
    }

    @media only screen and (min-width: 1200px) {
        #list-video .item:hover .info {
            padding-bottom: 8px;
        }

        #list-video .item:hover .info::after {
            display: block;
        }

        #list-video .item:hover .des {
            display: block;
        }

        #list-video .item:hover::before {
            background: var(--general-color);
        }

        .lv-big {
            width: 50%;
        }
    }

    /* Gallery Scroll Styles */
    .gallery-scroll {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .gallery-scroll::-webkit-scrollbar {
        display: none;
    }

    .image-modal button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .image-modal button:not(:disabled):hover {
        background: black/80;
    }

    /* Mobile-specific adjustments */
    @media only screen and (max-width: 767px) {
        .image-modal {
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .image-container {
            width: 100%;
            height: 100vh;
            max-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .gallery-scroll {
            overflow-y: auto;
            overflow-x: hidden;
            width: 100%;
            height: 100%;
            touch-action: pan-y;
        }

        .gallery-scroll > div {
            width: 100%;
            height: 100vh;
            max-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .gallery-scroll img {
            width: 100%;
            height: auto;
            max-height: 100vh;
            object-fit: contain;
        }
    }

    /* Desktop-specific adjustments */
    @media only screen and (min-width: 768px) {
        .gallery-scroll {
            overflow-x: auto;
            overflow-y: hidden;
            display: flex;
            touch-action: pan-x;
            scroll-snap-type: x mandatory;
        }

        .gallery-scroll > div {
            width: 100%;
            flex: 0 0 auto;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            scroll-snap-align: center;
        }

        .gallery-scroll img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
    }
</style>
