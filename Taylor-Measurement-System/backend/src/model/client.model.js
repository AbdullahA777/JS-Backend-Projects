import mongoose, { Schema } from "mongoose";

const ClientMeasurementSchema = new Schema(
    {
        taylorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Taylor',
            required: true
        },
        clientName: {
            type: String,
            required: true,
            unique: true
        },
        clientPhone: {
            type: String,
            required: true
        },
        measurements: {
            chest: {
                type: Number,
                required: true
            },
            waist: {
                type: Number,
                required: true
            },
            hips: {
                type: Number,
                required: true
            },
            shoulder: {
                type: Number,
                required: true
            },
            sleeveLength: {
                type: Number,
                required: true
            },
            inseam: {
                type: Number,
                required: true
            },
            outseam: {
                type: Number,
                required: true
            },
            neck: {
                type: Number,
                required: true
            },
            height: {
                type: Number,
                required: true
            },
            weight: {
                type: Number,
                required: true
            }
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    }

);


export const ClientMeasurement = mongoose.model('ClientMeasurement', ClientMeasurementSchema)