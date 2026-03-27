const socket = io();

// DOM Elements
const loginOverlay = document.getElementById('loginOverlay');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('usernameInput');

const chatInterface = document.getElementById('chatInterface');
const messagesContainer = document.getElementById('messagesContainer');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const sendBtn = document.getElementById('sendBtn');
const typingIndicator = document.getElementById('typingIndicator');

let myUsername = '';
let typingTimeout = null;

// --- LOGIN FLOW ---
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value.trim();
    if (username) {
        myUsername = username;
        
        // Let server know we joined
        socket.emit('join', username);
        
        // Update UI
        loginOverlay.classList.add('hidden');
        chatInterface.classList.remove('hidden');
        
        // Enable inputs
        messageInput.disabled = false;
        sendBtn.disabled = false;
        messageInput.focus();
    }
});

// --- CHAT FLOW ---
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = messageInput.value.trim();
    if (msg) {
        // Send message
        socket.emit('chat_message', msg);
        messageInput.value = '';
        
        // Stop typing indicator immediately when sending
        socket.emit('typing', false);
        clearTimeout(typingTimeout);
    }
});

// --- TYPING INDICATOR LOGIC ---
messageInput.addEventListener('input', () => {
    socket.emit('typing', true);
    
    // Clear previous timeout
    if (typingTimeout) clearTimeout(typingTimeout);
    
    // Set new timeout to stop typing indicator after 1.5 seconds of inactivity
    typingTimeout = setTimeout(() => {
        socket.emit('typing', false);
    }, 1500);
});

// --- SOCKET LISTENERS ---

// Handle standard chat messages
socket.on('chat_message', (data) => {
    const isMine = data.username === myUsername;
    
    const wrapper = document.createElement('div');
    wrapper.classList.add('message-wrapper');
    wrapper.classList.add(isMine ? 'mine' : 'others');
    
    const meta = document.createElement('div');
    meta.classList.add('message-meta');
    meta.textContent = isMine ? data.time : `${data.username} • ${data.time}`;
    
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.textContent = data.text;
    
    wrapper.appendChild(meta);
    wrapper.appendChild(bubble);
    
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
});

// Handle system messages (joins/leaves)
socket.on('system_message', (msg) => {
    const sysMsg = document.createElement('div');
    sysMsg.classList.add('system-msg');
    sysMsg.textContent = msg;
    messagesContainer.appendChild(sysMsg);
    scrollToBottom();
});

// Handle typing indicator broadcasts
let usersTyping = new Set();
socket.on('user_typing', (data) => {
    if (data.isTyping) {
        usersTyping.add(data.username);
    } else {
        usersTyping.delete(data.username);
    }
    
    updateTypingIndicator();
});

function updateTypingIndicator() {
    if (usersTyping.size === 0) {
        typingIndicator.classList.add('hidden');
    } else if (usersTyping.size === 1) {
        typingIndicator.textContent = `${Array.from(usersTyping)[0]} is typing...`;
        typingIndicator.classList.remove('hidden');
    } else {
        typingIndicator.textContent = `Several people are typing...`;
        typingIndicator.classList.remove('hidden');
    }
}

function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}
