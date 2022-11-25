import { Types } from "mongoose";

export interface IProducts {
  name?: string;
  description?: string;
  price?: number;
  rating?: number;
  category?: string;
  thumbnail?: string;
  timestamp: boolean;
}