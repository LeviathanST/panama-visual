import {
    get,
    readonly,
    writable
} from 'svelte/store';

export type Language = 'vi' | 'en';
export const language = writable<Language>('en');

export const setVietnamese = () => language.set('vi');
export const setEnglish = () => language.set('en');
export const toggleLanguage = () => {
    const currentLang = get(language);
    language.set(currentLang === 'en' ? 'vi' : 'en');
};

const currentLanguage = readonly(language);
export function translate(key: keyof typeof mappingObject) {
    let lang = get(currentLanguage)
    return mappingObject[key]?.[lang] || key; // Return translation or key if not found
}

let mappingObject = {
    // Header content
    'PANAMA_VISUAL': {
        'en': 'Panama Visual',
        'vi': 'Panama Visual'
    },
    'OUR_PORTFOLIO': {
        'en': 'OUR PORTFOLIO',
        'vi': 'CÁC DỰ ÁN'
    },
    'CONTACT': {
        'en': 'CONTACT',
        'vi': 'LIÊN HỆ'
    },
    'SIMPLICITY_IS': {
        'en': 'SIMPLICITY IS',
        'vi': 'ĐƠN GIẢN LÀ'
    },
    'ULTIMATE_SOPHISTICATION': {
        'en': 'THE ULTIMATE SOPHISTICATION',
        'vi': 'ĐỈNH CAO CỦA SỰ TINH TẾ'
    },

    // Menu categories
    'VISUAL_STAGE': {
        'en': 'Visuals Stage',
        'vi': 'Sân khấu thị giác'
    },
    'INTERACT_DANCE': {
        'en': 'Interact Dance',
        'vi': 'Khiêu vũ tương tác'
    },
    'HOLOGRAM': {
        'en': 'Hologram',
        'vi': 'Ảnh ba chiều'
    },
    '3D_MAPPING': {
        'en': '3D Mapping',
        'vi': 'Ánh xạ 3D'
    },
    // About section
    'ABOUT_US': {
        'en': 'ABOUT US',
        'vi': 'NÓI VỀ CHÚNG TÔI'
    },
    'ABOUT_TEXT_1': {
        'en': 'In 2009, the idea of the name Eclips was formed from the two words Easy-Clips with the initial goal of just producing simple entertainment clips, serving a certain target audience.',
        'vi': 'Vào năm 2009, ý tưởng cái tên Eclips được hình thành bởi 2 từ Easy-Clips với mục tiêu ban đầu chỉ là sản xuất những clip giải trí đơn giản, phục vụ 1 số đối tượng khách hàng nhất định.'
    },
    'ABOUT_TEXT_2': {
        'en': 'After 6 years of operation, accumulating experience and knowledge, in April 2015, Vỹ Vlash decided to establish a company of the same name with the slogan "Simplicity is the ultimate sophistication" - Leonardo Davinci. Therefore, Eclips\'s products always aim to be concise and succinct without reducing the effectiveness for customers.',
        'vi': 'Sau 6 năm hoạt động, tích lũy kinh nghiệm và kiến thức, tháng 4 năm 2015, Vỹ Vlash quyết định thành lập công ty cùng tên với slogan "Simplicity is the ultimate sophistication" ( Đơn giản là đỉnh cao của sự tinh tế ) - Leonardo Davinci. Vì thế, những sản phẩm của Eclips luôn hướng tới sự ngắn gọn, xúc tích nhưng không giảm đi tính hiệu quả mang lại cho khách hàng.'
    },
    'ABOUT_TEXT_3': {
        'en': 'With what has been, is being and will be done, the product is our voice throughout Eclips Pictures\' operation.',
        'vi': 'Với những gì đã, đang và sẽ làm, sản phẩm chính là tiếng nói của chúng tôi trong suốt quá trình hoạt động của Eclips Pictures.'
    },
    'LEARN_MORE': {
        'en': 'LEARN MORE',
        'vi': 'TÌM HIỂU THÊM'
    },
    'ADDRESS_1': {
        'en': 'No. 188 Thang Long, Hai Chau, Da Nang',
        'vi': 'Số 188 Thăng Long, Hải Châu, Đà Nẵng'
    },
    'ADDRESS_2': {
        'en': 'No. 35/91/378 Thuy Khue - Tay Ho District - Hanoi',
        'vi': 'Số 35/91/378 Thụy Khuê - Quận Tây Hồ - Hà Nội'
    },

    // Contact form
    'CONTACT_US': {
        'en': 'CONTACT US',
        'vi': 'LIÊN HỆ VỚI CHÚNG TÔI'
    },
    'YOUR_NAME': {
        'en': 'Your Name',
        'vi': 'Tên của Quý Khách'
    },
    'EMAIL_ADDRESS': {
        'en': 'Email Address',
        'vi': 'Địa chỉ Email'
    },
    'INTEREST_AREA': {
        'en': 'Area of Interest',
        'vi': 'Lĩnh vực quan tâm'
    },
    'CONTENT': {
        'en': 'Content',
        'vi': 'Nội dung'
    },
    'SEND': {
        'en': 'SEND',
        'vi': 'GỬI'
    },

    // Footer
    'SEE_MORE': {
        'en': 'SEE MORE',
        'vi': 'XEM THÊM'
    },
    'COPYRIGHT': {
        'en': '© 2017 Eclips Pictures. Trademarks and brands are the property of their respective owners.',
        'vi': '© 2017 Eclips Pictures. Trademarks and brands are the property of their respective owners.'
    }
}

