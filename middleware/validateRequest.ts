import type { RequestHandler } from "express";
import type { FieldValidationError } from "express-validator";
import { validationResult } from "express-validator";

export const validateRequest : RequestHandler = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = (errors.array() as Array<FieldValidationError>).reduce((acc, { path, msg }) => ({...acc, [path]: msg }), {})
        res.status(400).json({ // 400 -> Bad Request
            ok: false,
            msg: "Error de validación. Por favor, revisa los campos e intenta nuevamente.",
            errors: errorsArray
        })
    } else {
        next()
    }
}