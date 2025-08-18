
import { env } from "$env/dynamic/private";
import { type RequestHandler } from "@sveltejs/kit";

export const PUT: RequestHandler = async ({ cookies, request, fetch }) => {
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
    const res = await fetch(env.BACKEND_URL + "/contact-forms/" + body.id, {
        headers: {
            Authorization: `Bearer ${at}`,
        },
        body: JSON.stringify({
            value: body.is_confirmed,
        }),
        method: "PUT",
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

export const DELETE: RequestHandler = async ({ cookies, request, fetch }) => {
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
    const res = await fetch(env.BACKEND_URL + "/contact-forms/" + body.id, {
        headers: {
            Authorization: `Bearer ${at}`,
        },
        method: "DELETE",
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


