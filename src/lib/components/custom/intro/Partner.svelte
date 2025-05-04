<script lang="ts">
    import { onMount } from "svelte";
    import { itemReader as sponsorReader } from "$lib/stores/sponsor";
    import { get } from "svelte/store";

    const sponsors = get(sponsorReader);

    let allSponsors = [...sponsors, ...sponsors];
    let currentIndex = 0;
    let isPaused = false;
    const sponsorsPerView = 4;
    let itemWidth = 0;
    let containerWidth = 0;
    let sliderTrack: HTMLElement;
    let sliderContainer: HTMLElement;
    let autoScrollInterval: NodeJS.Timeout | null = null;

    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    function updateItemWidth() {
        if (sliderContainer) {
            containerWidth = sliderContainer.clientWidth;

            if (window.innerWidth >= 768) {
                itemWidth = containerWidth / sponsorsPerView;
            } else {
                itemWidth = 300;
            }

            if (sliderTrack) {
                sliderTrack.style.width = `${itemWidth * allSponsors.length}px`;
                updateSliderPosition();
            }
        }
    }

    function startDrag(event: MouseEvent | TouchEvent) {
        isDragging = true;
        isPaused = true;
        startX = getClientX(event);
        currentTranslate = prevTranslate;
        if (sliderTrack) {
            sliderTrack.style.transition = "none";
        }
    }

    function moveDrag(event: MouseEvent | TouchEvent) {
        if (!isDragging) return;
        const currentX = getClientX(event);
        const diffX = currentX - startX;
        currentTranslate = prevTranslate + diffX;
        updateSliderPosition();
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        isPaused = false;

        if (sliderTrack) {
            sliderTrack.style.transition = "transform 0.5s ease-in-out";
        }

        const firstVisibleIndex = Math.round(
            Math.abs(currentTranslate) / itemWidth,
        );
        currentIndex =
            Math.floor(firstVisibleIndex / sponsorsPerView) * sponsorsPerView;

        if (currentIndex >= sponsors.length) {
            currentIndex = currentIndex % sponsors.length;
        } else if (currentIndex < 0) {
            currentIndex = 0;
        }

        prevTranslate = -(currentIndex * itemWidth);
        currentTranslate = prevTranslate;
        updateSliderPosition();
    }

    function getClientX(event: MouseEvent | TouchEvent) {
        return event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX;
    }

    function updateSliderPosition() {
        if (sliderTrack) {
            sliderTrack.style.transform = `translateX(${currentTranslate}px)`;
        }
    }

    function startAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }

        autoScrollInterval = setInterval(() => {
            if (!isPaused && !isDragging) {
                const remainingItems =
                    sponsors.length - (currentIndex % sponsors.length);
                const itemsToMove = Math.min(sponsorsPerView, remainingItems);

                currentIndex += itemsToMove;
                prevTranslate = -(currentIndex * itemWidth);
                currentTranslate = prevTranslate;

                if (currentIndex >= sponsors.length) {
                    setTimeout(() => {
                        if (sliderTrack) {
                            sliderTrack.style.transition = "none";
                            currentIndex = currentIndex % sponsors.length;
                            prevTranslate = -(currentIndex * itemWidth);
                            currentTranslate = prevTranslate;
                            updateSliderPosition();

                            setTimeout(() => {
                                if (sliderTrack) {
                                    sliderTrack.style.transition =
                                        "transform 0.5s ease-in-out";
                                }
                            }, 50);
                        }
                    }, 500);
                }

                updateSliderPosition();
            }
        }, 3000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    onMount(() => {
        updateItemWidth();

        window.addEventListener("resize", updateItemWidth);

        currentIndex = 0;
        currentTranslate = 0;
        prevTranslate = 0;
        updateSliderPosition();

        setTimeout(() => {
            startAutoScroll();
        }, 100);

        if (sliderTrack) {
            sliderTrack.addEventListener(
                "touchstart",
                startDrag as EventListener,
            );
            sliderTrack.addEventListener(
                "touchmove",
                moveDrag as EventListener,
            );
            sliderTrack.addEventListener("touchend", endDrag);
        }

        return () => {
            stopAutoScroll();
            window.removeEventListener("resize", updateItemWidth);

            if (sliderTrack) {
                sliderTrack.removeEventListener(
                    "touchstart",
                    startDrag as EventListener,
                );
                sliderTrack.removeEventListener(
                    "touchmove",
                    moveDrag as EventListener,
                );
                sliderTrack.removeEventListener("touchend", endDrag);
            }
        };
    });
</script>

<div
    class="partner-slider bg-[#1c1d1f] w-full flex items-center overflow-hidden h-[175px] min-[1200px]:h-[250px] max-[767px]:hidden"
    on:mouseenter={stopAutoScroll}
    on:mouseleave={startAutoScroll}
>
    <div
        class="slider-track overflow-hidden flex justify-center items-center h-full w-full max-w-[1200px] min-[1200px]:mx-auto"
        bind:this={sliderContainer}
    >
        <div
            class="inner-track flex"
            bind:this={sliderTrack}
            on:mousedown={startDrag}
            on:mousemove={moveDrag}
            on:mouseup={endDrag}
            on:mouseleave={endDrag}
        >
            {#each allSponsors as sponsor, i (sponsor.id + "-" + i)}
                <div
                    class="slider-item select-none flex items-center justify-center flex-shrink-0"
                    style="width: {itemWidth}px;"
                >
                    <img
                        src={sponsor.src || "/placeholder.svg"}
                        alt={sponsor.alt}
                        class="w-[155px] max-h-[165px] object-contain select-none transition-opacity duration-300 opacity-50 hover:opacity-100 md:w-[15vw]"
                    />
                </div>
            {/each}
        </div>
    </div>
</div>

<style>
    .partner-slider {
        border-top: 1px solid #2d2d2f;
        border-bottom: 1px solid #2d2d2f;
    }
    .inner-track {
        touch-action: none;
        transition: transform 0.5s ease-in-out;
    }
</style>
