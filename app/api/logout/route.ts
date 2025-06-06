import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // สร้าง response แล้วเซ็ตคุกกี้ token ให้หมดอายุทันที
        const response = NextResponse.json({ message: 'Logout successful' });

        // ลบ cookie token โดยเซ็ต maxAge เป็น 0
        response.cookies.set('token', '', {
            httpOnly: true,
            path: '/',
            maxAge: 0,  // หมดอายุทันที
        });

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}