import express from 'express'
let app =express()
import jwt from 'jsonwebtoken'
app.use(express.json)
let SECRET = "key143"
app.post("/login", (req, res)=>{
    let {username, password}= req.body
    if(username === "Aditya" && password === "aditya143"){
        jwt.sign({username:"Aditya"}, SECRET, {expiresIn: "1m"})
        res.send(token)
    }
    else{
        res.send("Invalid credentials")
    }
})