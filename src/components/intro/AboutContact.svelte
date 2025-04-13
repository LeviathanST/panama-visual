<script lang="ts">
    import { translate } from "../../stores/language";
    import Button from "../common/Button.svelte";

    let aboutActive = true;
    let toggleActive = (about: boolean) => {
        aboutActive = about;
    };
</script>

<div
    id="about-contact"
    class=" bg-[#1f2022] w-full {aboutActive
        ? 'min-[1200px]:h-[743.083px]'
        : 'min-[768px]:h-[875.967px]'}"
>
    <div
        class="ac-inner min-[1200px]:max-w-[1260px] min-[768px]:w-full flex min-[768px]:flex-nowrap flex-wrap my-0 mx-auto px-[30px] pb-[110px]"
    >
        <div
            class="ac-tab about
            text-center
            w-[100%]
            min-[768px]:text-left
            min-[768px]:w-[50%]
            "
            class:active={aboutActive}
        >
            <div
                class="transition-all duration-300 title inline-block text-[rgba(255,255,255,0.2)] text-[24px] tracking-[1px] font-[400] pb-[20px] border-transparent
                pt-[50px]
                min-[768px]:pt-[110px]
                min-[768px]:mb-[45px]
                min-[768px]:border-b-[8px]
                max-[767px]:text-[#fe6501]"
                on:click={() => {
                    if (!aboutActive) toggleActive(true);
                }}
            >
                {translate("ABOUT_US")}
            </div>
            <div
                class="content flex min-[768px]:hidden min-[768px]:w-[200%] max-[1199px]:flex-col-reverse"
            >
                <div
                    class="info leading-[1.3]
                    min-[1200px]:pt-[50px]
                    min-[1200px]:pr-[50px]
                    min-[1200px]:w-[50%]

                    min-[768px]:w-[100%]"
                >
                    <div class="des mb-[20px]">
                        <div class="des-1 mb-[15px] text-white text-[18px]">
                            {translate("ABOUT_TEXT_1")}
                        </div>
                        <div class="des-2 text-[#acaeb1] text-[18px]">
                            <p>{translate("ABOUT_TEXT_2")}</p>
                            <br />
                            <p>{translate("ABOUT_TEXT_3")}</p>
                        </div>
                    </div>

                    <div
                        class="social-btn w-full h-[130px] flex
                        min-[768px]:w-[550px]
                        min-[768px]:h-[50px]
                        max-[767px]:items-center
                        max-[767px]:flex-col"
                    >
                        <div
                            class="social flex justify-center max-[767px]:mb-[30px]"
                        >
                            <a
                                href="https://www.facebook.com/eclipspictures/"
                                class="transition-opacity duration-200 mr-[12px] w-[75px] h-[50px] border-[2px] border-solid border-[hsla(0,0%,100%,0.1)] flex items-center justify-center opacity-50 hover:border-[hsla(0,0%,100%,0.5)] hover:opacity-100"
                            >
                                <img
                                    class="w-[38px] h-[38px]"
                                    src="/images/facebook-icon.png"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://www.youtube.com/VySlash"
                                class="transition-opacity duration-200 mr-[12px] w-[75px] h-[50px] border-[2px] border-solid border-[hsla(0,0%,100%,0.1)] flex items-center justify-center opacity-50 hover:border-[hsla(0,0%,100%,0.5)] hover:opacity-100"
                            >
                                <img src="/images/youtube-icon.png" alt="" />
                            </a>
                        </div>
                        <div class="see-more w-[233.117px] h-[50px]">
                            <Button content={translate("LEARN_MORE")} />
                        </div>
                    </div>
                </div>
                <div
                    class="img
                    min-[1200px]:h-[323px]
                    min-[1200px]:w-[50%]

                    min-[768px]:w-[100%]
                    min-[768px]:h-[60vw]
                    "
                >
                    <video
                        class="max-[1199px]:h-full max-[1199px]:w-full"
                        autoplay
                        loop
                    >
                        <source
                            src="/videos/video-content.mp4"
                            type="video/mp4"
                        />
                    </video>
                </div>
            </div>
        </div>
        <div
            class="ac-tab contact w-[100%]
            text-center
            min-[768px]:text-right
            min-[768px]:w-[50%]"
            class:active={!aboutActive}
        >
            <div
                class="transition-all duration-300 title inline-block text-[rgba(255,255,255,0.2)] text-[24px] tracking-[1px] font-[400] pb-[20px] border-transparent
                pt-[50px]
                min-[768px]:pt-[110px]
                min-[768px]:mb-[45px]
                min-[768px]:border-b-[8px]
                max-[767px]:text-[#fe6501]"
                on:click={() => {
                    if (aboutActive) {
                        toggleActive(false);
                    }
                }}
            >
                {translate("CONTACT_US")}
            </div>
            <div
                class="content items-center justify-center
                w-[100%]
                min-[768px]:-translate-x-[50%]
                min-[768px]:hidden
                min-[768px]:w-[200%]"
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
    #about-contact .contact form .txt {
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
        #about-contact .contact form .button:hover {
            color: #fe6501;
            border-color: #fe6501;
        }
        #about-contact .title:hover {
            border-color: #fe6501;
            color: #fff;
        }
        #about-contact .ac-tab.active .title,
        .ac-tab.active .title {
            color: white;
            border-bottom-color: #fe6501;
        }
        .ac-tab.active .content {
            display: flex;
        }
    }
</style>
