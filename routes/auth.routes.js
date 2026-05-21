import express from "express";
import { body } from "express-validator";
import { login, revalidateSession } from "../controllers/auth.controller.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { validateJWT } from "../middleware/validateJWT.js";

const route = express.Router()

route.post(
    "/login", 
    [
        body("email").isEmail().withMessage("El email no es válido."),
        body("password")
            .isString()
            .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage("La contraseña inválida."),
        validateRequest
    ],
    login)
    .get("/revalidate-session", validateJWT, revalidateSession )

export default route