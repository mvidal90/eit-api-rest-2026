import { model, Schema } from "mongoose";

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
}, { timestamps: true })

export const Product = model("Product", ProductSchema)