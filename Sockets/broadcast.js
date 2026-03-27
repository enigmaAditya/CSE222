import express from 'express'
const app = express()
import { createServer } from 'http'
import { Server } from 'socket.io'
import path from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const http = createServer(app)
const io = new Server(http)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'broadcast.html'))
})
let clients=0
io.on("connection", (socket)=>{
    clients++
    socket.broadcast.emit("newbroadcast", `${clients} are connected`)
    socket.on("disconnect",()=>{
        clients--
        socket.broadcast.emit("newbroadcast", `${clients} are connected`)
    })
})


http.listen(3001, () => {
    console.log('Server is running on port 3001')
})