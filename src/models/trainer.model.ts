import mongoose, { Schema, model } from "mongoose";
import { trainerType } from "../types/trainer.type";

const specilistSchema = new Schema<trainerType>(
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
        ref: "Drone",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const SpecilistModel = model<trainerType>("Specilist", specilistSchema);
export default SpecilistModel;