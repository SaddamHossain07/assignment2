import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

const getAllProductFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

const getASingleProductFromDb = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductFromDb,
  getASingleProductFromDb,
};
