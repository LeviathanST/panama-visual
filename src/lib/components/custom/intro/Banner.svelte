<script lang="ts">
    import Background from "./Background.svelte";
    import MenuOuter from "../MenuOuter.svelte";

    const { categoryInfo } = $props();
</script>

<header id="header" class="banner h-[85vw] max-w-full w-full flex flex-col">
    <Background />
    <MenuOuter {categoryInfo}/>
</header>
