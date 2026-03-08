import express from 'express'
let app = express()
let logger = (req, res, next)=>{
    console.log("Before Logging")
    next()
    console.log("After Logging")
}
app.use(logger)
app.get("/home",(req, res)=>{
    console.log("This is home page")
})
app.get("/products",logger,(req, res)=>{
    console.log("This is products page")
})
app.listen(8000, ()=>{
    console.log("Server is running on port 8000")
})