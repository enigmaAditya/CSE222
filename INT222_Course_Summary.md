# INT222: Node.js and Express.js Course Summary

This document provides a comprehensive analysis of the concepts and programs taught in the `INT222` course, as derived from the directory files.

---

## 1. Node.js Core Fundamentals

### HTTP Server Basics
Node's built-in `http` module is used to create web servers without external frameworks.
- **Key File**: `ClassFiles/servers/http.js`
- **Concept**: Using `http.createServer` to handle requests and responses.
```javascript
import http from 'http';
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end("Hello World");
});
server.listen(3000);
```

### File System (fs) & Paths
The `fs` module is used for interacting with the file system.
- **Concepts**: `readFile`, `writeFile`, `createReadStream`, `createWriteStream`.
- **Path Management**: Using `path.join`, `path.resolve`, and `__dirname` (via `fileURLToPath` for ES modules) to handle cross-platform file paths.

### Streams
Streams handle data piece-by-piece (chunks), which is memory efficient for large files.
- **Key File**: `streams/readstream.js`
- **Events**: `data` (when a chunk arrives), `end` (when reading finishes), `error`.
```javascript
readstream.on("data", (chunk) => { console.log(chunk); });
```

---

## 2. Asynchronous Programming

### Promises
Promises are used to handle asynchronous operations more cleanly than callbacks.
- **Key File**: `Promise/promise1.js`
- **States**: Pending, Resolved, Rejected.
- **Methods**: `.then()` for success, `.catch()` for errors.

---

## 3. Data Compression (Zlib)

The `zlib` module provides compression and decompression (Gzip, Deflate).
- **Key File**: `zlib/notes.md`, `zlib/gzip.js`
- **Mechanism**: Piping a readable stream through a transform stream (`zlib.createGzip()`) to a writable stream.
- **Important**: Compression must finish (`finish` event) before decompression starts to avoid `Z_BUF_ERROR`.

---

## 4. Express.js Framework

Express simplifies server creation, routing, and middleware management.

### Basic Setup & Routing
- **Key File**: `Express/expressfirst.js`
- **Methods**: `app.get()`, `app.post()`, `app.put()`, `app.delete()`.
- **Response**: `res.send()`, `res.json()`, `res.sendFile()`.

### Modular Routing (Express Router)
For larger apps, routes are divided into separate files using `express.Router`.
- **Key File**: `expressRouter/foodroutes.js`
```javascript
const router = express.Router();
router.get('/food', (req, res) => { ... });
export default router;
```

---

## 5. State Management: Cookies & Sessions

### Cookies
- **Library**: `cookie-parser`
- **Usage**: Setting cookies with `res.cookie(name, value, options)` and reading with `req.cookies`.
- **Key File**: `cookies/cookies.js`

### Sessions
- **Libraries**: `express-session`, `cookie-session`.
- **Purpose**: Maintaining user state across multiple requests on the server-side.

---

## 6. Data Validation

Validation ensures that incoming data (like form inputs) meets specific criteria.
- **Library**: `express-validator`
- **Key File**: `validation/valid.js`
- **Features**: `body()`, `validationResult()`, and chaining methods like `isEmail()`, `isLength()`, `notEmpty()`.
```javascript
app.post("/submit", [
    body('email').isEmail().withMessage('Invalid Email'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) { ... }
});
```

---

## 7. Static Files & Middleware
- **Static Hosting**: `app.use(express.static('public'))` is used to serve CSS, Images, and Client-side JS.
- **Middleware**: Functions that have access to the request/response objects to perform tasks like logging, parsing (`express.json()`, `express.urlencoded()`), or authentication.

---
*Summary generated for INT222 Course Analysis.*
