<script lang="ts">
    import { get } from "svelte/store";
    import { translate } from "$lib/stores/language";
    import { categoryStore, writeCurrentCategory } from "$lib/stores/category";

    let selectedCategory = 1;
    let currentIndex = 0;
    let categories = get(categoryStore);

    function chooseCategory(event: MouseEvent, category: number) {
        event.preventDefault();
        selectedCategory = category;
        writeCurrentCategory.set(selectedCategory);
    }

    function slideLeft() {
        if (currentIndex <= 0) {
            return;
        }
        currentIndex -= 1;
        selectedCategory = currentIndex + 1;
        writeCurrentCategory.set(selectedCategory);
    }

    function slideRight() {
        if (currentIndex >= categories.length - 1) {
            return;
        }
        currentIndex += 1;
        selectedCategory = currentIndex + 1;
        writeCurrentCategory.set(selectedCategory);
    }
</script>

<div id="menu-outer" class="w-full">
    <!---Width smaller 768px-->
    <div
        class="min-[768px]:hidden w-full min-[1200px]:h-[166.6px] flex justify-center"
    >
        <div
            class="item-slider relative w-full h-[100px] flex items-center justify-between"
        >
            <div class="slider-container w-[100px] overflow-hidden">
                <div
                    class="slider-track flex transition-transform duration-300 ease-in-out"
                    style="transform: translateX(-{currentIndex * 100}px)"
                >
                    {#each categories as item, index}
                        <div class="menu-item w-[100px] flex-shrink-0">
                            <a
                                class="flex flex-col items-center w-full h-full py-[10px] {selectedCategory ==
                                item.id
                                    ? 'active'
                                    : ''}"
                                href="portfolio"
                                on:click={(e) => chooseCategory(e, item.id)}
                            >
                                <div
                                    class="img relative w-full flex justify-center h-[50px]"
                                >
                                    <img
                                        class="normal h-full"
                                        src="/images/{item.normal}"
                                        alt="{item.name}-icon"
                                    />
                                    <img
                                        class="hover h-full opacity-0 absolute"
                                        src="/images/{item.hover}"
                                        alt="hover-{item.name}-icon"
                                    />
                                </div>
                                <span
                                    class="text-[12px] text-[rgba(255,255,255,0.1)] text-center w-full mt-[5px]"
                                >
                                    {translate(item.name)}
                                </span>
                            </a>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="btn-move w-[96px] flex items-center justify-center">
                <button
                    class="arrow-left {currentIndex > 0
                        ? 'active'
                        : 'inactive'}"
                    on:click={slideLeft}
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
                    class="arrow-right {currentIndex < categories.length - 1
                        ? 'active'
                        : 'inactive'}"
                    on:click={slideRight}
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
            </div>
        </div>
    </div>

    <!---Width larger 768px-->
    <div class="menu max-[767px]:hidden w-full flex justify-center">
        {#each categories as item}
            <div
                class="menu-item inline-block relative
                       min-[1200px]:w-[199.917px]
                       min-[1200px]:h-[164.6px]
                       min-[768px]:w-[16.66%]
                       min-[768px]:h-[114.8px]
                "
            >
                <a
                    class="flex flex-col items-center w-full h-full py-[15px]
                    {selectedCategory == item.id ? 'active' : ''}"
                    href="portfolio?c={item.id}"
                    on:click={(e) => chooseCategory(e, item.id)}
                >
                    <div
                        class="img relative w-full flex justify-center
                        min-[1200px]:h-[90px]
                        min-[768px]:h-[50px]
                        "
                    >
                        <img
                            class="normal transition-all h-full duration-300 hover:opacity-0
                            min-[1200px]:h-[90px]
                            min-[768px]:h-[50px]
                            "
                            src="/images/{item.normal}"
                            alt="{item.name}-icon"
                        />
                        <img
                            class="hover transition-all h-full duration-300 opacity-0 hover:opacity-1 absolute"
                            src="/images/{item.hover}"
                            alt="hover-{item.name}-icon"
                        />
                    </div>
                    <span
                        class="transition-all duration-300 text-center w-full mt-[15px]
                            {selectedCategory != item.id
                            ? 'text-white/10'
                            : 'text-white'}
                            min-[1200px]:text-[18px]
                            min-[768px]:text-[14px]
                        "
                    >
                        {translate(item.name)}
                    </span>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    #menu-outer {
        background-color: #1c1d1f;
        border-top: 1px solid #2d2d2f;
        border-bottom: 1px solid #2d2d2f;
    }
    .menu .menu-item a {
        border-top: 8px solid transparent;
    }
    .menu .menu-item a:hover {
        border-top-color: var(--general-color);
    }
    .menu .menu-item a:hover .normal {
        opacity: 0;
    }
    .menu .menu-item a:hover .hover {
        opacity: 100;
    }
    .menu .menu-item a:hover span {
        color: #fff;
    }
    .menu .menu-item a.active {
        border-top-color: var(--general-color);
    }
    .menu .menu-item a.active .normal {
        opacity: 0;
    }
    .menu .menu-item a.active .hover {
        opacity: 100;
    }

    .item-slider .menu-item a.active .normal {
        opacity: 0;
    }
    .item-slider .menu-item a.active .normal {
        opacity: 0;
    }
    .item-slider .menu-item a.active .hover {
        opacity: 100;
    }
    .item-slider .menu-item a.active span {
        color: #fff;
    }
    .item-slider {
        position: relative;
    }
    .item-slider button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .item-slider .arrow-left.active {
        color: white;
        border: 1px solid white;
    }
    .item-slider .arrow-left.inactive {
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.5);
    }
    .item-slider .arrow-right.active {
        color: white;
        border: 1px solid white;
    }
    .item-slider .arrow-right.inactive {
        color: rgba(255, 255, 255, 0.5);
        border: 1px solid rgba(255, 255, 255, 0.5);
    }
</style>
