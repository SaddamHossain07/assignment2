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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
// create a product into db
const createProductIntoDb = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(product);
    return result;
});
// retrive all product from db
const getAllProductFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
// retrive a single product from db
const getASingleProductFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id });
    return result;
});
// update product into db
const updateProductIntoDb = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({ _id: productId }, { $set: productData });
    return result;
});
// delete product from db
const deleteProductFromDb = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield product_model_1.ProductModel.deleteOne({ _id });
    return null;
});
// get products by search term from db
const getProductsBySearchTermFromDb = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find({
        $text: {
            $search: searchTerm,
        },
    });
    return result;
});
exports.ProductServices = {
    createProductIntoDb,
    getAllProductFromDb,
    getASingleProductFromDb,
    updateProductIntoDb,
    deleteProductFromDb,
    getProductsBySearchTermFromDb,
};
