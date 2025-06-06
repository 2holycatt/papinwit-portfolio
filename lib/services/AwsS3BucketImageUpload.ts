import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// --- Initialize S3 Client (or import if refactored) ---
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// --- Your reusable uploadFileToS3 function (or imported) ---
// This function handles uploading a SINGLE File object.
export async function uploadSingleFileToS3(file: File, bucketName: string, region: string) {
    const arrayBuffer = await file.arrayBuffer();
    const body = Buffer.from(arrayBuffer); 
    const uniqueFileName = `${Date.now()}_${file.name}`;

    const params = {
        Bucket: bucketName,
        Key: uniqueFileName,
        Body: body,
        ContentType: file.type,
    };
    const command = new PutObjectCommand(params);
    try {
        await s3Client.send(command);
        return {
            success: true,
            key: uniqueFileName,
            originalName: file.name,
            location: `https://${params.Bucket}.s3.${region}.amazonaws.com/${uniqueFileName}`
        };
    } catch (error) {
        console.error(`Error uploading file ${file.name}:`, error);
        return { success: false, key: null, originalName: file.name, error: (error as Error).message, location: null };
    }
}