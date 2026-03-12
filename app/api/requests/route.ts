import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();

        const { name, email, phone, service, message, source } = data;

        if (!name || !email || !service || !message) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const newRequest = await ServiceRequest.create({
            name,
            email,
            phone,
            service,
            message,
            source: source || 'web_form'
        });

        return NextResponse.json({ success: true, data: newRequest }, { status: 201 });
    } catch (error) {
        console.error('Error saving service request:', error);
        return NextResponse.json({ error: 'Error al procesar la solicitud' }, { status: 500 });
    }
}
