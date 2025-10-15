import {FooterData} from "@/components/Footer/model/type";

export const getFooterData = (lang: 'ru' | 'he' | 'en') => {
    const footerData: FooterData = {
        ru: {
            phone: '+972-50-8318084',
            email: '1ilya.shemyakin@gmail.com',
        },
        he: {
            phone: '+972-50-8318084',
            email: '1ilya.shemyakin@gmail.com',
        },
        en: {
            phone: '+972-50-8318084',
            email: '1ilya.shemyakin@gmail.com',
        }
    };

    return footerData[lang] || footerData.en;
};