<script lang="ts">
    import { fade } from "svelte/transition";
    import { translate } from "../stores/language";
    import { projectStore } from "../stores/project";
    import { categoryStore, readCurrentCategory } from "../stores/category";
    import { get } from "svelte/store";
    import Button from "./common/Button.svelte";
    import { onMount, onDestroy } from "svelte";

    export let autoLoad: boolean = true;

    let visibleCount = 5;
    let videoId: string | null = null;
    const increment = 6;
    const categories = get(categoryStore);
    $: currentCategory = $readCurrentCategory;
    $: filteredProjects = $projectStore.filter(
        (p) => p.category === currentCategory,
    );
    $: totalProjects = filteredProjects.length;
    $: hasMore = visibleCount < totalProjects;

    let scrollContainer: HTMLElement | null;
    let loadMoreTrigger: HTMLElement | null;

    readCurrentCategory.subscribe(() => {
        visibleCount = 5;
    });

    function loadMore() {
        visibleCount = Math.min(visibleCount + increment, totalProjects);
    }

    function handlePlayVideo(event: MouseEvent, id?: string) {
        event.preventDefault();
        videoId = id || null;
    }

    function closeVideo() {
        videoId = null;
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
        };
    });

    onDestroy(() => {
        if (scrollContainer) {
            scrollContainer.removeEventListener("scroll", checkLoadMore);
        }
    });
</script>

<div>
    <div id="list-video" class="bg-[#1c1d1f] flex flex-wrap">
        {#each filteredProjects.slice(0, visibleCount) as project, index}
            <a
                class="item project-gallery cursor-pointer min-[1200px]:w-[33.3%] min-[768px]:w-[50%] max-[767px]:w-[100%]"
                class:lv-big={index < 2}
                on:click={(e) =>
                    project.youtubeId && handlePlayVideo(e, project.youtubeId)}
            >
                <div class="image-wrapper w-full h-full">
                    <img
                        src="images/xlarge/{project.image}"
                        class="img"
                        alt={project.title}
                    />
                    <div
                        class="info transition-all duration-300 px-[60px] pb-[50px] w-full bottom-0 left-0 z-1 absolute"
                    >
                        <div class="cate text-[#f60] font-[500] text-[18px]">
                            {translate(
                                categories.find(
                                    (category) =>
                                        currentCategory == category.id,
                                )?.name,
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
                                    src="images/products_ico_clock.png"
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

    {#if videoId}
        <div
            class="video-modal cursor-pointer fixed inset-0 bg-[#1e1e1e]/90 flex items-center justify-center p-4 sm:p-6 z-50"
            transition:fade={{ duration: 150 }}
            on:click={closeVideo}
        >
            <div
                class="video-container cursor-default w-full max-w-[90vw] sm:max-w-[80vw] lg:max-w-4xl relative"
                on:click|stopPropagation
            >
                <iframe
                    class="aspect-video w-full h-auto rounded-lg"
                    src="https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&autohide=1&fs=1&rel=0"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    title="YouTube Video"
                ></iframe>
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
        background: url("/images/products_ico_play.png") 50% no-repeat #fe6501;
        margin-top: 25px;
    }
    .video-container {
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
            background: #f60;
        }
    }
    @media only screen and (min-width: 1200px) {
        .lv-big {
            width: 50%;
        }
    }
</style>
