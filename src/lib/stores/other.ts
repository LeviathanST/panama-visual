import { readonly, writable } from "svelte/store"
import { translate } from "./language"

export type OtherAttribute = {
    social: {
        facebook: string,
        youtube: string,
    },
    address: {
        studio: {
            address: string,
            number: string,
            name_fanpage: string,
            link_fanpage: string,
        },
        main: {
            address: string
            number: string
        }
    },
    about: {
        text_1: string,
        text_2: string,
        text_3: string,
    }
}

const entity: OtherAttribute = {
    social: {
        facebook: "https://www.facebook.com/eclipspictures",
        youtube: "https://www.facebook.com/eclipsstudio"
    },
    address: {
        studio: {
            address: translate("ADDRESS_2"),
            number: "0987833310",
            name_fanpage: "ECLIPS PICTURES",
            link_fanpage: "https://www.facebook.com/eclipsstudio"
        },
        main: {
            address: translate("ADDRESS_1"),
            number: "0987833310",
        }
    },
    about: {
        text_1: translate("ABOUT_TEXT_1"),
        text_2: translate("ABOUT_TEXT_2"),
        text_3: translate("ABOUT_TEXT_3"),
    }
}

const writer = writable(entity)
export {
    writer
}
