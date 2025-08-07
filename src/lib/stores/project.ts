import { readable, writable } from 'svelte/store';

const imgBaseURL = "";

function genFilePath(p: string, id: number, max: number): string[] {
    let imagePaths: string[] = [];
    for (let i = 1; i <= max; i++) {
        imagePaths.push(prefixPathImage + `${p}/project_${id}-${i}.jpg`)
    }
    return imagePaths
}

/// A type sending to server
export type RequestProject = {
    id: number;
    title: string;
    thumbnail: string
    category: string;
    images?: FileList;
    time?: string;
    video?: File,
    description?: string;
};

/// A type is used to display a project
export type Project = {
    id: number;
    title: string;
    category: number;
    thumbnail: string,
    images?: string[];
    time?: { url: string };
    video?: string,

    description?: string;
};

const prefixPathImage = 'images/xlarge/projects/';
const projects2: Project[] = [
    {
        id: 1,
        title: "Hiệp Hội Thép Việt Nam - Vươn Tầm Hiện Đại ",
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 1, 4),
        description: ""
    },
    {
        id: 2,
        title: 'LỄ KHAI MẠC LỄ HỘI QUÀ TẶNG DU LỊCH 2025 CHỦ ĐỀ "HÀ NỘI - ĐIỂM ĐẾN DI SẢN THẾ GIỚI',
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 2, 15),
        description: ""
    },
    {
        id: 3,
        title: 'Chương Trình Đặc Biệt Kỷ Niệm 95 Năm Thành Lập ĐẢNG BỘ ĐÀ NẴNG VÀ 50 năm Ngày GIẢI PHÓNG ĐÀ NẴNG',
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 3, 10),
        description: `
“Với quy mô hoành tráng, sự kết hợp tinh tế giữa nghệ thuật biểu diễn, công nghệ và truyền thống, chương trình mang đến những giây phút thăng hoa mà còn khơi dậy niềm tự hào dân tộc, tinh thần yêu nước trong mỗi người dân Đà Nẵng. Tất cả đã cùng hòa chung một nhịp đập, hướng đến một Đà Nẵng phát triển, hiện đại nhưng vẫn giữ vững những giá trị lịch sử và văn hóa đáng tự hào.
Đà Nẵng luôn như vậy, mãi đẹp trong lòng mỗi người.❤️
        `
    },
    {
        id: 4,
        title: `Hội Nghị Khách Hàng Syngenta - Đại Lý Bán Lẻ 2025`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 4, 4),
        description: `
    
        `
    },
    {
        id: 5,
        title: `Chương Trình Nghệ Thuật - ✨VIC GRAND SQUARE✨`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 5, 5),
        description: ``
    },
    {
        id: 6,
        title: `Sum Họp 2025 TP Bank hai miền Bắc Nam🥰🥰`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 6, 16),
        description: ``
    },
    {
        id: 7,
        title: `Lễ hội Áo Dài - Đà Lạt Hoa & Em 💚`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 7, 4),
        description: `Không chỉ là sự kiện đơn thuần, mà là niềm tự hào, là minh chứng cho tình yêu và sự gắn bó bền chặt với vẻ đẹp truyền thống Việt Nam.`
    },
    {
        id: 8,
        title: `Hành trình khát vọng ❤️- Trực tiếp VTV1 `,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 8, 11),
        description: ``
    },
    {
        id: 9,
        title: `Key Moment Lễ Kỷ Niệm 20 năm Đồng Hành & Phát Triển Syngenta Việt Nam`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 9, 4),
        description: ``
    },
    {
        id: 10,
        title: `VINCOM MALLIDAY`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 10, 11),
        description: ``
    },
    {
        id: 11,
        title: `👋Countdown Biên Hoà Chào năm mới 2024🎉🧨`,
        thumbnail: "images/xlarge/projects/id/project1.jpg",
        category: 1,
        images: genFilePath("vs", 11, 9),
        description: ``
    }
];


const internalProject = writable<Project[]>(projects2);
export const project2Store = readable<Project[]>(projects2);

export function deleteProject(id: number) {
    internalProject.update((current) => current.filter((project) => project.id !== id));
}
