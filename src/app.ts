import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./app/modules/products/product.route";
const app = express();

app.use(express.json());
app.use(cors());

// application routes will be goes here
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Ecommerce Project server is running");
});

export default app;
