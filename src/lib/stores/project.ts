import { readable, writable } from 'svelte/store';

export type Project = {
    id: number;
    title: string;
    category: number;
    image: string;
    time?: string;
    youtubeId?: string;
    description?: string;
    type: 'image' | 'video';
};

const prefixPathImage = 'projects/';

const projects: Project[] = [
    {
        id: 1,
        title: "ECLIPS PICTURES - Con rồng cháu tiên - Thanh âm đất việt [ 3D Mapping ]",
        category: 1, // VISUALS_VJ
        image: prefixPathImage + '651wReRZO2OO95JuVEc50cx07BdYnXeaSGbVa5oz.jpeg',
        time: "15-03-2025 / Svd Quốc Gia Mỹ Đình",
        youtubeId: "huqGpilCwH0",
        description:
            "Client: T&T Group & SHB\nAgency: Hcc productions\nECLIPS PICTURES\nwww.eclipspictures.com",
        type: 'video',
    },
    {
        id: 2,
        title: "Eclips Pictures - HUYỀN SỬ MỘT VÙNG ĐẤT [ 3D Mapping ]",
        category: 1, // VISUALS_VJ
        image: prefixPathImage + 'V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg',
        time: "SƠN TÂY",
        youtubeId: "huqGpilCwH0",
        description:
            "SƠN TÂY 3D MAPPING - HUYỀN SỬ MỘT VÙNG ĐẤT\nAgency: Hàm Nghi\nĐạo diễn: Đặng Lê Minh Trí\nVisuals: Eclips Pictures",
        type: 'video',
    },
    {
        id: 3,
        title: "PAIN - ORINGCHAINS [INTO THE O]",
        category: 1, // VISUALS_VJ
        image: prefixPathImage + 'RphZjvRbzfydBwbq7IVyfPs0qkOWKpt2FjmdFrzx.jpeg',
        time: "03-05-2024",
        youtubeId: "huqGpilCwH0",
        description: "ECLIPS PICTURES\nwww.eclipspictures.com",
        type: 'video',
    },
    {
        id: 4,
        title: "CLASSMATE [Highlight]",
        category: 1, // VISUALS_VJ
        youtubeId: "huqGpilCwH0",
        image: prefixPathImage + 'fxbmc3mAlHFWrzm75YZwn9YPSFUETjyjN3yuE85V.jpeg',
        type: 'video',
    },
    {
        id: 5,
        title: "RHAPSODY THÁNG 10 - Oringchains [ Official Lyric MV ]",
        category: 1, // VISUALS_VJ
        image: prefixPathImage + 'O2ITKRUrvch4GeFwutTsbzDA3YwYRo1SMSrGuzgJ.jpeg',
        time: "10-10-2023",
        youtubeId: "huqGpilCwH0",
        description: "Visuals: ECLIPS PICTURES\nwww.eclipspictures.com",
        type: 'video',
    },
    {
        id: 6,
        title: "SUMMER FESTIVAL 2024 [Aftermovie]",
        category: 2, // AFTERMV
        image: prefixPathImage + '651wReRZO2OO95JuVEc50cx07BdYnXeaSGbVa5oz.jpeg',
        time: "15-07-2024",
        youtubeId: "huqGpilCwH0",
        description: "Official aftermovie for Summer Festival 2024\nProduction: ECLIPS PICTURES",
        type: 'video',
    },
    {
        id: 7,
        title: "BRAND X - Product Launch [TVC]",
        category: 3, // TVC_VIRAL
        image: prefixPathImage + 'V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg',
        time: "20-01-2025",
        youtubeId: "huqGpilCwH0",
        description: "TV Commercial for Brand X new product\nClient: Brand X\nAgency: Creative Minds",
        type: 'video',
    },
    {
        id: 8,
        title: "LIVE CONCERT BROADCAST [Eclips Studio]",
        category: 4, // ECLIPS_STUDIO
        image: prefixPathImage + 'RphZjvRbzfydBwbq7IVyfPs0qkOWKpt2FjmdFrzx.jpeg',
        time: "05-04-2025",
        youtubeId: "huqGpilCwH0",
        description: "Multi-camera live broadcast\nProduction: ECLIPS STUDIO",
        type: 'video',
    },
    {
        id: 9,
        title: "NATURE SERIES [Photo Collection]",
        category: 5, // PHOTOS
        image: prefixPathImage + 'fxbmc3mAlHFWrzm75YZwn9YPSFUETjyjN3yuE85V.jpeg',
        description: "Photography series capturing natural landscapes\nPhotographer: ECLIPS PICTURES",
        type: 'image',
    },
    {
        id: 10,
        title: "EXPERIMENTAL SHORT FILM",
        category: 6, // OTHERS
        image: prefixPathImage + 'O2ITKRUrvch4GeFwutTsbzDA3YwYRo1SMSrGuzgJ.jpeg',
        time: "01-03-2025",
        youtubeId: "huqGpilCwH0",
        description: "Experimental short film project\nDirector: Anonymous\nProduction: ECLIPS PICTURES",
        type: 'video',
    }
];

// for (let i = 11; i <= 100; i++) {
//     const category = Math.ceil(i / 15) > 6 ? (i % 6) + 1 : Math.ceil(i / 15);
//     projects.push({
//         id: i,
//         title: `${["Visual Project", "Festival Recap", "Brand Promo", "Live Stream", "Photo Series", "Creative Short"][category - 1]} ${i} ${category === 1 ? "[3D Mapping]" :
//             category === 2 ? "[Aftermovie]" :
//                 category === 3 ? "[TVC]" :
//                     category === 4 ? "[Studio]" :
//                         category === 5 ? "[Photos]" :
//                             "[Other]"
//             }`,
//         category: category,
//         image: prefixPathImage + 'V0q2KFjMcpU8d4Abn0NxS8FhEqjk2XQIDJRWGWR5.jpeg',
//         time: '15-03-2025',
//         youtubeId: category === 5 ? undefined : "huqGpilCwH0",
//         description: `Project ${i} for ${category === 1 ? "Visuals/VJ" :
//             category === 2 ? "Aftermovie" :
//                 category === 3 ? "TVC/Viral" :
//                     category === 4 ? "Eclips Studio" :
//                         category === 5 ? "Photos" :
//                             "Others"
//             }\nProduction: ECLIPS PICTURES`,
//         type: category === 5 ? 'image' : 'video',
//     });
// }

const internalProject = writable<Project[]>(projects);

export const projectStore = readable<Project[]>(projects, (set) => {
    const unsubscribe = internalProject.subscribe((value) => {
        set(value);
    });
    return () => unsubscribe();
});

export function addProject(project: Omit<Project, 'id'>) {
    internalProject.update((current) => {
        const newId = Math.max(...current.map(p => p.id), 0) + 1;
        const imageWithPrefix = prefixPathImage + project.image;
        return [...current, { ...project, id: newId, image: imageWithPrefix }];
    });
}

export function updateProject(id: number, updated: Partial<Project>) {
    internalProject.update((current) =>
        current.map((project) =>
            project.id === id
                ? { ...project, ...updated, image: updated.image ? prefixPathImage + updated.image : project.image }
                : project
        )
    );
}

export function deleteProject(id: number) {
    internalProject.update((current) => current.filter((project) => project.id !== id));
}
