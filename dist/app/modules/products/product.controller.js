"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
// create a product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const result = yield product_service_1.ProductServices.createProductIntoDb(productData);
        // sending respons
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
// retrive all product
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.query.searchTerm) {
            const { searchTerm } = req.query;
            const result = yield product_service_1.ProductServices.getProductsBySearchTermFromDb(searchTerm);
            // Check if result is empty
            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: `No products found matching search term '${searchTerm}'`,
                });
            }
            // Sending response
            res.status(200).json({
                success: true,
                message: `Products matching search term '${searchTerm}' fetched successfully!`,
                data: result,
            });
        }
        else {
            const result = yield product_service_1.ProductServices.getAllProductFromDb();
            // sending respons
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error,
        });
    }
});
// retrive a single product
const getASingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getASingleProductFromDb(productId);
        // sending respons
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
// update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateProductIntoDb(productId, productData);
        // sending respons
        res.status(200).json({
            success: true,
            message: "Products updated successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
// delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deleteProductFromDb(productId);
        // sending respons
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: true,
            message: "something went wrong",
            error: error,
        });
    }
});
exports.ProductController = {
    createProduct,
    getAllProduct,
    getASingleProduct,
    updateProduct,
    deleteProduct,
};
