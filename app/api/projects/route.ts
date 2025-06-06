import { uploadSingleFileToS3 } from "@/lib/services/AwsS3BucketImageUpload";
import { ProjectModel } from "@/models/Project";
import { UserModel } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    const projects = await ProjectModel.find();
    return Response.json(projects);
}

export async function POST(req: Request) {
    const formData = await req.formData();
    // console.log(formData);
    try {
        const data = {
            title: formData.get("title"),
            description: formData.get("description"),
            gitHubLink: formData.get("gitHubLink"),
            projectType: formData.get("projectType"),
            members: formData.get("members"),
            myPosition: formData.get("myPosition"),
            internalUse: formData.get("internalUse"),
            techs: formData.getAll("techs") as string[],
            userId: formData.get("userId") as string,
        };

        const imagesFiles = formData.getAll("images") as File[];

        // Validate the data

        // console.log(data);
        // Create a new project
        // const project = await ProjectModel.create(data);
        // return Response.json(project, { status: 201 });
        // return Response.json(data);

        if (!imagesFiles || imagesFiles.length === 0 || (imagesFiles.length === 1 && imagesFiles[0].size === 0)) {
            // This check might need adjustment if an empty array is valid in some cases
            // or if a field named "image" might not be present at all.
            // For now, assuming "image" field with files is expected.
            return NextResponse.json({ error: "At least one image file is required for the 'image' field." }, { status: 400 });
        }

        const uploadPromises = imagesFiles.map(file => {
            if (file && file.size > 0) { // Ensure file object exists and is not empty
                return uploadSingleFileToS3(file, process.env.S3_BUCKET_NAME!, process.env.AWS_REGION!);
            }
            return Promise.resolve(null); // Handle empty or invalid file entries if any
        });

        const uploadResults = (await Promise.all(uploadPromises))
            .filter(result => result !== null) as
            Array<{
                // success: boolean, 
                key: string | null,
                // originalName: string, 
                // error?: string, 
                location: string | null
            }>;

        // if (uploadResults.length > 0) {
        //     uploadResults.map(result => {
        //         console.log(`File uploaded: ${result.originalName}, Location: ${result.location}`);
        //     })
        // }

        const imageKeys = uploadResults.map(result => result.key).filter(key => key !== null);

        const projectData = {
            ...data,
            images: imageKeys,
            user: new mongoose.Types.ObjectId(data.userId), // Assuming userId is passed in the formData
        };
        const createdProject = await ProjectModel.create(projectData);

        await UserModel.updateOne(
            { _id: createdProject.user },
            { $push: { projects: createdProject._id } }
        );

        return NextResponse.json(
            { ok: true, message: "Project created successfully", title: createdProject.title },
            { status: 201 }
        );

    } catch (error) {
        console.log(error);
        return NextResponse.json(
            { ok: false, message: "Failed to create project", error: (error as Error).message },
            { status: 500 }
        );
    }
    // const project = await Project.create(data);
}