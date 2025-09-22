import { env } from "$env/dynamic/private";

export const load = async ({ fetch }) => {
    const projectsRes = await fetch(env.BACKEND_URL + "/projects");
    const categoryInfoRes = await fetch(env.BACKEND_URL + "/categories");

    const json1 = await projectsRes.json();
    const json2 = await categoryInfoRes.json();

    return {
        project: json1,
        categories: json2,
    };
};
