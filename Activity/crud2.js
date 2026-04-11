// crud1.js
import express from 'express'
let app = express()
import path from 'path'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'

const port = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }))
app.use(express.json()) // Added to handle JSON requests

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "crud2.html"))
})

let productSchema = mongoose.Schema({
    name: String,
    price: Number
})

let Product = mongoose.model("products", productSchema)

mongoose.connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("MongoDB connection error:", err))

app.post("/add", async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price
        })
        await product.save()
        res.json({ message: "Product added successfully", success: true })
    } catch (error) {
        res.status(500).json({ message: "Error adding product", success: false })
    }
})

app.get("/show", async (req, res) => {
    try {
        let products = await Product.find()
        res.json(products)
    } catch (error) {
        res.status(500).json({ message: "Error fetching products" })
    }
})

app.post("/update", async (req, res) => {
    try {
        let result = await Product.updateOne(
            { _id: req.body.id },
            { $set: { name: req.body.name, price: req.body.price } }
        )
        
        if (result.matchedCount > 0) {
            res.json({ message: "Product updated successfully", success: true })
        } else {
            res.status(404).json({ message: "Product not found", success: false })
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating product", success: false })
    }
})

app.post("/delete", async (req, res) => {
    try {
        let result = await Product.deleteOne({ _id: req.body.id })
        
        if (result.deletedCount > 0) {
            res.json({ message: "Product deleted successfully", success: true })
        } else {
            res.status(404).json({ message: "Product not found", success: false })
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", success: false })
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})