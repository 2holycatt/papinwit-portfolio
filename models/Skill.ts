import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISkill extends Document {
    user: mongoose.Schema.Types.ObjectId;
    careerCategory: string;
    abbreviation: string;
    Languague?: string[];
    Framework?: string[];
    CloudDB?: string[];
    Tool?: string[];
    Other?: string[];
    note?: string;
    // methods
    getPreDetail(): string;
}

const SkillSchema: Schema<ISkill> = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    careerCategory: { type: String , required: true },
    abbreviation: { type: String, unique: true, required: true },
    Languague: { type: [String]},
    Framework: { type: [String] },
    CloudDB: { type: [String] },
    Tool: { type: [String] },
    Other: { type: [String] },
    note: { type: String }
}, { timestamps: true });

SkillSchema.methods.getPreDetail = function (): string {
    return this.careerCategory;
}

// export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema);
export const skillModel: Model<ISkill> = mongoose.models.Skill || mongoose.model<ISkill>('Skill', SkillSchema);