import mongoose, {Schema, Model, Document} from 'mongoose';

export interface IAboutMoreDetail extends Document {
    user: mongoose.Schema.Types.ObjectId;
    image?: string;
    birthDate?: Date;
    nation?: string;
    country?: string;
    currentLocation?: string;
    LanguegueSkill?: {
        lang: {
            name: string;
            level: string;
        }
    };
    education?: mongoose.Schema.Types.ObjectId[];
    // methods
    // getPreDetail(): string;
}

const aboutMoreDetailSchema: Schema<IAboutMoreDetail> = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    image: String,
    birthDate: Date,
    nation: String,
    country: String,
    currentLocation: String,
    LanguegueSkill: {
        lang: {
            name: String,
            level: String
        }
    },
    education: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Education'
        }
    ]
}, { timestamps: true });

// export default mongoose.models.AboutMoreDetail || mongoose.model('aboutMoreDetail', aboutMoreDetailSchema);
export const AboutMoreDetailModel: Model<IAboutMoreDetail> = mongoose.models.AboutMoreDetail || mongoose.model<IAboutMoreDetail>('AboutMoreDetail', aboutMoreDetailSchema);