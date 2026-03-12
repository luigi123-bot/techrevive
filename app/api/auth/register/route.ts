import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
    try {
        console.log('--- Intentando registrar usuario ---');
        await dbConnect();
        console.log('✅ Conexión a MongoDB exitosa');

        const { name, email, password } = await req.json();
        console.log('Datos recibidos:', { name, email, password: '***' });

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Por favor, llena todos los campos' },
                { status: 400 }
            );
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('⚠️ El usuario ya existe:', email);
            return NextResponse.json(
                { error: 'El usuario ya existe' },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        console.log('🎉 Usuario creado exitosamente:', email);

        return NextResponse.json(
            { success: true, user: { id: user._id, name: user.name, email: user.email } },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Error en el servidor' },
            { status: 500 }
        );
    }
}
