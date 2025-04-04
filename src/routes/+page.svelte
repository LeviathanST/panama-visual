<script lang="ts">
    import Button from "../components/button.svelte";
    import { getStores } from '$app/stores';
    import { currentLanguage } from "../stores/sample";
    import { onMount } from "svelte";
    let {stores}=$props();

    let current_language=currentLanguage;

    current_language.subscribe((value)=>{
      
    })
 
let mapping_object = {
    // Header content
    'ECLIPS_PICTURES': {
        'en': 'ECLIPS PICTURES',
        'vi': 'ECLIPS PICTURES'
    },
    'OUR_PORTFOLIO': {
        'en': 'OUR PORTFOLIO',
        'vi': 'CÁC DỰ ÁN'
    },
    'CONTACT': {
        'en': 'CONTACT',
        'vi': 'LIÊN HỆ'
    },
    'SIMPLICITY_IS': {
        'en': 'SIMPLICITY IS',
        'vi': 'ĐƠN GIẢN LÀ'
    },
    'ULTIMATE_SOPHISTICATION': {
        'en': 'THE ULTIMATE SOPHISTICATION',
        'vi': 'ĐỈNH CAO CỦA SỰ TINH TẾ'
    },
    
    // Menu categories
    'VISUALS_VJ': {
        'en': 'Visuals/VJ',
        'vi': 'Visuals/VJ'
    },
    'AFTERMV': {
        'en': 'AfterMV',
        'vi': 'AfterMV'
    },
    'TVC_VIRAL': {
        'en': 'TVC/Viral',
        'vi': 'TVC/Viral'
    },
    'ECLIPS_STUDIO': {
        'en': 'Eclips Studio',
        'vi': 'Eclips Studio'
    },
    'PHOTOS': {
        'en': 'Photos',
        'vi': 'Hình ảnh'
    },
    'OTHERS': {
        'en': 'Others',
        'vi': 'Khác'
    },
    
    // About section
    'ABOUT_US': {
        'en': 'ABOUT US',
        'vi': 'NÓI VỀ CHÚNG TÔI'
    },
    'ABOUT_TEXT_1': {
        'en': 'In 2009, the idea of the name Eclips was formed from the two words Easy-Clips with the initial goal of just producing simple entertainment clips, serving a certain target audience.',
        'vi': 'Vào năm 2009, ý tưởng cái tên Eclips được hình thành bởi 2 từ Easy-Clips với mục tiêu ban đầu chỉ là sản xuất những clip giải trí đơn giản, phục vụ 1 số đối tượng khách hàng nhất định.'
    },
    'ABOUT_TEXT_2': {
        'en': 'After 6 years of operation, accumulating experience and knowledge, in April 2015, Vỹ Vlash decided to establish a company of the same name with the slogan "Simplicity is the ultimate sophistication" - Leonardo Davinci. Therefore, Eclips\'s products always aim to be concise and succinct without reducing the effectiveness for customers. With what has been, is being and will be done, the product is our voice throughout Eclips Pictures\' operation.',
        'vi': 'Sau 6 năm hoạt động, tích lũy kinh nghiệm và kiến thức, tháng 4 năm 2015, Vỹ Vlash quyết định thành lập công ty cùng tên với slogan "Simplicity is the ultimate sophistication" ( Đơn giản là đỉnh cao của sự tinh tế ) - Leonardo Davinci. Vì thế, những sản phẩm của Eclips luôn hướng tới sự ngắn gọn, xúc tích nhưng không giảm đi tính hiệu quả mang lại cho khách hàng. Với những gì đã, đang và sẽ làm, sản phẩm chính là tiếng nói của chúng tôi trong suốt quá trình hoạt động của Eclips Pictures.'
    },
    'LEARN_MORE': {
        'en': 'LEARN MORE',
        'vi': 'TÌM HIỂU THÊM'
    },
    
    // Contact form
    'CONTACT_US': {
        'en': 'CONTACT US',
        'vi': 'LIÊN HỆ VỚI CHÚNG TÔI'
    },
    'YOUR_NAME': {
        'en': 'Your Name',
        'vi': 'Tên của Quý Khách'
    },
    'EMAIL_ADDRESS': {
        'en': 'Email Address',
        'vi': 'Địa chỉ Email'
    },
    'INTEREST_AREA': {
        'en': 'Area of Interest',
        'vi': 'Lĩnh vực quan tâm'
    },
    'CONTENT': {
        'en': 'Content',
        'vi': 'Nội dung'
    },
    'SEND': {
        'en': 'SEND',
        'vi': 'GỬI'
    },
    
    // Footer
    'SEE_MORE': {
        'en': 'SEE MORE',
        'vi': 'XEM THÊM'
    },
    'COPYRIGHT': {
        'en': '© 2017 Eclips Pictures. Trademarks and brands are the property of their respective owners.',
        'vi': '© 2017 Eclips Pictures. Trademarks and brands are the property of their respective owners.'
    }
}

// Helper function to get translation
function translate(key: string): string {
    const lang = $current_language;
    return mapping_object[key as keyof typeof mapping_object]?.[lang] || key;
}

// Portfolio projects (sample data, would typically come from an API)
let projects = [
    {
        id: 1,
        title: "ECLIPS PICTURES - Con rồng cháu tiên - Thanh âm đất việt [ 3D Mapping ]",
        category: "Visuals/VJ",
        image: "projects/651wReRZO2OO95JuVEc50cx07BdYnXeaSGbVa5oz.jpeg",
        time: "15-03-2025 / Svd Quốc Gia Mỹ Đình",
        description: "Client: T&T Group & SHB\nAgency: Hcc productions\nECLIPS PICTURES\nwww.eclipspictures.com"
    },
    {
        id: 2,
        title: "Eclips Pictures - HUYỀN SỬ MỘT VÙNG ĐẤT [ 3D Mapping ]",
        category: "Visuals/VJ",
        image: "projects/V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg",
        time: "SƠN TÂY",
        description: "SƠN TÂY 3D MAPPING - HUYỀN SỬ MỘT VÙNG ĐẤT\nAgency: Hàm Nghi\nĐạo diễn: Đặng Lê Minh Trí\nVisuals: Eclips Pictures"
    },
    {
        id: 3,
        title: "PAIN - ORINGCHAINS [INTO THE O]",
        category: "Visuals/VJ",
        image: "projects/RphZjvRbzfydBwbq7IVyfPs0qkOWKpt2FjmdFrzx.jpeg",
        time: "03-05-2024",
        description: "ECLIPS PICTURES\nwww.eclipspictures.com"
    },
    {
        id: 4,
        title: "CLASSMATE [Highlight]",
        category: "Visuals/VJ",
        image: "projects/fxbmc3mAlHFWrzm75YZwn9YPSFUETjyjN3yuE85V.jpeg"
    },
    {
        id: 5,
        title: "RHAPSODY THÁNG 10 - Oringchains [ Official Lyric MV ]",
        category: "Visuals/VJ",
        image: "projects/O2ITKRUrvch4GeFwutTsbzDA3YwYRo1SMSrGuzgJ.jpeg",
        time: "10-10-2023",
        description: "Visuals: ECLIPS PICTURES\nwww.eclipspictures.com"
    }
];

// Menu categories
let categories = [
    { id: 1, name: 'VISUALS_VJ', icon: 'quickmenu_ico_visuals.png', iconHover: 'quickmenu_ico_visuals_hover.png' },
    { id: 2, name: 'AFTERMV', icon: 'quickmenu_ico_aftermovie.png', iconHover: 'quickmenu_ico_aftermovie_hover.png' },
    { id: 3, name: 'TVC_VIRAL', icon: 'quickmenu_ico_tvc.png', iconHover: 'quickmenu_ico_tvc_hover.png' },
    { id: 4, name: 'ECLIPS_STUDIO', icon: 'quickmenu_ico_livecam.png', iconHover: 'quickmenu_ico_livecam_hover.png' },
    { id: 5, name: 'PHOTOS', icon: 'quickmenu_ico_photos.png', iconHover: 'quickmenu_ico_photos_hover.png' },
    { id: 6, name: 'OTHERS', icon: 'quickmenu_ico_others.png', iconHover: 'quickmenu_ico_others_hover.png' }
];

// Active category
let activeCategory = 1;

function setActiveCategory(id: number) {
    activeCategory = id;
    // In a real app, you would filter projects based on the category
}

let isMenuOpen = false;

function toggleMenu() {
    isMenuOpen = !isMenuOpen;
}

</script>

<div id="app">
    <!-- Header -->
    <header id="header">
        <div class="banner">
            <div id="top-header" class="top">
                <div class="inner-top">
                    <!-- Mobile menu -->
                    <div class="menu-mobile">
                        <div 
                            class="menu-icon" 
                            onclick={toggleMenu} 
                            onkeydown={(e) => e.key === 'Enter' && toggleMenu()} 
                            role="button" 
                            tabindex="0" 
                            aria-label="Toggle Menu">
                            <img src="images/mobile_ico_menu.png" alt="Menu" />
                        </div>
                        <div class="slidebar" class:open={isMenuOpen}>
                            <div class="social">
                                <a href="/"><img src="images/home-icon.png" alt="Home" /></a>
                                <a href="https://www.facebook.com/eclipspictures/"><img src="images/facebook-icon.png" alt="Facebook" /></a>
                                <a href="https://www.youtube.com/VySlash"><img src="images/youtube-icon.png" alt="YouTube" /></a>
                            </div>
                            <div class="title">{translate('OUR_PORTFOLIO')}</div>
                            <div class="menu-slidebar">
                                {#each categories as category}
                                    <div class="menu-item" class:active={activeCategory === category.id}>
                                        <a href="/portfolio?c={category.id}" onclick={(event) => { event.preventDefault(); setActiveCategory(category.id); }}>
                                            <div class="img">
                                                <img src="images/{category.icon}" class="normal" alt={translate(category.name)} />
                                                <img src="images/{category.iconHover}" class="hover" alt={translate(category.name)} />
                                            </div>
                                            <span>{translate(category.name)}</span>
                                        </a>
                                    </div>
                                {/each}
                            </div>
                            <div class="title">{translate('ECLIPS_PICTURES')}</div>
                        </div>
                    </div>
                    
                    <!-- Logo -->
                    <div class="logo">
                        <a href="/"><img src="images/header_img_logo.png" alt="Eclips Pictures" /></a>
                    </div>
                    
                    <!-- Breadcrumbs -->
                    <div class="breadcrumbs">
                        <h3 class="active"><a href="/">{translate('ECLIPS_PICTURES')}</a></h3>
                        <div class="icon"></div>
                        <h3><a href="/portfolio">{translate('OUR_PORTFOLIO')}</a></h3>
                    </div>
                    
                    <!-- Contact Desktop -->
                    <div class="contact-desktop">
                        <div class="social-contact">
                            <a href="https://www.facebook.com/eclipspictures/"><img src="images/facebook-icon.png" alt="Facebook" /></a>
                            <a href="https://www.youtube.com/VySlash"><img src="images/youtube-icon.png" alt="YouTube" /></a>
                        </div>
                        <a href="#about-contact" class="btn-contact scrollto-contact-form">{translate('CONTACT')}</a>
                    </div>
                    
                    <!-- Mobile Contact Icon -->
                    <div class="contact">
                        <a href="#about-contact" class="scrollto-contact-form">
                            <img src="images/mobile_ico_contact.png" alt="Contact" />
                        </a>
                    </div>
                </div>
            </div>
            
            <!-- Main Slide/Headline -->
            <div class="slide">
                <h1>
                    <span>{translate('SIMPLICITY_IS')}</span>
                    <strong>{translate('ULTIMATE_SOPHISTICATION')}</strong>
                </h1>
            </div>
            
            <!-- Mouse Scroll Indicator -->
            <div class="mouse">
                <img src="images/header_ico_mouse.png" alt="Scroll Down" />
            </div>
            
            <!-- Social Links -->
            <div class="social">
                <div class="social-inner">
                    <a href="https://www.facebook.com/eclipspictures/">Facebook Fanpage</a>
                    <a href="https://www.youtube.com/VySlash">Youtube Channel</a>
                </div>
            </div>
            
            <!-- YouTube Background -->
            <div class="youtube-bg">
                <img src="images/header_bg_banner_mask.png" class="youtube-relative" alt="" />
                <div class="youtube-inner">
                    <img src="images/header_bg_banner_mask.png" class="youtube-overlay" alt="" />
                    <div id="page-youtube" data-video-id="lG-fqfLrZms" class="loaded">
                        <img src="images/header_img_banner_video.png" class="youtube-first" alt="" />
                        <!-- YouTube iframe would be loaded here by JS -->
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Menu Categories -->
        <div class="menu-outer">
            <div class="menu">
                {#each categories as category}
                    <div class="menu-item" class:active={activeCategory === category.id}>
                        <a href="/portfolio?c={category.id}" onclick={(event) => { event.preventDefault(); setActiveCategory(category.id); }}>
                            <div class="img">
                                <img src="images/{category.icon}" class="normal" alt={translate(category.name)} />
                                <img src="images/{category.iconHover}" class="hover" alt={translate(category.name)} />
                            </div>
                            <span>{translate(category.name)}</span>
                        </a>
                    </div>
                {/each}
            </div>
            <div class="arrow-menu">
                <div class="prev"></div>
                <div class="next"></div>
            </div>
        </div>
    </header>
    
    <!-- Projects Gallery -->
    <div>
        <div id="list-video" class="lv-homepage">
            {#each projects as project}
                <div class="item project-gallery" class:lv-big={project.id <= 2}>
                    <img src="images/xlarge/{project.image}" class="img" alt={project.title} />
                    <div class="info">
                        <div class="cate">{project.category}</div>
                        <h3>{project.title}</h3>
                        {#if project.time}
                            <div class="time">
                                <img src="images/products_ico_clock.png" alt="Clock" />
                                <span>{project.time}</span>
                            </div>
                        {/if}
                        {#if project.description}
                            <div class="des">{project.description}</div>
                        {/if}
                    </div>
                </div>
            {/each}
        </div>
        <div id="load-more-video">
            <span>{translate('SEE_MORE')}</span>
        </div>
    </div>
    
    <!-- About and Contact Section -->
    <div id="about-contact">
        <div class="ac-inner">
            <!-- About Tab -->
            <div class="ac-tab about active">
                <div class="title">{translate('ABOUT_US')}</div>
                <div class="ac-content">
                    <div class="content-inner">
                        <div class="img">
                            <video width="100%" autoplay loop muted playsinline>
                                <source src="https://eclipspictures.com/storage/videos/Sn9M4mghe1xdvXYHX6NsEg8hyDiSxl1BZnYpPg7N.mp4" type="video/mp4" />
                                <!-- Add captions for accessibility -->
                                <track kind="captions" srclang="en" label="English" default /> 
                            </video>
                        </div>
                        <div class="info-social">
                            <div class="info">
                                <div class="des-1">{translate('ABOUT_TEXT_1')}</div>
                                <div class="des-2">{translate('ABOUT_TEXT_2')}</div>
                            </div>
                            <div class="social-btn">
                                <div class="social">
                                    <a href="https://www.facebook.com/eclipspictures/"><img src="images/facebook-icon.png" alt="Facebook" /></a>
                                    <a href="https://www.youtube.com/VySlash"><img src="images/youtube-icon.png" alt="YouTube" /></a>
                                </div>
                                <div class="see-more">
                                    <a href="javascript:void(0);">{translate('LEARN_MORE')}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- Contact Tab -->
            <div class="ac-tab contact">
                <div class="title">{translate('CONTACT_US')}</div>
                <div class="ac-content">
                    <form method="POST" action="contact">
                        <input type="text" placeholder={translate('YOUR_NAME')} class="txt" />
                        <input type="email" placeholder={translate('EMAIL_ADDRESS')} class="txt" />
                        <input type="text" placeholder={translate('INTEREST_AREA')} class="txt" />
                        <textarea rows="3" placeholder={translate('CONTENT')} class="txt tea"></textarea>
                        <div class="btn-phone">
                            <input type="submit" value={translate('SEND')} class="button" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Partners Section (simplified) -->
    <div id="partner">
        <div class="inner">
            <!-- Partner logos would be dynamically loaded here -->
        </div>
    </div>
    
    <!-- Address Section -->
    <div id="address">
        <div class="inner">
            <div class="item address-1">
                <div class="inner-item">
                    <div class="title">ECLIPS PICTURES</div>
                    <address>Số 35/91/378 Thụy Khuê - Q.Tây Hồ - Hà Nội</address>
                    <table class="phone">
                        <tbody>
                            <tr>
                                <th>Mr. Vỹ</th>
                                <td><a href="tel:0987833310">0987 833 310</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="item address-2">
                <div class="inner-item">
                    <div class="title">ECLIPS STUDIO</div>
                    <address>Số 1/196 Nguyễn Sơn - Q.Long Biên - Hà Nội</address>
                    <table class="phone">
                        <tbody>
                            <tr>
                                <th>Mr. Vỹ</th>
                                <td><a href="tel:0987833310">0987 833 310</a></td>
                            </tr>
                            <tr>
                                <th>Facebook</th>
                                <td><a href="https://www.facebook.com/eclipsstudio">ECLIPS STUDIO</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Footer -->
    <footer id="footer">
        <div class="inner">
            <a href="/" class="logo">
                <img src="images/header_img_logo.png" alt="Eclips Pictures" />
            </a>
            <div class="copyright">{translate('COPYRIGHT')}</div>
            <div class="social">
                <a href="https://www.facebook.com/eclipspictures/"><img src="images/footer_ico_facebook.png" alt="Facebook" /></a>
                <a href="https://www.youtube.com/VySlash"><img src="images/footer_ico_youtube.png" alt="YouTube" /></a>
            </div>
        </div>
    </footer>
</div>

<style>
    /* You would import styles from external CSS files or define them here */
    /* For a real implementation, we would likely move styles to separate files */
    
    /* Basic styling just to give structure - in a real app would be more comprehensive */
    :global(body) {
        margin: 0;
        padding: 0;
        font-family: 'Jura', sans-serif;
    }
    
    #app {
        width: 100%;
        position: relative;
    }
    
    .banner {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
    
    .youtube-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
    
    .menu-outer {
        width: 100%;
        background-color: #fff;
        padding: 10px 0;
    }
    
    .menu {
        display: flex;
        justify-content: center;
        max-width: 1200px;
        margin: 0 auto;
    }
    
    .menu-item {
        margin: 0 15px;
        cursor: pointer;
    }
    
    .menu-item.active {
        font-weight: bold;
    }
    
    .lv-homepage {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    
    .lv-big {
        grid-column: span 2;
    }
    
    #about-contact {
        background-color: #f5f5f5;
        padding: 50px 0;
    }
    
    .ac-inner {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
    }
    
    #partner {
        padding: 30px 0;
        background-color: #fff;
    }
    
    #address {
        background-color: #333;
        color: #fff;
        padding: 30px 0;
    }
    
    #footer {
        background-color: #222;
        color: #fff;
        padding: 20px 0;
        text-align: center;
    }
    
    .inner {
        max-width: 1200px;
        margin: 0 auto;
    }
    
    @media (max-width: 768px) {
        .lv-homepage {
            grid-template-columns: 1fr;
        }
        
        .lv-big {
            grid-column: span 1;
        }
        
        .menu-mobile {
            display: block;
        }
        
        .menu-outer {
            display: none;
        }
    }
</style>