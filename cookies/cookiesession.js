import express from 'express';
import cookieSession from 'cookie-session'

let app=express()
app.use(cookieSession({
    name: "mynewsession",
    keys:["key1", "value1"],
    maxAge:60000
}))
app.get("/login",(req,res)=>{
    req.session.username="Aditya"
    res.redirect("/dashboard")
})
app.get("/dashboard", (req, res)=>{
    if(req.session.username){
        res.send(`Welcome ${req.session.username} !,This is your dashboard`)
    }
    else{
        res.send("Please login first")
    }
})
app.listen(3000)