import { TOrder } from "./order.interface";
import { OrderModel } from "./order.model";

// create a order into db
const createOrderIntoDb = async (order: TOrder) => {
  const result = await OrderModel.create(order);
  return result;
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
