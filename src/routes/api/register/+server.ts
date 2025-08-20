import { env } from "$env/dynamic/private";
import { type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies, request, fetch }) => {
    const at = cookies.get("at");
    if (!at) {
        return new Response(JSON.stringify({ message: "Missing token!" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const verify = await fetch(env.BACKEND_URL + `/verify`, {
        headers: {
            Authorization: `Bearer ${at}`,
        },
    });
    if (!verify.ok) return new Response(JSON.stringify({ message: "Invalid token!" }), {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
    });
    const body = await request.json();
    console.log(body)
    const res = await fetch(env.BACKEND_URL + "/register", {
        headers: {
            "Authorization": `Bearer ${at}`,
        },
        body: JSON.stringify({
            username: body.username,
            password: body.password,
        }),
        method: "POST",
    });
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
}


