export
let auth=(req,res,next)=>{
    if(req.body.username == 'admin' && req.body.password == 'admin'){
        next()
    }else{
        console.log("You are not authenticated")
        res.send("You are not authenticated")
    }
}
//this type of export is called named export
//in this can we change name in import statement? yes

//in case of default export we cannot change name in import statement
//example of default export:
//export function auth(req,res,next){
//     if(req.body.username == 'admin' && req.body.password == 'admin'){
//         next()
//     }else{
//         console.log("You are not authenticated")
//         res.send("You are not authenticated")
//     }
// }

//what will happen in this case?
//import auth from './authentication.js'
//import {auth} from './authentication.js'//error

//what is the difference between named export and default export?
//named export: we can export multiple functions from a file
//default export: we can export only one function from a file