<script lang="ts">
    import "../../app.css";
    import * as SideBar from "$lib/components/ui/sidebar/index";
    import AppSideBar from "$lib/components/custom/edit/Sidebar.svelte";
    import ProjectGalleryEdit from "$lib/components/custom/edit/ProjectGalleryEdit.svelte";
    import { selectedItem } from "$lib/stores/edit";
    import AboutContactEdit from "$lib/components/custom/edit/AboutContactEdit.svelte";
    import SponsorsGrid from "$lib/components/custom/edit/SponsorEdit.svelte"; // New component
    import AddressEdit from "$lib/components/custom/edit/AddressEdit.svelte";

    let { children } = $props();

    type Component = typeof ProjectGalleryEdit;
    const contentMap: Record<string, Component> = {
        "Project Gallery": ProjectGalleryEdit,
        "About Contact": AboutContactEdit,
        Sponsors: SponsorsGrid,
        Address: AddressEdit,
    };
</script>

<SideBar.Provider>
    <AppSideBar />
    <main>
        <SideBar.Trigger />
        {#if $selectedItem && $selectedItem in contentMap}
            <svelte:component this={contentMap[$selectedItem]} />
        {:else}
            <div class="p-4">Select an item from the sidebar</div>
        {/if}
        {@render children()}
    </main>
</SideBar.Provider>
