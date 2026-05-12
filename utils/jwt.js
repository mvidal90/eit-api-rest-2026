import jwt from "jsonwebtoken"

export const generateJWT = (payload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SEED_SECRET
        //{ expiresIn: "1h" }
    )
}