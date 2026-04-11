import express from 'express';
import session from 'express-session';
import { createServer } from 'http';
import { Server } from 'socket.io';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// --- Middleware Setup ---
app.use(express.urlencoded({ extended: true })); // To parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve HTML files

// --- Session Configuration ---
const sessionMiddleware = session({
    secret: 'super-secret-key-143', // In production, use a secure random string
    resave: false,
    saveUninitialized: false
});

app.use(sessionMiddleware);

// **CRITICAL**: Share the Express session with Socket.io
io.engine.use(sessionMiddleware);

// --- File System Setup ---
const FEEDBACK_FILE = path.join(__dirname, 'feedback.txt');

// Ensure the text file exists on startup
async function initFile() {
    try {
        await fs.access(FEEDBACK_FILE);
    } catch {
        await fs.writeFile(FEEDBACK_FILE, '');
    }
}
initFile();

// --- Express Routes ---

// 1. Root route -> Redirect to login or auto-login
app.get('/', (req, res) => {
    if (req.session.username) {
        return res.redirect('/feedback'); // Already logged in
    }
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// 2. Handle Login Form Submission
app.post('/login', (req, res) => {
    const { username } = req.body;
    
    if (username && username.trim() !== '') {
        req.session.username = username.trim(); // Save username to session!
        res.redirect('/feedback'); // Send them to the live dashboard
    } else {
        res.redirect('/');
    }
});

// 3. Feedback Interface (PROTECTED ROUTE)
app.get('/feedback', (req, res) => {
    if (!req.session.username) {
        return res.redirect('/'); // Reject unauthorized access
    }
    res.sendFile(path.join(__dirname, 'public', 'feedback.html'));
});

// 4. Handle Logout
app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// --- Socket.io Real-Time Logic ---

io.on('connection', async (socket) => {
    // We can extract the session directly from the socket request thanks to io.engine.use!
    const session = socket.request.session;
    
    // If there's no username, disconnect this unauthorized ghost socket
    if (!session || !session.username) {
        socket.disconnect();
        return;
    }

    const username = session.username;

    // 1. Read past messages and send them ONLY to the newly connected user
    try {
        const data = await fs.readFile(FEEDBACK_FILE, 'utf-8');
        // Split file content into an array of individual lines
        const messages = data.split('\n').filter(msg => msg.trim() !== '');
        
        // Emit history and the current user's name so the client knows who "me" is
        socket.emit('load history', { messages, currentUser: username });
    } catch (err) {
        console.error("Error reading history file", err);
    }

    // 2. Broadcast a "joined" notification to EVERYONE ELSE
    socket.broadcast.emit('chat message', { 
        type: 'notification', 
        text: `🟢 ${username} joined the channel.` 
    });

    // 3. Listen for new chat messages from this user
    socket.on('chat message', async (msgPayload) => {
        // Format the message with the secure session username
        const formattedMsg = `${username}: ${msgPayload}`;
        
        // Save the message to feedback.txt persistently
        try {
            await fs.appendFile(FEEDBACK_FILE, formattedMsg + '\n');
        } catch (err) {
            console.error("Error writing to file", err);
        }

        // Broadcast the live message to ALL connected users (including sender)
        io.emit('chat message', { 
            type: 'message', 
            text: formattedMsg, 
            user: username 
        });
    });

    // 4. Handle Disconnection
    socket.on('disconnect', () => {
        // Tell everyone this user left
        socket.broadcast.emit('chat message', { 
            type: 'notification', 
            text: `🔴 ${username} left the channel.` 
        });
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`📡 Real-Time Server running on http://localhost:${PORT}`);
});
