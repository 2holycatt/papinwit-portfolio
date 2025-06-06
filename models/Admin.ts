// models/Admin.js
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmin extends Document {
    email: string;
    passwordHash: string;
}

const adminSchema: Schema<IAdmin> = new Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
}, { timestamps: true });

// export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
export const AdminModel: Model<IAdmin> = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);