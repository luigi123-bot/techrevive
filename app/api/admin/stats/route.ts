import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import ServiceRequest from '@/models/ServiceRequest';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // Basic protection check would go here
        // For now let's focus on the data

        const totalUsers = await User.countDocuments();
        const totalRequests = await ServiceRequest.countDocuments();
        const pendingRequests = await ServiceRequest.countDocuments({ status: 'pending' });

        // Mock metrics for "page metrics"
        const pageViews = 1240; // Simulated
        const conversionRate = totalRequests > 0 ? ((totalRequests / pageViews) * 100).toFixed(2) : 0;

        const recentRequests = await ServiceRequest.find()
            .sort({ createdAt: -1 })
            .limit(5);

        const recentUsers = await User.find()
            .sort({ createdAt: -1 })
            .limit(5);

        return NextResponse.json({
            stats: {
                totalUsers,
                totalRequests,
                pendingRequests,
                pageViews,
                conversionRate: `${conversionRate}%`
            },
            recentRequests,
            recentUsers
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json({ error: 'Error al obtener estadísticas' }, { status: 500 });
    }
}
