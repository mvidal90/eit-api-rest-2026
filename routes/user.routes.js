import express from "express";
import { body } from "express-validator";
import { createUser } from "../controllers/user.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";

const route = express.Router()

route.post("/", 
    [
        body("email").isEmail().withMessage("El email no es válido."),
        body("password")
            .isString()
            .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("La contraseña debe tener minúscula, mayúscula, números y carateres especiales."),
        validateRequest
    ], createUser)

export default route