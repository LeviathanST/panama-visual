import { env } from "$env/dynamic/private";
import { fail } from '@sveltejs/kit';
import type { Actions } from "../$types";
import { removeFile, uploadFile } from "$lib";

export const load = async ({ cookies }) => {
    const projectRes = await fetch(env.BACKEND_URL + "/projects");
    const sponsorRes = await fetch(env.BACKEND_URL + "/sponsors");
    const categoryInfoRes = await fetch(env.BACKEND_URL + "/categories");

    const at = cookies.get("at");
    const contactRes = await fetch(env.BACKEND_URL + "/contact-forms", {
        headers: {
            Authorization: `Bearer ${at}`,
        },
    });

    const projectJson = await projectRes.json();
    const sponsorJson = await sponsorRes.json();
    const contactJson = await contactRes.json();
    const categoryInfoJson = await categoryInfoRes.json();

    return {
        project: projectJson,
        sponsor: sponsorJson,
        forms: contactJson,
        categoryInfo: categoryInfoJson,
    };
};


export const actions: Actions = {
    addSponsor: async ({ request, cookies, fetch }) => {
        const at = cookies.get("at");
        if (!at) {
            return fail(401, { error: "Authentication token missing" });
        }
        const verify = await fetch(env.BACKEND_URL + `/verify`, {
            headers: {
                Authorization: `Bearer ${at}`,
            },
        });
        if (!verify.ok) return fail(400, { error: "Invalid token" });

        const data = await request.formData();
        const alt = data.get('alt') as string;
        const srcFile = data.get('src') as File;

        if (!alt || !srcFile || srcFile.size === 0) {
            return fail(400, { error: 'Sponsor name and logo are required.' });
        }

        try {
            const src = await uploadFile(srcFile, fetch);
            const res = await fetch(env.BACKEND_URL + "/sponsors", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + at,
                },
                body: JSON.stringify({
                    src: src, alt: alt,
                }),
            });
            if (res.status != 200 && res.status != 204)
                return fail(res.status, (await res.json()).error);

            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { error: 'Could not add sponsor. Please try again.' });
        }
    },
    editSponsor: async ({ request, cookies, fetch }) => {
        const at = cookies.get("at");
        if (!at) {
            return fail(401, { error: "Authentication token missing" });
        }
        const verify = await fetch(`${env.BACKEND_URL}/verify`, {
            headers: { Authorization: `Bearer ${at}` },
        });
        if (!verify.ok) {
            return fail(401, { error: "Invalid token" });
        }

        const data = await request.formData();
        const id = data.get('id') as string;
        const oldSrc = data.get('oldSrc') as string;
        const alt = data.get("alt") as string;
        const newAlt = data.get('alt-edit') as string;
        const newSrcFile = data.get('src-edit') as File;

        if (!id || !newAlt) {
            return fail(400, { error: 'Sponsor ID and name are required.' });
        }

        try {
            const isAltChanged = alt !== newAlt;
            const isFileChanged = newSrcFile && newSrcFile.size > 0;

            if (!isAltChanged && !isFileChanged) {
                // If nothing is different, return a specific failure.
                return fail(400, { error: 'No changes were detected.' });
            }

            let finalSrcUrl = oldSrc; // Start with the old URL

            // If a new file was uploaded, handle the upload/delete process
            if (isFileChanged) {
                const newUrl = await uploadFile(newSrcFile, fetch);
                await removeFile(oldSrc, fetch); // Clean up the old file
                finalSrcUrl = newUrl; // Use the new URL for the payload
            }

            const updatePayload = {
                new_alt: newAlt,
                new_src: finalSrcUrl,
            };

            // --- 5. SEND THE COMPLETE, UPDATED DATA TO THE BACKEND ---
            const updateResponse = await fetch(`${env.BACKEND_URL}/sponsors/${id}`, {
                method: 'PUT', // PUT is appropriate for replacing a resource with new data
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${at}`
                },
                body: JSON.stringify(updatePayload)
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                return fail(updateResponse.status, { error: errorData.message || 'Update failed.' });
            }

            return { success: true };

        } catch (error) {
            console.error("Error in editSponsor action:", error);
            return fail(500, { error: 'Could not update sponsor. Please try again.' });
        }

    },
    deleteSponsor: async ({ cookies, request, fetch }) => {
        const at = cookies.get("at");
        if (!at) {
            return fail(401, { error: "Authentication token missing" });
        }
        const verify = await fetch(env.BACKEND_URL + `/verify`, {
            headers: {
                Authorization: `Bearer ${at}`,
            },
        });
        if (!verify.ok) return fail(400, { error: "Invalid token" });
        const data = await request.formData();
        const id = data.get('id') as string;
        const src = data.get("src") as string;

        if (!id) {
            return fail(400, { error: 'Sponsor ID is required.' });
        }

        try {
            await removeFile(src, fetch);
            const res = await fetch(env.BACKEND_URL + "/sponsors/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + at,
                },
            });
            if (res.status != 200 && res.status != 204)
                return fail(res.status, (await res.json()).error);

            return { success: true };
        } catch (error) {
            console.error(error);
            return fail(500, { error: 'Could not delete sponsor. Please try again.' });
        }
    },
    updateCategory: async ({ request, fetch, cookies }) => {
        const at = cookies.get("at");
        if (!at) {
            return fail(401, { error: "Authentication token missing" });
        }
        const verify = await fetch(env.BACKEND_URL + `/verify`, {
            headers: {
                Authorization: `Bearer ${at}`,
            },
        });
        if (!verify.ok) return fail(400, { error: "Invalid token" });

        const data = await request.formData();

        // --- Extract data from the form ---
        const type = data.get('type') as string;
        const name = data.get('name') as string;
        const oldNormalImgUrl = data.get('old_normal_img_url') as string;
        const oldHoverImgUrl = data.get('old_hover_img_url') as string;
        const normalImgFile = data.get('normal_img') as File;
        const hoverImgFile = data.get('hover_img') as File;

        // Basic validation
        if (!type || !name) {
            return fail(400, { error: 'Category type and name are required.' });
        }

        try {
            let finalNormalUrl = oldNormalImgUrl;
            let finalHoverUrl = oldHoverImgUrl;

            // --- Handle Normal Image Upload ---
            if (normalImgFile && normalImgFile.size > 0) {
                // 1. Upload the new file
                const newUrl = await uploadFile(normalImgFile, fetch);
                // 2. If upload was successful, remove the old file
                if (newUrl) {
                    await removeFile(oldNormalImgUrl, fetch);
                    finalNormalUrl = newUrl;
                }
            }

            // --- Handle Hover Image Upload ---
            if (hoverImgFile && hoverImgFile.size > 0) {
                // 1. Upload the new file
                const newUrl = await uploadFile(hoverImgFile, fetch);
                // 2. If upload was successful, remove the old file
                if (newUrl) {
                    await removeFile(oldHoverImgUrl, fetch);
                    finalHoverUrl = newUrl;
                }
            }

            // --- Prepare payload and send update to your backend API ---
            const updatePayload = {
                new_name: name,
                new_normal_img_url: finalNormalUrl,
                new_hover_img_url: finalHoverUrl,
            };

            const updateResponse = await fetch(`${env.BACKEND_URL}/categories/${type}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${at}`
                },
                body: JSON.stringify(updatePayload),
            });

            if (!updateResponse.ok) {
                const errorData = await updateResponse.json();
                return fail(updateResponse.status, { error: errorData.message || 'API update failed.' });
            }

            // Success! The `use:enhance` will now trigger invalidateAll() on the client
            return { success: true };

        } catch (error) {
            console.error('Update category error:', error);
            return fail(500, { error: 'An internal error occurred. Please try again.' });
        }
    },
};
