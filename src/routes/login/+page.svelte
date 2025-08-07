<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Input } from "$lib/components/ui/input";
    async function handleSubmit(e: SubmitEvent): Promise<void> {
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const res = await fetch("/api/login", {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.get("username")?.toString(),
                password: formData.get("password")?.toString(),
            }),
            method: "POST",
        }).then((r) => r.json());
        if (res.status != 200) return alert(res.message);
    }
</script>

<div class="flex min-h-screen items-center justify-center bg-background">
    <div class="w-full max-w-md space-y-8 rounded-lg bg-card p-8 shadow-lg">
        <h1 class="text-3xl font-bold text-center text-foreground">Login</h1>
        <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div class="space-y-2">
                <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your username"
                    required
                />
            </div>
            <div class="space-y-2">
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    required
                />
            </div>
            <Button
                type="submit"
                class="w-full cursor-pointer border-solid border-[1px] hover:bg-[#d3d3d3]"
                >Log In</Button
            >
        </form>
        <p class="text-center text-sm text-muted-foreground"></p>
    </div>
</div>
