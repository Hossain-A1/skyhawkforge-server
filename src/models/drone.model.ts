import mongoose, { Schema, model } from 'mongoose';
import { droneType } from '../types/drone.type';

const droneSchema = new Schema<droneType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    images: [{ type: String, required: true }],
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    trainers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainers',
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Orders',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DroneModel = model<droneType>('Drone', droneSchema);

export default DroneModel;
