import mongoose, { Schema, model } from 'mongoose';
import { trainerType } from '../types/trainer.type';

const trainerSchema = new Schema<trainerType>(
  {
    name: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    picUrl: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    drones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drone',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TrainerModel = model<trainerType>('Trainer', trainerSchema);
export default TrainerModel;
