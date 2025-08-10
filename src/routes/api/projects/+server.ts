import { env } from "$env/dynamic/private";
import { removeFile } from "$lib";
import { fail, type RequestHandler } from "@sveltejs/kit";

export const DELETE: RequestHandler = async ({ request, cookies, fetch }) => {
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
    const project = await request.json();
    for (const url of project.images) {
        try {
            await removeFile(url, fetch);
        } catch (error) {
            console.warn(`Failed to delete image ${url}: `, error);
        }
    }
    if (project.video) {
        try {
            await removeFile(project.video.url, fetch);
        } catch (error) {
            console.warn(`Failed to delete video ${project.video.url}: `, error);
        }
    }
    if (project.thumbnail) {
        try {
            await removeFile(project.thumbnail, fetch);
        } catch (error) {
            console.warn(`Failed to delete thumbnail ${project.thumbnail}: `, error);
        }
    }

    const res = await fetch(env.BACKEND_URL + "/projects/" + project.id, {
        headers: {
            "Authorization": "Bearer " + at,
        },
        method: "DELETE",
    });
    console.log(res)
    const json = await res.json();
    if (res.status != 200 && res.status != 204)
        return new Response(JSON.stringify(json), {
            status: res.status, headers: {
                "Content-type": "application/json",
            }
        });
    return new Response(JSON.stringify(json), {
        status: res.status, headers: {
            "Content-type": "application/json",
        }
    });
}
