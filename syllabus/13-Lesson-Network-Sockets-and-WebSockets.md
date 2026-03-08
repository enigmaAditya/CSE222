# Lecture 13: Network Sockets & WebSockets vs HTTP

## 1. The Real-World Problem
Imagine you are building a **Stock Trading App** or a **Chat App**. 
If a stock price changes at 10:01:05 AM, the client needs to see it immediately.
**Problem:** In standard HTTP (Lecture 2/9), the server **cannot talk to the client** unless the client asks first. The server is like a polite waiter: he only comes to your table if you wave your hand. If the kitchen catches fire, he can't tell you unless you wave again.

## 2. Why Naive Approaches Fail
- **Naive Approach (Short Polling):** The browser asks "Any updates?" every 1 second.
- **Why it Fails:**
    - **Latency:** If news happens at 1.1s, you wait 0.9s to know.
    - **Overhead:** 99% of those requests return "No updates", but you still spent time and bandwidth on the HTTP Headers (Lecture 9).
- **Naive Approach (Long Polling):** The browser asks "Any updates?" and the server **holds** the request open until something happens.
- **Why it Fails:** It consumes server resources (sockets) and is still technically a one-way street once the response is sent.

---

## 3. Mental Model: The Phone Call vs The Mailbox
- **HTTP (The Mailbox):** You send a letter, you wait for a reply. If you want more info, you send another letter.
- **WebSocket (The Phone Call):** You dial the number (Handshake). Once the call is connected, both people can talk simultaneously. You don't hang up until the conversation is over.

---

## 4. Formal Definition: Sockets & WebSockets
- **Network Socket:** An internal endpoint for sending or receiving data at a single node in a computer network. (IP + Port combination).
- **WebSocket:** A computer communications protocol, providing **full-duplex** (two-way) communication channels over a single TCP connection.

---

## 5. Internal Working: The Handshake Lifecycle

WebSockets don't start as WebSockets. They start as **HTTP**.

1. **The Upgrade Request:** The browser sends a normal-looking GET request but with special headers:
   ```http
   GET /chat HTTP/1.1
   Host: server.com
   Upgrade: websocket
   Connection: Upgrade
   Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==
   ```
2. **The Switching Protocol:** If the server supports WebSockets, it replies with:
   ```http
   HTTP/1.1 101 Switching Protocols
   Upgrade: websocket
   Connection: Upgrade
   ```
3. **The Connection:** The TCP socket remains open. The "language" shifts from HTTP text to **Binary Framing**.

---

## 6. How it fits into Node.js
In Unit I, we used the `net` module for raw TCP. For WebSockets, we often use the `ws` library (or Socket.IO, which we will see in Lecture 14).

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  console.log('Client connected via Phone Call (WebSocket)');

  ws.on('message', (message) => {
    console.log(`Received: ${message}`);
    // Server can talk back anytime!
    ws.send(`Echo: ${message}`);
  });

  // Server can push data without being asked
  setInterval(() => {
    ws.send('Breaking News: Stock price up!');
  }, 5000);
});
```

---

## 7. Code Example: Raw TCP Socket (The Parent)
To understand WebSockets, you must see the raw Socket from the `net` module again.

```javascript
const net = require('net');

const server = net.createServer((socket) => {
    // This is a raw TCP stream
    socket.write('Welcome to the raw network layer\n');
    socket.pipe(socket); // Echo back whatever is sent
});

server.listen(1337);
```

---

## 8. Common Beginner Mistakes
- **Confusing WebSockets with Socket.IO:** Socket.IO is a *library* that uses WebSockets as a transport. They are not the same thing.
- **Forgetting Heartbeats:** If a client goes through a microwave or a tunnel, the connection might "ghost". The server thinks they are still there. You must send "Pings" to check if the connection is alive.

---

## 9. Performance Considerations
- **Memory:** Each open WebSocket connection consumes RAM on the server. If you have 1 million users, you need a lot of RAM.
- **Concurrency:** Unlike HTTP requests that finish in 50ms, WebSockets stay for hours. This requires different server scaling strategies.

---

## 10. Security Implications
- **CSWSH (Cross-Site WebSocket Hijacking):** Similar to CSRF. A malicious site can open a WebSocket to your server on the user's behalf.
- **Solution:** Always validate the `Origin` header during the HTTP Handshake.

---

## 11. Edge Cases & Failure Scenarios
- **Proxy/Firewall Blocking:** Older office firewalls don't understand the "Upgrade" header and might kill the connection because it doesn't look like standard HTTP.

---

## 12. When NOT to use this
- **Standard Websites:** If you are just showing a blog post, WebSockets are overkill and wasteful. Use standard HTTP.
- **REST APIs:** Standard HTTP cache (Lecture 9) works much better for standard Data fetching.

---

## 13. Connection to Previous Topics
- Uses **TCP/IP Handshake** (Lecture 2).
- Relies on **Duplex Streams** (Lecture 7).
- Uses **EventEmitter** logic (`ws.on('message')`) (Lecture 6).

---

## 14. How this appears in Real Production
- **Gaming:** Real-time character movement.
- **Collaborative Editing:** Google Docs (seeing someone else's cursor).
- **Notifications:** That little red dot on Facebook/Twitter.

---

---

## 15. Syntax: The WebSocket Technical Dictionary

### 15.1 Server-Side (`ws` library)
| Method / Event | Syntax | Description |
| :--- | :--- | :--- |
| **`new WebSocket.Server()`**| `new WebSocket.Server({ port: 8080 })`| Initializes the socket server. |
| **`wss.on('connection')`**| `wss.on('connection', (ws) => {})` | Fires when a new client completes the handshake. |
| **`ws.send(data)`** | `ws.send("Hello")` | Sends a message to a specific client. |
| **`ws.on('message')`** | `ws.on('message', (msg) => {})` | Triggers when the client sends a message. |
| **`ws.on('close')`** | `ws.on('close', () => {})` | Triggers when the client disconnects. |
| **`ws.terminate()`** | `ws.terminate()` | Forcefully closes the connection immediately. |

### 15.2 Client-Side (Native Browser API)
| Method / Event | Syntax | Description |
| :--- | :--- | :--- |
| **`new WebSocket()`** | `const socket = new WebSocket('ws://url')`| Connects to the server. |
| **`socket.onopen`** | `socket.onopen = (e) => {}` | Fires when connection is established. |
| **`socket.onmessage`** | `socket.onmessage = (e) => {}`| Triggers when server sends data (`e.data`). |
| **`socket.send(data)`** | `socket.send("Hello")` | Sends data to the server. |
| **`socket.close()`** | `socket.close()` | Closes the connection gracefully. |

---

## Assignment
1. **Chat Broadcast:** Implement a server where `wss.clients.forEach(client => client.send(data))` is used to broadcast messages to everyone except the sender.
2. **Health Checks:** Implement a "Heartbeat" mechanism using `setInterval` and `ws.ping()`. If a client doesn't respond with a `pong` within 30 seconds, `terminate()` them.
3. **JSON Messaging:** Send an object from the browser: `socket.send(JSON.stringify({type: 'chat', msg: 'hi'}))`. Parse it on the server and handle different "types" of messages.
4. **Error Handling:** Manually stop your server while a client is connected and observe the `onclose` and `onerror` events in the browser console.

## Up Next
We dive into **Socket.IO Internals**. We will see how it handles "Polling Fallbacks" for old browsers and how it implements "Rooms" and "Namespaces" for organized communication.
