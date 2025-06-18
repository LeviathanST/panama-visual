import { readonly, writable } from "svelte/store";

type Category = {
    name: string,
    normal: string,
    hover: string,
    id: number

}
const categories = [
    {
        name: "PANAMA_VISUAL",
        normal: "quickmenu_ico_visuals.png",
        hover: "quickmenu_ico_visuals_hover.png",
        id: 1,
    },
    {
        name: "INTERACT_DANCE",
        normal: "quickmenu_ico_aftermovie.png",
        hover: "quickmenu_ico_aftermovie_hover.png",
        id: 2,
    },
    {
        name: "HOLOGRAM",
        normal: "quickmenu_ico_tvc.png",
        hover: "quickmenu_ico_tvc_hover.png",
        id: 3,
    },
    {
        name: "3D_MAPPING",
        normal: "quickmenu_ico_livecam.png",
        hover: "quickmenu_ico_livecam_hover.png",
        id: 4,
    },
];
export function getIdFromName(name: string): number {
    const cate = categories.filter(c => c.name == name);
    return cate[0].id;
}
const internalCategories = writable(categories);
export const categoryStore = readonly<Category[]>(internalCategories);

export let writeCurrentCategory = writable(1)
export const readCurrentCategory = readonly<number>(writeCurrentCategory)
