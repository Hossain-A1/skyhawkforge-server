import { Document } from 'mongoose';
import { droneType } from './product.type';
import { userType } from './user.type';

export type orderType = {
  drones: droneType;
  user: userType;
} & Document;
