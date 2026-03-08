export
let auth = (req, res, next)=>{
    if(req.query.admin == 'true'){
        next()
    }else{
        console.log("You are not authenticated")
        res.send("You are not authenticated")
    }
}