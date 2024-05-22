"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const variantSchema = new mongoose_1.Schema({
    type: String,
    value: String,
}, { _id: false });
const inventorySchema = new mongoose_1.Schema({
    quantity: Number,
    inStock: Boolean,
}, { _id: false });
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        index: "text",
    },
    description: String,
    price: Number,
    category: String,
    tags: (Array),
    variants: [variantSchema],
    inventory: inventorySchema,
});
exports.ProductModel = (0, mongoose_1.model)("ProductModel", productSchema);
