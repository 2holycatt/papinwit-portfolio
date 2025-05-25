import { dbConnect } from '@/lib/db';
import Project from '@/models/Project';

export async function GET() {
    await dbConnect();
    const projects = await Project.find();
    return Response.json(projects);
}

export async function POST(req) {
    await dbConnect();
    const data = await req.json();
    console.log(data);
    // const project = await Project.create(data);
    return Response.json(data);
}