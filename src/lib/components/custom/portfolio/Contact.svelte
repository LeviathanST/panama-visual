<script>
    import { translate } from "$lib/stores/language";
</script>

<div id="about-contact" class=" bg-[#1f2022] w-full min-[768px]:h-[875.967px]">
    <div
        class="ac-inner px-[30px] pb-[110px] max-w-[1260px] mx-auto min-[768px]:w-full"
    >
        <div class="ac-tab contact w-[100%] text-center active">
            <div
                class="transition-all duration-300 title inline-block text-[rgba(255,255,255,0.2)] text-[24px] tracking-[1px] font-[400] pb-[20px] border-transparent
                pt-[50px]
                min-[768px]:pt-[110px]
                min-[768px]:mb-[45px]
                min-[768px]:border-b-[8px]
                max-[767px]:text-[var(--general-color)]"
            >
                {translate("CONTACT_US")}
            </div>
            <div
                class="content items-center justify-center
                w-[100%]
                min-[768px]:hidden"
            >
                <form
                    class="mx-0
                    min-[768px]:my-auto
                    min-[768px]:max-w-[680px]"
                    action="contact"
                >
                    <input
                        class="txt
                        max-[767px]:m-0
                        "
                        type="text"
                        placeholder={translate("YOUR_NAME")}
                    />
                    <input
                        class="txt"
                        type="email"
                        placeholder={translate("EMAIL_ADDRESS")}
                    />
                    <input
                        class="txt"
                        type="text"
                        placeholder={translate("INTEREST_AREA")}
                    />
                    <textarea
                        class="txt tea"
                        rows="3"
                        placeholder={translate("CONTENT")}
                    ></textarea>
                    <div
                        class="submit-button mt-[50px] h-[65px] flex text-[300] text-white items-center justify-center min-[768px]:w-[708px]"
                    >
                        <input
                            class="transition-all duration-300 button w-full h-full border-[2px] border-solid border-white min-[768px]:w-[calc(50%-28px)]"
                            type="submit"
                            value={translate("SEND")}
                        />
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
    .contact form .txt {
        padding: 0 0 15px;
        margin: 55px 0 0;
        margin-top: 55px;
        border: none;
        border-bottom-width: medium;
        border-bottom-style: none;
        border-bottom-color: currentcolor;
        outline: none;
        background: transparent;
        width: 100%;
        text-align: center;
        font-size: 20px;
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
    }
    @media only screen and (min-width: 768px) {
        .contact form .button:hover {
            color: var(--general-color);
            border-color: var(--general-color);
        }
        .title:hover {
            border-color: var(--general-color);
            color: #fff;
        }
        .ac-tab.active .title,
        .ac-tab.active .title {
            color: white;
            border-bottom-color: var(--general-color);
        }
        .ac-tab.active .content {
            display: flex;
        }
    }
</style>
