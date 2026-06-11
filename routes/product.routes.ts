import express from "express";
import { body, param } from "express-validator";

import { createProduct, deleteProduct, getProducts, replaceOrCreateProduct, updateProduct } from "../controllers/product.controller.ts";
import { validateJWT } from "../middleware/validateJWT.ts";
import { validateRequest } from "../middleware/validateRequest.ts";

const route = express.Router()

route
    .get("/", getProducts)
    .post(
        "/",
        [
            validateJWT,
            body("name").isString().isLength({ min: 1 }).withMessage("El nombre del producto es obligatorio y debe ser un texto."),
            body("price").isFloat({ gt: 0 }).withMessage("El precio del producto es obligatorio y debe ser un número positivo."),
            body("stock").isInt({ gt: 0 }).withMessage("El stock del producto es obligatorio y debe ser un número positivo."),
            body("brand").isString().isLength({ min: 1 }).withMessage("El nombre de la marca es obligatoria y debe ser un texto."),
            validateRequest
        ],
        createProduct
    )
    .put(
        "/:idProduct",
        [
            validateJWT,
            param("idProduct").isMongoId().withMessage("El ID del producto no es válido."),
            body("name").isString().isLength({ min: 1 }).withMessage("El nombre del producto es obligatorio y debe ser un texto."),
            body("price").isFloat({ gt: 0 }).withMessage("El precio del producto es obligatorio y debe ser un número positivo."),
            body("stock").isInt({ gt: 0 }).withMessage("El stock del producto es obligatorio y debe ser un número positivo."),
            body("brand").isString().isLength({ min: 1 }).withMessage("El nombre de la marca es obligatoria y debe ser un texto."),
            validateRequest
        ],
        replaceOrCreateProduct
    )
    .patch("/:idProduct",
        [
            validateJWT,
            param("idProduct").isMongoId().withMessage("El ID del producto no es válido."),
            body("name").optional().isString().withMessage("El nombre debe ser un texto.").isLength({ min: 1 }).withMessage("El nombre debe ser un texto de más de un caracter."),
            body("price").optional().isFloat({ gt: 0 }).withMessage("El precio debe ser un número positivo."),
            body("stock").optional().isInt({ gt: 0 }).withMessage("El stock debe ser un número positivo."),
            body("brand").optional().isString().withMessage("El nombre de la marca debe ser un texto.").isLength({ min: 1 }).withMessage("El nombre de la marca debe ser un textode más de un caracter."),
            validateRequest
        ],
        updateProduct
    )
    .delete("/:idProduct",
        [
            validateJWT,
            param("idProduct").isMongoId().withMessage("El ID del producto no es válido."),
            validateRequest
        ],
        deleteProduct
    )

export default route