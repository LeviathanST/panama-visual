import { readonly, writable } from "svelte/store";

type Category = {
    name: string,
    normal: string,
    hover: string,
    id: number

}
const categories = [
    {
        name: "VISUALS_VJ",
        normal: "quickmenu_ico_visuals.png",
        hover: "quickmenu_ico_visuals_hover.png",
        id: 1,
    },
    {
        name: "AFTERMV",
        normal: "quickmenu_ico_aftermovie.png",
        hover: "quickmenu_ico_aftermovie_hover.png",
        id: 2,
    },
    {
        name: "TVC_VIRAL",
        normal: "quickmenu_ico_tvc.png",
        hover: "quickmenu_ico_tvc_hover.png",
        id: 3,
    },
    {
        name: "ECLIPS_STUDIO",
        normal: "quickmenu_ico_livecam.png",
        hover: "quickmenu_ico_livecam_hover.png",
        id: 4,
    },
    {
        name: "PHOTOS",
        normal: "quickmenu_ico_photos.png",
        hover: "quickmenu_ico_photos_hover.png",
        id: 5,
    },
    {
        name: "OTHERS",
        normal: "quickmenu_ico_others.png",
        hover: "quickmenu_ico_others_hover.png",
        id: 6,
    },
];
const internalCategories = writable(categories);
export const categoryStore = readonly<Category[]>(internalCategories);

export let writeCurrentCategory = writable(1)
export const readCurrentCategory = readonly<number>(writeCurrentCategory)
