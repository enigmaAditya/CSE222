# Lecture 9: HTTP Protocol Deep Dive

## 1. The Real-World Problem
In Lecture 2, we learned HTTP is just text. But real web apps are complex. 
**Problem A:** If HTTP is **Stateless** (forgets you immediately), how does Amazon remember what's in your cart as you click between pages?
**Problem B:** Establishing a TCP connection (3-way handshake) takes time. If a webpage has 50 images, do we really want to do the handshake 50 times?

## 2. Why Naive Approaches Fail
- **Naive Approach (One TCP per request):** In HTTP/1.0, every request closed the connection.
- **Why it Fails:** Browsers were incredibly slow. Most of the time was spent "connecting" rather than "downloading".
- **Naive Approach (Storing state on Server RAM):** Storing "User 1 is logged in" in a local variable.
- **Why it Fails:** If you have 2 servers for load balancing, Server A knows you, but Server B thinks you are a stranger.

---

## 3. Mental Model: The Amnesiac Customer
Imagine a waiter (Server) with severe short-term memory loss (Stateless). 
1. You say: "I want a Pizza."
2. He brings it and immediately forgets you ever existed.
3. You say: "And a Coke."
4. He says: "Who are you? I can't give you a Coke unless you have a Pizza order."
5. **The Solution:** You must carry a **Receipt** (Cookie/JWT) that says "I am the guy who bought the Pizza." HTTP stays stateless, but the data you pass back and forth creates the **Illusion of State**.

---

## 4. Formal Definition: Statelessness
**HTTP is Stateless:** The protocol does not require the server to retain session information or status about each communications partner for the duration of multiple preceding requests.

---

## 5. Internal Working: Persistence & Headers

### 5.1 Keep-Alive (Persistent Connections)
In HTTP/1.1 (the standard), the `Connection: keep-alive` header is the default. 
- The TCP socket stays open after the response.
- The browser can pump 50 requests through the same "pipe" without re-handshaking.
- Huge performance win.

### 5.2 The "Big Three" Headers
1. **Content-Type:** Tells the client how to interpret the bytes.
   - `application/json`: Treat as an object.
   - `text/html`: Render as a page.
   - `image/jpeg`: Display as pixels.
2. **User-Agent:** Tells the server "I am Chrome on Windows" or "I am an iPhone". Useful for serving different versions of a site.
3. **Accept-Encoding:** The browser says "I can speak Gzip" (Lecture 8).

---

## 6. How it fits into Node.js
When you use `http.createServer`, Node gives you a `req` (Request) and `res` (Response) object.
- `req` is a **Readable Stream** (Lecture 7). You read the body from it.
- `res` is a **Writable Stream**. You write headers and body to it.

```javascript
const http = require('http');

const server = http.createServer((req, res) => {
    // Examining Headers
    console.log(req.headers['user-agent']);

    // Setting Response Headers
    res.setHeader('Content-Type', 'text/plain');
    res.statusCode = 200;

    res.end('Hello Level 2!');
});

server.listen(3000);
```

---

## 7. Security Implications: The Host Header
If one IP address (a single server) hosts 100 different websites (e.g., `a.com`, `b.com`), how does it know which one you want?
- The TCP packet only has the IP.
- The **Host Header** inside the HTTP text (`Host: a.com`) tells the server which folder to look in.
- **Security Risk:** If you don't validate the Host header, an attacker can trick your server into serving internal configurations.

---

## 8. Performance Considerations: Caching
How do we avoid sending the same `logo.png` every time the user refreshes?
1. **ETag:** The server sends a hash of the file. Next time, the browser sends that hash back (`If-None-Match`). If the file hasn't changed, the server sends `304 Not Modified` (no body, super fast).
2. **Cache-Control:** `max-age=3600`. The browser won't even ask the server for 1 hour. It just loads from disk.

---

## 9. Common Beginner Mistakes
- **Capitalizing Header Keys:** While HTTP headers are case-insensitive in the protocol, Node.js lowercases all of them automatically for consistency. Accessing `req.headers['Content-Type']` (capital C) might fail if you aren't careful. Use all lowercase.
- **Double res.end():** You can only end a response once. If you try to write after `res.end()`, the server crashes with `ERR_HTTP_HEADERS_SENT`.

---

## 10. Connection to Previous Topics
- Caching uses the **TCP Connection** logic. 
- Request bodies are processed via **Streams** (Lecture 7).
- Async response timing depends on the **Event Loop** (Lecture 4).

---

## 11. How this appears in Real Production
- **CDNs (Content Delivery Networks):** Use the `Cache-Control` headers to store your images on servers globally near your users.
- **Microservices:** Service A talks to Service B over internal HTTP with specific custom headers (e.g., `X-Correlation-ID`) to track a request across 50 servers.

---

## Assignment
1. Using the `http` module, write a server that checks the `User-Agent`. If it's a mobile device, return "Mobile Version", otherwise return "Desktop Version".
2. Set a custom Header `X-Powered-By: MyBrain` and see it in your browser's Network tab.
3. Try to send a response and then another `res.write()` after 1 second using `setTimeout`. Observe the error.

## Up Next
We leave the low-level `http` module and enter **Express Internals**. We will see how Express is just a wrapper that adds a "Middleware Pipeline" to the basic Node server.
