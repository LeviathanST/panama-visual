<script lang="ts">
    import TopHeader from "$lib/components/custom/intro/TopHeader.svelte";
    import Banner from "$lib/components/custom/intro/Banner.svelte";
    import ProjectsGallery from "$lib/components/custom/ProjectsGallery.svelte";
    import Footer from "$lib/components/custom/Footer.svelte";
    import AboutContact from "$lib/components/custom/intro/AboutContact.svelte";
    import Partner from "$lib/components/custom/intro/Partner.svelte";
    import Address from "$lib/components/custom/Address.svelte";
    import MenuMobile from "$lib/components/custom/MenuMobile.svelte";
    import { project2Store } from "$lib/stores/project";
    import { get } from "svelte/store";
    // TODO: uncomment when API is available
    // import { page } from "$app/state";
    const projects = get(project2Store);

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
        <ProjectsGallery {projects} autoLoad={false} />
        <AboutContact />
        <Partner />
        <Address />
        <Footer />
    </div>
</div>
