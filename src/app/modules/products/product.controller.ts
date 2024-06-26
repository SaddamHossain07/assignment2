import { Request, Response } from "express";
import { ProductServices } from "./product.service";
import productValidationSchema from "./product.validation";

// Type guard to check if a value is a string
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// create a product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // data validation using zod
    const zodParsedData = productValidationSchema.parse(productData);

    // sending data to db
    const result = await ProductServices.createProductIntoDb(zodParsedData);

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
    if (req.query.searchTerm) {
      const { searchTerm } = req.query;

      if (isString(searchTerm)) {
        const result = await ProductServices.getProductsBySearchTermFromDb(
          searchTerm
        );

        // Check if result is empty
        if (result.length === 0) {
          return res.status(404).json({
            success: false,
            message: `No products found matching search term '${searchTerm}'`,
          });
        }

        // Sending response
        return res.status(200).json({
          success: true,
          message: `Products matching search term '${searchTerm}' fetched successfully!`,
          data: result,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Invalid searchTerm parameter",
        });
      }
    } else {
      const result = await ProductServices.getAllProductFromDb();

      // sending response
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
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
