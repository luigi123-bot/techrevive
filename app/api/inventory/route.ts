import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import InventoryItem from '@/models/InventoryItem';
import ServiceRequest from '@/models/ServiceRequest';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const serviceRequestId = searchParams.get('serviceRequestId');
        
        let query = {};
        if (serviceRequestId) {
            query = { serviceRequestId };
        }
        
        const items = await InventoryItem.find(query).sort({ createdAt: -1 });
        return NextResponse.json(items);
    } catch (error) {
        console.error('Inventory GET error:', error);
        return NextResponse.json({ error: 'Error al obtener el inventario' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await dbConnect();
        const data = await req.json();
        const newItem = await InventoryItem.create(data);

        // Si el ítem está vinculado a una solicitud, actualizamos el estado de la solicitud
        if (newItem.serviceRequestId) {
            let newStatus = 'in_progress';
            if (newItem.status === 'delivered') newStatus = 'completed';
            if (newItem.status === 'broken') newStatus = 'cancelled';
            
            await ServiceRequest.findByIdAndUpdate(newItem.serviceRequestId, { status: newStatus });
        }

        return NextResponse.json(newItem);
    } catch (error) {
        console.error('Inventory POST error:', error);
        return NextResponse.json({ error: 'Error al registrar en inventario' }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await dbConnect();
        const { id, ...updates } = await req.json();
        const updatedItem = await InventoryItem.findByIdAndUpdate(id, updates, { new: true });

        // Sincronizar estado con la solicitud vinculada si existe
        if (updatedItem && updatedItem.serviceRequestId && updates.status) {
            let newStatus = 'in_progress';
            if (updatedItem.status === 'delivered') newStatus = 'completed';
            if (updatedItem.status === 'broken') newStatus = 'cancelled';
            
            await ServiceRequest.findByIdAndUpdate(updatedItem.serviceRequestId, { status: newStatus });
        }

        return NextResponse.json(updatedItem);
    } catch (error) {
        console.error('Inventory PATCH error:', error);
        return NextResponse.json({ error: 'Error al actualizar inventario' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        await InventoryItem.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Inventory DELETE error:', error);
        return NextResponse.json({ error: 'Error al eliminar del inventario' }, { status: 500 });
    }
}
