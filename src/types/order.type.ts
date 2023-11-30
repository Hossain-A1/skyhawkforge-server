import { Document } from 'mongoose';
import { droneType } from './drone.type';
import { userType } from './user.type';

export type orderType = {
  drones: droneType;
  user: userType;
} & Document;
