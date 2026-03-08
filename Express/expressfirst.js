import express from'express'
let app = express()
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