import { readable, writable } from 'svelte/store';

const imgBaseURL = "";

export type Project = {
    id: number;
    title: string;
    category: number;
    images?: string[];
    time?: string;
    video?: {
        url: string,
        thumbnail: string,
    },
    description?: string;
    type: 'image' | 'video';
};

const prefixPathImage = 'images/xlarge/projects/';

const projects2: Project[] = [
    {
        id: 100,
        title: "Test project2",
        category: 1,
        images: [
            prefixPathImage + "vs/project1.jpg",
            prefixPathImage + "vs/project2.jpg",
            prefixPathImage + "vs/project2.jpg",
            prefixPathImage + "vs/project2.jpg",
            prefixPathImage + "vs/project2.jpg",
            prefixPathImage + "vs/project2.jpg"
        ]
        ,
        type: 'image',
        description: "Test list"
    },
    {
        id: 101,
        title: "Test project2",
        category: 1,
        images: [prefixPathImage + "vs/project1.jpg", prefixPathImage + "vs/project2.jpg"],
        type: 'image',
        description: "Test list"
    },
];
/// Hologram
for (let i = 21; i <= 30; i++) {
    projects2.push({
        id: i,
        title: "Empty",
        category: 3,
        video: {
            thumbnail: prefixPathImage + `id/project${Math.floor(Math.random() * 2) + 1}.jpg`,
            url: "https://cdn.coverr.co/videos/coverr-temp-da2xinteriorboothat202505231700-mp4-4615/720p.mp4"
        },
        time: "01-03-2025",
        description: "Empty",
        type: 'video',
    })
}


const internalProject = writable<Project[]>(projects2);
export const project2Store = readable<Project[]>(projects2);

export function addProject(project: Omit<Project, 'id'>) {
    internalProject.update((current) => {
        const newId = Math.max(...current.map(p => p.id), 0) + 1;
        const images = project.images?.map(image => prefixPathImage + image)
        return [...current, { ...project, id: newId, images: images }];
    });
}

export function updateProject(id: number, updated: Partial<Project>) {
    alert("This feature is not available")
}

export function deleteProject(id: number) {
    internalProject.update((current) => current.filter((project) => project.id !== id));
}
