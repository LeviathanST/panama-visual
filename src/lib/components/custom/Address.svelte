<script>
    import { translate } from "$lib/stores/language";
</script>

<div
    id="address"
    class="w-full flex min-[1200px]:h-[552.15px] max-[767px]:flex-wrap"
>
    <div
        class="address-bg flex items-center h-full bg-[url('/images/address-bg.jpg')] w-full"
    >
        <div
            class="item px-[30px] w-full h-[232.15px] flex items-center justify-center"
        >
            <div class="overlay bg-[rgba(0,0,0,0.6)] p-[20px] rounded-[10px]">
                <div class="inner-item w-[325px]">
                    <p
                        class="text-[24px] tracking-[2px] text-[400] text-white mb-[35px]"
                    >
                        PANAMA VISUAL
                    </p>
                    <p
                        class="text-[rgba(255,255,255,0.5)] text-[18px] mb-[20px]"
                    >
                        {translate("ADDRESS_1")}
                    </p>
                    <table class="phone text-[18px]">
                        <tbody>
                            <tr>
                                <th class="text-left">Phone:</th>
                                <td>
                                    <a
                                        class="transition-all duration-300 text-[var(--general-color)] hover:text-white"
                                        href="tel:0896207092">0896 207 092</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th class="text-left">Email:</th>
                                <td>
                                    <a
                                        class="transition-all duration-300 text-[var(--general-color)] hover:text-white"
                                        href="mailto:Utloc241183@gmail.com"
                                        >Utloc241183@gmail.com</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                        <tbody>
                            <tr>
                                <th class="text-left">Facebook:</th>
                                <td>
                                    <a
                                        class="transition-all duration-300 text-[var(--general-color)] hover:text-white"
                                        href="https://www.facebook.com/profile.php?id=100092361582680"
                                        >Panama Visual</a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
