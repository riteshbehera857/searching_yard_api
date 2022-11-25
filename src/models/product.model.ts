import { NextFunction } from "express";
import { Schema, model, ObjectId } from "mongoose";
import { IProducts } from "../../types";

const productSchema = new Schema<IProducts>({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  category: String,
  thumbnail: String
}, {
  timestamps: true,
});

const Products = model("Products", productSchema);
export default Products;
