<script>
    import { translate } from "$lib/stores/language";
</script>

<div
    id="address"
    class="w-full flex min-[1200px]:h-[552.15px] max-[767px]:flex-wrap"
>
    <div
        class="address-bg flex items-center h-full bg-[url('/images/footer_bg_company.png')]
        w-[50%]
        max-[767px]:w-[100%]
        "
    >
        <div
            class="item px-[30px] w-full h-[232.15px] flex items-center justify-center"
        >
            <div class="inner-item w-[325px] h-[186.433px]">
                <p
                    class="text-[24px] tracking-[2px] text-[400] text-white mb-[35px]"
                >
                    ECLIPS PICTURES
                </p>
                <p class="text-[rgba(255,255,255,0.5)] text-[18px] mb-[20px]">
                    {translate("ADDRESS_1")}
                </p>
                <table class="phone text-[18px]">
                    <tbody
                        ><tr
                            ><th class="text-left">Mr. Vỹ</th>
                            <td
                                ><a
                                    class="transition-all duration-300 text-[#f60] hover:text-white"
                                    href="tel:0987833310">0987 833 310</a
                                ></td
                            ></tr
                        ></tbody
                    >
                </table>
            </div>
        </div>
    </div>
    <div
        class="address-bg w-[50%] flex items-center h-full bg-[url('/images/footer_bg_studios.png')]
        min-[1200px]:h-[552.15px]
        max-[767px]:w-[100%]
        "
    >
        <div
            class="item px-[30px] w-full h-[232.15px] flex items-center justify-center"
        >
            <div class="inner-item w-[325px] h-[186.433px]">
                <p
                    class="text-[24px] tracking-[2px] text-[400] text-white mb-[35px]"
                >
                    ECLIPS STUDIOS
                </p>
                <p class="text-[rgba(255,255,255,0.5)] text-[18px] mb-[20px]">
                    {translate("ADDRESS_2")}
                </p>
                <table class="phone text-[18px]">
                    <tbody
                        ><tr
                            ><th class="text-left">Mr. Vỹ</th>
                            <td
                                ><a
                                    class="transition-all duration-300 text-[#f60] hover:text-white"
                                    href="tel:0987833310">0987 833 310</a
                                ></td
                            ></tr
                        ><tr
                            ><th class="text-left">Facebook</th>
                            <td
                                ><a
                                    class="transition-all duration-300 text-[#f60] hover:text-white"
                                    href="https://www.facebook.com/eclipsstudio"
                                    >ECLIPS STUDIOS</a
                                ></td
                            ></tr
                        ></tbody
                    >
                </table>
            </div>
        </div>
    </div>
</div>

<style>
    #address .phone th {
        padding: 10px 20px 10px 0;
        color: hsla(0, 0%, 100%, 0.5);
    }
    #address .address-bg {
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: cover;
        padding: 75px 15px;
        font-weight: 400;
    }
    .address-bg {
        border-top: 1px solid #2d2d2f;
        border-bottom: 1px solid #2d2d2f;
    }
</style>
