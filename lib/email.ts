import nodemailer from 'nodemailer';

const emailUser = process.env.EMAIL_USER || '';
const emailPass = (process.env.EMAIL_PASS || '').replace(/\s/g, '');

// Configure Transporter with DNS/IPv4 fix for Coolify/Production
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true para 465, false para otros puertos (como 587)
    auth: {
        user: emailUser,
        pass: emailPass,
    },
    tls: {
        rejectUnauthorized: false,
        minVersion: 'TLSv1.2'
    },
    // Forzamos IPv4 a nivel de DNS para evitar el error ENETUNREACH de IPv6 en Docker/Coolify
    lookup: (hostname: any, options: any, callback: any) => {
        require('dns').lookup(hostname, { family: 4 }, callback);
    },
    connectionTimeout: 25000,
    greetingTimeout: 25000,
    socketTimeout: 30000
} as any);

export async function sendWelcomeEmail(to: string, name: string, password: string) {
    const mailOptions = {
        from: `"TechRevive Admin" <${emailUser}>`,
        to: to,
        subject: 'Bienvenido a TechRevive - Tus Credenciales de Acceso',
        html: `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 15px; background-color: #ffffff; color: #333;">
                <h2 style="color: #00a8ff; text-align: center; font-size: 24px;">¡Bienvenido a TechRevive, ${name}!</h2>
                <p style="font-size: 16px; line-height: 1.6;">Se ha creado una cuenta para ti en nuestra plataforma administrativa. Aquí están tus credenciales para comenzar:</p>
                <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 25px 0; border-left: 5px solid #00a8ff;">
                    <p style="margin: 5px 0;"><strong>Usuario:</strong> ${to}</p>
                    <p style="margin: 5px 0;"><strong>Contraseña Temporal:</strong> <span style="font-family: monospace; background: #eee; padding: 2px 6px; border-radius: 4px;">${password}</span></p>
                </div>
                <p style="font-size: 16px; line-height: 1.6;">Te recomendamos cambiar tu contraseña una vez que hayas ingresado por primera vez.</p>
                <div style="text-align: center; margin-top: 30px;">
                    <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/login" style="background-color: #00a8ff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Ingresar ahora</a>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                <p style="font-size: 12px; color: #888; text-align: center;">© 2025 TechRevive Systems. Soluciones Tecnológicas de Alto Nivel.</p>
            </div>
        `,
    };

    return await transporter.sendMail(mailOptions);
}
