import express from 'express'
let app =express()
import jwt from 'jsonwebtoken'
app.use(express.json())
let SECRET = "key143"
app.post("/login", (req, res)=>{
    let {username, password}= req.body
    if(username === "Aditya" && password === "aditya143"){
        const token=jwt.sign({username:"Aditya"}, SECRET, {expiresIn: "1m"})
        res.send(token)
    }
    else{
        res.send("Invalid credentials")
    }
})
app.get("/dashboard", (req, res)=>{
    let authHeader = req.headers.authorization
    if(!authHeader){
        res.send("Token not provided")
    }
    let token =authHeader.split(" ")[1]
    jwt.verify(token, SECRET,(err)=>{
        if(err){
            res.send("Token is invalid")
        }
        else{
            res.send("Welcome to the dashboard")
            }
    })
})
app.listen(3000)

