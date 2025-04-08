<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import Button from "../Button.svelte";

    let currentPage: String = page.url.pathname;
    let isVisible = true;
    onMount(() => {
        let previousScrollY = window.scrollY;
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            isVisible =
                scrollPosition < 100 || scrollPosition < previousScrollY;
            previousScrollY = scrollPosition;
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

<div
    class="top-header flex justify-center items-center z-40 fixed"
    class:default={isVisible}
>
    <div class="inner-top flex justify-between items-center">
        <div class="logo">
            <a href="/">
                <img src="/images/header_img_logo.png" alt="logo" />
            </a>
        </div>
        <div class="breadcrumbs flex items-center h-[24px]">
            <h3 class:active={currentPage === "/"}>
                <a href="/">ECLIPS PICTURES</a>
            </h3>
            <div
                class="icon"
                class:home-active={currentPage === "/"}
                class:portfolio-active={currentPage === "/portfolio"}
            ></div>
            <h3 class:active={currentPage === "/portfolio"}>
                <a href="/portfolio">OUR PORTFOLIO</a>
            </h3>
        </div>
        <Button href="contact" content="CONTACT" />
    </div>
</div>

<style>
    .top-header.default {
        height: 191px;
        width: 100%;
        border-top: 5px solid #f60;
        border-bottom: 1px solid transparent;
        background-color: transparent;
        transition: all 0.3s;
    }
    .top-header {
        height: 66px;
        width: 100%;
        border-top: 5px solid #f60;
        border-bottom: 1px solid #2c2c2e;
        background-color: #1f2022;
        transition: all 0.3s;
    }

    .inner-top {
        width: 94%;
        max-height: 185;
        top: 0;
    }
    .inner-top .logo {
        width: 164px;
    }

    .breadcrumbs .icon {
        display: inline-block;
        width: 65px;
        height: 1px;
        background: rgba(255, 255, 253, 0.25);
        position: relative;
        margin: 0 20px;
        vertical-align: middle;
    }

    .top-header.default .logo img {
        max-height: 69px;
        transition: all 0.3s;
    }
    .logo img {
        max-height: 40px;
        transition: all 0.3s;
    }

    .breadcrumbs .icon::before {
        content: "";
        width: 5px;
        height: 5px;
        background: #f60;
        position: absolute;
        top: -2px;
        left: 0; /* Default position */
        transform: rotate(45deg);
    }

    .breadcrumbs .icon.home-active::before {
        left: 0;
        right: auto;
    }

    .breadcrumbs .icon.portfolio-active::before {
        left: auto;
        right: 0;
    }

    .breadcrumbs h3 {
        color: rgba(255, 255, 255, 0.5);
        font-size: 16px;
        font-weight: 400;
        letter-spacing: 1px;
    }

    .breadcrumbs h3.active {
        color: #ffffff;
    }
</style>
