<script lang="ts">
    import { writer } from "$lib/stores/other";
    import * as Card from "$lib/components/ui/card/index";
    import * as Input from "$lib/components/ui/input/index";
    import * as Textarea from "$lib/components/ui/textarea/index";
    import * as Button from "$lib/components/ui/button/index";
    import { cn } from "$lib/utils";
    import { get } from "svelte/store";

    type Errors = Record<string, string>;

    let { social, about, address } = get(writer);
    let facebook = social.facebook;
    let youtube = social.youtube;
    let studioAddress = address.studio.address;
    let studioNumber = address.studio.number;
    let studioNameFanpage = address.studio.name_fanpage;
    let studioLinkFanpage = address.studio.link_fanpage;
    let mainAddress = address.main.address;
    let mainNumber = address.main.number;
    let aboutText1 = about.text_1;
    let aboutText2 = about.text_2;
    let aboutText3 = about.text_3;
    let errors: Errors = {};
    let successMessage = "";

    function validateForm(): Errors {
        const newErrors: Errors = {};

        if (!studioAddress)
            newErrors.studioAddress = "Studio address is required";
        if (!studioNumber)
            newErrors.studioNumber = "Studio phone number is required";
        if (!studioNameFanpage)
            newErrors.studioNameFanpage = "Fanpage name is required";
        if (!studioLinkFanpage)
            newErrors.studioLinkFanpage = "Fanpage URL is required";
        if (!mainAddress) newErrors.mainAddress = "Main address is required";
        if (!mainNumber) newErrors.mainNumber = "Main phone number is required";
        if (!aboutText1) newErrors.aboutText1 = "About text 1 is required";
        if (!facebook || !facebook.startsWith("https://")) {
            newErrors.facebook = "Valid Facebook URL is required";
        }
        if (!youtube || !youtube.startsWith("https://")) {
            newErrors.youtube = "Valid YouTube URL is required";
        }

        return newErrors;
    }

    function handleSubmit() {
        errors = validateForm();

        if (Object.keys(errors).length > 0) {
            console.error("Validation errors:", errors);
            return;
        }

        //TODO:
        errors.general = "Save edit is not available!";
    }

    function handleReset() {
        facebook = social.facebook;
        youtube = social.youtube;
        studioAddress = address.studio.address;
        studioNumber = address.studio.number;
        studioNameFanpage = address.studio.name_fanpage;
        studioLinkFanpage = address.studio.link_fanpage;
        mainAddress = address.main.address;
        mainNumber = address.main.number;
        aboutText1 = about.text_1;
        aboutText2 = about.text_2;
        aboutText3 = about.text_3;
        errors = {};
        successMessage = "";
    }
</script>

<Card.Root class="w-full max-w-4xl mx-auto">
    <Card.Header>
        <Card.Title>Edit Address, About, and Social Information</Card.Title>
        <Card.Description
            >Update the address, about, and social media details.</Card.Description
        >
    </Card.Header>
    <Card.Content>
        {#if successMessage}
            <div class="text-green-500 text-sm mb-4 text-center">
                {successMessage}
            </div>
        {/if}
        {#if errors.general}
            <div class="text-red-500 text-sm mb-4 text-center">
                {errors.general}
            </div>
        {/if}
        <form
            id="studio-address-form"
            class="grid gap-6"
            on:submit|preventDefault={handleSubmit}
        >
            <!-- Address and About Sections -->
            <div class="grid gap-6 md:grid-cols-2 md:gap-8">
                <!-- Address Section -->
                <div class="grid gap-6 border p-4 rounded-lg">
                    <div class="grid gap-4">
                        <h3 class="text-lg font-semibold">Studio Address</h3>
                        <div class="grid gap-2">
                            <label
                                for="studio-address"
                                class="text-sm font-medium leading-none"
                                >Address</label
                            >
                            <Input.Input
                                id="studio-address"
                                name="studioAddress"
                                type="text"
                                bind:value={studioAddress}
                                placeholder="Enter studio address"
                                class={cn(
                                    "w-full",
                                    errors.studioAddress && "border-red-500",
                                )}
                            />
                            {#if errors.studioAddress}
                                <p class="text-red-500 text-sm">
                                    {errors.studioAddress}
                                </p>
                            {/if}
                        </div>
                        <div class="grid gap-2">
                            <label
                                for="studio-number"
                                class="text-sm font-medium leading-none"
                                >Phone Number</label
                            >
                            <Input.Input
                                id="studio-number"
                                name="studioNumber"
                                type="text"
                                bind:value={studioNumber}
                                placeholder="Enter studio phone number"
                                class={cn(
                                    "w-full",
                                    errors.studioNumber && "border-red-500",
                                )}
                            />
                            {#if errors.studioNumber}
                                <p class="text-red-500 text-sm">
                                    {errors.studioNumber}
                                </p>
                            {/if}
                        </div>
                        <div class="grid gap-2">
                            <label
                                for="studio-name-fanpage"
                                class="text-sm font-medium leading-none"
                                >Fanpage Name</label
                            >
                            <Input.Input
                                id="studio-name-fanpage"
                                name="studioNameFanpage"
                                type="text"
                                bind:value={studioNameFanpage}
                                placeholder="Enter fanpage name"
                                class={cn(
                                    "w-full",
                                    errors.studioNameFanpage &&
                                        "border-red-500",
                                )}
                            />
                            {#if errors.studioNameFanpage}
                                <p class="text-red-500 text-sm">
                                    {errors.studioNameFanpage}
                                </p>
                            {/if}
                        </div>
                        <div class="grid gap-2">
                            <label
                                for="studio-link-fanpage"
                                class="text-sm font-medium leading-none"
                                >Fanpage URL</label
                            >
                            <Input.Input
                                id="studio-link-fanpage"
                                name="studioLinkFanpage"
                                type="text"
                                bind:value={studioLinkFanpage}
                                placeholder="Enter fanpage URL"
                                class={cn(
                                    "w-full",
                                    errors.studioLinkFanpage &&
                                        "border-red-500",
                                )}
                            />
                            {#if errors.studioLinkFanpage}
                                <p class="text-red-500 text-sm">
                                    {errors.studioLinkFanpage}
                                </p>
                            {/if}
                        </div>
                    </div>
                    <div class="grid gap-4">
                        <h3 class="text-lg font-semibold">Main Address</h3>
                        <div class="grid gap-2">
                            <label
                                for="main-address"
                                class="text-sm font-medium leading-none"
                                >Address</label
                            >
                            <Input.Input
                                id="main-address"
                                name="mainAddress"
                                type="text"
                                bind:value={mainAddress}
                                placeholder="Enter main address"
                                class={cn(
                                    "w-full",
                                    errors.mainAddress && "border-red-500",
                                )}
                            />
                            {#if errors.mainAddress}
                                <p class="text-red-500 text-sm">
                                    {errors.mainAddress}
                                </p>
                            {/if}
                        </div>
                        <div class="grid gap-2">
                            <label
                                for="main-number"
                                class="text-sm font-medium leading-none"
                                >Phone Number</label
                            >
                            <Input.Input
                                id="main-number"
                                name="mainNumber"
                                type="text"
                                bind:value={mainNumber}
                                placeholder="Enter main phone number"
                                class={cn(
                                    "w-full",
                                    errors.mainNumber && "border-red-500",
                                )}
                            />
                            {#if errors.mainNumber}
                                <p class="text-red-500 text-sm">
                                    {errors.mainNumber}
                                </p>
                            {/if}
                        </div>
                    </div>
                </div>

                <!-- About Section -->
                <div class="grid gap-4 border p-4 rounded-lg">
                    <h3 class="text-lg font-semibold">About</h3>
                    <div class="grid gap-2">
                        <label
                            for="about-text-1"
                            class="text-sm font-medium leading-none"
                            >About Text 1</label
                        >
                        <Textarea.Textarea
                            id="about-text-1"
                            name="aboutText1"
                            bind:value={aboutText1}
                            placeholder="Enter first about text"
                            class={cn(
                                "w-full min-h-[100px]",
                                errors.aboutText1 && "border-red-500",
                            )}
                        />
                        {#if errors.aboutText1}
                            <p class="text-red-500 text-sm">
                                {errors.aboutText1}
                            </p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label
                            for="about-text-2"
                            class="text-sm font-medium leading-none"
                            >About Text 2</label
                        >
                        <Textarea.Textarea
                            id="about-text-2"
                            name="aboutText2"
                            bind:value={aboutText2}
                            placeholder="Enter second about text"
                            class={cn(
                                "w-full min-h-[100px]",
                                errors.aboutText2 && "border-red-500",
                            )}
                        />
                        {#if errors.aboutText2}
                            <p class="text-red-500 text-sm">
                                {errors.aboutText2}
                            </p>
                        {/if}
                    </div>
                    <div class="grid gap-2">
                        <label
                            for="about-text-3"
                            class="text-sm font-medium leading

-none">About Text 3</label
                        >
                        <Textarea.Textarea
                            id="about-text-3"
                            name="aboutText3"
                            bind:value={aboutText3}
                            placeholder="Enter third about text"
                            class={cn(
                                "w-full min-h-[100px]",
                                errors.aboutText3 && "border-red-500",
                            )}
                        />
                        {#if errors.aboutText3}
                            <p class="text-red-500 text-sm">
                                {errors.aboutText3}
                            </p>
                        {/if}
                    </div>
                </div>
            </div>

            <!-- Social Media Section -->
            <div
                data-testid="social-section"
                class="grid gap-4 border p-6 rounded-lg z-10 relative min-h-[200px]"
            >
                <h3 class="text-lg font-semibold">Social Media</h3>
                <div class="grid gap-2">
                    <label
                        for="facebook"
                        class="text-sm font-medium leading-none"
                        >Facebook URL</label
                    >
                    <Input.Input
                        id="facebook"
                        name="facebook"
                        type="url"
                        bind:value={facebook}
                        placeholder="Enter Facebook URL"
                        class={cn(
                            "w-full",
                            errors.facebook && "border-red-500",
                        )}
                    />
                    {#if errors.facebook}
                        <p class="text-red-500 text-sm">{errors.facebook}</p>
                    {/if}
                </div>
                <div class="grid gap-2">
                    <label
                        for="youtube"
                        class="text-sm font-medium leading-none"
                        >YouTube URL</label
                    >
                    <Input.Input
                        id="youtube"
                        name="youtube"
                        type="url"
                        bind:value={youtube}
                        placeholder="Enter YouTube URL"
                        class={cn("w-full", errors.youtube && "border-red-500")}
                    />
                    {#if errors.youtube}
                        <p class="text-red-500 text-sm">{errors.youtube}</p>
                    {/if}
                </div>
            </div>
        </form>
    </Card.Content>
    <Card.Footer class="flex justify-end gap-2">
        <Button.Button
            onclick={handleReset}
            variant="outline"
            class="cursor-pointer"
        >
            Reset
        </Button.Button>
        <Button.Button
            type="submit"
            form="studio-address-form"
            variant="default"
            class="cursor-pointer"
        >
            Save
        </Button.Button>
    </Card.Footer>
</Card.Root>
