# Lecture 10: Express Internals and Routing

## 1. The Real-World Problem
We built a raw HTTP server in Lecture 9. 
**Problem A:** What if we have 100 pages? The code becomes a massive, ugly `if/else` block based on `req.url`.
**Problem B:** Raw Node `res.end()` only sends strings or buffers. If you want to send JSON, you have to `JSON.stringify` manually every time. If you want to send a file, you have to write a 10-line Stream pipe manually.
**Problem C:** Error handling in raw Node is repetitive.
**The Solution:** **Express.js**. It is a "Minimalist Web Framework".

---

## 2. Why Naive Approaches Fail
- **Naive Approach (Massive `if-else`):** 
  ```javascript
  if (req.url === '/home') { ... } 
  else if (req.url === '/about') { ... }
  ```
- **Why it Fails:** This is impossible to maintain, difficult to test, and doesn't handle dynamic paths like `/user/:id`.

---

## 3. Mental Model: The Factory Assembly Line
Imagine a factory (Express App). 
1. The **Request** enters the factory as a raw piece of steel.
2. It moves down a **Conveyor Belt** (The Pipeline).
3. At each station (**Middleware/Route**), a worker either adds a part to it, paints it, or tosses it out (Error).
4. At the end, it is boxed and sent back as a **Response**.

---

## 4. Formal Definition: Express
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.

---

## 5. Internal Working: What is `app` actually?

### 5.1 The Wrapper Mechanism
When you do `const app = express();`, what is `app`?
- `app` is actually just a **Function**.
- It is designed to be passed into `http.createServer(app)`.
- When a request hits the server, Node calls `app(req, res)`.

### 5.2 The Decoration
Express takes the raw `req` and `res` from Node and **decorates** them (adds extra functions).
- `res.json()`: Sets `Content-Type` and stringifies.
- `res.status()`.
- `req.params`, `req.query`, `req.body`.

### 5.3 Routing Internals: The "Layer" System
Inside Express, there is an array called the `stack`.
- Every time you do `app.get('/path', handler)`, Express creates a **Layer**.
- A Layer contains:
  1. The path regex (`/path`).
  2. The method (`GET`).
  3. The handler function.
- When a request comes in for `/about`, Express loops through the stack, finds a Layer that matches, and executes the handler.

---

## 6. Code Contrast: Raw vs Express

**Raw Node.js:**
```javascript
const http = require('http');
http.createServer((req, res) => {
    if (req.url === '/api' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: "Hello" }));
    }
}).listen(3000);
```

**Express.js:**
```javascript
const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    res.json({ message: "Hello" }); // Cleaner, safer, faster to write
});

app.listen(3000);
```

---

## 7. Common Beginner Mistakes
- **Mixing `res.send()` and `res.end()`:** Stick to the Express methods (`send`, `json`, `render`). They handle headers better.
- **Forgetting that Path Order Matters:** If you define `app.get('/:id')` before `app.get('/about')`, the string "about" will be treated as an ID, and the about page will never load.

---

## 8. Performance Considerations: `app.listen` vs `server.listen`
`app.listen()` is just a convenience function. Internally it does:
```javascript
app.listen = function() {
  const server = http.createServer(this);
  return server.listen.apply(server, arguments);
};
```
If you need to use **WebSockets (Socket.io)** or **HTTPS**, you often need the raw `server` object. Using `http.createServer(app)` explicitly is better for expert-level control.

---

## 9. Connection to Previous Topics
- Express is built on the **HTTP Module** (Lecture 9).
- Decorating `req/res` relies on **JS Objects & Prototypes**.
- Routing is simply **Array Iteration** and **Regex Matching**.

---

## 10. How this appears in Real Production
- **Microservice Frameworks:** Most modern Node services (NestJS, etc.) use Express under the hood because its routing engine is battle-tested.
- **API Versioning:** Using Express Routers to separate `/v1/` and `/v2/` logic into clean folders.

---

## Assignment
1. Install express: `npm install express`.
2. Create a basic server with three routes: `/`, `/contact`, and `/api/user`.
3. Use `req.params` to create a dynamic route: `/hello/:name`.
4. Try to return a 404 page for any route that isn't defined using `app.use()`.

## Up Next
The most important concept in all of web development: **The Middleware Pipeline**. We will learn why `next()` is the secret to everything in Express.
