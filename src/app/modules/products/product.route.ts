import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// routes will be goes here
router.post("/", ProductController.createProduct);
router.get("/", ProductController.getAllProduct);
router.get("/:productId", ProductController.getASingleProduct);

export const ProductRoutes = router;
