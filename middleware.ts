// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value;
    if (req.nextUrl.pathname === '/admin/login') {
        // ถ้ามี tokenแล้วก็อาจ redirect ไป /admin เพื่อไม่ให้กลับมาที่ login อีก
        if (token) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
        return NextResponse.next();
    }
    // ถ้าไม่มี token → redirect ไป login
    if (!token) {
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }

    try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        await jwtVerify(token, secret);

        return NextResponse.next();
    } catch (error) {
        console.log(`JWT verify error: ${error}`);
        return NextResponse.redirect(new URL('/admin/login', req.url));
    }
}

export const config = {
    matcher: ['/admin/:path*'],
};
