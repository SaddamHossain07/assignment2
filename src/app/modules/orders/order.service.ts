import { ProductModel } from "../products/product.model";
import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// create a order into db
const createOrderIntoDb = async (order: TOrder) => {
  try {
    const productData = await ProductModel.findOne({ _id: order.productId });

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
    await ProductModel.updateOne(
      { _id: order.productId },
      {
        $set: {
          "inventory.quantity": updatedQuantity,
          "inventory.inStock": inStock,
        },
      }
    );

    // Create order into db
    const result = await OrderModel.create(order);

    return {
      success: true,
      message: "Order created successfully",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "something went wrong while creating an order",
      error: error,
    };
  }
};

// retrive all order from db
const getAllOrderFromDb = async () => {
  const result = await OrderModel.find();
  return result;
};

// retrive a single order from db by email
const getOrdersByEmailFromDb = async (email: string) => {
  const result = await OrderModel.find({ email });
  return result;
};

// delete order from db
const deleteOrderFromDb = async (_id: string) => {
  await OrderModel.deleteOne({ _id });
  return null;
};

export const OrderServices = {
  createOrderIntoDb,
  getAllOrderFromDb,
  getOrdersByEmailFromDb,
  deleteOrderFromDb,
};
