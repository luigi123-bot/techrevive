import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const response = NextResponse.json({ success: true });

    // Clear the auth-token cookie
    response.cookies.set('auth-token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
    });

    return response;
}
