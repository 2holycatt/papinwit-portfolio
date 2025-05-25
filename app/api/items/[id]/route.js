import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Item from "@/models/Tests";

// [PUT] อัปเดตข้อมูลตาม ID
export async function PUT(req, { params }) {
    await dbConnect();
    try {
        const body = await req.json();
        const updatedItem = await Item.findByIdAndUpdate(params.id, body, {
            new: true,
            runValidators: true,
        });

        if (!updatedItem) {
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedItem }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

// [DELETE] ลบข้อมูลตาม ID
export async function DELETE(req, { params }) {
    await dbConnect();
    try {
        const deletedItem = await Item.findByIdAndDelete(params.id);

        if (!deletedItem) {
            return NextResponse.json({ success: false, error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, message: "Item deleted" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}