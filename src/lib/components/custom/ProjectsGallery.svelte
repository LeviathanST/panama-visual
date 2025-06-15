<script lang="ts">
    import { fade } from "svelte/transition";
    import { translate } from "$lib/stores/language";
    import {
        categoryStore,
        readCurrentCategory,
        getIdFromName,
    } from "$lib/stores/category";
    import { get } from "svelte/store";
    import Button from "./common/Button.svelte";
    import { onMount, onDestroy } from "svelte";
    import type { Project } from "$lib/stores/project";

    export let projects: Project[] = [];
    export let autoLoad: boolean = true;

    let visibleCount = 5;
    let selectedMedia: { type: "video" | "image"; url: string }[] | null = null;
    let currentMediaIndex = 0;
    let selectedProjectId: number | null = null; // Track selected project
    const increment = 6;
    const categories = get(categoryStore);
    $: currentCategory = $readCurrentCategory;
    $: filteredProjects = projects.filter(
        (p) => getIdFromName(p.category) === currentCategory,
    );
    $: totalProjects = filteredProjects.length;
    $: hasMore = visibleCount < totalProjects;

    let scrollContainer: HTMLElement | null;
    let loadMoreTrigger: HTMLElement | null;
    let galleryScrollContainer: HTMLElement | null;

    readCurrentCategory.subscribe(() => {
        visibleCount = 5;
        selectedProjectId = null; // Reset on category change
    });

    function loadMore() {
        visibleCount = Math.min(visibleCount + increment, totalProjects);
    }

    function handleProjectClick(
        event: MouseEvent,
        project: {
            id: number;
            video?: { url: string; thumbnail: string };
            images?: string[];
        },
    ) {
        event.preventDefault();
        selectedProjectId = project.id; // Set selected project
        const media: { type: "video" | "image"; url: string }[] = [];
        if (project.video?.url) {
            media.push({ type: "video", url: project.video.url });
        }
        if (project.images && project.images.length > 0) {
            media.push(
                ...project.images.map((img) => ({ type: "image", url: img })),
            );
        }
        if (media.length > 0) {
            selectedMedia = media;
            currentMediaIndex = 0;
        } else {
            console.log("No media to display");
        }
    }

    function closeModal() {
        selectedMedia = null;
        currentMediaIndex = 0;
        selectedProjectId = null; // Reset selected project
    }

    function updateCurrentMediaIndex() {
        if (!galleryScrollContainer || !selectedMedia) return;
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
            currentMediaIndex = Math.max(
                0,
                Math.min(closestIndex, selectedMedia.length - 1),
            );
        } else {
            const scrollLeft = galleryScrollContainer.scrollLeft;
            const containerWidth = galleryScrollContainer.clientWidth;
            const newIndex = Math.round(scrollLeft / containerWidth);
            currentMediaIndex = Math.max(
                0,
                Math.min(newIndex, selectedMedia.length - 1),
            );
        }
    }

    function scrollToMedia(index: number) {
        if (!galleryScrollContainer || !selectedMedia) return;
        const isMobile = window.innerWidth <= 767;
        if (isMobile) {
            const targetChild = galleryScrollContainer.children[index];
            if (targetChild) {
                targetChild.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
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

    const debouncedUpdateIndex = debounce(updateCurrentMediaIndex, 100);

    $: if (selectedMedia && selectedMedia.length > 1) {
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
                class:active={project.id === selectedProjectId}
                on:click={(e) => handleProjectClick(e, project)}
            >
                <div class="image-wrapper w-full h-full">
                    {#if project.video?.thumbnail}
                        <img
                            src={project.video.thumbnail}
                            class="img"
                            alt={project.title}
                        />
                    {:else if project.images?.[0]}
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
                        class="info transition-all duration-300 w-full bottom-0 left-0 z-1 absolute min-[1200px]:pb-[50px] min-[768px]:pb-[35px] pb-[35px] min-[1200px]:px-[60px] px-[20px]"
                    >
                        <!-- Enhanced overlay -->
                        <div
                            class="overlay absolute inset-0 bg-black/70 backdrop-blur-sm opacity-0 transition-opacity duration-300 pointer-events-none"
                        ></div>
                        <div
                            class="cate text-[var(--general-color)] font-[500] text-[18px] relative z-10"
                        >
                            {translate(
                                categories.find(
                                    (category) =>
                                        currentCategory == category.id,
                                )?.name ?? "Unknown",
                            )}
                        </div>
                        <h3
                            class="title text-white min-[1200px]:text-[36px] min-[768px]:text-[24px] mb-[8px] relative z-10"
                        >
                            {project.title}
                        </h3>
                        {#if project.time}
                            <div
                                class="time flex text-white items-center relative z-10"
                            >
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
                        <div
                            class="des w-full hidden text-[22px] text-white relative z-10"
                        >
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

    {#if selectedMedia}
        <div
            class="media-modal cursor-pointer fixed inset-0 bg-[#1e1e1e]/90 flex items-center justify-center p-0 z-50"
            transition:fade={{ duration: 150 }}
            on:click={closeModal}
        >
            <div
                class="media-container cursor-default w-full h-full relative"
                on:click|stopPropagation
                on:keydown={(e) => {
                    if (e.key === "ArrowLeft" && window.innerWidth > 767) {
                        scrollToMedia(currentMediaIndex - 1);
                    }
                    if (e.key === "ArrowRight" && window.innerWidth > 767) {
                        scrollToMedia(currentMediaIndex + 1);
                    }
                }}
                tabindex="0"
            >
                <button
                    class="absolute top-4 right-4 text-white bg-black/60 rounded-full w-10 h-10 flex items-center justify-center z-10"
                    on:click={closeModal}
                    aria-label="Close gallery"
                >
                    ✕
                </button>
                <div
                    class="gallery-scroll overflow-y-auto max-[767px]:snap-y max-[767px]:snap-mandatory w-full h-full touch-pan-y"
                    bind:this={galleryScrollContainer}
                >
                    {#each selectedMedia as item, index}
                        <div
                            class="w-full h-full flex items-center justify-center max-[767px]:snap-start"
                        >
                            {#if item.type === "video"}
                                <video
                                    src={item.url}
                                    controls
                                    class="w-full h-auto object-contain"
                                />
                            {:else}
                                <img
                                    src={item.url}
                                    class="w-full h-auto object-contain"
                                    alt="Gallery Image {index + 1}"
                                />
                            {/if}
                        </div>
                    {/each}
                </div>
                {#if selectedMedia.length > 1}
                    <div
                        class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium"
                    >
                        {currentMediaIndex + 1} / {selectedMedia.length}
                    </div>
                    <button
                        class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full w-10 h-10 items-center justify-center hover:bg-black/80 transition-colors"
                        on:click|stopPropagation={() =>
                            scrollToMedia(currentMediaIndex - 1)}
                        disabled={currentMediaIndex === 0}
                        aria-label="Previous media"
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
                            scrollToMedia(currentMediaIndex + 1)}
                        disabled={currentMediaIndex ===
                            selectedMedia.length - 1}
                        aria-label="Next media"
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
        position: relative; /* Ensure stacking context */
        z-index: 20; /* Higher than overlay and text */
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

    /* Overlay styles */
    .item:hover .overlay,
    .item.active .overlay {
        opacity: 1;
    }

    .overlay {
        bottom: 8px; /* Align with bottom border */
        z-index: 0; /* Behind text and play icon */
        background: rgba(0, 0, 0, 0.7); /* Solid dark background */
        backdrop-filter: blur(4px); /* Frosted glass effect */
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

        .overlay {
            bottom: 50px; /* Match info padding */
        }
    }

    @media only screen and (min-width: 768px) and (max-width: 1199px) {
        .overlay {
            bottom: 35px; /* Match info padding */
        }
    }

    @media only screen and (max-width: 767px) {
        .overlay {
            bottom: 35px; /* Match info padding */
        }
    }

    .gallery-scroll {
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .gallery-scroll::-webkit-scrollbar {
        display: none;
    }

    .media-modal button:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .media-modal button:not(:disabled):hover {
        background: black/80;
    }

    @media only screen and (max-width: 767px) {
        .media-modal {
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .media-container {
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

        .gallery-scroll video,
        .gallery-scroll img {
            width: 100%;
            height: auto;
            max-height: 100vh;
            object-fit: contain;
        }
    }

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

        .gallery-scroll video,
        .gallery-scroll img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
    }
</style>
