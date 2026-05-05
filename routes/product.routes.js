import express from "express";
import { createProduct, deleteProduct, getProducts, replaceOrCreateProduct, updateProduct } from "../controllers/productController.js";

const route = express.Router()

route
    .get("/", getProducts)
    .post("/", createProduct)
    .put("/:idProduct", replaceOrCreateProduct)
    .patch("/:idProduct", updateProduct)
    .delete("/:idProduct", deleteProduct)

export default route