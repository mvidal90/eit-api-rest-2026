import type { RequestHandler } from "express";

import bcrypt from "bcrypt";
import { User } from "../models/User.ts";

export const createUser : RequestHandler = async (req, res) => {
    const { body } = req;

    try {

        const userByEmail = await User.findOne({ email: body.email })
        
        if (userByEmail) {
            return res.status(400).json({ // 400 -> Bad Request
                ok: false,
                msg: "Ya existe un usuario registrado con ese email. Por favor, utiliza otro email."
            })  
        }

        const passwordHash = await bcrypt.hash(body.password, 10) // 10 -> saltRounds, es decir, el número de veces que se aplicará el algoritmo de hash al password. A mayor número, más seguro pero también más lento.

        const newUser = await User.create({ ...body, password: passwordHash });

        //delete newUser._doc.password

        const { password, ...userWithoutPassword } = newUser.toObject()

        res.status(201).json({ // 201 -> Created
            ok: true,
            msg: "Usuario creado correctamente.",
            //user: newUser
            user: userWithoutPassword
        })
    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al crear el usuario, por favor intenta más tarde."
        })
        console.error(error)
    }
}
