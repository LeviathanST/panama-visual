import { env } from "$env/dynamic/private";

export const POST = async ({ locals, cookies, request }) => {
    const body = await request.json();
    const json = await fetch(env.BACKEND_URL + "/login", {
        body: JSON.stringify({
            username: body.username,
            password: body.password,
        }),
        method: "POST",
    }).then(t => t.json());
    if (json.status != 200)
        return new Response(JSON.stringify({ message: json.message }), {
            status: json.status,
            headers: { 'Content-Type': 'application/json' },
        });
    locals = {
        user: json.data.at
    }
    cookies.set('Authorization', json.data.at, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
    });
    return new Response(JSON.stringify(json), {
        status: json.status,
        headers: { 'Content-Type': 'application/json' },
    });
}

