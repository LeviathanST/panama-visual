import { redirect } from "@sveltejs/kit";
import type { Action } from "./$types";

export const actions: Action = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        if (username == password) {
            cookies.set("session", "admin", {
                path: "/"
            });
            throw redirect(303, "/edit")
        }
    }
}
