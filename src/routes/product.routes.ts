import express from "express";
import {
  createProduct,
  getProducts,
  getSerchedProducts,
} from "../controller/product.controller";

const router = express.Router();

router.route("/").get(getProducts).post(createProduct)
router.route("/search").get(getSerchedProducts)
export default router;
