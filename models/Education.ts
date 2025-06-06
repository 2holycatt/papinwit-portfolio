import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IEducation extends Document {
    user: mongoose.Types.ObjectId; 
    schoolName: string;
    degree: string;
    fieldOfStudy?: string;
    startDate?: Date;
    endDate?: Date;
    grade?: string;
    description?: string;
    location?: string;
    isCurrent?: boolean;

    // methods
    getPreDetail(): string;
}

const educationSchema: Schema<IEducation> = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    schoolName: { type: String, required: true },           
    degree: { type: String, required: true },               
    fieldOfStudy: { type: String },                          
    startDate: { type: Date },                               
    endDate: { type: Date },                                 
    grade: { type: String },                                 
    description: { type: String },                           
    location: { type: String },                          
    isCurrent: { type: Boolean, default: false },
}, { timestamps: true });

educationSchema.methods.getPreDetail = function (): string {
    return `${this.degree} in ${this.fieldOfStudy || 'General Studies'} from ${this.schoolName}`;
}

// export default mongoose.models.Education || mongoose.model('Education', educationSchema);
export const EducationModel: Model<IEducation> = mongoose.models.Education || mongoose.model<IEducation>('Education', educationSchema);
