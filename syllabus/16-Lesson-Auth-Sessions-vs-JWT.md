# Lecture 16: Sessions vs JWT (The Authentication Battle)

## 1. The Real-World Problem
HTTP is Stateless (Lecture 9). Every request is a "first meeting".
**Problem:** If a user logs in on `/login`, how does the server know it's the same person when they visit `/dashboard` 2 seconds later? We need a way to "persist" their identity.

## 2. Why Naive Approaches Fail
- **Naive Approach (Password in every request):** Sending `username` and `password` in the headers of every single API call.
- **Why it Fails:** This is terrible for security. The more you send the password, the higher the chance it is stolen. It's also incredibly slow to hash the password for every single request.
- **Naive Approach (URL Params):** `site.com/dashboard?user_id=123`.
- **Why it Fails:** Any user can change `123` to `124` and steal someone else's account.

---

## 3. Mental Models

### 3.1 Session-Based Auth (The Hotel Key)
- You check in at the front desk (Login).
- They give you a **Key Card** (Session ID).
- The "ID" is just a random number like `abc-123`.
- The Hotel (Server) has a big book (Database/RAM) that says: `abc-123 = Room 402, Guest: Aditya`.
- **The State is on the Server.**

### 3.2 JWT-Based Auth (The ID Card)
- You go to the Goverment Office (Login).
- They give you an **Aadhaar/Driver's License** (JWT).
- The card itself contains your name, birthday, and photo.
- The card is **Signed/Stamped** by the government so it can't be forged.
- The Goverment doesn't need to look you up in a book. They just look at the card.
- **The State is on the Client.**

---

## 4. Formal Definitions
- **Session:** A server-side data structure that stores information about a specific user across multiple requests.
- **JWT (JSON Web Token):** An open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

---

## 5. Internal Working: The JWT Anatomy
A JWT has 3 parts separated by dots (`.`): `header.payload.signature`

1. **Header:** Tells the server what algorithm is used (e.g., HS256).
2. **Payload:** The actual data (e.g., `user_id: 1, role: 'admin'`).
3. **Signature:** A cryptographic hash of (Header + Payload + Secret Key). 
   - *If an attacker changes the Payload (e.g., changes role to 'root'), the signature will no longer match the hash.*

---

## 6. How it fits into Node.js

**Session Setup:**
```javascript
const session = require('express-session');
app.use(session({
  secret: 'my-super-secret',
  resave: false,
  saveUninitialized: true
}));
```

**JWT Setup:**
```javascript
const jwt = require('jsonwebtoken');

// On Login
const token = jwt.sign({ id: 1 }, 'secret-key', { expiresIn: '1h' });

// On Every Request (Middleware)
const decoded = jwt.verify(token, 'secret-key');
```

---

## 7. Comparison Table

| Feature | Sessions | JWT |
| :--- | :--- | :--- |
| **Storage** | Server (Redis/Database) | Client (LocalStorage/Cookies) |
| **Scalability** | Hard (requires shared DB) | Easy (Stateless) |
| **Logout** | Easy (Delete from DB) | Hard (cannot "delete" a token) |
| **Size** | Small (just an ID) | Large (contains all data) |

---

## 8. Common Beginner Mistakes
- **Storing Secrets in JWT:** JWTs are **NOT ENCRYPTED** by default. They are only **SIGNED**. Anyone can decode your JWT and see the data inside. Never put passwords or credit card numbers in a JWT.
- **Local Storage vs Cookies:** Storing JWT in `localStorage` makes you vulnerable to **XSS** (Lecture 17).

---

## 9. Security Implications
1. **XSS (Cross-Site Scripting):** If a hacker can run JS on your site, they can steal your token from `localStorage`.
2. **CSRF (Cross-Site Request Forgery):** If you use Cookies, a malicious site can trick your browser into sending the cookie to your server without your knowledge.
3. **Solution:** Use **HttpOnly, Secure, SameSite** cookies to store your tokens.

---

## 10. Performance Considerations
- **Sessions:** Database lookup on every request. This can be slow if your DB is under load.
- **JWT:** No DB lookup. But cryptographic verification takes CPU cycles.

---

## 11. Edge Cases & Failure Scenarios
- **Secret Leaks:** If your `secret-key` is stolen, anyone can generate valid JWTs and become any user.
- **Clock Skew:** If the server's clock is 5 minutes behind, and the token expires in 1 minute, it will be rejected.

---

## 12. When NOT to use this
- **JWT:** Don't use JWT if you need to be able to BAN users instantly. (Since the server doesn't check the DB, a banned user can still use their token until it expires).
- **Sessions:** Don't use Sessions for high-traffic mobile APIs with millions of users (too much DB pressure).

---

## 13. Connection to Previous Topics
- Uses **HTTP Cookies/Headers** (Lecture 9).
- Relies on **Middleware** (Lecture 11).
- Uses **Crypto Module** (Unit I) for signing.

---

## 14. How this appears in Real Production
- **Netflix/Google:** Use complex "Refresh Token" and "Access Token" systems (a hybrid of both models).
- **Small Apps:** Usually start with simple Sessions.

---

## Assignment
1. Install `jsonwebtoken` and `cookie-parser`.
2. Create a `/login` route that generates a JWT and stores it in an `HttpOnly` cookie.
3. Create a `/profile` route that reads the cookie and greets the user.
4. Try to manualy change the data inside the cookie (using browser dev tools) and see `jwt.verify` fail.

## Up Next
**Authentication vs Authorization (RBAC).** Now that we know WHO the user is, we need to decide WHAT they are allowed to do.
