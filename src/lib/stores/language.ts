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
        'en': "In 2018, the idea of the name Panama was formed from the family's company name with the goal of following the initial achievements.",
        'vi': 'Năm 2018, ý tưởng đặt tên Panama được hình thành từ tên công ty của gia đình với mục tiêu tiếp nối những thành tựu bước đầu.'
    },
    'ABOUT_TEXT_2': {
        'en': `After 3 years of operation, accumulating experiences and knowledge, September 2021, Tran Thi Loc & Huynh Khanh Huy decided to establish a company with the same name as the slogan "The simplicity is the ultimate" -Leonardo Davinci. Therefore, Panama products are always aimed at concise, concise but do not reduce efficiency for customers. With what have been and will do, the main product is our voice during Panama's operation.`,
        'vi': 'Sau 3 năm hoạt động, tích lũy kinh nghiệm và kiến thức, tháng 9/2021, Trần Thị Lộc & Huỳnh Khánh Huy quyết định thành lập công ty cùng tên với slogan "Sự đơn giản là tối thượng" - Leonardo Davinci. Vì vậy, các sản phẩm của Panama luôn hướng đến sự súc tích, súc tích nhưng không làm giảm hiệu quả cho khách hàng. Với những gì đã và sẽ làm, sản phẩm chính là tiếng nói của chúng tôi trong quá trình hoạt động của Panama.'
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
        'en': '© 2017 Panama Visual. Trademarks and brands are the property of their respective owners.',
        'vi': '© 2017 Panama Visual. Trademarks and brands are the property of their respective owners.'
    }
}

