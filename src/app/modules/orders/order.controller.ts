import { Request, Response } from "express";
import { OrderServices } from "./order.service";
import orderValidationSchema from "./order.validation";

// Type guard to check if a value is a string
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// create an order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    // zod validation for creating order
    const zodParsedOrderData = orderValidationSchema.parse(orderData);

    // sending data to db
    const result = await OrderServices.createOrderIntoDb(zodParsedOrderData);

    // sending respons
    if (result.success) {
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result.data,
      });
    } else {
      res.status(400).json({
        success: false,
        message: result.message,
      });
    }
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

      if (isString(email)) {
        const result = await OrderServices.getOrdersByEmailFromDb(email);

        // Check if there is no order with this email
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: "Order not found",
          });
        }

        // Sending response
        return res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid email parameter",
        });
      }
    } else {
      const result = await OrderServices.getAllOrderFromDb();

      // sending response
      return res.status(200).json({
        success: true,
        message: "Order fetched successfully!",
        data: result,
      });
    }
  } catch (error) {
    return res.status(500).json({
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
