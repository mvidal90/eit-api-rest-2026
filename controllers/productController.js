import { Product } from "../models/Product.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ deletedAt: null })

        res.json({ // 200 -> OK
            ok: true,
            msg: "Lista de productos obtenida correctamente.",
            products
        })
    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al obtener la lista de productos, por favor intenta más tarde."
        })
    }
}

export const createProduct = async (req, res) => {
    const { body } = req;
    try {
        const newProduct = await Product.create(body)

        if (!newProduct) {
            return res.status(400).json({ // 400 -> Bad Request
                ok: false,
                msg: "No se pudo crear el producto, por favor intenta más tarde."
            })
        }

        res.status(201).json({ // 201 -> Created
            ok: true,
            msg: "Producto creado correctamente.",
            product: newProduct
        })
    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al crear el producto, por favor intenta más tarde."
        })
        console.error(error)
    }
}

export const replaceOrCreateProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { body } = req;

    try {
        const prod = await Product.findOne({ _id: idProduct, deletedAt: null })

        if (!prod || !idProduct) {
            const newProduct = await Product.create(body)

            return res.status(201).json({ // 201 -> Created
                ok: true,
                msg: "No se encontró el producto a reemplazar, por lo que se creó uno nuevo.",
                product: newProduct
            })
        }

        if (!body.name || !body.price || !body.brand || body.stock === undefined ) {
            return res.status(400).json({ // 400 -> Bad Request
                ok: false,
                msg: "Faltan campos obligatorios para reemplazar el producto. Por favor, completa nombre, precio, marca y stock."
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(idProduct, body, { returnDocument: "after" })

        res.json({
            ok: true,
            msg: "Producto reemplazado correctamente.",
            product: updatedProduct
        })

    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al reemplazar o crear el producto, por favor intenta más tarde."
        })
        console.error(error)
    }
}

export const updateProduct = async (req, res) => {
    const { idProduct } = req.params;
    const { body } = req;

    try {
        const prod =  await Product.findOne({ _id: idProduct, deletedAt: null })

        if (!prod) {
            return res.status(404).json({ // 404 -> Not Found
                ok: false,
                msg: "No se encontró el producto a actualizar."
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(idProduct, body, { returnDocument: "after" })

        res.json({
            ok: true,
            msg: "Producto actualizado correctamente.",
            product: updatedProduct
        })

    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al actualizar el producto, por favor intenta más tarde."
        })
        console.error(error)
    }
}

export const deleteProduct = async (req, res) => {
    const { idProduct } = req.params;

    try {
        const prod =  await Product.findOne({ _id: idProduct, deletedAt: null })

        if (!prod) {
            return res.status(404).json({ // 404 -> Not Found
                ok: false,
                msg: "No se encontró el producto a eliminar."
            })
        }

        await Product.findByIdAndUpdate(idProduct, { deletedAt: new Date() }, { returnDocument: "after" })

        res.json({
            ok: true,
            msg: "Producto elminado correctamente.",
        })

    } catch (error) {
        res.status(500).json({ // 500 -> Internal Server Error
            ok: false,
            msg: "Error del servidor. Al actualizar el producto, por favor intenta más tarde."
        })
        console.error(error)
    }
}