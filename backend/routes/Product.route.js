import express from "express";

import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();

// get function
router.get("/", getProducts);
// post function
router.post("/", createProduct);
// PUT/UPDATE
router.put("/:id", updateProduct);
// delete function that sends request to server
router.delete("/:id", deleteProduct);

export default router;
