# Lecture 2: HTTP from First Principles

## 1. The Real-World Problem
We established that computers connect via TCP/IP. But once connected, **what language do they speak?**
If a file server expects "SEND FILE X" and a mail server expects "HELO MAIL", we have chaos. A browser would need a different plugin for every website.
**Problem:** We need a universal, text-based, stateless standard so *any* client (browser, mobile app, smart fridge) can talk to *any* server without prior agreement.

## 2. Why Naive Approaches Fail
**Naive Approach:** Custom binary protocols for everything (like ancient database drivers).
**Why it Fails:**
-   **Debuggability:** You can't read binary 010101 with your eyes.
-   **Firewalls:** Network admins block unknown protocols.
-   **Extensibility:** Adding a new field allows older clients to crash.

## 3. Formal Definition
**HTTP (Hypertext Transfer Protocol)** is an Application Layer protocol for transmitting hypermedia documents.
-   **Text-Based:** Human readable.
-   **Stateless:** The server forgets you the moment the response is sent.
-   **Request-Response:** The client speaks first; the server replies.

## 4. Internal Working: Anatomy of the Protocol
HTTP is just formatted text sent over a TCP socket.

### 4.1 The Request Structure
```http
VERB URI VERSION        <-- Start Line
Header-Name: Value      <-- Headers (Key-Value pairs)
Another-Header: Value
                        <-- Empty Line (CRLF) separates Header & Body
{ "data": "here" }      <-- Body (Optional)
```

### 4.2 The Response Structure
```http
VERSION STATUS_CODE REASON  <-- Start Line (Status Line)
Header-Name: Value
                        <-- Empty Line
<html>...</html>        <-- Body
```

## 5. Mental Model: The Form Filler
Think of HTTP as filling out a government form.
-   **Verb (GET/POST):** Checkbox for "What do you want to do?" (View Record / New Application).
-   **Headers:** Metadata box (Language: English, Date: Today).
-   **Body:** The actual application details stapled to the back.
-   **Status Code:** The stamp on return (Approved, Rejected, Form Incomplete).

## 6. Code Example: Parsing Raw HTTP (Node.js `net`)
Most tutorials use `express`. We will use `net` to see the **raw text** that `express` hides from you.

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Client connected');

  socket.on('data', (buffer) => {
    const rawRequest = buffer.toString();
    console.log('--- RAW REQUEST START ---');
    console.log(rawRequest);
    console.log('--- RAW REQUEST END ---');

    // Manually constructing a RAW HTTP Response
    // 1. Status Line: HTTP/1.1 200 OK
    // 2. Headers: Content-Type, Content-Length
    // 3. \r\n (Empty Line)
    // 4. Body: <h1>Hello</h1>
    
    const body = '<h1>Hello from Raw TCP</h1>';
    const response = 
      `HTTP/1.1 200 OK\r\n` +
      `Content-Type: text/html\r\n` +
      `Content-Length: ${body.length}\r\n` +
      `\r\n` + // The Critical Empty Line
      body;

    socket.write(response);
    socket.end(); // We must close the connection (Stateless)
  });
});

server.listen(8080, () => {
  console.log('Listening on 8080. Curl it or open Browser.');
});
```

## 7. Deep Dive: Methods & Status Codes

### 7.1 Critical Verbs
| Verb | Intent | Idempotent? | Safe? | Explanation |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | Ask for data | Yes | Yes | "Give me page X". Should NEVER modify data. |
| **POST** | Submit data | **NO** | No | "Create a new Order". calling twice = 2 orders. |
| **PUT** | Replace data | Yes | No | "Update User 1". Sending {name: "A"} twice results in "A". |
| **PATCH** | Partial Update | No | No | "Change only email". |
| **DELETE** | Remove data | Yes | No | "Delete User 1". Calling twice: 2nd time logic might fail (404), but system state is same (User is gone). |

* **Idempotent:** Doing it N times has the same effect as doing it once.
* **Safe:** Does not modify server state (Read-only).

### 7.2 The Status Code Spectrum
-   **1xx (Info):** "Hold on, I'm thinking" (100 Continue).
-   **2xx (Success):** "Here is your data" (200 OK, 201 Created).
-   **3xx (Redirect):** "Go away, it's over there" (301 Moved Permanently, 302 Found).
-   **4xx (Client Error):** "You messed up" (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found).
-   **5xx (Server Error):** "I messed up" (500 Internal Server Error, 502 Bad Gateway).

## 8. Common Beginner Mistakes
1.  **Using GET to Delete:** `<a href="/delete-user">Delete</a>`. Google bots will crawl that link and DELETE your database. **Always use POST/DELETE for actions.**
2.  **Ignoring Headers:** Not setting `Content-Type: application/json` and wondering why the client sees `[object Object]`.
3.  **Confusing 401 vs 403:**
    -   **401:** "Who are you?" (Login required).
    -   **403:** "I know who you are, but you can't come in" (Admin only).

## 9. Security Implications
-   **HTTP is Plaintext:** Anyone on the Wi-Fi coffee shop can run Wireshark and see your passwords.
-   **Solution:** **HTTPS (TLS/SSL).** It wraps the HTTP text in an encrypted tunnel. The server sees HTTP, but the wire sees garbage.
-   **HSTS:** A header that tells browsers "Never talk to me over HTTP again, even if the user asks."

## 10. Performance Considerations
-   **Keep-Alive:** TCP Handshake is slow (3-way). HTTP/1.1 keeps the connection open for multiple files (HTML + CSS + JS).
-   **Compression (Gzip/Brotli):** Sending text is wasteful. We zip it. `Accept-Encoding: gzip` header tells the server "I can unzip".

## 11. Edge Cases & Failure Scenarios
-   **Request Splitting:** Attacker injects CRLF (`\r\n`) into a header to fake a second request.
-   **Slowloris Attack:** Client sends header bytes `H...o...s...t...` extremely slowly to keep the socket open and exhaust server memory.

---

## 13. Modern Example: The `http` Module (ESM)
While `net` is for raw TCP, the `http` module is what you'll use 90% of the time for web servers.

```javascript
import http from 'http';

const server = http.createServer((req, res) => {
    // req: IncomingMessage (readable stream)
    // res: ServerResponse (writable stream)
    
    console.log(`Received request: ${req.method} ${req.url}`);
    
    res.end("Hello from Node.js with ES Modules!");
});

server.listen(3001, () => {
    console.log("Server running on http://localhost:3001");
});
```

## 14. Connection to Previous Topics
Node.js's `http` module is a wrapper around `net`.
-   It parses the raw buffer for you.
-   It gives you `req.method`, `req.headers`, `req.url` objects.
-   It handles the `Content-Length` calculation automatically.

## Assignment
1.  Run the "Raw Net" server above.
2.  Use `curl -v http://localhost:8080` to see the handshake and headers.
3.  Modify the raw string to return a 404 Status Code manually.
