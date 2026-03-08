# Lecture 12: Error Handling Architecture & System Design

## 1. The Real-World Problem
Apps crash. Databases go down. Users send garbage data.
**Problem A:** If you don't handle an error, Express sends a giant "Stack Trace" (your raw code) to the user. This is a **Security Risk** because it reveals your file structure and logic.
**Problem B:** In an async function, if you `throw new Error()`, Node doesn't know which request it belonged to. The whole server **crashes** for EVERY user, not just the one who caused the error.

---

## 2. Why Naive Approaches Fail
- **Naive Approach (`try/catch` in every route):** 
  ```javascript
  app.get('/', async (req, res) => {
      try { ... } catch (e) { res.status(500).send("Error"); }
  });
  ```
- **Why it Fails:** Massive code duplication. If you want to change the error page design, you have to edit every single route.

---

## 3. Formal Definition: Error Middleware
Error-handling middleware always takes **four** arguments. You must provide four arguments to identify it as an error-handling middleware function.
```javascript
app.use((err, req, res, next) => { ... });
```

---

## 4. Internal Working: The `next(err)` Propagation

When you pass an argument to `next()` (e.g., `next('something broke')`), Express stops looking for normal routes and **skips directly** to the first Error Middleware it finds in the stack.

### 4.1 Synchronous vs Asynchronous Errors
- **Sync:** Express catches them for you.
  ```javascript
  app.get('/', (req, res) => {
      throw new Error('Sync fail'); // Express catches this automatically
  });
  ```
- **Async:** You **MUST** manually catch and pass to `next`.
  ```javascript
  app.get('/', async (req, res, next) => {
      try {
          await db.save();
      } catch (err) {
          next(err); // Crucial! Without this, the server crashes.
      }
  });
  ```

---

## 5. Architectural Design: Monolith vs Microservices

### 5.1 The Monolith (One Big App)
- **What it is:** Your API, Auth, and Database logic all live in one Express project.
- **Pros:** Easy to deploy, fast development, no network latency between parts.
- **Cons:** If one part (e.g., Video Processing) is slow, it slows down the whole app.

### 5.2 Microservices (Many Small Apps)
- **What it is:** `auth-service`, `payment-service`, `user-service` are separate Express apps on different servers.
- **Pros:** Scalability. You can give 10 servers to "Payments" and only 1 to "About Us".
- **Cons:** Extremely complex. You have to handle network failures between services. **Don't start with this.**

---

## 6. Code Example: Centralized Error Handler

```javascript
const express = require('express');
const app = express();

// A route that fails
app.get('/bug', (req, res, next) => {
    const err = new Error('Database connection timed out');
    err.status = 503;
    next(err); // Trigger error pipeline
});

// THE GLOBAL ERROR HANDLER (Place this at the bottom!)
app.use((err, req, res, next) => {
    const status = err.status || 500;
    
    // 1. Log to server console (Internal)
    console.error(`[ERROR] ${err.message}`);
    
    // 2. Send clean message to user (External)
    res.status(status).json({
        success: false,
        message: err.message || 'Internal Server Error',
        // Only show stack trace in development mode!
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

app.listen(3000);
```

---

## 7. Common Beginner Mistakes
- **Placing Error Middleware at the top:** It will never run. It must be at the very bottom of the file (after all routes).
- **Forgetting the `next` argument:** Even if you don't use it, the function MUST have 4 arguments in the signature so Express recognizes it.

---

## 8. Security Implications
- **Information Leakage:** As mentioned, never send raw `err.stack` to a production user. Hackers look for these to find vulnerabilities.
- **Fail Gracefully:** High-traffic sites should return a static "Our servers are busy" HTML page instead of raw JSON if everything collapses.

---

## 9. Performance Considerations
- Error handling has zero overhead if there are no errors.
- **Logging vs Printing:** In production, use a library like `Winston` or `Pino` to write errors to a file/database, don't just use `console.log`.

---

## 10. Connection to Previous Topics
- Error middleware uses the **Pipeline** concept (Lecture 11).
- Async errors rely on **Promises** and **Exception Handling** (Lecture 8).
- Stack traces reveal **Modules** and **File Paths** (Lecture 5).

---

## Assignment
1. Create a server with a global error handler.
2. Create a "Custom Error" class that extends `Error` and adds a `statusCode` property.
3. Throw this custom error from a route and verify the global handler sends the correct code.
4. Experiment with `process.on('unhandledRejection')` to catch errors that escaped `try/catch`.

## END OF UNIT II
You now know how to build, route, secure, and handle errors in a production-grade Express app.
**Next Module:** **UNIT III – Sockets, Middleware Patterns, and Advanced Security.** We will move from one-way HTTP to two-way real-time communication.
