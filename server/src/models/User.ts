import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
    email: string;
    password: string;
    role: 'admin' | 'student';
    isVerified: boolean;
    refreshToken?: string[];
}

const UserSchema : Schema = new Schema<IUser> ({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    refreshToken: [String]

    }, { timestamps: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
    