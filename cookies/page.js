import express from 'express'
import cookiesession from 'cookie-session'
import expressSession from 'express-session'
import cookieParser from 'cookie-parser'
let app = express()
app.use(cookieParser())
app.use(expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))
app.use(cookiesession({
    name: "session",
    keys: ["key1", "key2"],
    maxAge: 24 * 60 * 60 * 1000
}))
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
app.post("/submit", (req, res) => {
    console.log("Welcome admin!")
    res.cookie("username", "admin")
    res.send("Welcome admin!")
})
app.listen(8000, () => {
    console.log("Server is running on port 8000")
})