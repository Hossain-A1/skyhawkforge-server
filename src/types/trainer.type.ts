import { Document } from 'mongoose';
import { droneType } from './drone.type';

export type trainerType = {
  name: string;
  designation: string;
  bio: string;
  des?: string;
  picUrl: string;
  dateOfBirth: string;
  drones: droneType[];
} & Document;
