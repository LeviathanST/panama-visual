<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/custom/edit/Sidebar.svelte";
    import SponsorsEdit from "$lib/components/custom/edit/SponsorEdit.svelte";
    import { selectedItem } from "$lib/stores/edit";
    import ProjectManager from "$lib/components/custom/edit/ProjectManager.svelte";
    import { page } from "$app/state";

    let { children } = $props();

    const projects = $derived(page.data.project?.data ?? []);
    const sponsors = $derived(page.data.sponsor?.data ?? []);

    const contentMap: Record<string, any> = {
        "Project Manager": ProjectManager,
        Sponsor: SponsorsEdit,
    };
</script>

<Sidebar.Provider>
    <AppSidebar />
    <main class="flex min-h-screen w-full pl-0">
        <Sidebar.Trigger class="mb-4" />
        <div class="flex flex-col flex-1 items-center justify-center">
            {#if $selectedItem && $selectedItem in contentMap}
                {#if $selectedItem == "Project Manager"}
                    <div class="w-full max-[100%]">
                        <svelte:component
                            this={contentMap[$selectedItem]}
                            {projects}
                        />
                    </div>
                {:else}
                    <div class="w-full max-[100%]">
                        <svelte:component
                            this={contentMap[$selectedItem]}
                            {sponsors}
                        />
                    </div>
                {/if}
            {:else}
                <div class="p-4 text-center text-muted-foreground">
                    Select an item from the sidebar
                </div>
            {/if}
            {@render children()}
        </div>
    </main>
</Sidebar.Provider>
