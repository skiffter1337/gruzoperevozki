export const getModalContent = ( lang: 'ru' | 'he' | 'en', type?: 'form' | 'phone') => {
    switch (type) {
        case 'phone':
            switch (lang) {
                case 'he':
                    return {
                        title: 'מספר הטלפון נשלח!',
                        content: 'תודה! מנהל שלנו כבר עובד על הבקשה שלך ויחזור אליך בהקדם האפשרי.',
                        okText: 'מעולה, תודה!'
                    };
                case 'en':
                    return {
                        title: 'Phone Number Sent!',
                        content: 'Thank you! Our manager is already working on your request and will contact you as soon as possible.',
                        okText: 'Great, thanks!'
                    };
                case 'ru':
                default:
                    return {
                        title: 'Номер отправлен!',
                        content: 'Спасибо! Наш менеджер уже работает над вашей заявкой и свяжется с вами в ближайшее время.',
                        okText: 'Отлично, спасибо!'
                    };
            }
        case 'form':
        default:
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
    }
};