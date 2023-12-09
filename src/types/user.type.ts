import { Document } from 'mongoose';
import { orderType } from './order.type';

export type userType = {
  name: string;
  email: string;
  password: string;
  address?: string;
  phoneNo?: string;
  orders: orderType[];
  role: 'user' | 'admin';
} & Document;
