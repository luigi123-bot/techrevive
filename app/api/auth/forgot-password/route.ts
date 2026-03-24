import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import FormData from 'form-data';
import Mailgun from 'mailgun.js';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Por favor, proporciona un correo' }, { status: 400 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            // Favoring security: don't reveal if user exists, but for UX we can show success
            return NextResponse.json({ success: true, message: 'Si el correo existe, recibirás un código' });
        }

        // Generate 6-digit code
        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Expiration in 10 minutes
        const resetExpire = new Date(Date.now() + 10 * 60 * 1000);

        user.resetPasswordCode = resetCode;
        user.resetPasswordExpire = resetExpire;
        await user.save();

        // Configure Mailgun API
        const mailgun = new Mailgun(FormData);
        const mg = mailgun.client({
            username: "api",
            key: process.env.MAILGUN_API_KEY || process.env.API_KEY || "",
        });

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #00a8ff; text-align: center;">Recuperación de Contraseña</h2>
                <p>Has solicitado restablecer tu contraseña en <strong>TechRevive</strong>.</p>
                <p>Usa el siguiente código para completar el proceso. Este código expira en 10 minutos:</p>
                <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #333; border-radius: 5px; margin: 20px 0;">
                    ${resetCode}
                </div>
                <p>Si no solicitaste esto, puedes ignorar este correo de forma segura.</p>
                <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">© 2025 TechRevive Systems. Seguridad y Rendimiento.</p>
            </div>
        `;

        const mailgunDomain = process.env.MAILGUN_DOMAIN || "techrevive.privatech.me";

        await mg.messages.create(mailgunDomain, {
            from: `TechRevive Support <postmaster@${mailgunDomain}>`,
            to: [user.email],
            subject: 'Código de Recuperación de Contraseña - TechRevive',
            text: `Has solicitado restablecer tu contraseña. Tu código es: ${resetCode}`,
            html: htmlContent,
        });

        return NextResponse.json({ success: true, message: 'Código enviado exitosamente' });
    } catch (error) {
        console.error('Forgot password fatal error:', error);
        return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
    }
}
