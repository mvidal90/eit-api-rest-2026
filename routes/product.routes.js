import express from "express";
import { createProduct, deleteProduct, getProducts, replaceOrCreateProduct, updateProduct } from "../controllers/product.controller.js";
import { validateJWT } from "../middleware/validateJWT.js";

const route = express.Router()

route
    .get("/", getProducts)
    .post(
        "/",
        [
            validateJWT
        ],
        createProduct
    )
    .put(
        "/:idProduct",
        [
            validateJWT
        ],
        replaceOrCreateProduct
    )
    .patch("/:idProduct",
        [
            validateJWT
        ],
        updateProduct
    )
    .delete("/:idProduct",
        [
            validateJWT
        ],
        deleteProduct
    )

export default route