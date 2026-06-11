import mongoose, { Error } from "mongoose";

export const dbConection = async () => {
    try {
        const mongoDB = await mongoose.connect(process.env.BASE_URL_DB as string)
        console.log(`Se conectó correctamente a la Base de Datos: ${mongoDB.connections[0].name} `)
    } catch (error) {
        console.error("Error al conectar la BD.")
        throw new Error(error as string)
    }
}