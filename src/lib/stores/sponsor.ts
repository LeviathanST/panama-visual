import { readable, writable } from "svelte/store";

type Sponsor = {
    id: number,
    src: string,
    alt: string
}
const prefixPath = "/images/sponsors/"
const sponsorsName = [
    "abbive",
    "euromina",
    "s7",
    "kimlongnam",
    "kanifa",
    "hoasen",
    "huawei",
    "heineken"
]
var sponsors: Sponsor[] = [];
sponsorsName.forEach((name, idx) => {
    sponsors.push({
        id: idx,
        src: prefixPath + name + ".png",
        alt: "Sponsor " + name
    })
})

const itemReader = readable<Sponsor[]>(sponsors)
const itemWriter = writable<Sponsor[]>(sponsors)

export {
    itemReader,
    itemWriter
}
