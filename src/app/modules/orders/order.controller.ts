import { Request, Response } from "express";
import { OrderServices } from "./order.service";

// create a order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrderIntoDb(orderData);

    // sending respons
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "something went wrong",
      error: error,
    });
  }
};

// retrive all orders
const getAllOrder = async (req: Request, res: Response) => {
  try {
    // if query exists
    if (req.query.email) {
      const { email } = req.query;
      const result = await OrderServices.getOrdersByEmailFromDb(email);

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
    } else {
      const result = await OrderServices.getAllOrderFromDb();

      // sending respons
      res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

// delete product
const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const result = await OrderServices.deleteOrderFromDb(orderId);

    // sending respons
    res.status(200).json({
      success: true,
      message: "order deleted successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "something went wrong",
      error: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrder,
  deleteOrder,
};
