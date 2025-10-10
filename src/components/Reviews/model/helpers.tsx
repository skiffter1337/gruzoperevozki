import {CheckCircleOutlined, SafetyCertificateOutlined, TeamOutlined, TrophyOutlined} from "@ant-design/icons";

export const getReviewsData = (lang: 'ru' | 'he' | 'en') => {
    const reviews = {
        ru: [
            {
                id: 1,
                name: 'Анна Иванова',
                location: 'Нетания, ул Смилянски',
                date: '2024-12-15',
                rating: 5,
                text: 'Очень довольна переездом! Ребята работали быстро и аккуратно. Все вещи доставлены в целости и сохранности. Особенно порадовала бережная упаковка хрупких предметов.',
                avatar: '/avatarWoman.png',
                service: 'Квартирный переезд'
            },
            {
                id: 2,
                name: 'Михаил Петров',
                location: 'Холон, ул Соколов',
                date: '2024-12-08',
                rating: 5,
                text: 'Переезд офиса прошёл быстро и без проблем. Всё упаковали аккуратно, мебель собрали на месте. Отличная работа, рекомендую!',
                avatar: '/avatarMan.png',
                service: 'Офисный переезд'
            },
            {
                id: 3,
                name: 'Елена Смирнова',
                location: 'Хайфа, ул Хадар',
                date: '2024-12-02',
                rating: 5,
                text: 'Лучший сервис по переездам! Заказывала переезд из трехкомнатной квартиры. Все сделали быстро, качественно и по адекватной цене. Рекомендую всем!',
                avatar: '/avatarWoman4.jpg',
                service: 'Квартирный переезд'
            },
            {
                id: 4,
                name: 'Дмитрий Козлов',
                location: 'Ришон-ле-Цион, ул Пика',
                date: '2024-11-25',
                rating: 5,
                text: 'Перевозили пианино и антикварную мебель. Отнеслись с максимальной осторожностью. Все доставлено без единой царапины. Большое спасибо команде!',
                avatar: '/avatarMan3.png',
                service: 'Перевозка мебели'
            }
        ],
        he: [
            {
                id: 1,
                name: ' פליקס בנסמן',
                location: 'אגוז, כפר יונה',
                date: '2024-12-15',
                rating: 5,
                text: 'החבר\'ה היו נהדרים. הם עטפו את כל הרהיטים היטב ולא שברו כלום. הם עשו עבודה של 5 כוכבים במעבר הדירה!',
                avatar: '/avatarMan4.png',
                service: 'מעבר דירה'
            },
            {
                id: 2,
                name: 'תאיר חיימוביץ',
                location: 'בר אילן, הרצליה',
                date: '2025-04-06',
                rating: 5,
                text: 'הזמנתי ספה להובלה לכאן, והם ארזו אותה היטב. לא הצלחתי להכניס אותה למעלית, הייתי צריך לסחוב אותה במעלה המדרגות. אהבתי הכל.',
                avatar: '/avatarMan6.png',
                service: 'הובלת רהיטים'
            },
            {
                id: 3,
                name: 'אייל חדד',
                location: 'חרמון, אור יהודה',
                date: '2025-09-05',
                rating: 5,
                text: 'הזמנתי מעבר דירה כולל אריזה. הם הגיעו עם קופסאות וחומרי אריזה ועשו את העבודה במהירות. אני ממליץ עליהם בחום!',
                avatar: '/avatarMan7.jpg',
                service: 'מעבר דירה'
            },
            {
                id: 4,
                name: 'דמיטרי קוזלוב',
                location: 'אנפה, זכרון יעקב',
                date: '2025-01-25',
                rating: 5,
                text: 'הזמנתי הובלה בעזרת מנוף. החבר\'ה היו נהדרים, הם הגיעו עם שתי משאיות. הם סיימו את העבודה במהירות ועשו עבודה באיכות גבוהה.',
                avatar: '/avatarMan9.jpg',
                service: 'העברת משרד'
            }
        ],
        en: [
            {
                id: 1,
                name: 'Emily Davis',
                location: 'Tel Aviv-Yafo, Frishman st',
                date: '2025-01-15',
                rating: 5,
                text: 'Very satisfied with the move! The guys worked quickly and carefully. All items were delivered intact. I was especially pleased with the careful packaging of fragile items.',
                avatar: '/avatarWoman2.png',
                service: 'Apartment Relocation'
            },
            {
                id: 2,
                name: 'Michael Johnson',
                location: 'Ramat Gan, Truman st',
                date: '2024-12-07',
                rating: 5,
                text: 'The office move went quickly and without problems. Everything was packed neatly, furniture was assembled on site. Excellent work, I recommend!',
                avatar: '/avatarMan2.png',
                service: 'Office Relocation'
            },
            {
                id: 3,
                name: 'Sarah Thompson',
                location: 'Petah Tikva, Rothschild st',
                date: '2024-11-06',
                rating: 5,
                text: 'The best moving service! I ordered a move from a three-room apartment. Everything was done quickly, efficiently and at a reasonable price. I recommend to everyone!',
                avatar: '/avatarWoman3.png',
                service: 'Apartment Relocation'
            },
            {
                id: 4,
                name: 'David Miller',
                location: 'Tel Aviv, Kaufman St',
                date: '2024-09-23',
                rating: 5,
                text: 'We transported a piano and antique furniture. They treated everything with maximum care. Everything was delivered without a single scratch. Many thanks to the team!',
                avatar: '/avatarMan8.jpg',
                service: 'Furniture Transportation'
            }
        ]
    };

    return reviews[lang] || reviews.ru;
};

export const getCompanyStats = (lang: 'ru' | 'he' | 'en') => {
    const stats = {
        ru: [
            {icon: <TeamOutlined/>, number: '740+ ', text: 'Довольных клиентов'},
            {icon: <CheckCircleOutlined/>, number: '1360+', text: 'Успешных переездов'},
            {icon: <TrophyOutlined/>, number: '7 лет', text: 'На рынке услуг'},
            {icon: <SafetyCertificateOutlined/>, number: '100%', text: 'Страхование груза'}
        ],
        he: [
            {icon: <TeamOutlined/>, number: '740+ ', text: 'לקוחות מרוצים'},
            {icon: <CheckCircleOutlined/>, number: '1360+', text: 'הובלות מוצלחים'},
            {icon: <TrophyOutlined/>, number: '7 שנים', text: 'בשוק השירותים'},
            {icon: <SafetyCertificateOutlined/>, number: '100%', text: 'ביטוח מטען'}
        ],
        en: [
            {icon: <TeamOutlined/>, number: '740+ ', text: 'Satisfied Clients'},
            {icon: <CheckCircleOutlined/>, number: '1360+', text: 'Successful Moves'},
            {icon: <TrophyOutlined/>, number: '7 years', text: 'In Service Market'},
            {icon: <SafetyCertificateOutlined/>, number: '100%', text: 'Cargo Insurance'}
        ]
    };

    return stats[lang] || stats.ru;
};