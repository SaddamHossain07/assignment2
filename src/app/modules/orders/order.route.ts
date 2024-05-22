import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// order routes will be goes here
router.post("/", OrderController.createOrder);
router.get("/", OrderController.getAllOrder);
router.get("/:email", OrderController.getOrdersByUserEmail);
router.delete("/:orderId", OrderController.deleteOrder);

export const OrderRoutes = router;
