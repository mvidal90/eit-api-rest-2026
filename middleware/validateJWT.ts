import type { RequestHandler } from "express";
import type { Payload } from "../@types/jwt.ts";

import jwt from "jsonwebtoken"
import { User } from "../models/User.ts"

export const validateJWT : RequestHandler = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ // 403 -> Forbidden
            ok: false,
            msg: "Token no proporcionado. Por favor, inicia sesión para obtener un token."
        })
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SEED_SECRET as string) as Payload
        const { id, email } = payload
        const user = await User.findOne({_id: id, email, deletedAt: null })

        if (!user) {
            return res.status(401).json({ // 401 -> Unauthorized
                ok: false,
                msg: "Token no válido. El usuario asociado al token no existe o ha sido eliminado."
            })
        }

        req.userId = id;

        next()
    } catch (error) {
        return res.status(403).json({ // 403 -> Forbidden
            ok: false,
            msg: "Error de validación. Por favor, inicia sesión nuevamente."
        })
    }
}
