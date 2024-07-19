import mongoose, { Schema } from "mongoose";

const taylorSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: [true, 'Name is required.'],
            lowercase: true,
            trim: true,
            index: true
        },
        shopName: {
            type: String,
            unique: true,
            required: [true, 'Shop name is required.'],
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required.'],
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
            trim: true
        }
    },
    {
        timestamps: true
    }
);

export const Taylor = mongoose.model("Taylor", taylorSchema);
