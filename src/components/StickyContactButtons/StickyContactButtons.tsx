import {FooterTranslations} from "@/components/Footer/model/type";
import {getWhatsAppPhone} from "@/lib/getWhatsAppPhone";
import styles from "./StickyContactButtons.module.scss";
import Image from "next/image";

const buttonTexts = {
    he: {
        whatsapp: "לשיחת וואטסאפ",
        phone: "לשיחת טלפון"
    },
    ru: {
        whatsapp: "WhatsApp чат",
        phone: "Позвонить"
    },
    en: {
        whatsapp: "WhatsApp Chat",
        phone: "Phone Call"
    }
};

export function StickyContactButtons({translations, footerData, lang}: {
    translations: FooterTranslations;
    footerData: { phone: string };
    lang: 'ru' | 'he' | 'en';
}) {
    const currentTexts = buttonTexts[lang];

    const startWhatsAppChat = () => {
        const phone = getWhatsAppPhone();
        const message = encodeURIComponent(translations.quickContact.whatsappMessage);
        window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
    };

    const startPhoneCall = () => {
        const phoneNumber = footerData.phone;
        window.location.href = `tel:${phoneNumber}`;
    };

    return (
        <div className={styles.stickyButtons}>
            <button onClick={startWhatsAppChat} className={styles.stickyWhatsappButton}
                    aria-label={currentTexts.whatsapp}>
                <Image
                    src="/whatsapp.svg"
                    width={24}
                    height={24}
                    alt="WhatsApp"
                    priority={true}
                    className={styles.icon}
                />
                <span className={styles.buttonText}>{currentTexts.whatsapp}</span>
            </button>
            <button onClick={startPhoneCall} className={styles.stickyPhoneButton} aria-label={currentTexts.phone}>
                <span className={styles.buttonText}>{currentTexts.phone} </span>
                050-8318084
            </button>
        </div>
    );
}