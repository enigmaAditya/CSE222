import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const http = createServer(app);
const io = new Server(http);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chatclient.html'));
});

io.on("connection", (socket)=>{
    socket.on("chat message", (msg)=>{
        io.emit("chat message", msg);
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
});