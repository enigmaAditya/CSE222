/*
create an express application that displays simple htmlform askin for username and password
 then the user suvmitthe form  then :
 1. the middleware should check if the username is admin and password is admin
 2.if correct-> display "Welcome admin!" in terminal and on browser
 3. if not correct-> display "You are not authenticated" in terminal and on browser
 */
import express from 'express'
import {auth1} from './authentication.js'
let app = express()
app.use(express.urlencoded({ extended: false }))
// let auth=(req,res,next)=>{
//     if(req.body.username == 'admin' && req.body.password == 'admin'){
//         next()
//     }else{
//         console.log("You are not authenticated")
//         res.send("You are not authenticated")
//     }
// }
app.get("/", (req, res) => {
    res.send(
        `<h2>Submit your details</h2>
    <form action="/submit" method="post">
        Username: <input type="text" id="username" name="username"><br>
        Password: <input type="password" id="password" name="password"><br>
        <input type="submit" value="Submit">
    </form>`
    )
})
app.post("/submit", auth1, (req, res) => {
    console.log("Welcome admin!")
    res.send("Welcome admin!")
})
app.listen(8000, () => {
    console.log("Server is running on port 8000")
})
