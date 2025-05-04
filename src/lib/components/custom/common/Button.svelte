<script lang="ts">
    interface ButtonProps {
        content: string;
        onClick?: () => void;
    }
    let { content, onClick }: ButtonProps = $props();
</script>

<button
    class="generic-btn w-full h-full cursor-pointer items-center tracking-[1px]"
    onclick={onClick}
>
    <span>
        {content}
    </span>
</button>

<style>
    .generic-btn {
        color: #fff;
        border: 2px solid var(--general-color);
        padding: 7px 58px 7px 25px;
        font-size: 16px;
        font-weight: 400;
        background: url("/images/icon/arrow-right-solid.svg") right 20px center
            no-repeat;
        background-size: 23px 23px;
        transition: all 0.3s;
    }
    .generic-btn:hover {
        background-color: var(--general-color);
        background-image: url("/images/icon/arrow-right-solid-white.svg");
    }
</style>
