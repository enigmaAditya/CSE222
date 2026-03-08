/*
create a middleware called "auth". Create a route "/user" such that the auth middleware checks whether the user is an admin or not. Give input in the querry string. if the user is an admin (admin == trur), the middleware shouls print "Welcome admin!" on the terminal and also  as a response using res.send().if the user is not an admin  (admin==false), middleware should print "You are not authenticated"
*/
import express from 'express'
import {auth} from './newauth.js'

let app = express()

app.get("/user",auth,(req, res)=>{
    console.log("Hi")
    console.log("Welcome admin!")
    res.send("Welcome admin!")
})
app.listen(3002)
