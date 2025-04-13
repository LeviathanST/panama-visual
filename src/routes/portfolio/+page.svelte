<script lang="ts">
    import Address from "../../components/Address.svelte";
    import Footer from "../../components/Footer.svelte";
    import MenuMobile from "../../components/MenuMobile.svelte";
    import MenuOuter from "../../components/MenuOuter.svelte";
    import Contact from "../../components/portfolio/Contact.svelte";
    import TopHeader from "../../components/portfolio/TopHeader.svelte";
    import ProjectsGallery from "../../components/ProjectsGallery.svelte";

    let menuOpen = false;
    let toggleMenu = () => {
        menuOpen = !menuOpen;
    };
</script>

<link
    href="https://fonts.googleapis.com/css2?family=Jura:wght@300..700&display=swap"
    rel="stylesheet"
/>

<div id="app" class="font-display w-[100vw] h-[100vh] flex">
    <MenuMobile isOpen={menuOpen} />
    <div id="app-inner" class="flex-1 overflow-auto h-full w-full">
        <TopHeader {toggleMenu} />
        <div class="w-full h-[96px] bg-[rgb(31,32,34)]"></div>
        <div class="w-full max-[767px]:hidden">
            <MenuOuter />
        </div>
        <ProjectsGallery />
        <Contact />
        <Address />
        <Footer />
    </div>
</div>
