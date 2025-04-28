<script lang="ts">
    import { itemWriter } from "$lib/stores/sponsor";
    import * as Card from "$lib/components/ui/card/index";
    import * as Input from "$lib/components/ui/input/index";
    import * as Button from "$lib/components/ui/button/index";
    import { cn } from "$lib/utils";
    import { derived, writable } from "svelte/store";

    // Search state
    let searchQuery = writable<string>("");
    let searchError = writable<string>("");

    // Pagination state
    const itemsPerPage = 8;
    let currentPage = writable<number>(1);

    // Derived store for filtered and paginated sponsors
    const filteredSponsors = derived(
        [itemWriter, searchQuery],
        ([$itemWriter, $searchQuery]) => {
            let filtered = $itemWriter;
            if ($searchQuery.trim()) {
                try {
                    const regex = new RegExp($searchQuery, "i"); // Case-insensitive
                    filtered = $itemWriter.filter((sponsor) =>
                        regex.test(sponsor.alt),
                    );
                    searchError.set("");
                } catch (e) {
                    searchError.set("Invalid regex pattern");
                    filtered = [];
                }
            }
            return filtered;
        },
    );

    // Derived store for paginated sponsors
    const paginatedSponsors = derived(
        [filteredSponsors, currentPage],
        ([$filteredSponsors, $currentPage]) => {
            const start = ($currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            return $filteredSponsors.slice(start, end);
        },
    );

    // Total pages
    $: totalPages = Math.ceil($filteredSponsors.length / itemsPerPage);

    // Reset to page 1 when search query changes
    $: $searchQuery, currentPage.set(1);

    // Add a new sponsor
    function addSponsor() {
        itemWriter.update((current) => [
            ...current,
            {
                id: current.length,
                src: "/images/sponsors/placeholder.png",
                alt: `New Sponsor ${current.length + 1}`,
            },
        ]);
    }

    // Pagination navigation
    function goToPage(page: number) {
        if (page >= 1 && page <= totalPages) {
            currentPage.set(page);
        }
    }
</script>

<div class="container mx-auto p-4">
    <h2 class="text-2xl font-bold mb-6 text-center">Our Sponsors</h2>

    <!-- Search Input -->
    <div class="mb-6">
        <Input.Input
            type="text"
            placeholder="Search sponsors by alt text (e.g., Sponsor.*)"
            bind:value={$searchQuery}
            class="w-full max-w-md mx-auto"
        />
        {#if $searchError}
            <p class="text-red-500 text-sm mt-2 text-center">{$searchError}</p>
        {/if}
    </div>

    <!-- Add Sponsor Button -->
    <Button.Button
        onclick={addSponsor}
        class="mb-6 mx-auto block"
        variant="default"
    >
        Add Test Sponsor
    </Button.Button>

    <!-- Sponsors Grid -->
    {#if $filteredSponsors.length === 0}
        <p class="text-center text-muted-foreground">No sponsors found.</p>
    {:else}
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {#each $paginatedSponsors as sponsor (sponsor.id)}
                <Card.Root class="overflow-hidden">
                    <Card.Content class="p-0">
                        <img
                            src={sponsor.src}
                            alt={sponsor.alt}
                            class={cn("w-full h-32 object-contain p-4")}
                            loading="lazy"
                        />
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    {/if}

    <!-- Pagination Controls -->
    {#if totalPages > 1}
        <div class="flex items-center justify-center gap-2 mt-6">
            <Button.Button
                onclick={() => goToPage($currentPage - 1)}
                disabled={$currentPage === 1}
                variant="outline"
            >
                Previous
            </Button.Button>
            <span class="text-sm text-muted-foreground">
                Page {$currentPage} of {totalPages}
            </span>
            <Button.Button
                onclick={() => goToPage($currentPage + 1)}
                disabled={$currentPage === totalPages}
                variant="outline"
            >
                Next
            </Button.Button>
        </div>
    {/if}
</div>
