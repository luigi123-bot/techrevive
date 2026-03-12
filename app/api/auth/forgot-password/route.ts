import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

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

        // Configure Nodemailer
        const emailUser = process.env.EMAIL_USER || '';
        const emailPass = (process.env.EMAIL_PASS || '').replace(/\s/g, '');

        console.log('--- Diagnóstico de Correo ---');
        console.log('Correo:', emailUser);
        console.log('Longitud Contraseña:', emailPass.length, '(Debe ser 16)');

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: emailUser,
                pass: emailPass,
            },
        });

        // Verificar conexión antes de enviar
        try {
            await transporter.verify();
            console.log("✅ Servidor de correo listo");
        } catch (verifyError) {
            console.error("❌ Error de verificación SMTP:", verifyError);
            throw verifyError;
        }

        const mailOptions = {
            from: `"TechRevive Support" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Código de Recuperación de Contraseña - TechRevive',
            html: `
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
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true, message: 'Código enviado exitosamente' });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 });
    }
}
