import { validationResult } from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorsArray = errors.array().reduce((acc, { path, msg }) => ({...acc, [path]: msg }), {})
        res.status(400).json({ // 400 -> Bad Request
            ok: false,
            msg: "Error de validación. Por favor, revisa los campos e intenta nuevamente.",
            errors: errorsArray
        })
    } else {
        next()
    }
}