import { z } from "zod";

// Define the Zod schema for TVariant
const variantValidationSchema = z.object({
  type: z.string(),
  value: z.string(),
});

// Define the Zod schema for TInventory
const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

// Define the Zod schema for TProduct
const productValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
