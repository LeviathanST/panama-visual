import { env } from "$env/dynamic/private";

export const load = async ({ fetch }) => {
    const projectsRes = await fetch(env.BACKEND_URL + "/projects");

    const json1 = await projectsRes.json();
    return {
        project: json1,
    };
};
