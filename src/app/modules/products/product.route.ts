import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// product routes will be goes here
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProduct);
router.get("/:productId", ProductController.getASingleProduct);
router.put("/:productId", ProductController.updateProduct);
router.delete("/:productId", ProductController.deleteProduct);

export const ProductRoutes = router;
