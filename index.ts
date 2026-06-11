import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import productRoutes from "./routes/product.routes.ts"
import userRoutes from "./routes/user.routes.ts"
import authRoutes from "./routes/auth.routes.ts"
import { dbConection } from './database/dbConection.ts';

const PORT = 3000

dotenv.config();

const app = express();

dbConection()

app.use(cors())
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/user", userRoutes)

app.listen(PORT, () => console.log(`API corriendo en el puerto: ${PORT}`))