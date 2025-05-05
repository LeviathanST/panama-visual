import { redirect, type Handle } from "@sveltejs/kit";

const protectedRoutes = ["/edit"];

export const handle: Handle = async ({ event, resolve }) => {
    // TODO: Verify user session from server
    const session = event.cookies.get("session");
    protectedRoutes.forEach(route => {
        if (event.url.pathname.startsWith(route) && (!session || session != "admin")) {
            throw redirect(303, "/")
        }
    })

    const response = await resolve(event);
    if (response.status == 404) {
        throw redirect(303, "/");
    }
    return response;
}
