import mongoose from 'mongoose'
mongoose.connect("mongodb://localhost:27017/ecommerce")
let productSchema  = new mongoose.Schema({
    name:String,
    price:Number,
    brand:String
})
let Product = new mongoose.model("product",productSchema)
// let p1 = new Product({
//     name:"laptop",
//     price:1000,
//     brand:"Dell"
// })
// p1.save()
// console.log(p1)
let savedb = async()=>{
    let p1 = await Product.insertOne({
        name:"Gaming Laptop",
        price:189000,
        brand:"Dell"
    })
    let p2 = await Product.insertOne({
        name:"Gaming Smartphone",
        price:47000,
        brand:"Samsung"
    })
    let p3 = await Product.insertOne({
        name:"Smartwatch",
        price:38000,
        brand:"Apple"
    })

    p1.save()
    p2.save()
    p3.save()

    console.log(p1)
}
// let updatedb = async()=>{
//     let result = await Product.updateOne({name:"Gaming Laptop"},{$set:{price:190000}})
//     console.log(result)
// }
// let updatedb = async()=>{
//     let result = await Product.updateOne({name:"Gaming Laptop"},{$set:{price:200000}})
//     console.log(result)
// }
// let deletedb = async()=>{
//     let result = await Product.deleteOne({_id:"69d49cc08c7b47e5aeacbf51"})
//     console.log(result)
// }

// let finddb = async()=>{
//     let result = await Product.find()
//     console.log(result)
// }
savedb()
// updatedb()
// deletedb()
// finddb()