<script>
    import { translate } from "../stores/language";
</script>

<div
    id="footer"
    class="w-full bg-[#121214] min-[1200px]:h-[101px] min-[768px]:h-[141px] max-[767px]:h-[161px]"
>
    <div
        class="inner w-full flex items-center justify-between px-[60px] py-[23px]
        max-[767px]:grid max-[767px]:grid-cols-2 max-[767px]:grid-rows-[auto_auto] max-[767px]:gap-y-4"
    >
        <div
            class="logo h-[52.0667px] w-[103px] max-[767px]:row-start-1 max-[767px]:col-start-1"
        >
            <a href="https://eclipspictures.com">
                <img
                    src="/images/header_img_logo.png"
                    alt="logo"
                    class="h-full w-full object-contain"
                />
            </a>
        </div>

        <div
            class="copyright text-white/20 text-center text-[14px]
            max-[767px]:col-span-2 max-[767px]:row-start-2"
        >
            {translate("COPYRIGHT")}
        </div>

        <div
            class="social flex max-[767px]:row-start-1 max-[767px]:col-start-2 max-[767px]:justify-self-end
            max-[767px]:gap-2 max-[767px]:items-center"
        >
            <a href="https://www.facebook.com/eclipspictures/">
                <img
                    src="/images/footer_ico_facebook.png"
                    alt="facebook-icon"
                />
            </a>
            <a href="https://www.youtube.com/VySlash">
                <img src="/images/footer_ico_youtube.png" alt="youtube-icon" />
            </a>
        </div>
    </div>
</div>
