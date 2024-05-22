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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
// create a order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const result = yield order_service_1.OrderServices.createOrderIntoDb(orderData);
        // sending respons
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
// retrive all orders
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // if query exists
        if (req.query.email) {
            const { email } = req.query;
            const result = yield order_service_1.OrderServices.getOrdersByEmailFromDb(email);
            // Check if there is no order with this email
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }
            // Sending response
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        else {
            const result = yield order_service_1.OrderServices.getAllOrderFromDb();
            // sending respons
            res.status(200).json({
                success: true,
                message: "Order fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
// delete product
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const result = yield order_service_1.OrderServices.deleteOrderFromDb(orderId);
        // sending respons
        res.status(200).json({
            success: true,
            message: "order deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrder,
    deleteOrder,
};
