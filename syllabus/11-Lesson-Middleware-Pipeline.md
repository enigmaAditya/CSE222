# Lecture 11: Middleware Pipeline & Request Lifecycle

## 1. The Real-World Problem
Imagine you want to check if a user is logged in before they see 50 different pages.
**Problem:** If you don't have middleware, you have to copy-paste the "Check Login" code into 50 different route handlers. If you decide to change the logic, you have to edit 50 files.
**The Solution:** **Middleware**. You write the code once, and tell Express to run it *before* it hits your final route.

---

## 2. Why Naive Approaches Fail
- **Naive Approach (Function Calls inside handlers):** 
  ```javascript
  app.get('/dashboard', (req, res) => {
      checkAuth(req); // Copy pasted in every route
      res.send('Welcome');
  });
  ```
- **Why it Fails:** It is not "Transparent". The route handler should focus on business logic (`Welcome`), not infrastructure logic (`Auth`). You also have to manually handle the "break" if `checkAuth` fails.

---

## 3. Mental Model: The Security Checkpoint
Imagine going to a concert.
1. **Gate 1 (Middleware):** Security checks your bag. If it's clean, they say **"Next"**.
2. **Gate 2 (Middleware):** Ticket taker scans your ticket. If valid, they say **"Next"**.
3. **The Stage (Route Handler):** You finally see the band.
- If at any gate they find a problem, they kick you out (**`res.send('Forbidden')`**), and you never see Gate 2 or the Stage.

---

## 4. Formal Definition: Middleware
Middleware functions are functions that have access to the **request object (req)**, the **response object (res)**, and the **next middleware function** in the application’s request-response cycle.

---

## 5. Internal Working: The `next()` Function

### 5.1 The Signature
A middleware function looks like this:
```javascript
function myMiddleware(req, res, next) {
    // 1. Do something (Log data, check auth)
    // 2. Pass control to the NEXT worker
    next(); 
}
```

### 5.2 How `next()` works internally
- Express keeps an array of functions for every route.
- When you call `next()`, Express increments an internal index and calls the function at `stack[index + 1]`.
- **CRITICAL:** If you don't call `next()` and you don't call `res.send()`, the request will **HANG forever**. The browser will just show a spinning circle until it times out.

---

## 6. Types of Middleware

1. **Application-level (Global):** Runs for every single request.
   - `app.use(express.json())`
2. **Router-level:** Specific to a group of routes.
3. **Built-in:** `express.static`, `express.json`.
4. **Third-party:** `cookie-parser`, `morgan` (logging), `cors`.
5. **Error-handling:** Specially identified by 4 arguments `(err, req, res, next)`.

---

## 7. Code Example: Building a Logger and Auth Check

```javascript
const express = require('express');
const app = express();

// 1. Global Middleware (Logger)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next(); // Move to next station
});

// 2. Path-specific Middleware (Auth)
const checkAdmin = (req, res, next) => {
    if (req.query.admin === 'true') {
        next();
    } else {
        res.status(403).send('Not an admin!');
    }
};

app.get('/dashboard', checkAdmin, (req, res) => {
    res.send('Welcome to the Secret Dashboard');
});

app.listen(3000);
```

---

## 8. Common Beginner Mistakes
- **Writing logic AFTER `next()`:**
  ```javascript
  app.use((req, res, next) => {
      next();
      console.log('Done'); // This runs AFTER the response is sent. Confusing!
  });
  ```
- **Calling `next()` AND `res.send()`:** This leads to the infamous "Headers already sent" error. Once you send a response, the cycle is over.

---

## 9. Performance Considerations
- **Ordering Matters:** Put your fast middleware (logging, security) at the top. Put slow ones (database checks) only on specific routes where they are needed.
- **`app.use(express.static('public'))`:** This should be at the very top so Node doesn't run complex logic for every simple image or CSS file.

---

## 10. Connection to Previous Topics
- Middleware execution is **Synchronous** unless the middleware itself contains async code.
- It relies on the **EventEmitter** pattern (Express emits events when requests arrive).
- It uses **High-Order Functions** (passing functions into functions).

---

## 11. How this appears in Real Production
- **Rate Limiting:** A middleware checks if an IP has made 1000 requests in 1 minute. If so, it blocks.
- **Body Parsing:** Converting the raw byte stream (Lecture 7) into a JSON object `req.body`.

---

## Assignment
1. Create a middleware that records the "Start Time" of a request using `Date.now()`.
2. In the route handler, calculate how long the request took and print it.
3. Use `req.user = { name: 'Aditya' }` inside a middleware and try to access it in a route handler. *This is how session information is shared.*

## Up Next
We will learn **Error Handling Architecture** and **Monoliths vs Microservices**. We will see why simply throwing an error in an async function can crash your entire Express server.
