<script lang="ts">
    import { circIn } from "svelte/easing";
    import { fade } from "svelte/transition";
    import { translate } from "$lib/stores/language";
    import { onMount } from "svelte";
    let isLoaded = false;
    let menuOuter: HTMLElement | null;

    const handleOnLoading = () => {
        isLoaded = true;
    };
    onMount(() => {
        menuOuter = document.getElementById("menu-outer");
    });
    const scrollToGallery = () => {
        menuOuter?.scrollIntoView({ behavior: "smooth" });
    };
</script>

<div class="bg h-full w-full relative">
    <img
        src="/images/header_bg_banner_mask.png"
        alt="bg-mask"
        class="absolute w-full h-full z-[3]"
    />
    <!-- {#if !isLoaded} -->
    <!--     <img -->
    <!--         src="/images/address-bg.jpg" -->
    <!--         alt="bg-mask-video" -->
    <!--         class="absolute w-full h-full z-[2]" -->
    <!--         transition:fade={{ duration: 2000, easing: circIn }} -->
    <!--     /> -->
    <!-- {/if} -->
    <div class="bg-inner w-full top-[0px] h-full">
        <img
            style="width: 100%; height: 100%; left: 0px; top: 0;"
            src="/images/header-bg.jpg"
            alt="Header bg"
        />
        <!-- <iframe -->
        <!--     id="YTPlayer-ID-1744134110124" -->
        <!--     class="ytplayer-player" -->
        <!--     style="width: 100%; height: 100%; left: 0px; top: 0;" -->
        <!--     frameborder="0" -->
        <!--     allowfullscreen -->
        <!--     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" -->
        <!--     referrerpolicy="strict-origin-when-cross-origin" -->
        <!--     title="banner" -->
        <!--     on:load={handleOnLoading} -->
        <!--     src="https://www.youtube.com/embed/lG-fqfLrZms?iv_load_policy=3&amp;modestbranding=0&amp;autoplay=1&amp;controls=0&amp;showinfo=0&amp;wmode=opaque&amp;branding=0&amp;rel=0&amp;start=0&amp;mute=1&amp;loop=1&amp;playlist=lG-fqfLrZms&amp" -->
        <!-- ></iframe> -->
    </div>
    <div
        class="slide top-1/2 -translate-y-1/2 z-[4] w-full max-h-full absolute"
    >
        <h1
            class="max-w-full font-[300] mx-[15px] h-full flex items-center justify-center flex-wrap
            min-[1200px]:pb-[60px]
            min-[768px]:pb-[20px]
            "
        >
            <span
                class="leading-[39.6px] text-white tracking-[3px] mb-[5px] text-center w-full h-[39.6px] min-[1200px]:text-[36px] min-[768px]:text-[20px]"
                >{translate("SIMPLICITY_IS")}</span
            >
            <strong
                class=" text-[var(--general-color)] tracking-[1px] text-center w-full
                min-[1200px]:leading-[66px]
                min-[1200px]:h-[66px]
                min-[1200px]:text-[60px]

                min-[768px]:leading-[38.5px]
                min-[768px]:text-[35px]
                min-[768px]:h-[38.5px]
                ">{translate("ULTIMATE_SOPHISTICATION")}</strong
            >
        </h1>
    </div>
    <div
        class="max-[1200px]:hidden social z-[4] mt-[90px] left-[60px] top-1/2 -translate-y-1/2 absolute"
    >
        <div
            class="social-inner -rotate-90 translate-x-[-50%] translate-y-[5px]"
        >
            <a
                class="tracking-[1px]"
                href="https://www.facebook.com/profile.php?id=100092361582680"
                >Facebook Fanpage</a
            >
        </div>
    </div>
    <div
        class="mouse absolute pb-[30px] bottom-0 left-[50%] z-4 cursor-pointer
               max-[767px]:hidden
        "
        on:click={scrollToGallery}
    >
        <img src="images/header_ico_mouse.png" alt="Scroll Down" />
    </div>
</div>

<style>
    .bg {
        overflow: hidden;
    }
    .bg .slide h1::after,
    .bg .slide h1::before {
        content: "";
        position: absolute;
        left: 50%;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
    }
    .bg .slide h1::before {
        bottom: -1px;
        z-index: 1;
        width: 35px;
        height: 2px;
        background: var(--general-color);
    }
    .bg .slide h1::after {
        bottom: 0;
        z-index: 0;
        max-width: 330px;
        width: 100%;
        height: 1px;
        background: hsla(0, 0%, 100%, 0.1);
    }
    .social-inner a:first-child {
        margin-right: 90px;
    }
    .social-inner a {
        color: rgba(255, 255, 255, 0.5);
        transition: all 0.3s;
    }
    .social-inner a:hover {
        color: #fff;
        transition: all 0.3s;
    }
    .bg .social-inner a::before {
        content: "";
        width: 4px;
        height: 4px;
        background: var(--general-color);
        display: inline-block;
        transform: rotate(45deg);
        margin-right: 8px;
    }
</style>
