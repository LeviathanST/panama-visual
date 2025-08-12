<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import Gallery from "lucide-svelte/icons/gallery-horizontal-end";
    import Phone from "lucide-svelte/icons/phone";
    import User from "lucide-svelte/icons/user";
    import { selectedItem } from "$lib/stores/edit";

    const items = [
        { title: "Project Manager", icon: Gallery },
        { title: "Sponsor", icon: User },
    ];
</script>

<Sidebar.Root>
    <Sidebar.Content>
        <Sidebar.Group>
            <Sidebar.GroupLabel class="text-[15px]"
                >Panama Dashboard</Sidebar.GroupLabel
            >
            <Sidebar.GroupContent>
                <Sidebar.Menu>
                    {#each items as item}
                        <Sidebar.MenuItem>
                            <Sidebar.MenuButton
                                onclick={() => ($selectedItem = item.title)}
                                class="w-full h-[40px] {$selectedItem ===
                                item.title
                                    ? 'bg-accent'
                                    : ''}"
                            >
                                <svelte:component
                                    this={item.icon}
                                    class="mr-2 h-4 w-4"
                                />
                                <span>{item.title}</span>
                            </Sidebar.MenuButton>
                        </Sidebar.MenuItem>
                    {/each}
                </Sidebar.Menu>
            </Sidebar.GroupContent>
        </Sidebar.Group>
    </Sidebar.Content>
</Sidebar.Root>
