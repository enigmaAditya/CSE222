import express from 'express'
let app= express()
import session from'express-session'
app.use(session({
    secret: "mysession",//explain: it is a string that is used to sign the session ID cookie
    resave: "false",//explain: it is a boolean that is used to force the session to be saved back to the session store
    saveUninitialized: false//explain: it is a boolean that is used to save a session that is "uninitialized" or "new"
    //why we used these:
    //secret: to sign the session ID cookie
    //resave: to force the session to be saved back to the session store
    //saveUninitialized: to save a session that is "uninitialized" or "new"
}))
app.get("/login",(req,res)=>{
    req.session.user={username:"Aditya",email:"adityakumar2001ad@gmail.com"}
    res.redirect("/dashboard")
})
app.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.send(`Welcometo the dashboard${req.session.user.username}`)
    }
    else{
        res.send("Please login first")
    }
})
app.get("/logout",(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            res.send("error in logging out")
        }
        else{
            res.send("You have been logged out:(")
        }
    })
})
app.listen(3002)