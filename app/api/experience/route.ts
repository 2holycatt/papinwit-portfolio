import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const data = {
            user: formData.get('user') as string,
            title: formData.get("title") as string,
        }
        console.log(data);

        return NextResponse.json(
            { ok: true, message: "Added experience successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error add new experience:", error);
        return NextResponse.json({ error: "Error add new experience" }, { status: 500 });
    }
}