import { IProject, ProjectModel } from "@/models/Project";

export class ProjectService {
    static async create(data: IProject) {
        const project = new ProjectModel(data);
        await project.save();
        return project;
    }

    static async findById(id: string) {
        return ProjectModel.findById(id).populate('user').exec();
    }
}