import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
let app = express()
app.use(cookieParser())
// const __dirname = path.resolve()
// app.get("/style.css", (req, res) => {
//     res.sendFile(path.join(__dirname, "style.css"))
// })
app.use(express.static("/INT222/public"))
app.get("/setCookie", (req, res) => {
    res.cookie("theme", "dark", { maxAge: 60000})
    res.send(`
        <html>
            <head>
                <link rel="stylesheet" href="style.css">
            </head>
            <body>
                <h1>Cookie set</h1>
                <a href="/getCookie">Get Cookie</a>
                <a href="/clearCookie">Clear Cookie</a>
            </body>
        </html>
    `)
})
app.get("/getCookie", (req, res) => {
    res.send(req.cookies)
    console.log(req.cookies.theme)
})
app.get("/clearCookie", (req, res) => {
    res.clearCookie("theme")
    // res.cookie("theme", "", { maxAge: -1})
    res.send("Cookie ran away")
})
app.listen(8000, () => {
    console.log("Server is running on port 8000")
})

//make h1 change color based on cookie

