<script lang="ts">
    import { get } from "svelte/store";
    import { translate } from "$lib/stores/language";
    import {
        categoryStore,
        readCurrentCategory,
        writeCurrentCategory,
    } from "$lib/stores/category";

    let categories = get(categoryStore);
    let selectedCategory = $state(get(readCurrentCategory));
    let { isOpen } = $props();
    function chooseCategory(event: MouseEvent, category: number) {
        selectedCategory = category;
        writeCurrentCategory.set(selectedCategory);
    }
</script>

<div
    class="slidebar bg-[#161719] h-full min-[1200px]:hidden overflow-hidden transition-all duration-300 ease-in-out"
    style="width: {isOpen ? '240px' : '0px'};"
>
    <div class="inner-content w-[240px]">
        <div class="social flex justify-center my-[15px]">
            <a href="/">
                <img src="/images/home-icon.png" alt="home-icon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61550655238112">
                <img src="/images/facebook-icon.png" alt="facebook-icon" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61550655238112">
                <img src="/images/youtube-icon.png" alt="youtube-icon" />
            </a>
        </div>
        <div
            class="title py-[9px] text-center text-[500] text-[16px] text-[#f60] bg-[hsla(0,0%,100%,.03)] tracking-[1px]"
        >
            {translate("OUR_PORTFOLIO")}
        </div>
        <div class="categories flex flex-wrap relative">
            {#each categories as item, index}
                <div class="menu-item w-[120px] py-[23px] h-[146px] relative">
                    <a
                        class="flex flex-col items-center w-full h-full py-[10px] {selectedCategory ==
                        item.id
                            ? 'active'
                            : ''}"
                        href="/portfolio"
                        onclick={(e) => chooseCategory(e, item.id)}
                    >
                        <div
                            class="img relative w-full flex justify-center h-[65px] mb-[15px]"
                        >
                            <img
                                class="transition-opacity duration-300 normal h-full"
                                src="/images/{item.normal}"
                                alt="{item.name}-icon"
                            />
                            <img
                                class="transition-opacity duration-300 hover h-full opacity-0 absolute"
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

                    {#if index % 2 === 1 && index < categories.length - 2 && index >= 1}
                        <div class="plus-sign"></div>
                    {/if}
                </div>
            {/each}
        </div>
        <div
            class="title py-[9px] text-center text-[500] text-[16px] text-[#f60] bg-[hsla(0,0%,100%,.03)] tracking-[1px]"
        >
            ECLIPS PICTURES
        </div>
    </div>
</div>

<style>
    .slidebar {
        box-sizing: border-box;
    }

    .inner-content {
        width: 240px;
        flex: 0 0 240px;
        max-width: 240px;
        box-sizing: border-box;
    }

    .slidebar .social a {
        display: flex;
        justify-content: center;
        width: 60px;
        border: 2px solid hsla(0, 0%, 100%, 0.2);
        margin: 0 6px;
        transition: all 0.3s;
    }

    .slidebar .social a:hover {
        border-color: #f60;
    }

    .slidebar .social a img {
        margin-top: 5px;
        margin-bottom: 5px;
        width: 26px;
        height: 26px;
    }

    .slidebar .menu-item a:hover .normal {
        opacity: 0;
    }
    .slidebar .menu-item a:hover .hover {
        opacity: 100;
    }
    .slidebar .menu-item a:hover span {
        color: #fff;
    }

    .slidebar .menu-item a.active .normal {
        opacity: 0;
    }
    .slidebar .menu-item a.active .hover {
        opacity: 100;
    }
    .slidebar .menu-item a.active span {
        color: #fff;
    }

    .plus-sign {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 25px;
        height: 25px;
        transform: translate(-50%, 50%);
    }

    .plus-sign::before {
        content: "";
        position: absolute;
        width: 25px;
        height: 1px;
        background: hsla(0, 0%, 100%, 0.1);
        top: 12.5px;
        left: 0;
    }

    .plus-sign::after {
        content: "";
        position: absolute;
        width: 1px;
        height: 25px;
        background: hsla(0, 0%, 100%, 0.1);
        left: 12.5px;
        top: 0;
    }
</style>
