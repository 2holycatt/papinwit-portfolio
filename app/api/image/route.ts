import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function GET(req: NextRequest) {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) return new NextResponse("No key", { status: 400 });

    const bucket = process.env.S3_BUCKET_NAME!;
    try {
        const command = new GetObjectCommand({ Bucket: bucket, Key: key });
        const s3Res = await s3Client.send(command);

        if (!s3Res.Body) {
            return new NextResponse("File not found", { status: 404 });
        }

        // Convert Node.js ReadableStream to Buffer
        const chunks: Buffer[] = [];
        for await (const chunk of s3Res.Body as NodeJS.ReadableStream) {
            chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        }
        const buffer = Buffer.concat(chunks);

        const contentType =
            s3Res.ContentType && s3Res.ContentType.startsWith("image/")
                ? s3Res.ContentType
                : "image/jpeg"; // fallback

        return new NextResponse(buffer, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } catch (err) {
        console.error("Error fetching file from S3:", err);
        return new NextResponse("Not found", { status: 404 });
    }
}