import { readonly, writable } from "svelte/store";

type Project = {
    id: number,
    title: string,
    category: number,
    image: string,
    time?: string,
    youtubeId: string,
    description?: string
}
let projects = [
    {
        id: 1,
        title: "ECLIPS PICTURES - Con rồng cháu tiên - Thanh âm đất việt [ 3D Mapping ]",
        category: 1,  // VISUALS_VJ
        image: "projects/651wReRZO2OO95JuVEc50cx07BdYnXeaSGbVa5oz.jpeg",
        time: "15-03-2025 / Svd Quốc Gia Mỹ Đình",
        youtubeId: "huqGpilCwH0",
        description:
            "Client: T&T Group & SHB\nAgency: Hcc productions\nECLIPS PICTURES\nwww.eclipspictures.com",
    },
    {
        id: 2,
        title: "Eclips Pictures - HUYỀN SỬ MỘT VÙNG ĐẤT [ 3D Mapping ]",
        category: 1,  // VISUALS_VJ
        image: "projects/V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg",
        time: "SƠN TÂY",
        youtubeId: "huqGpilCwH0",
        description:
            "SƠN TÂY 3D MAPPING - HUYỀN SỬ MỘT VÙNG ĐẤT\nAgency: Hàm Nghi\nĐạo diễn: Đặng Lê Minh Trí\nVisuals: Eclips Pictures",
    },
    {
        id: 3,
        title: "PAIN - ORINGCHAINS [INTO THE O]",
        category: 1,  // VISUALS_VJ
        image: "projects/RphZjvRbzfydBwbq7IVyfPs0qkOWKpt2FjmdFrzx.jpeg",
        time: "03-05-2024",
        youtubeId: "huqGpilCwH0",
        description: "ECLIPS PICTURES\nwww.eclipspictures.com",
    },
    {
        id: 4,
        title: "CLASSMATE [Highlight]",
        category: 1,  // VISUALS_VJ
        youtubeId: "huqGpilCwH0",
        image: "projects/fxbmc3mAlHFWrzm75YZwn9YPSFUETjyjN3yuE85V.jpeg",
    },
    {
        id: 5,
        title: "RHAPSODY THÁNG 10 - Oringchains [ Official Lyric MV ]",
        category: 1,  // VISUALS_VJ
        image: "projects/O2ITKRUrvch4GeFwutTsbzDA3YwYRo1SMSrGuzgJ.jpeg",
        time: "10-10-2023",
        youtubeId: "huqGpilCwH0",
        description: "Visuals: ECLIPS PICTURES\nwww.eclipspictures.com",
    },
    // New projects with repeated images
    {
        id: 6,
        title: "SUMMER FESTIVAL 2024 [Aftermovie]",
        category: 2,  // AFTERMV
        image: "projects/651wReRZO2OO95JuVEc50cx07BdYnXeaSGbVa5oz.jpeg",  // Repeated
        time: "15-07-2024",
        youtubeId: "huqGpilCwH0",
        description: "Official aftermovie for Summer Festival 2024\nProduction: ECLIPS PICTURES",
    },
    {
        id: 7,
        title: "BRAND X - Product Launch [TVC]",
        category: 3,  // TVC_VIRAL
        image: "projects/V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg",  // Repeated
        time: "20-01-2025",
        youtubeId: "huqGpilCwH0",
        description: "TV Commercial for Brand X new product\nClient: Brand X\nAgency: Creative Minds",
    },
    {
        id: 8,
        title: "LIVE CONCERT BROADCAST [Eclips Studio]",
        category: 4,  // ECLIPS_STUDIO
        image: "projects/RphZjvRbzfydBwbq7IVyfPs0qkOWKpt2FjmdFrzx.jpeg",  // Repeated
        time: "05-04-2025",
        youtubeId: "huqGpilCwH0",
        description: "Multi-camera live broadcast\nProduction: ECLIPS STUDIO",
    },
    {
        id: 9,
        title: "NATURE SERIES [Photo Collection]",
        category: 5,  // PHOTOS
        image: "projects/fxbmc3mAlHFWrzm75YZwn9YPSFUETjyjN3yuE85V.jpeg",  // Repeated
        youtubeId: "huqGpilCwH0",
        description: "Photography series capturing natural landscapes\nPhotographer: ECLIPS PICTURES",
    },
    {
        id: 10,
        title: "EXPERIMENTAL SHORT FILM",
        category: 6,  // OTHERS
        image: "projects/O2ITKRUrvch4GeFwutTsbzDA3YwYRo1SMSrGuzgJ.jpeg",  // Repeated
        time: "01-03-2025",
        youtubeId: "huqGpilCwH0",
        description: "Experimental short film project\nDirector: Anonymous\nProduction: ECLIPS PICTURES",
    }
];
for (let i = 11; i <= 100; i++) {
    const category = Math.ceil(i / 15) > 6 ? (i % 6) + 1 : Math.ceil(i / 15); // Distribute across 6 categories

    projects.push({
        id: i,
        title: `${["Visual Project", "Festival Recap", "Brand Promo", "Live Stream", "Photo Series", "Creative Short"][category - 1]} ${i} ${category === 1 ? "[3D Mapping]" :
            category === 2 ? "[Aftermovie]" :
                category === 3 ? "[TVC]" :
                    category === 4 ? "[Studio]" :
                        category === 5 ? "[Photos]" :
                            "[Other]"
            }`,
        category: category,
        image: "projects/V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg",
        time: '15-03-2025',
        youtubeId: "huqGpilCwH0",
        description: `Project ${i} for ${category === 1 ? "Visuals/VJ" :
            category === 2 ? "Aftermovie" :
                category === 3 ? "TVC/Viral" :
                    category === 4 ? "Eclips Studio" :
                        category === 5 ? "Photos" :
                            "Others"
            }\nProduction: ECLIPS PICTURES`
    });
}

const internalProject = writable(projects)
export const projectStore = readonly<Project[]>(internalProject)
