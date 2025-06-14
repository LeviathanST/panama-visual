import { browser } from "$app/environment";
import { env } from "$env/dynamic/private";
import { redirect, type Handle } from "@sveltejs/kit";
import { AsyncLocalStorage } from "node:async_hooks";

const protectedRoutes = ["/edit"];

export const handle: Handle = async ({ event, resolve }) => {
    const authHeader = event.cookies.get('Authorization');
    // TODO: refresh token
    const res = await fetch(env.BACKEND_URL + "/verify", {
        headers: {
            "Authorization": "Bearer " + authHeader,
        },
    });
    protectedRoutes.forEach(route => {
        if (event.url.pathname.startsWith(route) && res.status != 200 && res.status != 204) {
            throw redirect(303, "/")
        }
    })
    const response = await resolve(event);
    if (response.status == 404) {
        throw redirect(303, "/");
    }
    return response;
}
