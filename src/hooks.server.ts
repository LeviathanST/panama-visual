import { env } from "$env/dynamic/private";
import { redirect, type Handle } from "@sveltejs/kit";

const protectedRoutes = ["/edit"];

export const handle: Handle = async ({ event, resolve }) => {
    const at = event.cookies.get("at");
    // TODO: refresh token
    const res = await fetch(env.BACKEND_URL + "/verify", {
        headers: {
            "Authorization": "Bearer " + at,
        },
    });
    protectedRoutes.forEach(route => {
        if (event.url.pathname.startsWith(route)) {
            if (!at) throw redirect(303, "/")
            if (res.status != 200 && res.status != 204)
                throw redirect(303, "/")
        }
    })
    const response = await resolve(event);
    if (response.status == 404) {
        throw redirect(303, "/");
    }
    return response;
}
