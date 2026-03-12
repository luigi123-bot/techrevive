import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Service from '@/models/Service';

export async function GET() {
    try {
        await dbConnect();
        const services = await Service.find({}).sort({ createdAt: 1 });
        return NextResponse.json(services);
    } catch (error) {
        return NextResponse.json({ error: 'Error al obtener servicios' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();

        // Simple validation
        if (!data.id || !data.title || !data.desc) {
            return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
        }

        const service = await Service.findOneAndUpdate(
            { id: data.id },
            data,
            { upsert: true, new: true }
        );

        return NextResponse.json(service);
    } catch (error) {
        return NextResponse.json({ error: 'Error al guardar servicio' }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const serviceId = searchParams.get('id');

        if (!serviceId) {
            return NextResponse.json({ error: 'ID de servicio requerido' }, { status: 400 });
        }

        await Service.findOneAndDelete({ id: serviceId });
        return NextResponse.json({ message: 'Servicio eliminado' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al eliminar servicio' }, { status: 500 });
    }
}
