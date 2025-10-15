import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const formData = await request.json();

        const fromEmail = process.env.NODE_ENV === 'development'
            ? 'onboarding@resend.dev'
            : 'info@urbanmoving.net';

        const { data, error } = await resend.emails.send({
            from: `onboarding@resend.dev`,
            to: process.env.EMAIL_TO || 'urbanmoving.israel@gmail.com',
            subject: `Новая заявка от ${formData.name || 'Клиент'}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Новая заявка на переезд</h2>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Имя:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.name || 'Не указано'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Телефон:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.phone || 'Не указан'}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Адрес откуда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.fromAddress || 'Не указан'}</td>
                        </tr>                  
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Этаж откуда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.fromFloor || 'Не указан'}</td>
                        </tr>
                         <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Есть лифт от:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.fromHasLift ? 'Да' : 'Нет'}</td>
                        </tr>
                         <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Нужен кран от:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.fromNeedCrane ? 'Да' : 'Нет'}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Адрес куда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.toAddress || 'Не указан'}</td>
                        </tr>
                         <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Этаж куда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.toFloor || 'Не указан'}</td>
                        </tr>
                         <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Есть лифт куда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.toHasLift ? 'Да' : 'Нет'}</td>
                        </tr>
                         <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Нужен кран куда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.toNeedCrane ? 'Да' : 'Нет'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Дата переезда:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.date || 'Не указана'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Упаковка:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.needPacking ? 'Да' : 'Нет'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Сборка/разборка мебели:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.needAssembly ? 'Да' : 'Нет'}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Комментарий:</td>
                            <td style="padding: 10px; border: 1px solid #ddd;">${formData.comment || 'Нет комментария'}</td>
                        </tr>
                    </table>
                    <p style="color: #666; font-size: 12px; margin-top: 20px;">
                        Отправлено: ${new Date().toLocaleString('en-RU')}
                    </p>
                </div>
            `,
        });

        if (error) {
            console.error('Resend error:', error);
            return NextResponse.json({
                success: false,
                error: error.message
            }, { status: 500 });
        }

        console.log('Email sent successfully:', data);
        return NextResponse.json({
            success: true,
            message: 'Email sent successfully',
            data
        });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}
