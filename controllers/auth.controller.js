import bcrypt from "bcrypt";
import { User } from "../models/User.js";

import { generateJWT } from "../utils/jwt.js";

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email, deletedAt: null })

        if (!user) {
            return res.status(404).json({ // 404 -> Not Found
                ok: false,
                msg: "No existe un usuario con este email."
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ // 401 -> Unauthorized
                ok: false,
                msg: "Credenciales inválidas."
            })
        }

        const { password: _, ...userWithoutPassword } = user._doc

        const jwt = generateJWT({ id: userWithoutPassword._id, email: userWithoutPassword.email })

        res.json({
            ok: true,
            msg: "Inicio de sesión exitoso.",
            user: userWithoutPassword,
            jwt
        })
       
    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al intentar iniciar sesión, por favor intenta más tarde."
        })
        console.error(error)
    }
}