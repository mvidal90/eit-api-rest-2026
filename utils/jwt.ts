import jwt, { type JwtPayload } from "jsonwebtoken"

export const generateJWT = (payload: JwtPayload) => {
    return jwt.sign(
        payload, 
        process.env.JWT_SEED_SECRET as string
        //{ expiresIn: "1h" }
    )
}