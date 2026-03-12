import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_dev_only';

export async function POST(req: NextRequest) {
    try {
        console.log('--- Intentando iniciar sesión ---');
        await dbConnect();
        console.log('✅ Conexión a MongoDB exitosa');

        const { email, password } = await req.json();
        console.log('Login solicitado para:', email);

        if (!email || !password) {
            return NextResponse.json(
                { error: 'Por favor, proporciona correo y contraseña' },
                { status: 400 }
            );
        }

        // Find user and include password (which is select: false by default)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            console.log('❌ Contraseña incorrecta para:', email);
            return NextResponse.json(
                { error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        const response = NextResponse.json(
            { success: true, user: { id: user._id, name: user.name, email: user.email, role: user.role } },
            { status: 200 }
        );

        console.log('🔓 Login exitoso para:', email);

        // Set cookie
        response.cookies.set('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 86400, // 1 day
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
