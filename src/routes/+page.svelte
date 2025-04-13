<script lang="ts">
    import TopHeader from "../components/intro/TopHeader.svelte";
    import Banner from "../components/intro/Banner.svelte";
    import ProjectsGallery from "../components/ProjectsGallery.svelte";
    import Footer from "../components/Footer.svelte";
    import AboutContact from "../components/intro/AboutContact.svelte";
    import Partner from "../components/intro/Partner.svelte";
    import Address from "../components/Address.svelte";
    import MenuMobile from "../components/MenuMobile.svelte";

    let menuOpen = false;
    let toggleMenu = () => {
        menuOpen = !menuOpen;
    };
</script>

<div id="app" class="font-display w-[100vw] h-[100vh] flex">
    <MenuMobile isOpen={menuOpen} />
    <div id="app-inner" class="flex-1 overflow-auto">
        <TopHeader {toggleMenu} />
        <Banner />
        <ProjectsGallery autoLoad={false} />
        <AboutContact />
        <Partner />
        <Address />
        <Footer />
    </div>
</div>
