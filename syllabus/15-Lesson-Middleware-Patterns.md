# Lecture 15: Middleware Design Patterns

## 1. The Real-World Problem
We know how to write middleware (`req, res, next`). But in a real project, things get messy.
**Problem A:** What if you want a middleware that logs data, but in Production you want it to log to a file, and in Development you want it to log to the console?
**Problem B:** What if you need a middleware that only allows access to people with a specific "Role", but the role changes depending on the route?
**The Solution:** **Configurable Middleware Patterns.**

## 2. Why Naive Approaches Fail
- **Naive Approach (Hardcoded Global Variables):** 
  ```javascript
  const role = 'admin';
  app.use((req, res, next) => { if(user.role === role) next(); });
  ```
- **Why it Fails:** You can't change the `role` dynamically for different routes. You would need to write 10 different middleware functions for 10 different roles.
- **Naive Approach (Nested logic):** Putting everything inside one giant middleware.
- **Why it Fails:** Violates the "Single Responsibility Principle". It becomes impossible to test or reuse.

---

## 3. Mental Model: The Custom Stamp
Instead of having a fixed stamp that always says "Paid", imagine a **Stamp Machine** where you can swap the text. You tell the machine "I want a stamp that says 'VOID'", and it gives you that specific stamp.
In code, we use a **Function that returns a Function**.

---

## 4. Formal Definition: The "Factory" Pattern
A **Middleware Factory** is a higher-order function that takes configuration parameters and returns a standard Express middleware function.

---

## 5. Internal Working: Closure and Composition
When you call the factory function, the inner middleware "remembers" the configuration arguments because of **Closures**.

```javascript
function authorize(requiredRole) {
    // This is the Factory
    return function(req, res, next) {
        // This is the 'Stamp' produced by the factory
        // It has access to 'requiredRole' via closure
        if (req.user.role === requiredRole) {
            next();
        } else {
            res.status(403).send('Unauthorized');
        }
    }
}

// Usage
app.get('/admin', authorize('admin'), handler);
app.get('/editor', authorize('editor'), handler);
```

---

## 6. Design Pattern: The "Chain of Responsibility"
Express is a literal implementation of this pattern.
1. A request is a "Command".
2. Each middleware is a "Handler".
3. Each handler decides:
    - Should I solve this now? (`res.send`)
    - Should I pass it to the next guy? (`next()`)

---

## 7. Code Example: A Configurable JSON Logger

```javascript
const loggerFactory = (options) => {
    return (req, res, next) => {
        const logData = {
            method: req.method,
            url: req.url,
            time: new Date()
        };

        if (options.includeHeaders) {
            logData.headers = req.headers;
        }

        if (options.destination === 'console') {
            console.log(logData);
        } else {
            // Logic to write to file...
        }
        next();
    };
};

app.use(loggerFactory({ destination: 'console', includeHeaders: false }));
```

---

## 8. Common Beginner Mistakes
- **Applying the factory twice:** `app.use(authorize)` instead of `app.use(authorize('admin'))`. If you forget the parentheses, Express tries to run the factory itself as middleware, which will fail because it doesn't have the `(req, res, next)` signature.
- **Forgetting `next()` inside async middleware:** Always ensure your logic path leads to a `next()` or a response.

---

## 9. Performance Considerations
- Closures are very efficient, but if you create thousands of middleware "instances" dynamically, you might increase memory usage slightly.
- **Static vs Dynamic:** Always prefer static middleware (defined at boot) over generating middleware inside a request handler (which is a massive security risk and performance sink).

---

## 10. Security Implications
- **Parameter Injection:** If you take middleware configuration from user input (e.g., a query param determining which role is required), an attacker can grant themselves access. **Never configure structural middleware with request-time user input.**

---

## 11. Edge Cases & Failure Scenarios
- **Error Middleware order:** If your factory returns an error-handling middleware (4 args), it MUST be placed at the end of the stack, even if it's generated.

---

## 12. When NOT to use this
- If the logic is truly simple and will never change (e.g., just logging "Hello"), don't use a factory. Keep it simple.

---

## 13. Connection to Previous Topics
- Relies on **IIFEs and Closures** (Unit I).
- Directly uses the **Express Stack** (Lecture 10).
- Fits into the **Middleware Pipeline** (Lecture 11).

---

## 14. How this appears in Real Production
- **Passport.js:** Use `passport.authenticate('local')`. This is a configurable middleware.
- **CORS:** `cors({ origin: 'example.com' })` is a factory.
- **Rate Limiters:** `rateLimit({ windowMs: 15*60*1000, max: 100 })`.

---

## Assignment
1. Create a middleware factory called `validateBody` that takes an array of "Required Keys" (e.g., `['name', 'email']`).
2. If any key is missing from `req.body`, the middleware should return a 400 error.
3. Test it with different routes requiring different fields.

## Up Next
The pivot to Security: **Sessions vs JWT**. We will learn how to keep a user "Logged In" across the stateless HTTP protocol.
