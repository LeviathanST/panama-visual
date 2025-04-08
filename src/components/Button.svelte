<script>
    export let href = "/";
    export let content = "Default";
</script>

<a {href} class="btn-contact">
    {content}
</a>

<style>
    .btn-contact {
        display: flex;
        align-items: center;
        color: #fff;
        letter-spacing: 1px;
        border: 2px solid #f60;
        padding: 7px 58px 7px 25px;
        font-size: 16px;
        font-weight: 400;
        background: url("/images/icon/ico_arrow_btn.png") right 21px center
            no-repeat;
        transition: all 0.3s;
    }
    .btn-contact:hover {
        background-color: #f60;
        background-image: url("/images/icon/hover_arrow_btn.png");
    }
</style>
