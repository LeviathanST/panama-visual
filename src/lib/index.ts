// place files you want to import through the `$lib` alias in this folder.

import { env } from "$env/dynamic/private";
import { fail } from "@sveltejs/kit";

//
function parseFilename(url: string): string | null {
    try {
        const parsedUrl = new URL(url);
        const pathname = parsedUrl.pathname;
        const segments = pathname.split('/').filter(segment => segment.length > 0);
        const filename = segments[segments.length - 1];
        if (!filename) {
            return null;
        }
        return filename;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }
}
export async function removeFile(url: string, fetch: typeof globalThis.fetch): Promise<void> {
    const filename = parseFilename(url);
    if (!filename) {
        throw new Error("Invalid file URL");
    }
    console.log(env.ZIPLINE_URL + "/user/files/" + filename)
    const res = await fetch(env.ZIPLINE_URL + "/user/files/" + filename, {
        method: "GET",
        headers: {
            Authorization: env.ZIPLINE_TOKEN,
        },
    }).then(r => r.json());
    const id = res.id;

    const response = await fetch(env.ZIPLINE_URL + "/user/files/" + id, {
        method: "DELETE",
        headers: {
            Authorization: env.ZIPLINE_TOKEN,
        },
    });

    if (!response.ok) {
        console.error("Delete file failed with status:", response.status);
        throw new Error("Failed to delete file");
    }
}
export async function uploadFile(file: File, fetch: typeof globalThis.fetch): Promise<string | null> {
    if (!file || file.size === 0) {
        console.error("No file provided!");
        return null;
    }
    console.log(`File: ${file.name}, ${file.size} bytes, ${file.type} `);

    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });
        const result = await response.json();
        return result.files[0].url;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
}

