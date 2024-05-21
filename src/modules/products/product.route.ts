import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

// routes will be goes here
router.post("/", ProductController.createProduct);

export const ProductRoutes = router;
