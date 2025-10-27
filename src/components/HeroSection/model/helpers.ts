export  const getAltText = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return 'סבלים מקצועיים למעבר דירה בישראל';
        case 'en':
            return 'Professional movers for apartment relocation in Israel';
        case 'ru':
        default:
            return 'Профессиональные грузчики для переезда в Израиле';
    }
};

export   const getSuccessModalContent = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return {
                title: 'בקשה נשלחה בהצלחה!',
                content: 'תודה רבה! מנהל שלנו כבר עובד על הבקשה שלך ויחזור אליך בהקדם האפשרי.',
                okText: 'מעולה, תודה!'
            };
        case 'en':
            return {
                title: 'Request Sent Successfully!',
                content: 'Thank you! Our manager is already working on your request and will contact you as soon as possible.',
                okText: 'Great, thanks!'
            };
        case 'ru':
        default:
            return {
                title: 'Заявка успешно отправлена!',
                content: 'Спасибо! Наш менеджер уже работает над вашей заявкой и свяжется с вами в ближайшее время.',
                okText: 'Отлично, спасибо!'
            };
    }
};

export const getDescription = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return "סבלים מוסמכים למעבר מהיר ובטוח. אריזה, הובלה, הרכבת רהיטים.";
        case 'en':
            return "Certified movers for fast and safe relocation. Packing, transportation, furniture assembly.";
        case 'ru':
        default:
            return "Квалифицированные грузчики для быстрого и безопасного переезда. Упаковка, транспортировка, сборка мебели.";
    }
};

export const getAddressLocality = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return "תל אביב";
        case 'en':
            return "Tel Aviv";
        case 'ru':
        default:
            return "Тель-Авив";
    }
};

export const getAreaServed = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return "ישראל";
        case 'en':
            return "Israel";
        case 'ru':
        default:
            return "Израиль";
    }
};

export const getMoversService = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return {name: "שירותי סבלים", description: "סבלים מקצועיים למעבר דירה"};
        case 'en':
            return {name: "Movers Services", description: "Professional movers for relocations"};
        case 'ru':
        default:
            return {name: "Услуги грузчиков", description: "Профессиональные грузчики для переездов"};
    }
};

export const getPackingService = (lang: 'ru' | 'he' | 'en') => {
    switch (lang) {
        case 'he':
            return {name: "אריזת מטען", description: "אריזה איכותית של חפצים למעבר"};
        case 'en':
            return {name: "Cargo Packing", description: "Quality packing of items for relocation"};
        case 'ru':
        default:
            return {name: "Упаковка груза", description: "Качественная упаковка вещей для переезда"};
    }
};