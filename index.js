import express from 'express';
import dotenv from 'dotenv';
import productRoutes from "./routes/product.routes.js"
import { dbConection } from './database/dbConection.js';

const PORT = 3000

dotenv.config();

const app = express();

dbConection()

app.use(express.json());

app.use("/api/products", productRoutes)

app.listen(PORT, () => console.log(`API corriendo en el puerto: ${PORT}`))