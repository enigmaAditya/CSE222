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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users to broadcast 'typing' easily if needed, and to track online count
const users = {};

io.on('connection', (socket) => {
    
    // When a user joins the chat
    socket.on('join', (username) => {
        users[socket.id] = username;
        // Broadcast to everyone ELSE that a new user joined
        socket.broadcast.emit('system_message', `${username} has joined the chat.`);
        socket.emit('system_message', `Welcome to the chat, ${username}!`);
    });

    // When a user sends a message
    socket.on('chat_message', (msg) => {
        const username = users[socket.id] || "Anonymous";
        // Broadcast message to everyone
        io.emit('chat_message', { username, text: msg, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) });
    });

    // When a user is typing
    socket.on('typing', (isTyping) => {
        const username = users[socket.id];
        if (username) {
            socket.broadcast.emit('user_typing', { username, isTyping });
        }
    });

    // When a user disconnects
    socket.on('disconnect', () => {
        const username = users[socket.id];
        if (username) {
            delete users[socket.id];
            // Tell everyone someone left
            io.emit('system_message', `${username} has left the chat.`);
        }
    });
});

const PORT = 3003;
http.listen(PORT, () => {
    console.log(`High-Level Chat server running on http://localhost:${PORT}`);
});
