import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res)=>{
    if(req.url=="/"){
        res.end("This is the home page!");
        fs.appendFile("log.txt", "Request received on " + new Date()+ "\n", (err)=>{
            if(err) console.log(err);
            else console.log("Request logged successfully");
        })
    }
    else if(req.url=="/about"){
        res.end("Welcome to our about page:)")
    }
    else if(req.url=="/contact"){
        res.end("Contact Us !)")
    }
})

server.listen(3000, () => {
    console.log('Server running on port 3000')
})