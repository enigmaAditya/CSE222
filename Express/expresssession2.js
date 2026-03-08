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
app.use(express.urlencoded({extended:true}))
app.get("/login",(req,res)=>{
    res.send(`
    <form action="/dashboard" method="post">
    <input type="text" name="username" placeholder="username">
    <input type="password" name="password" placeholder="password">
    <input type="email" name="email" placeholder="email">
    <button type="submit">Login</button>
    </form>
    `)
})

app.post("/dashboard",(req,res)=>{
    let username=req.body.username
    let password=req.body.password
    let email=req.body.email
    req.session.user={username:username,password:password,email:email}
    if(req.session.user){

        res.redirect("/dashboard")
    }
    else{
        res.send("Please login first")
    }
})
app.get("/dashboard",(req,res)=>{
    if(req.session.user){
        res.send(`Welcome to the dashboard ${req.session.user.username}<br> <button onclick='logout()'>Logout</button>`)
    }
    else{
        res.send("Please login first")
    }
})
function logout(){
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
}
app.listen(3002)