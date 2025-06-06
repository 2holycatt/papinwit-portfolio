import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db'; // ← ตรง path ให้ตรงกับของคุณ
import { UserService } from '@/lib/services/UserService';

export async function POST(req: Request) {
    try {

        await dbConnect();
        const formData = await req.formData();

        const fname = formData.get('fname');
        const lname = formData.get('lname');

        const userData = {
            fname: fname,
            lname: lname,
        }
        const findUser = await UserService.findUnique(userData.fname as string, userData.lname as string);

        if (!findUser) {
            const user = await UserService.create(userData as object);

            const userValidate = await UserService.findUser(user._id as string);

            if (!userValidate) {
                console.log("User not found after creation:", user._id);
                return NextResponse.json({ error: 'User not found after creation' }, { status: 404 });
            } else {
                console.log("User created successfully:", userValidate._id);
                return NextResponse.json({ success: true, message: 'User added' }, { status: 201 });
            }
        }

        return NextResponse.json({ success: true, data: formData }, { status: 200 });
    } catch (err) {
        console.log(err);
        console.log("Can't create new user");
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await dbConnect();
        const allUser = await UserService.findAll();
        return NextResponse.json(allUser, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}