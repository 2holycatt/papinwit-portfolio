import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Item from "@/models/Tests";

// [GET] ดึงข้อมูลทั้งหมด
export async function GET() {
    await dbConnect();
    try {
        const items = await Item.find({});
        return NextResponse.json({ success: true, data: items }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// [POST] เพิ่มข้อมูลใหม่
export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();
        const item = await Item.create(body);
        return NextResponse.json({ success: true, data: item }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}