import { skillModel } from "@/models/Skill";
import { UserModel } from "@/models/User";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // Ensure mongoose is connected
        if (mongoose.connection.readyState !== 1) {
            await mongoose.connect(process.env.MONGODB_URI!);
        }

        // Fetch all skills from the database
        const skills = await skillModel.find();

        // Return the skills as a JSON response
        return NextResponse.json(skills);
    } catch (error) {
        console.error("Error fetching skills:", error);
        return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const formData = await req.formData();
    try {
        // console.log(formData);
        const data = {
            user: formData.get("userId") as string,
            careerCategory: formData.get("careerType") as string,
            abbreviation: formData.get("abbreviation") as string,
            language: formData.getAll("language") as string[],
            framework: formData.getAll("framework") as string[],
            cloudDB: formData.getAll("cloudDB") as string[],
            tool: formData.getAll("tool") as string[],
            other: formData.getAll("other") as string[],
            note: formData.get("note") as string || null,
        }
        console.log(data);

        const findSkill = await skillModel.findOne({ abbreviation: data.abbreviation });

        if (!findSkill) {
            const skill = new skillModel({
                user: data.user,
                careerCategory: data.careerCategory,
                abbreviation: data.abbreviation,
                language: data.language,
                framework: data.framework,
                cloudDB: data.cloudDB,
                tool: data.tool,
                other: data.other,
                note: data.note,
            });
            await skill.save();

            const addSkillToUser = await UserModel.findOneAndUpdate(
                {
                    _id: data.user
                },
                {
                    $push: { skill: skill._id }
                },
                {
                    new: true
                }
            );
            return NextResponse.json(
                { ok: true, message: "Created new skill successfully", user: addSkillToUser?._id },
                { status: 201 }
            );
        } else if (findSkill) {
            const updateSkill = await skillModel.findOneAndUpdate(
                { abbreviation: data.abbreviation },
                {
                    $set: {
                        careerCategory: data.careerCategory,
                        languague: data.language,
                        framework: data.framework,
                        cloudDB: data.cloudDB,
                        tool: data.tool,
                        other: data.other,
                        note: data.note,
                    }
                },
                { new: true }
            )
            return NextResponse.json(
                { ok: true, message: "Updated skill successfully", skill: updateSkill?.careerCategory },
                { status: 200 }
            );
        }

    } catch (error) {
        console.error("Failed to add skills:", error);
        return NextResponse.json({ error: "Failed to add skills" }, { status: 500 });
    }
}