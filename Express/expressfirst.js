import express from'express'
import helmet from 'helmet'
let app = express()
app.use(helmet())
app.get("/", (req, res)=>{
    res.send(("This is Home page!"))
})
app.get("/hello", (req, res)=>{
    res.send(("This is Home page!"))
})
app.get("/contact",(req, res)=>{
    res.send(`
        <h3>Contact us</h3>
        <input type='text' name='message'><br>
        <input type='submit' value='Send'>
        `)
})
app.listen(3000)