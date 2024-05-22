import { Request, Response } from "express";
import { ProductServices } from "./product.service";

// create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProductIntoDb(productData);

    // sending respons
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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

// retrive all product
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await ProductServices.getAllProductFromDb();

    // sending respons
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

// retrive a single product
const getASingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getASingleProductFromDb(productId);

    // sending respons
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
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

// update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;

    const result = await ProductServices.updateProductIntoDb(
      productId,
      productData
    );

    // sending respons
    res.status(200).json({
      success: true,
      message: "Products updated successfully!",
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

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProductFromDb(productId);

    // sending respons
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
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

export const ProductController = {
  createProduct,
  getAllProduct,
  getASingleProduct,
  updateProduct,
  deleteProduct,
};
