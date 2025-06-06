// /app/api/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { dbConnect } from '@/lib/db'; // ← ตรง path ให้ตรงกับของคุณ
import jwt from 'jsonwebtoken';
import { AdminModel } from '@/models/Admin';


export async function POST(req: Request) {
    try {
        await dbConnect(); 

        const formData = await req.formData();
        // console.log(formData);
        const email = formData.get('email');
        const password = formData.get('password');

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        if (typeof email !== 'string' || typeof password !== 'string') {
            return NextResponse.json({ error: 'Invalid form input' }, { status: 400 });
        }

        const findAdmin = await AdminModel.findOne({ email });
        // if (findAdmin) {
        //     // return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
        // }

        if (!findAdmin) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

        // hash password
        // const saltRounds = 10;
        // const passwordHash = await bcrypt.hash(password, saltRounds);

        // const newAdmin = new Admin({
        //     email,
        //     passwordHash
        // })

        // await newAdmin.save();

        const isValid = await bcrypt.compare(password, findAdmin.passwordHash);
        if (!isValid) return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });

        // Create token
        const token = jwt.sign(
            { id: findAdmin._id, email: findAdmin.email },               // payload
            process.env.JWT_SECRET!,                             // secret key
            { expiresIn: '1d' }                                   // options
        );

        // Send back Token as cookie
        const response = NextResponse.json({ message: 'Login successful', redirectTo: '/admin' });
        response.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24,
            sameSite: 'lax', // 👈 สำคัญมาก
            secure: process.env.NODE_ENV === 'production', // ถ้าเป็น prod ต้องเปิด secure
        });

        return response;

        // return NextResponse.json({ message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}