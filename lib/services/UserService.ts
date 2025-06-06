import { IUser, UserModel } from "@/models/User";
import '@/models/Project';
import '@/models/Skill';
import '@/models/Experience';
import '@/models/AboutMoreDetail';

export class UserService {
    static async create(data: object): Promise<IUser> {
        const user = new UserModel(data);
        const newUser = await user.save();
        return newUser;
    }
    static async findUser(id: string) {
        const findUser = await UserModel.findOne({ _id: id }).populate('projects')
            .populate('skill')
            .populate('experience')
            .populate('aboutMoreDetail')
            .exec();
        return findUser;
    }

    static async findAll() {
        const findUser = await UserModel.find().populate('projects');
        return findUser;
    }

    static async findUnique(fname: string, lname: string) {
        return await UserModel.findOne({ fname: fname, lname: lname });
    }
}