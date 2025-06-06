import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    projectType: string;
    images?: string[];
    techs?: string[];
    gitHubLink?: string;
    members?: number;
    myPosition?: string;
    description: string;
    internalUse?: boolean;
    note?: string;

    // methods
    getPreDetail(): string;
}

const ProjectSchema: Schema<IProject> = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    projectType: { type: String, required: true },
    images: { type: [String] },
    techs: { type: [String] },
    gitHubLink: { type: String },
    members: { type: Number },
    myPosition: { type: String },
    description: { type: String, required: true },
    internalUse: { type: Boolean, default: false },
    note: { type: String },
}, { timestamps: true });


// ProjectSchema.methods.getShortDesc = function (): string {
//     return this.description.length > 100
//         ? this.description.substring(0, 100) + '...'
//         : this.description;
// };

ProjectSchema.methods.getPreDetail = function (): string {
    return this.title + ' - ' + this.projectType;
}

// export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);

export const ProjectModel: Model<IProject> = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);