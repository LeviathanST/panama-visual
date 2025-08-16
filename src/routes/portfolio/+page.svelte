<script lang="ts">
    import { page } from "$app/state";
    import Address from "$lib/components/custom/Address.svelte";
    import Footer from "$lib/components/custom/Footer.svelte";
    import MenuMobile from "$lib/components/custom/MenuMobile.svelte";
    import MenuOuter from "$lib/components/custom/MenuOuter.svelte";
    import Contact from "$lib/components/custom/portfolio/Contact.svelte";
    import TopHeader from "$lib/components/custom/portfolio/TopHeader.svelte";
    import ProjectsGallery from "$lib/components/custom/ProjectsGallery.svelte";
    const projects = page.data.project.data;

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
        <ProjectsGallery {projects} />
        <Contact />
        <Address />
        <Footer />
    </div>
</div>
