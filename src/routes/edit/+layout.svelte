<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import AppSidebar from "$lib/components/custom/edit/Sidebar.svelte";
    import SponsorsEdit from "$lib/components/custom/edit/SponsorEdit.svelte";
    import { selectedItem } from "$lib/stores/edit";
    import ProjectManager from "$lib/components/custom/edit/ProjectManager.svelte";
    import { page } from "$app/state";
    import CategoryInfoEdit from "$lib/components/custom/edit/CategoryInfoEdit.svelte";
    import ContactForm from "$lib/components/custom/edit/ContactForm.svelte";
    import Register from "$lib/components/custom/edit/Register.svelte";

    let { children } = $props();

    const projects = $derived(page.data.project?.data ?? []);
    const sponsors = $derived(page.data.sponsor?.data ?? []);
    const forms = $derived(page.data.forms?.data ?? []);
    const categoryInfo = $derived(page.data.categoryInfo?.data ?? []);

    const contentMap: Record<string, any> = {
        "Project Manager": ProjectManager,
        Sponsor: SponsorsEdit,
        "Guess Contact": ContactForm,
        "Category Info": CategoryInfoEdit,
        Register: Register,
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
                {:else if $selectedItem == "Sponsor"}
                    <div class="w-full max-[100%]">
                        <svelte:component
                            this={contentMap[$selectedItem]}
                            {sponsors}
                        />
                    </div>
                {:else if $selectedItem == "Guess Contact"}
                    <div class="w-full max-[100%]">
                        <svelte:component
                            this={contentMap[$selectedItem]}
                            {forms}
                        />
                    </div>
                {:else if $selectedItem == "Category Info"}
                    <div class="w-full max-[100%]">
                        <svelte:component
                            this={contentMap[$selectedItem]}
                            categories={categoryInfo}
                        />
                    </div>
                {:else if $selectedItem == "Register"}
                    <div class="w-full max-[100%]">
                        <svelte:component this={contentMap[$selectedItem]} />
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
