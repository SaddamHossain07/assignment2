import { TProduct } from "./product.interface";
import { ProductModel } from "./product.model";

// create a product into db
const createProductIntoDb = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// retrive all product from db
const getAllProductFromDb = async () => {
  const result = await ProductModel.find();
  return result;
};

// retrive a single product from db
const getASingleProductFromDb = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  return result;
};

// update product into db
const updateProductIntoDb = async (
  productId: string,
  productData: TProduct
) => {
  const result = await ProductModel.updateOne(
    { _id: productId },
    { $set: productData }
  );
  return result;
};

// delete product from db
const deleteProductFromDb = async (_id: string) => {
  await ProductModel.deleteOne({ _id });
  return null;
};

export const ProductServices = {
  createProductIntoDb,
  getAllProductFromDb,
  getASingleProductFromDb,
  updateProductIntoDb,
  deleteProductFromDb,
};
