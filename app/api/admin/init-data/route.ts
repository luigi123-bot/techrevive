import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import ServiceRequest from '@/models/ServiceRequest';
import Service from '@/models/Service';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Obtener TODO de una sola vez para evitar waterfalls en el cliente
        const [
            totalUsers, 
            totalRequests, 
            pendingRequests, 
            allRequests, 
            allUsers, 
            allServices
        ] = await Promise.all([
            User.countDocuments(),
            ServiceRequest.countDocuments(),
            ServiceRequest.countDocuments({ status: 'pending' }),
            ServiceRequest.find().sort({ createdAt: -1 }),
            User.find().sort({ createdAt: -1 }),
            Service.find().sort({ title: 1 })
        ]);

        // Mock metrics for "page metrics"
        const pageViews = 1240; // Simulated
        const conversionRate = totalRequests > 0 ? ((totalRequests / pageViews) * 100).toFixed(2) : 0;

        return NextResponse.json({
            stats: {
                totalUsers,
                totalRequests,
                pendingRequests,
                pageViews,
                conversionRate: `${conversionRate}%`
            },
            requests: allRequests,
            users: allUsers,
            services: allServices
        });
    } catch (error) {
        console.error('Full admin data error:', error);
        return NextResponse.json({ error: 'Error al cargar datos del sistema' }, { status: 500 });
    }
}
