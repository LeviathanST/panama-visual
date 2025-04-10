<script lang="ts">
    interface ButtonProps {
        href: string;
        content: string;
        className?: string;
    }
    let { href, content, className }: ButtonProps = $props();
</script>

<div class="generic-btn items-center tracking-[1px] max-[1200px]:hidden">
    <a {href}>
        {content}
    </a>
</div>

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
