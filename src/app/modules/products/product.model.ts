import { Schema, model } from "mongoose";
import { TInventory, TProduct, TVariant } from "./product.interface";

const variantSchema = new Schema<TVariant>(
  {
    type: String,
    value: String,
  },
  { _id: false }
);

const inventorySchema = new Schema<TInventory>(
  {
    quantity: Number,
    inStock: Boolean,
  },
  { _id: false }
);

const productSchema = new Schema<TProduct>({
  name: {
    type: String,
    index: "text",
  },
  description: String,
  price: Number,
  category: String,
  tags: Array<string>,
  variants: [variantSchema],
  inventory: inventorySchema,
});

export const ProductModel = model<TProduct>("ProductModel", productSchema);
