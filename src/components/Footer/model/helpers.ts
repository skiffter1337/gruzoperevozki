import {FooterData} from "@/components/Footer/model/type";

export const getFooterData = (lang: 'ru' | 'he' | 'en') => {
    const footerData: FooterData = {
        ru: {
            phone: '050-8318084',
            email: 'urbanmoving.israel@gmail.com',
        },
        he: {
            phone: '050-8318084',
            email: 'urbanmoving.israel@gmail.com',
        },
        en: {
            phone: '050-8318084',
            email: 'urbanmoving.israel@gmail.com',
        }
    };

    return footerData[lang] || footerData.en;
};