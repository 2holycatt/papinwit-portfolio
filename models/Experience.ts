import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IExperience extends Document {
    user: mongoose.Types.ObjectId;
    title: string;
    company: string;   
    position: string;
    location: string;
    startDate: Date;
    endDate: Date;
    description: string;
    duration: number;

    // methods
    getPreDetail(): string;
}

const experienceSchema: Schema<IExperience> = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: String,
    company: String,
    position: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String,
    duration: Number 
}, { timestamps: true });

experienceSchema.methods.getPreDetail = function (): string {
    return `${this.title} at ${this.company} (${this.location})`;
}
export const ExperienceModel: Model<IExperience> = mongoose.models.Experience || mongoose.model<IExperience>('Experience', experienceSchema);
// export default mongoose.models.Experience || mongoose.model<IExperience>('Experience', experienceSchema);