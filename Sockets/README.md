# Comprehensive Guide to Socket.IO Syntax

This document covers everything from basic communication to advanced features like rooms, namespaces, and acknowledgements in Socket.IO.

---

## 1. Basic Emitting & Receiving (Server and Client)

This is the core of Socket.IO: sending and receiving events.

### **Receiving Events (Listening)**
Whenever you want to listen for an event, you use `.on()`.

*   **Syntax:** `socket.on('eventName', (data) => { /* logic */ })`
*   **When to use:** On the server to listen for messages from a client, or on the client to listen for messages from the server.
```javascript
// Server OR Client
socket.on('chatMessage', (msg) => {
    console.log('Received:', msg);
});
```

### **Basic Emitting (Sending)**
*   **Syntax:** `socket.emit('eventName', data)`
*   **When to use:** When you want to send a message to the specific entity on the other side of this exact socket.
    *   **Server-side:** Sends a message *only* to the single client associated with that `socket`.
    *   **Client-side:** Sends a message to the server.
```javascript
// Send a string, object, or even multiple arguments
socket.emit('chatMessage', 'Hello World');
socket.emit('userData', { id: 1, name: 'Alice' });
```

---

## 2. Broadcasting (Server-Side Only)

Broadcasting is used when you want to send a message to multiple clients at once from the server.

*   **Syntax: `io.emit('eventName', data)`**
    *   **What it does:** Sends the event to **ALL** connected clients, including the one who triggered the server code.
    *   **When to use:** Global announcements (e.g., "Server goes down in 5 mins", or a global live ticker).

*   **Syntax: `socket.broadcast.emit('eventName', data)`**
    *   **What it does:** Sends the event to **ALL** connected clients **EXCEPT** the client that triggered the event.
    *   **When to use:** "User X joined the chat" (everyone needs to know except User X).

---

## 3. Rooms (Server-Side Only)

Rooms allow you to group sockets together. You can broadcast a message only to sockets that have "joined" a specific room.

### **Joining and Leaving a Room**
*   **Syntax:** `socket.join('roomName')` and `socket.leave('roomName')`
*   **When to use:** When a user enters a specific chatroom, a specific game match, or subscribes to a specific data feed.
```javascript
io.on('connection', (socket) => {
    socket.on('joinGame', (gameId) => {
        socket.join(gameId); // Joins a room named after the gameId
    });
});
```

### **Emitting to a Room**
*   **Syntax: `io.to('roomName').emit('eventName', data)`**
    *   **What it does:** Sends the message to **everyone** in that specific room.
    *   **When to use:** Emitting a chat message to a specific #general channel or updating the state of a specific multiplayer game.

*   **Syntax: `socket.to('roomName').emit('eventName', data)`** (Notice it's `socket`, not `io`)
    *   **What it does:** Sends the message to everyone in the room **EXCEPT** the sender.
    *   **When to use:** Sending a "Player X moved" event to a game lobby so all other players see the movement.

### **Emitting to Multiple Rooms**
*   **Syntax:** `io.to('roomA').to('roomB').emit('eventName', data)`
*   **What it does:** Sends to everyone in Room A and Room B.

---

## 4. Namespaces (Server and Client)

Namespaces allow you to split your Socket.IO logic over a single shared connection. By default, everything connects to the `/` namespace.

### **Server-Side Namespaces**
*   **Syntax:** `const myNamespace = io.of('/my-namespace')`
*   **When to use:** If you have an app with an "Admin panel" and a "Public User interface," you can create `/admin` and `/users`. They run completely separately.
```javascript
// Server
const adminSpace = io.of('/admin');
adminSpace.on('connection', (socket) => {
    console.log('Someone connected to admin namespace');
    adminSpace.emit('alert', 'Welcome Admins');
});
```

### **Client-Side Connecting to a Namespace**
*   **Syntax:** `const socket = io('/my-namespace')`
```javascript
// Client
const adminSocket = io('/admin');
adminSocket.on('alert', (msg) => console.log(msg));
```

---

## 5. Acknowledgements (Server and Client)

Sometimes you need to know if the other side successfully received and processed your event. This acts like a standard request/response (like HTTP).

*   **Syntax (Sender):** Add a callback function as the **last** argument to `.emit()`.
*   **Syntax (Receiver):** The receiver accepts this callback as the last argument and calls it with a response.

**Example (Client asks Server for data):**
```javascript
// Client sending and asking for an acknowledgement
socket.emit('getData', { id: 123 }, (response) => {
    console.log('Server replied with:', response.status); // Prints: 'Success'
});
```
```javascript
// Server receiving and acknowledging
socket.on('getData', (data, callback) => {
    // Process the data...
    // Call the callback to send data back to that specific client
    callback({
        status: 'Success', 
        receivedId: data.id 
    });
});
```
*   **When to use:** Standard database fetches over sockets, form submissions where you need a quick success/fail status without creating a separate listening event.

---

## 6. Volatile Events (Server and Client)

Volatile events are messages that might be dropped if the underlying connection is not ready (e.g., the network is slow or reconnecting). Socket.IO won't buffer them to try again later.

*   **Syntax:** `socket.volatile.emit('eventName', data)`
*   **When to use:** High-frequency data where old data is useless. For example, sending mouse coordinates for a cursor 60 times a second, or sending real-time live stock prices. If one packet drops, it doesn't matter because a new one is coming immediately.

---

## 7. Other Useful Utilities

*   **Get a Socket's ID:** `socket.id` (A unique 20-character identifier for that specific connection).
    *   *Note: Every socket automatically joins a room named matching its own `socket.id`.*
*   **Listen to an event exactly ONCE:** `socket.once('eventName', (data) => { ... })`
*   **Disconnect a socket from the server:** `socket.disconnect()`
*   **Fire middleware (Server-side):** `io.use((socket, next) => { ... })`
    *   **When to use:** Authentication. You can check tokens before allowing the socket connection to establish.
