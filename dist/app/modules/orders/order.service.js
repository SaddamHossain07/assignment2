"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
// create a order into db
const createOrderIntoDb = (order) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = yield product_model_1.ProductModel.findOne({ _id: order.productId });
        // if the product is not exists
        if (!productData) {
            return {
                success: false,
                message: `Product with ID ${order.productId} not found`,
            };
        }
        // if ordered quantity exceeds the available quantity in inventory
        if (order.quantity > productData.inventory.quantity) {
            return {
                success: false,
                message: "Insufficient quantity available in inventory",
            };
        }
        // Update inventory quantity and inStock status
        const updatedQuantity = productData.inventory.quantity - order.quantity;
        const inStock = updatedQuantity > 0;
        yield product_model_1.ProductModel.updateOne({ _id: order.productId }, {
            $set: {
                "inventory.quantity": updatedQuantity,
                "inventory.inStock": inStock,
            },
        });
        // Create order into db
        const result = yield order_model_1.OrderModel.create(order);
        return {
            success: true,
            message: "Order created successfully",
            data: result,
        };
    }
    catch (error) {
        return {
            success: false,
            message: "something went wrong while creating an order",
            error: error,
        };
    }
});
// retrive all order from db
const getAllOrderFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
// retrive a single order from db by email
const getOrdersByEmailFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find({ email });
    return result;
});
// delete order from db
const deleteOrderFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield order_model_1.OrderModel.deleteOne({ _id });
    return null;
});
exports.OrderServices = {
    createOrderIntoDb,
    getAllOrderFromDb,
    getOrdersByEmailFromDb,
    deleteOrderFromDb,
};
