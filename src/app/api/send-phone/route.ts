import {NextRequest, NextResponse} from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
    try {
        const { phone, source, lang, timestamp } = await request.json();

        const { data, error } = await resend.emails.send({
                from: 'onboarding@resend.dev',
            to: process.env.EMAIL_TO || 'urbanmoving.israel@gmail.com',
            subject: `Новый запрос на звонок - ${phone}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #333;">Новый запрос на обратный звонок</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 30%;">Номер телефона:</td>
                            <td style="padding: 12px; border: 1px solid #ddd;">
                                <strong style="font-size: 1.2em; color: #1890ff;">${phone}</strong>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Источник:</td>
                            <td style="padding: 12px; border: 1px solid #ddd;">${source}</td>
                        </tr>
                        <tr style="background-color: #f5f5f5;">
                            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Язык:</td>
                            <td style="padding: 12px; border: 1px solid #ddd;">${lang === 'he' ? 'Иврит' : 'Русский'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Время заявки:</td>
                            <td style="padding: 12px; border: 1px solid #ddd;">${new Date(timestamp).toLocaleString('en-RU')}</td>
                        </tr>
                    </table>
                    
                    <div style="background-color: #f0f7ff; padding: 15px; border-radius: 5px; margin-top: 20px;">
                        <p style="margin: 0; color: #1890ff; font-weight: bold;">
                            📞 Пожалуйста, свяжитесь с клиентом в ближайшее время!
                        </p>
                    </div>
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

        console.log('Phone number sent successfully:', phone);
        return NextResponse.json({
            success: true,
            message: 'Phone number sent successfully'
        });

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 });
    }
}