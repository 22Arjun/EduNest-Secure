import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IStudent extends Document {
    user: mongoose.Types.ObjectId;
    firstName: string;
    lastName: string;
    studentId: string;
    dateOfBirth: Date;
    phone: string;
    address?: string;
}

const StudentSchema: Schema = new Schema<IStudent>({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    studentId: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    }


})

const Student : Model<IStudent> = mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
export default Student;
