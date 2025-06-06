import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactMessage extends Document {
    name: string;
    email: string;
    message: string;
    replied: boolean;

    // methods
    getContactor(): string;
}

const contactMessageSchema: Schema<IContactMessage> = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    message: { type: String, required: true},
    replied: { type: Boolean, default: false , required: true},
}, { timestamps: true });

contactMessageSchema.methods.getContactor = function (): string {
    return `${this.name} <${this.email}>`;
}

// export default mongoose.models.ContactMessage || mongoose.model('ContactMessage', contactMessageSchema);
export const ContactMessageModel: Model<IContactMessage> = mongoose.models.ContactMessage || mongoose.model<IContactMessage>('ContactMessage', contactMessageSchema);