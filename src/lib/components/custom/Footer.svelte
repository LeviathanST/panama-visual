<script>
    import { translate } from "$lib/stores/language";
</script>

<div
    id="footer"
    class="w-full bg-[#121214] min-[1200px]:h-[101px] max-[767px]:h-[161px]
        py-[23px]
        min-[1200px]:px-[60px] min-[768px]:px-[30px] px-[15px]
    "
>
    <div
        class="inner w-full flex items-center justify-between
        max-[767px]:grid max-[767px]:grid-cols-2 max-[767px]:grid-rows-[auto_auto] max-[767px]:gap-y-4
        min-[768px]:h-[60px] min-[575px]:h-[95px] h-[115px]
        "
    >
        <div
            class="logo h-[60px] w-[103px] max-[767px]:row-start-1 max-[767px]:col-start-1"
        >
            <a href="#">
                <img
                    src="/images/logo.png"
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
            <a href="https://www.facebook.com/profile.php?id=100092361582680">
                <img
                    src="/images/footer_ico_facebook.png"
                    alt="facebook-icon"
                />
            </a>
        </div>
    </div>
</div>
