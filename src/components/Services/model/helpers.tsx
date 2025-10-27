import {BankOutlined, HomeOutlined, ToolOutlined} from "@ant-design/icons";
import {ServicesData} from "@/components/Services/model/types";

export const getServicesData = (lang: 'ru' | 'he' | 'en') => {
    const services: ServicesData = {
        ru: [
            {
                id: 1,
                icon: <HomeOutlined/>,
                title: 'Квартирный переезд',
                description: 'Быстрый и аккуратный переезд квартиры любой сложности с профессиональной упаковкой',
                features: ['Упаковка вещей', 'Погрузка/разгрузка', 'Сборка мебели'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'от 500 ₪'},
                    {rooms: 2, price: 'от 1000 ₪'},
                    {rooms: 3, price: 'от 1500 ₪'},
                    {rooms: 4, price: 'от 1800 ₪'}
                ]
            },
            {
                id: 2,
                icon: <HomeOutlined/>,
                title: 'Офисный переезд',
                description: 'Организованный переезд офиса без остановки рабочего процесса',
                features: ['Работа в нерабочее время', 'Перевозка оргтехники', 'Установка на новом месте'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'от 500 ₪'},
                    {rooms: 2, price: 'от 900 ₪'},
                    {rooms: 3, price: 'от 1300 ₪'},
                    {rooms: 4, price: 'от 1800 ₪'}
                ]
            },
            {
                id: 3,
                icon: <BankOutlined/>,
                title: 'Переезд частного дома',
                description: 'Переезд из частного дома с учетом большой площади и количества вещей',
                features: ['Грузчики с опытом', 'Спецтехника', 'Упаковка хрупких вещей'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 3, price: 'от 1800 ₪'},
                    {rooms: 4, price: 'от 2400 ₪'},
                    {rooms: 5, price: 'от 2800 ₪'},
                    {rooms: 6, price: 'от 3200 ₪'}
                ]
            },
            {
                id: 4,
                icon: <ToolOutlined/>,
                title: 'Перевозка мебели',
                description: 'Бережная перевозка мебели любого размера и сложности',
                features: ['Разборка/сборка', 'Защитная упаковка', 'Гарантия сохранности'],
                hasPriceSlider: false,
                price: 'от 200 ₪/единица'
            },
        ],
        he: [
            {
                id: 1,
                icon: <HomeOutlined/>,
                title: 'מעבר דירה',
                description: 'מעבר מהיר ומדויק של דירה בכל רמת מורכבות עם אריזה מקצועית',
                features: ['אריזת חפצים', 'טעינה/פריקה', 'הרכבת רהיטים'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'מ-500 ₪'},
                    {rooms: 2, price: 'מ-1000 ₪'},
                    {rooms: 3, price: 'מ-1500 ₪'},
                    {rooms: 4, price: 'מ-1800 ₪'}
                ]
            },
            {
                id: 2,
                icon: <HomeOutlined/>,
                title: 'מעבר משרד',
                description: 'מעבר מאורגן של משרד ללא עצירת תהליך העבודה',
                features: ['עבודה בשעות לא עבודה', 'הובלת ציוד משרדי', 'התקנה במקום החדש'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'מ-500 ₪'},
                    {rooms: 2, price: 'מ-900 ₪'},
                    {rooms: 3, price: 'מ-1300 ₪'},
                    {rooms: 4, price: 'מ-1800 ₪'}
                ]
            },
            {
                id: 3,
                icon: <BankOutlined/>,
                title: 'מעבר בית פרטי',
                description: 'מעבר מבית פרטי עם התחשבות בשטח גדול וכמות חפצים',
                features: ['סבלים עם ניסיון', 'ציוד מיוחד', 'אריזת חפצים שבירים'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 3, price: '₪ 1800 ₪'},
                    {rooms: 4, price: '₪ 2400 ₪'},
                    {rooms: 5, price: '₪ 2800 ₪'},
                    {rooms: 6, price: '₪ 3200 ₪'}
                ]
            },
            {
                id: 4,
                icon: <ToolOutlined/>,
                title: 'הובלת רהיטים',
                description: 'הובלה זהירה של רהיטים בכל גודל ומורכבות',
                features: ['פירוק/הרכבה', 'אריזה מגנה', 'הבטחת שלמות'],
                hasPriceSlider: false,
                price: 'מ-200 ₪ ליחידה'
            },
        ],
        en: [
            {
                id: 1,
                icon: <HomeOutlined/>,
                title: 'Apartment Relocation',
                description: 'Fast and accurate apartment relocation of any complexity with professional packing',
                features: ['Item packing', 'Loading/unloading', 'Furniture assembly'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'from 500 ₪'},
                    {rooms: 2, price: 'from 1000 ₪'},
                    {rooms: 3, price: 'from 1500 ₪'},
                    {rooms: 4, price: 'from 1800 ₪'}
                ]
            },
            {
                id: 2,
                icon: <HomeOutlined/>,
                title: 'Office Relocation',
                description: 'Organized office relocation without stopping the workflow',
                features: ['Work during non-working hours', 'Office equipment transportation', 'Installation at new location'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 1, price: 'from 500 ₪'},
                    {rooms: 2, price: 'from 900 ₪'},
                    {rooms: 3, price: 'from 1300 ₪'},
                    {rooms: 4, price: 'from 1800 ₪'}
                ]
            },
            {
                id: 3,
                icon: <BankOutlined/>,
                title: 'Private House Relocation',
                description: 'Relocation from a private house considering large area and number of items',
                features: ['Experienced movers', 'Special equipment', 'Fragile items packing'],
                hasPriceSlider: true,
                prices: [
                    {rooms: 3, price: 'from1800 ₪'},
                    {rooms: 4, price: 'from 2400 ₪'},
                    {rooms: 5, price: 'from 2800 ₪'},
                    {rooms: 6, price: 'from 3200 ₪'}
                ]
            },
            {
                id: 4,
                icon: <ToolOutlined/>,
                title: 'Furniture Transportation',
                description: 'Careful transportation of furniture of any size and complexity',
                features: ['Disassembly/assembly', 'Protective packaging', 'Safety guarantee'],
                hasPriceSlider: false,
                price: 'from 200 ₪ per unit'
            },
        ]
    };

    return services[lang] || services.ru;
};