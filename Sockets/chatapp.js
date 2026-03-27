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
    res.sendFile(path.join(__dirname, 'chatapp.html'));
});

io.on("connection", (socket) => {
    console.log("A user connected!");

    // Listen for new chat messages from this specific user
    socket.on("chatMessage", (msg) => {
        // Transmit that message to ALL connected users
        io.emit("chatMessage", msg); 
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

const PORT = 3002;
http.listen(PORT, () => {
    console.log(`Chat server is running on port ${PORT}`);
});
