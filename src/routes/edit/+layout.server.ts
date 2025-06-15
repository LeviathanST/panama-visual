import { env } from "$env/dynamic/private";

export const load = async ({ fetch }) => {
    const res = await fetch(env.BACKEND_URL + "/projects");
    const json = await res.json();
    return {
        project: json,
    };
};
