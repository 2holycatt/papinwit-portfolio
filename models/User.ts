import mongoose, { Schema, Document, Model } from 'mongoose';


export interface IUser extends Document {
    fname: string;
    lname: string;
    profileImage?: string;
    contact: {
        email?: string;
        phone?: string;
        linkedIn?: string;
        github?: string;
    };
    projects: mongoose.Types.ObjectId[];
    skill: mongoose.Types.ObjectId[];
    experience: mongoose.Types.ObjectId[];
    aboutMoreDetail?: mongoose.Types.ObjectId;

    // methods

    getFullName(): string;
}

const userSchema: Schema<IUser> = new Schema({
    fname: String,
    lname: String,
    profileImage: String,
    contact: {
        email: String,
        phone: String,
        linkedIn: String,
        github: String,
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Project'
        }
    ],
    skill: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Skill'
        }
    ],
    experience: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Experience'
        }
    ],
    aboutMoreDetail: {
        type: mongoose.Schema.Types.ObjectId, ref: 'AboutMoreDetail'
    },

}, { timestamps: true });

userSchema.index({ fname: 1, lname: 1 }, { unique: true });

userSchema.methods.getFullName = function (): string {
    return `${this.fname} ${this.lname}`;
}

// export default mongoose.models.User || mongoose.model('User', userSchema);
export const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);