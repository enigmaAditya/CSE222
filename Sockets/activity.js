// using socket.io, send a message "Hey client" from server to the client after every 2 seconds, At the 10th second, the server must stop sending message to the client. The  messages must  print on the browserpage.

import express from 'express'
const app = express()
import { createServer } from 'http'
const http = createServer(app)
import { Server } from 'socket.io'
const io = new Server(http)
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client0.html'))
})

io.on('connection', (socket) => {
    console.log('Client is connected')
    socket.on('disconnect', () => {
        console.log('Client is disconnected')
    })
    
    let count = 0
    const interval = setInterval(() => {
        if (count < 5) {
            socket.emit('message', "Hey client ")
            count++
        } else clearInterval(interval)
    }, 2000)
})

http.listen(3001, () => console.log('Server is running on port 3001'))
