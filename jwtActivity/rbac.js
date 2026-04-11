import express from 'express'
let app= express()

let users={
    navneet:{role:"admin"},
    devansh:{role:"teacher"},
    vidhi:{role:"student"}
}
let permissions = {
    admin: ["dashboard", "profile", "bills"],
    teacher: ["dashboard", "profile"],
    student: ["profile"]
}
let getusers = (req, res, next)=>{
    let username =req.query.user
    if(!username || !users[username]){
        return res.send("You are not an member! Get registered yourself :)")
    } 
    req.user = users[username]
    next()
}
app.use(getusers)
let checkAccess = (page)=>{
    return (req, res, next)=>{
        let userRole = req.user.role
        let allowedPages = permissions[userRole]
        if(allowedPages.includes(page)){
            next()
        }
        else{
            res.send(`Access denied! Your role is ${userRole}, you have no access to ${page}`)
        }

    }
}

app.get("/dashboard", checkAccess("dashboard"),(req, res)=>{
    res.send("Welcome to Dashboard")
})
app.get("/profile", checkAccess("profile"),(req, res)=>{
    res.send("Welcome to Profile")
})
app.get("/bills", checkAccess("bills"),(req, res)=>{
    res.send("Welcome to Bills")
})


app.listen(3000,()=>{
    console.log("Server is running at http://localhost:3000")
})
