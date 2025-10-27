import {
    CarOutlined,
    DollarOutlined,
    PhoneOutlined,
    SafetyCertificateOutlined,
    ThunderboltOutlined,
    UserOutlined
} from "@ant-design/icons";

export const getAdvantagesData = (lang: 'ru' | 'he' | 'en') => {
    const advantages = {
        ru: [
            {
                icon: <PhoneOutlined />,
                title: 'Операторы всегда на связи',
                description: 'Поддержка по вопросам грузоперевозок',
                schemaType: 'CustomerService'
            },
            {
                icon: <CarOutlined />,
                title: 'Большой парк авто',
                description: 'Различные грузоподъемности для любых переездов',
                schemaType: 'AutomotiveBusiness'
            },
            {
                icon: <SafetyCertificateOutlined />,
                title: 'Гарантируем сохранность вашего груза',
                description: 'Бережная и надежная упаковка',
                schemaType: 'Insurance'
            },
            {
                icon: <DollarOutlined />,
                title: 'Принимаем любые способы оплаты',
                description: 'Наличные, карты, банковские переводы',
                schemaType: 'PaymentMethod'
            },
            {
                icon: <UserOutlined />,
                title: 'Специальные цены для студентов',
                description: 'Скидки для учащихся на все виды переездов',
                schemaType: 'Discount'
            },
            {
                icon: <ThunderboltOutlined />,
                title: 'Возможность приезда в день заказа',
                description: 'Быстрая подача транспорта при срочных переездах',
                schemaType: 'SpeedyService'
            }
        ],
        he: [
            {
                icon: <PhoneOutlined />,
                title: 'מפעילים זמינים 24/7',
                description: 'שומרים על קשר 24/7',
                schemaType: 'CustomerService'
            },
            {
                icon: <CarOutlined />,
                title: 'הצי רכבים גדול',
                description: 'מגוון כלי רכב לכל סוגי ההובלה',
                schemaType: 'AutomotiveBusiness'
            },
            {
                icon: <SafetyCertificateOutlined />,
                title: 'איכות ביצוע השירותים',
                description: 'אריזה זהירה ואמינה',
                schemaType: 'Insurance'
            },
            {
                icon: <DollarOutlined />,
                title: 'מקבלים כל סוגי תשלום',
                description: 'מזומן, כרטיסים, העברות בנקאיות',
                schemaType: 'PaymentMethod'
            },
            {
                icon: <UserOutlined />,
                title: 'מחירים מיוחדים לסטודנטים',
                description: 'הנחות לסטודנטים על כל סוגי המעברים',
                schemaType: 'Discount'
            },
            {
                icon: <ThunderboltOutlined />,
                title: 'אפשרות הגעה ביום ההזמנה',
                description: 'הגעת רכב מהירה למעבר דחופ',
                schemaType: 'SpeedyService'
            }
        ],
        en: [
            {
                icon: <PhoneOutlined />,
                title: 'Operators Always Available',
                description: '24/7 support for moving services questions',
                schemaType: 'CustomerService'
            },
            {
                icon: <CarOutlined />,
                title: 'Large Vehicle Fleet',
                description: 'Various capacities for all types of relocations',
                schemaType: 'AutomotiveBusiness'
            },
            {
                icon: <SafetyCertificateOutlined />,
                title: 'Guaranteed Cargo Safety',
                description: 'Careful and reliable packing',
                schemaType: 'Insurance'
            },
            {
                icon: <DollarOutlined />,
                title: 'All Payment Methods Accepted',
                description: 'Cash, cards, bank transfers',
                schemaType: 'PaymentMethod'
            },
            {
                icon: <UserOutlined />,
                title: 'Special Prices for Students',
                description: 'Discounts for students on all types of moves',
                schemaType: 'Discount'
            },
            {
                icon: <ThunderboltOutlined />,
                title: 'Same-Day Service Available',
                description: 'Quick vehicle dispatch for urgent moves',
                schemaType: 'SpeedyService'
            }
        ]
    };

    return advantages[lang] || advantages.ru;
};