import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const { email, code, newPassword } = await req.json();

        if (!email || !code || !newPassword) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const user = await User.findOne({
            email,
            resetPasswordCode: code,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ error: 'Código inválido o expirado' }, { status: 400 });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.resetPasswordCode = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        return NextResponse.json({ success: true, message: 'Contraseña actualizada exitosamente' });
    } catch (error) {
        console.error('Reset password error:', error);
        return NextResponse.json({ error: 'Error al restablecer la contraseña' }, { status: 500 });
    }
}
