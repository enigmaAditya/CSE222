# Lecture 1: The First Principles of Backend Engineering

## 1. What a Backend Server Actually Is

### 1.1 The Real-World Problem
Imagine you are building a banking application. You have a mobile app (Frontend).
If you store the user's balance on their phone, they can just edit the file and become a billionaire.
**Problem:** We need a single source of truth that is **secure**, **persistent** (data survives app restart), and **shared** (I can send money to you).
**Naive Approach:** Connect the phone directly to a database.
**Why it Fails:** You would have to embed your database password in the mobile app code. Anyone can decompile the app, steal the password, and delete the database.

### 1.2 Formal Definition
A **Backend Server** is a perpetually running process on a remote computer that listens for incoming requests, validates authorized access, executes business logic, and ensures data integrity before interacting with the database.
It is the **Gatekeeper** and the **Brain**.

### 1.3 Internal Working (Mental Model)
Think of a server as a **Receptionist** in a high-security office building.
1.  **Listen:** The receptionist sits at the desk (Port) waiting for people (Requests).
2.  **Route:** A person asks for "Accounts". The receptionist checks the directory (Router).
3.  **Validate:** The receptionist asks for ID (Auth).
4.  **Process:** The receptionist calls the Accounts manager (Controller).
5.  **Response:** The manager gives the report, and the receptionist hands it to the visitor.

### 1.4 Code Example (Minimal Node.js)
```javascript
const net = require('net');

// This is a raw TCP server, the lowest level of "Backend"
const server = net.createServer((socket) => {
  console.log('Client connected');
  
  socket.on('data', (data) => {
    // 1. Listen & Receive
    console.log('Received:', data.toString());
    
    // 2. Process (Business Logic)
    const response = `Server says: You sent ${data.length} bytes`;
    
    // 3. Respond
    socket.write(response);
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

### 1.5 Common Beginner Mistakes
- **Confusing "Server" (Hardware) with "Server" (Software).** You will run a "Server" (Node.js process) on a "Server" (AWS EC2 instance).
- **Thinking the backend is just the Database.** The backend is the *code* that talks to the database.

---

## 2. How the Web Works End-to-End

### 2.1 The Problem
You type `google.com` and hit enter. How does your computer, physically located in India, find a specific computer in California and get a webpage back in milliseconds?

### 2.2 The Stack (Mental Model)
1.  **DNS (The Address Book):** "google.com" is a human name. Computers need IP addresses (Coordinates).
2.  **TCP (The Guarantee):** The internet is unreliable. Cables break, packets get lost. TCP ensures the message arrives intact.
3.  **IP (The Route):** Finding the path across thousands of routers to get to the destination.
4.  **Ports (The Door):** The server computer has many programs. Which one handles Web traffic? (Usually port 80 or 443).

### 2.3 Internal Working: The Lifecycle of a Request
1.  **Browser:** Checks local cache for `google.com` IP. If missing, asks OS.
2.  **OS/DNS Resolver:** Asks your ISP's DNS -> Root Server -> TLD Server (.com) -> Authoritative Server (Google's DNS).
    - *Result:* `142.250.193.206`
3.  **TCP Handshake (SYN, SYN-ACK, ACK):** Your computer sends a "Hello" to `142.250.193.206` on Port 443. The server acknowledges. A "Virtual Connection" is established.
4.  **SSL/TLS Handshake:** Encryption keys are exchanged.
5.  **HTTP Request:** Browser sends `GET / HTTP/1.1`.
6.  **Server Procesing:** Google's backend runs code.
7.  **HTTP Response:** Server sends text string (HTML).
8.  **Rendering:** Browser draws pixel on screen.

### 2.4 Edge Cases & Failure Modes
- **DNS Poisoning:** Hacker changes the phonebook to point `google.com` to their IP.
- **Packet Loss:** TCP retransmits automatically. If too much loss -> "Connection Timed Out".
- **Port Closed:** Firewall blocks Port 80. Connection Refused.

---

## 3. Why Node.js? (The I/O Problem)

### 3.1 The Problem: Blocking I/O
In early 2000s, standard backends (Java, PHP) were **Multi-threaded**.
- **Model:** Create a new "Thread" (worker) for every incoming request.
- **Scenario:** 1000 users request a file from the database.
- **Flaw:** Thread 1 asks Database for file. Database takes 100ms. **Thread 1 sits idle (Blocked)** for 100ms, doing nothing, but eating RAM.
- **Scale Limit:** 4GB RAM can only hold ~4000 threads. The 4001st user is rejected.

### 3.2 The Solution: Event-Driven, Non-Blocking I/O
Ryan Dahl (creator of Node.js) looked at Nginx and Chrome (V8 Engine).
He asked: "What if we have **ONE** thread (The Receptionist), but it **NEVER** waits?"

### 3.3 Mental Model: The Restaurant Kitchen
- **Blocking (Java/PHP):** Checkers. One cashier handles one customer fully. If customer forgets wallet, cashier waits. Line stops.
- **Non-Blocking (Node.js):** Starbucks.
    1.  User A orders Coffee. Cashier (Node) writes name on cup, passes to Barista (System/OS), and immediately takes User B's order.
    2.  Cashier **never** makes coffee.
    3.  When coffee is ready, Barista yells "Order for User A!" (Callback/Event), and User A gets it.

### 3.4 Internal Working (The Event Loop - Simplified)
We will go deep into this in Unit I, but for now:
1.  Node.js starts.
2.  Executes your script (Main Thread).
3.  When it sees `fs.readFile` (Slow I/O), it tells the OS "Do this in the background" and moves to the next line.
4.  Node.js sits in an infinite `while(true)` loop (The Event Loop) checking: "Is any background task done?"
5.  If yes, it runs the callback function.

### 3.5 Code Contrast

**Blocking (Pseudo-Code):**
```javascript
const file = fs.readFileSync('large-video.mp4'); // Execution STOPS here for 500ms
console.log('Done'); // Prints after 500ms
```
*Users waiting in line are frozen.*

**Non-Blocking (Node.js):**
```javascript
fs.readFile('large-video.mp4', (err, data) => {
  console.log('Done'); // Prints after 500ms
});
console.log('Next!'); // Prints IMMEDIATELY
```
*The server stays responsive.*

### 3.6 When NOT to use Node.js
- **CPU Intensive Tasks:** If the "Cashier" has to solve a Sudoku puzzle (Heavy Math/Image Processing), he cannot take new orders. The whole line stops.
- **Use Node for:** I/O heavy tasks (API, Real-time chat, Streaming).
- **Use Python/Go/Rust for:** CPU heavy tasks (AI, Video Encoding, Number crunching).

---

---

---

## 4. Syntax: The Foundations Toolkit

### 4.1 The `net` Module (TCP Networking)
| Method / Event | Syntax | Purpose |
| :--- | :--- | :--- |
| **`net.createServer()`**| `net.createServer((socket) => {})` | Creates a new TCP Server instance. |
| **`server.listen(port)`**| `server.listen(3000)` | Starts listening for connections. |
| **`server.on('error')`** | `server.on('error', (err) => {})` | Handles server-level startup errors (e.g., EADDRINUSE). |
| **`socket.write(data)`** | `socket.write("text")` | Sends data to the connected client. |
| **`socket.end()`** | `socket.end()` | Half-closes the connection (sends FIN packet). |
| **`socket.destroy()`** | `socket.destroy()` | Forcefully kills the connection immediately. |
| **`socket.on('data')`** | `socket.on('data', (buf) => {})` | Triggers when the client sends data to us. |

### 4.2 The `fs` Module (File System)
| Method | Asynchronous Syntax (Recommended) | Synchronous Syntax (Blocking) |
| :--- | :--- | :--- |
| **Read** | `fs.readFile(path, cb)` | `fs.readFileSync(path)` |
| **Write** | `fs.writeFile(path, data, cb)` | `fs.writeFileSync(path, data)` |
| **Append**| `fs.appendFile(path, data, cb)` | `fs.appendFileSync(path, data)` |
| **Delete** | `fs.unlink(path, cb)` | `fs.unlinkSync(path)` |
| **Check** | `fs.access(path, mode, cb)` | `fs.accessSync(path, mode)` |
| **Status**| `fs.stat(path, cb)` | `fs.statSync(path)` |

### 4.3 The `process` Global Object
| Property / Method | Usage | Description |
| :--- | :--- | :--- |
| **`process.pid`** | `console.log(process.pid)` | The unique ID of this current running thread. |
| **`process.env`** | `process.env.PORT` | Access to System Environment Variables. |
| **`process.argv`** | `process.argv[2]` | Array containing command-line arguments. |
| **`process.exit()`** | `process.exit(0)` | Forcefully stops the Node.js process. |

---

## Assignment / Next Steps
1.  **Verify:** Open your terminal. Run `node` to enter REPL. Type `process.pid`. That is the Process ID of your single thread.
2.  **Experiment:** Write a script that reads a large file synchronously vs asynchronously and time it using `console.time()`.

## Up Next
We will dive into **HTTP from First Principles**. not just verbs, but the raw text protocol, headers, and the request/response anatomy.
