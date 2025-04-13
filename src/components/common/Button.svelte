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
        border: 2px solid #f60;
        padding: 7px 58px 7px 25px;
        font-size: 16px;
        font-weight: 400;
        background: url("/images/icon/ico_arrow_btn.png") right 21px center
            no-repeat;
        transition: all 0.3s;
    }
    .generic-btn:hover {
        background-color: #f60;
        background-image: url("/images/icon/hover_arrow_btn.png");
    }
</style>
