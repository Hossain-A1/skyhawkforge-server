import { Document } from 'mongoose';

export type droneType = {
  title: string;
  description: string;
  about: string;
  category: string;
  images: string[];
  price: number;
  trainers: string[];
  orders: string[];
  rating: number;
  stock: number;
  count: number;
} & Document;
