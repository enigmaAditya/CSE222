import express from 'express'
let app = express()
import path from 'path'
import mongoose from 'mongoose'
import { fileURLToPath } from 'url'
const port = 8000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.urlencoded({ extended: false }))
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"crud1.html"))
})
let productSchema = mongoose.Schema({
    name:String,
    price:Number
})
let Product = mongoose.model("products",productSchema)
mongoose.connect("mongodb://localhost:27017/ecommerce")
app.post("/add",async(req,res)=>{
    await Product.insertOne(req.body)
    res.send("Product added successfully")
    // p1.save()
    res.redirect("/")
})
app.get("/show",async(req,res)=>{
    let products = await Product.find()
    res.send(products)
})
app.post("/update",async(req,res)=>{
    let result = await Product.updateOne({_id:req.body.id},{$set:{name:req.body.name,price:req.body.price}})
    res.send(`<p>Matched count:${result.matchedCount}</p>
        <p>Modified count:${result.modifiedCount}</p>`)
})
app.post("/delete",async(req,res)=>{
    let result = await Product.deleteOne({_id:req.body.id})
    res.send(`<p>Matched count:${result.matchedCount}</p>
        <p>Deleted count:${result.deletedCount}</p>`)
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})