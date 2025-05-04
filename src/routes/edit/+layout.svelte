<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/custom/edit/Sidebar.svelte";
    import ProjectGalleryEdit from "$lib/components/custom/edit/ProjectGalleryEdit.svelte";
    import SponsorsEdit from "$lib/components/custom/edit/SponsorEdit.svelte";
    import OtherEdit from "$lib/components/custom/edit/OtherEdit.svelte";
    import { selectedItem } from "$lib/stores/edit";

    let { children } = $props();
    const contentMap: Record<string, any> = {
        "Project Gallery": ProjectGalleryEdit,
        Sponsor: SponsorsEdit,
        Other: OtherEdit,
    };
</script>

<Sidebar.Provider>
    <AppSidebar />
    <main class="flex min-h-screen w-full pl-0">
        <Sidebar.Trigger class="mb-4" />
        <div class="flex flex-col flex-1 items-center justify-center">
            {#if $selectedItem && $selectedItem in contentMap}
                <div class="w-full max-w-4xl">
                    <svelte:component this={contentMap[$selectedItem]} />
                </div>
            {:else}
                <div class="p-4 text-center text-muted-foreground">
                    Select an item from the sidebar
                </div>
            {/if}
            {@render children()}
        </div>
    </main>
</Sidebar.Provider>
