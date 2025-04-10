<script lang="ts">
    import { translate } from "../../stores/language";
    import { projectStore } from "../../stores/project";
    import { readCurrentCategory } from "../../stores/category";

    let visibleCount = 5;
    const increment = 10;
    // Reactive variable for current category
    $: currentCategory = $readCurrentCategory; // Directly use the store value
    $: filteredProjects = $projectStore.filter(
        (p) => p.category === currentCategory,
    );
    $: totalProjects = filteredProjects.length;
    $: hasMore = visibleCount < totalProjects;

    // Reset visibleCount when category changes
    readCurrentCategory.subscribe(() => {
        visibleCount = 5;
    });

    function loadMore() {
        visibleCount = Math.min(visibleCount + increment, totalProjects);
    }
</script>

<div>
    <div id="list-video" class="bg-[#1c1d1f] lv-homepage">
        {#each filteredProjects.slice(0, visibleCount) as project}
            <div class="item project-gallery" class:lv-big={project.id <= 2}>
                <img
                    src="images/xlarge/{project.image}"
                    class="img"
                    alt={project.title}
                />
                <div class="info text-white">
                    <div class="cate">{project.category}</div>
                    <h3>{project.title}</h3>
                    {#if project.time}
                        <div class="time">
                            <img
                                src="images/products_ico_clock.png"
                                alt="Clock"
                            />
                            <span>{project.time}</span>
                        </div>
                    {/if}
                    {#if project.description}
                        <div class="des">{project.description}</div>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    {#if hasMore}
        <div id="load-more-video">
            <button on:click={loadMore}>
                <span>{translate("SEE_MORE")}</span>
            </button>
        </div>
    {/if}
</div>

<style>
    .lv-homepage {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }

    #load-more-video {
        text-align: center;
        padding: 20px;
    }

    #load-more-video button {
        background: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        transition: background 0.3s;
    }

    #load-more-video button:hover {
        background: #ddd;
    }
</style>
