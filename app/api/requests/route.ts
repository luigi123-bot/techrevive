import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import ServiceRequest from '@/models/ServiceRequest';

export async function GET() {
    try {
        await dbConnect();
        const requests = await ServiceRequest.find({}).sort({ createdAt: -1 });
        return NextResponse.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        return NextResponse.json({ error: 'Error al obtener solicitudes' }, { status: 500 });
    }
}

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

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect();
        const { id, status } = await req.json();

        if (!id || !status) {
            return NextResponse.json({ error: 'ID y status son requeridos' }, { status: 400 });
        }

        const validStatuses = ['pending', 'contacted', 'in_progress', 'completed', 'cancelled', 'archived'];
        if (!validStatuses.includes(status)) {
            return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
        }

        const updated = await ServiceRequest.findByIdAndUpdate(id, { status }, { new: true });

        if (!updated) {
            return NextResponse.json({ error: 'Solicitud no encontrada' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error('Error updating request status:', error);
        return NextResponse.json({ error: 'Error al actualizar el status' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'ID requerido' }, { status: 400 });
        }

        await ServiceRequest.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting request:', error);
        return NextResponse.json({ error: 'Error al eliminar la solicitud' }, { status: 500 });
    }
}
