<script lang="ts">
    let menu_items = [
        {
            name: "Visuals/VJ",
            normal: "quickmenu_ico_visuals.png",
            hover: "quickmenu_ico_visuals_hover.png",
            category: 1,
        },
        {
            name: "AfterMV",
            normal: "quickmenu_ico_aftermovie.png",
            hover: "quickmenu_ico_aftermovie_hover.png",
            category: 2,
        },
        {
            name: "TVC/Viral",
            normal: "quickmenu_ico_tvc.png",
            hover: "quickmenu_ico_tvc_hover.png",
            category: 3,
        },
        {
            name: "Eclips Studio",
            normal: "quickmenu_ico_livecam.png",
            hover: "quickmenu_ico_livecam_hover.png",
            category: 4,
        },
        {
            name: "Photos",
            normal: "quickmenu_ico_photos.png",
            hover: "quickmenu_ico_photos_hover.png",
            category: 5,
        },
        {
            name: "Others",
            normal: "quickmenu_ico_others.png",
            hover: "quickmenu_ico_others_hover.png",
            category: 6,
        },
    ];

    let selectedCategory = 1;
    function chooseCategory(event: MouseEvent, category: number) {
        event.preventDefault(); // Prevent navigation if desired
        selectedCategory = category;
    }
</script>

<div class="menu-outer w-full">
    <div class="menu w-full flex justify-center">
        {#each menu_items as item}
            <div
                class="menu-item inline-block relative
                       min-[1200px]:w-[199.917px]
                       min-[1200px]:h-[164.6px]

                       min-[768px]:w-[16.66%]
                       min-[768px]:h-[114.8px]
                "
            >
                <a
                    class="flex flex-col items-center w-full h-full portfolio py-[15px]
                    {selectedCategory == item.category ? 'active' : ''}"
                    href="portfolio?c={item.category}"
                    on:click={(e) => chooseCategory(e, item.category)}
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
                            class="hover transition-all h-full duration-300 opacity-0 absolute"
                            src="/images/{item.hover}"
                            alt="hover-{item.name}-icon"
                        />
                    </div>
                    <span
                        class="transition-all duration-300 text-center w-full mt-[15px]
                            min-[1200px]:text-[18px]
                            min-[768px]:text-[14px]
                        "
                    >
                        {item.name}
                    </span>
                </a>
            </div>
        {/each}
    </div>
</div>

<style>
    .menu-outer {
        background-color: #1c1d1f;
        border-top: 1px solid #2d2d2f;
        border-bottom: 1px solid #2d2d2f;
    }

    .menu-item img {
        display: block;
    }
    .menu-item span {
        color: rgba(255, 255, 255, 0.1);
    }
    .menu-item a {
        border-top: 8px solid transparent;
    }
    .menu-item a:hover {
        border-top-color: #f60;
    }
    .menu-item a:hover span {
        color: #fff;
    }
    .menu-item a:hover .normal {
        opacity: 0;
    }
    .menu-item a:hover .hover {
        opacity: 100;
    }
    .menu-item .active {
        border-top: 8px solid transparent;
    }
    .menu-item .active {
        border-top-color: #f60;
    }
    .menu-item .active span {
        color: #fff;
    }
    .menu-item .active .normal {
        opacity: 0;
    }
    .menu-item .active .hover {
        opacity: 100;
    }
</style>
