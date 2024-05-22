"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
// order routes will be goes here
router.post("/", order_controller_1.OrderController.createOrder);
router.get("/", order_controller_1.OrderController.getAllOrder);
router.get("/:email", order_controller_1.OrderController.getOrdersByUserEmail);
router.delete("/:orderId", order_controller_1.OrderController.deleteOrder);
exports.OrderRoutes = router;
