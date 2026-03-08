//create a form using html
//send html from on server using express
//saving details in  file and get response
//compress the file



import express from 'express'
import fs, { WriteStream } from 'fs'
import path from 'path'
import zlib from 'zlib'
import { fileURLToPath } from 'url'

const port =8000;
const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware to parse form data
//what is middleware: middleware is a function that has access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle.
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'))
})

app.post("/submit",(req, res)=>{
    let {name, email} = req.body
    let newuser = {name, email}
    let content=''
    let readstream=fs.createReadStream("newData.json", "utf-8")
    readstream.on("data", (chunk)=>{
        content+=chunk
    })
    readstream.on("end", ()=>{
        let users=[]
        if(content!==''){
            users=JSON.parse(content)
        }
        users.push(newuser)
        let writestream=fs.createWriteStream("newData.json")
        writestream.write(JSON.stringify(users,null,3))
        writestream.end()
        let readFile=fs.createReadStream("newData.json")
        let gzip=zlib.createGzip()
        let compressedFile=fs.createWriteStream("newData.json.gz")
        readFile.pipe(gzip).pipe(compressedFile)
    })
    res.send(`Details submitted as: ${name} and ${email}`)
    
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})