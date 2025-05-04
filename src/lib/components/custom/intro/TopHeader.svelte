<script lang="ts">
    import { page } from "$app/state";
    import { onMount } from "svelte";
    import Button from "../common/Button.svelte";
    import { translate } from "$lib/stores/language";

    let { toggleMenu } = $props();

    const currentPage: String = page.url.pathname;
    let isVisible: Boolean | undefined = $state();
    let contactSection: HTMLElement | null;

    onMount(() => {
        contactSection = document.getElementById("about-contact");
        let inner = document.getElementById("app-inner");
        isVisible = inner?.scrollTop <= 0;

        const handleScroll = () => {
            isVisible = inner?.scrollTop <= 0;
        };
        window.addEventListener("scroll", handleScroll, true);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
    const scrollToContact = () => {
        contactSection?.scrollIntoView({ behavior: "smooth" });
    };
</script>

<div
    class="top-header bg-transparent z-40 fixed w-full
            {isVisible
        ? 'min-[1200px]:h-[191px] min-[768px]:h-[108px] h-[66px]'
        : 'min-[1200px]:h-[70.85px] h-[68px]'}
            "
    class:default={isVisible}
>
    <div
        class="inner-top transition-all duration-300 flex items-center w-full justify-between
               min-[1200px]:px-[60px]
               min-[768px]:px-[27px]
               max-[768px]:px-[10px]

               {isVisible
            ? 'min-[1200px]:h-[191px] min-[1200px]:py-[58px] min-[768px]:h-[104px] min-[768px]:py-[30px] py-[10px]'
            : 'min-[1200px]:h-[66px] min-[768px]:h-[60px] py-[5px]'}"
    >
        <div
            class="hamburger-menu min-[1200px]:hidden cursor-pointer"
            onclick={toggleMenu}
        >
            <img
                class="h-[12px] w-auto"
                src="/images/mobile_ico_menu.png"
                alt="menu-icon"
            />
        </div>
        <div class="logo min-[1200px]:w-[164px] min-[768px]:w-[87.5px]">
            <a href="/">
                <img
                    class="transition-all duration-300
                        {isVisible
                        ? 'min-[1200px]:max-h-[73px] min-[768px]:max-h-[48px] max-h-[55px]'
                        : 'max-h-[55px]'}
                        "
                    src="/images/logo.png"
                    alt="logo"
                />
            </a>
        </div>
        <div
            class="contact-icon min-[1200px]:hidden cursor-pointer"
            onclick={scrollToContact}
        >
            <img
                class="h-[16px] w-auto"
                src="/images/mobile_ico_contact.png"
                alt="contact-icon"
            />
        </div>
        <div class="breadcrumbs max-[1200px]:hidden flex items-center h-[24px]">
            <h3 class:active={currentPage === "/"}>
                <a href="/">{translate("PANAMA_VISUAL")}</a>
            </h3>
            <div
                class="icon"
                class:home-active={currentPage === "/"}
                class:portfolio-active={currentPage === "/portfolio"}
            ></div>
            <h3 class:active={currentPage === "/portfolio"}>
                <a href="/portfolio">{translate("OUR_PORTFOLIO")}</a>
            </h3>
        </div>
        <div class="max-[1200px]:hidden">
            <Button content={translate("CONTACT")} onClick={scrollToContact} />
        </div>
    </div>
</div>

<style>
    .top-header.default {
        border-top: 5px solid var(--general-color);
        border-bottom: 1px solid transparent;
        transition: all 0.3s;
    }
    .top-header:not(.default) {
        border-top: 5px solid var(--general-color);
        border-bottom: 1px solid #2c2c2e;
        background-color: #1f2022;
        transition: all 0.3s;
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

    .breadcrumbs .icon::before {
        content: "";
        width: 5px;
        height: 5px;
        background: var(--general-color);
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
