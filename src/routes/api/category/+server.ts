import { env } from "$env/dynamic/private";
import { type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ request, cookies }) => {
    const res = await fetch(env.BACKEND_URL + "category");
    const json = await res.json();
    if (json.status != 200)
        return new Response(JSON.stringify(json), {
            status: res.status,
            headers: { 'Content-Type': 'application/json' },
        });
    return new Response(JSON.stringify(json), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
    });
};
