import { readable, writable } from 'svelte/store';

export type Project = {
    id: number;
    title: string;
    category: number;
    image: string;
    time?: string;
    video_link?: string;
    description?: string;
    type: 'image' | 'video';
};

const prefixPathImage = 'projects/';

const projects: Project[] = [];

/// Visuals Stage
for (let i = 1; i <= 10; i++) {
    projects.push({
        id: i,
        title: "Empty",
        category: 1,
        image: prefixPathImage + `vs/project${Math.floor(Math.random() * 2) + 1}.jpg`,
        time: "01-03-2025",
        description: "Empty",
        type: 'image',
    })
}
/// Interact Dance
for (let i = 11; i <= 20; i++) {
    projects.push({
        id: i,
        title: "Empty",
        category: 2,
        image: prefixPathImage + `id/project${Math.floor(Math.random() * 2) + 1}.jpg`,
        time: "01-03-2025",
        description: "Empty",
        type: 'image',
    })
}

/// Hologram
for (let i = 21; i <= 30; i++) {
    projects.push({
        id: i,
        title: "Empty",
        category: 3,
        image: prefixPathImage + `id/project${Math.floor(Math.random() * 2) + 1}.jpg`,
        time: "01-03-2025",
        video_link: "https://rr5---sn-npoldn76.c.drive.google.com/videoplayback?expire=1746378403&ei=c3QXaOrTCKvJm-gP9ZDl8Ak&ip=2405:4802:9183:580:ffff:ffff:ffff:fffc&id=317aadc08eeabef0&itag=18&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&ttl=transient&susc=dr&driveid=1ruGuiPfvmz_iRSS_T03bQbA3-5qjXeV3&app=explorer&eaua=hIn2nhccAVU&mime=video/mp4&vprv=1&prv=1&rqh=1&cnr=14&dur=67.012&lmt=1732880838769033&subapp=SLIDES&txp=0001224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,rqh,cnr,dur,lmt&sig=AJfQdSswRQIgYdRICKpPar5v2Y9C-AZV5wDa5pAKLUSVlxy9HCH8EdkCIQD6yilcrF2l1OkOC5PFCmxGWbUYQpZEqkvIb-5UZA_TGQ==&cpn=-jJCYepYYZ9GJPHF&c=WEB_EMBEDDED_PLAYER&cver=1.20250429.10.00-canary_control_1.20250430.22.00&redirect_counter=1&cm2rm=sn-oguys7e&rrc=80&fexp=24350590,24350737,24350796,24350816,24350827,24350961,24350984,24351254,24351658,24351662,24351763,24351960&req_id=ed60d0fc854da3ee&cms_redirect=yes&cmsv=e&met=1746367623,&mh=t5&mm=34&mn=sn-npoldn76&ms=ltu&mt=1746367485&mv=m&mvi=5&pl=44&rms=ltu,su&lsparams=met,mh,mm,mn,ms,mv,mvi,pl,rms&lsig=ACuhMU0wRAIgH78XDR44dll26ORUPAahcGXLU4C64jg-a9vtlOgR-MsCIFBxgwpZmUswHz6pSZaYbamtQk4qTveLyfEP7_HzTY1F",
        description: "Empty",
        type: 'video',
    })
}
/// 3D Mapping 
for (let i = 31; i <= 40; i++) {
    projects.push({
        id: i,
        title: "Empty",
        category: 4,
        image: prefixPathImage + `3d/project${Math.floor(Math.random() * 2) + 1}.png`,
        time: "01-03-2025",
        description: "Empty",
        type: 'image',
    })
}

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
