# Comprehensive Guide to JSON Web Tokens (JWT)

## 1. What is a JWT?

JSON Web Token (JWT, pronounced "jot") is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the HMAC algorithm or similar) or a public/private key pair using RSA or ECDSA.

## 2. Structure of a JWT

A JWT appears as a long string composed of three parts, separated by dots (`.`):
`xxxxx.yyyyy.zzzzz`
These parts are:

1. **Header**
2. **Payload**
3. **Signature**

### 2.1 Header

The header typically consists of two parts:

* `typ`: The type of the token, which is `JWT`.
* `alg`: The signing algorithm being used, such as HMAC SHA256 (`HS256`) or RSA (`RS256`).

This JSON object is Base64Url encoded to form the first part of the JWT.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2.2 Payload

The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims:

* **Registered Claims**: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims.
  * `iss` (Issuer): Who issued the token.
  * `sub` (Subject): Whom the token refers to.
  * `aud` (Audience): Who the token is intended for.
  * `exp` (Expiration Time): Time after which the JWT expires.
  * `nbf` (Not Before): Time before which the JWT must not be accepted for processing.
  * `iat` (Issued At): Time at which the JWT was issued.
  * `jti` (JWT ID): Unique identifier for the JWT (useful for preventing replay attacks).
* **Public Claims**: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.
* **Private Claims**: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims (e.g., `role`, `user_id`).

This JSON object is also Base64Url encoded to form the second part of the JWT.

```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true,
  "iat": 1516239022
}
```

*❗ IMPORTANT: The payload is encoded, NOT encrypted. Anyone who intercepts the token can read the payload. Never put secrets (passwords, social security numbers) here.*

### 2.3 Signature

To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.
For example, if you want to use the HMAC SHA256 algorithm, the signature will be created in this way:

```javascript
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)
```

The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

## 3. How JWT Authentication Works

1. **Login**: The user logs in with their credentials (username/password).
2. **Validation**: The server validates the credentials.
3. **Token Generation**: Upon successful validation, the server generates a JWT containing the user's claims and signs it with a secret key (or private key).
4. **Token Return**: The server sends the JWT back to the client.
5. **Storage**: The client stores the JWT (usually in an `HttpOnly` cookie or `localStorage`).
6. **Subsequent Requests**: For every subsequent request to a protected route, the client sends the JWT, typically in the `Authorization` header using the `Bearer` schema:
   `Authorization: Bearer <token>`
7. **Verification**: The server verifies the token's signature using its secret key (or public key). If valid and not expired, it processes the request. If invalid, it returns a `401 Unauthorized` error.

## 4. Advanced Concepts

### 4.1 Symmetric vs. Asymmetric Signing

* **Symmetric (HS256)**: Both the party generating the token and the party verifying it use the **same secret**. This is fast but less secure if multiple microservices need to verify the token, as you'd have to share the secret with all of them.
* **Asymmetric (RS256, ES256)**: The token is signed using a **private key** and verified using a **public key**. The authentication server holds the private key, and resource servers (APIs) hold the public key. This is highly recommended for microservices architectures.

### 4.2 JWKS (JSON Web Key Set)

When using asymmetric encryption, the server needs a way to distribute its public keys. An authorization server (like Auth0, AWS Cognito, or Keycloak) exposes a `/jwks.json` endpoint containing the public keys in JWK format. APIs can fetch this file, cache it, and use it to verify incoming JWTs dynamically without having keys hardcoded.

### 4.3 JWS vs. JWE

* **JWS (JSON Web Signature)**: This is the standard JWT we've discussed. The data is encoded and signed, but not encrypted. It represents data integrity and authenticity.
* **JWE (JSON Web Encryption)**: This takes it a step further and encrypts the payload, hiding the content from anyone who doesn't have the decryption key. A JWE consists of 5 parts instead of 3.

### 4.4 Refresh Tokens

A standard JWT (`access_token`) should have a short lifespan (e.g., 15 minutes) to minimize the window of opportunity if stolen. To prevent the user from having to log in every 15 minutes, a `refresh_token` is also issued.

* **Access Token**: Short-lived, used to access APIs.
* **Refresh Token**: Long-lived (e.g., 7 days), securely stored, used to request a *new* access token from the authentication server when the current one expires. Can be easily revoked by the server.

## 5. Security Best Practices & Vulnerabilities

### 5.1 Storage (XSS vs. CSRF)

Where should you store the token on the frontend?

* **`localStorage` / `sessionStorage`**: Vulnerable to **XSS (Cross-Site Scripting)**. If an attacker injects malicious JavaScript into your site, they can easily read `localStorage` and steal the token.
* **`HttpOnly` Cookies**: Vulnerable to **CSRF (Cross-Site Request Forgery)** but immune to XSS (JavaScript cannot read them).
  **Best Practice**: Store the JWT in a `Secure`, `HttpOnly`, `SameSite=Strict` cookie. This mitigates most XSS risks, and CSRF can be blocked using Anti-CSRF tokens or relying on modern `SameSite` cookie attributes.

### 5.2 The "alg": "none" Attack

Older JWT libraries had a critical flaw where they would accept a token with `"alg": "none"`. An attacker could take a valid token, modify the payload (e.g., change `admin: false` to `admin: true`), set the algorithm to `none`, remove the signature, and the server would accept it as valid.
**Mitigation**: Always explicitly specify and enforce the expected algorithm(s) when verifying a token in your backend.

### 5.3 Token Revocation

Because JWTs are stateless, you cannot simply "delete" a session on the server to log a user out. A JWT remains valid until its `exp` time is reached.
**Strategies for Revocation / Logout:**

1. **Short Expiry + Refresh Tokens**: The best approach. Make access tokens expire in 5 minutes. On logout, revoke the refresh token in the database. The access token will expire naturally very quickly.
2. **Denylist (Blacklist)**: When a user logs out, store the JWT's `jti` (JWT ID) in a database or Redis cache until it expires. Every API request must check this database to see if the token is denylisted. This re-introduces state and hurts performance.
3. **Token Versioning**: Add a `token_version` integer to the user in your database. Include this version in the JWT payload. On password change or forced logout, increment the database `token_version`. On every request, compare the JWT's version to the database version.

### 5.4 Do NOT put sensitive data in the payload

JWTs are Base64 encoded, not encrypted. If you put a user's password, SSN, or private email in the JWT, anyone who intercepts the token or finds it in browser storage can easily decode and read it.

### 5.5 Avoid Large Payloads

JWTs are sent with *every* HTTP request as a header. If you put too much data in the claims (e.g., a massive list of permissions), the token becomes very large. HTTP headers have limits, and sending huge headers on every request wastes bandwidth. Keep the payload lean (User ID, Role, standard claims).

## 6. Token vs. Session-based Authentication

| Feature                       | Session-Based (Cookies)                                                                          | Token-Based (JWT)                                                                           |
| :---------------------------- | :----------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **State**               | Stateful (Session ID stored in server memory/DB).                                                | Stateless (Server validates signature mathematically).                                      |
| **Scalability**         | Harder. Requires sticky sessions or a shared session store (like Redis) across multiple servers. | Easier. Any server with the secret/public key can validate the token.                       |
| **Cross-Domain (CORS)** | Very difficult due to cookie cross-origin restrictions.                                          | Easy. Tokens in the `Authorization` header work seamlessly across different domains/APIs. |
| **Payload**             | Client only stores Session ID. Server looks up data from DB.                                     | Client stores all data (claims). Server doesn't need DB lookup for basic identity.          |
| **Revocation**          | Easy. Server destroys the session from memory/DB.                                                | Hard. Requires complex strategies like blacklists or short expiries.                        |

## 7. Structure Inspector Example

If you want to play around with JWTs, copy any token and paste it into **[jwt.io](https://jwt.io)**. Their debugger will immediately decode the header and payload, and let you provide a secret to verify the signature.

## 8. Complete Express.js Integration Example

Below is a fully functional, comprehensive example of integrating JWT with an Express application. It covers:

* **User Login** (Generating Access and Refresh Tokens)
* **Authentication Middleware** (Verifying Tokens via Headers)
* **Role-Based Authorization Middleware** (Admin vs User privileges)
* **Protected Routes** (Accessing user data securely)
* **Refreshing Tokens** (Maintaining sessions smoothly)
* **Logging out** (Invalidating Refresh Tokens)

```javascript
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// --- 1. CONFIGURATION ---
// In a real app, store these tightly guarded in a .env file!
const ACCESS_TOKEN_SECRET = "access_secret_key_143";
const REFRESH_TOKEN_SECRET = "refresh_secret_key_143";

// In-memory array for refresh tokens (in production, use Redis or a Database)
let refreshTokens = [];

// --- 2. LOGIN & TOKEN GENERATION ---
app.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    // Mock user verification
    if (username === "Aditya" && password === "aditya143") {
        // Payload: Data to embed in the token
        const userPayload = { username: "Aditya", role: "admin" };
      
        // Sign Access Token (Short-lived, e.g., 15 minutes)
        // Syntax: jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const accessToken = jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
      
        // Sign Refresh Token (Long-lived, e.g., 7 days)
        const refreshToken = jwt.sign(userPayload, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
      
        // Save refresh token in DB
        refreshTokens.push(refreshToken);

        res.json({
            message: "Login successful",
            accessToken,
            refreshToken
        });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

// --- 3. MIDDLEWARE: AUTHENTICATE TOKEN ---
// Runs before protected routes to check if the user is verified
const authenticateToken = (req, res, next) => {
    // 1. Get the token from the request headers
    // Standard format is -> Authorization: Bearer <token>
    const authHeader = req.headers['authorization'] || req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Extract token after "Bearer"

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided!" });
    }

    // 2. Verify the token using the secret key
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedUser) => {
        if (err) {
            // Differentiate between expired and tampered tokens
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token Expired. Please use refresh token.", error: err.message });
            }
            return res.status(403).json({ message: "Invalid Token", error: err.message });
        }
      
        // 3. Attach decoded user info to the request object and proceed
        req.user = decodedUser;
        next(); // Proceed to the actual route handler
    });
};

// --- 4. MIDDLEWARE: ROLE-BASED AUTHORIZATION ---
// Checks if the user has the required role (e.g. admin)
const authorizeRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.status(403).json({ message: "Forbidden: You do not have the required role" });
        }
        next(); // Proceed to route handler
    };
};

// --- 5. PROTECTED ROUTES ---

// Standard Protected Route (Any valid user)
app.get("/dashboard", authenticateToken, (req, res) => {
    // req.user comes from the authenticateToken middleware
    res.json({ 
        message: `Welcome to the dashboard, ${req.user.username}!`,
        userData: req.user
    });
});

// Role-Protected Route (Admin Only)
app.get("/admin", authenticateToken, authorizeRole("admin"), (req, res) => {
    res.json({ message: "Welcome to the Admin Panel, Chief!" });
});

// --- 6. REFRESH TOKEN ROUTE ---
// When the access token expires, the client calls this route to get a new one without logging in again.
app.post("/token", (req, res) => {
    const { token } = req.body;
  
    if (!token) return res.status(401).json({ message: "Refresh Token Required" });
    if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid Refresh Token" });

    // Verify the refresh token
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Refresh Token Expired/Invalid. Please log in again." });
      
        // Generate a new access token
        const newAccessToken = jwt.sign(
            { username: user.username, role: user.role }, // Ensure you don't copy over old 'iat'/'exp' values
            ACCESS_TOKEN_SECRET, 
            { expiresIn: "15m" }
        );
        res.json({ accessToken: newAccessToken });
    });
});

// --- 7. LOGOUT ---
// Invalidate the refresh token
app.post("/logout", (req, res) => {
    const { token } = req.body;
    // Remove the token from our database
    refreshTokens = refreshTokens.filter(t => t !== token);
    res.json({ message: "Logged out successfully" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running heavily armed with JWT on http://localhost:${PORT}`);
});
```

## 9. Next-Level JWT Concepts

When your application scales or requires strict enterprise security, relying on basic `HS256` symmetric keys is no longer sufficient. Here are advanced concepts strictly used in modern large-scale applications:

### 9.1 Asymmetric Encryption (RS256)

In our Express example, we used **Symmetric Encryption (`HS256`)**. This means the same `SECRET_KEY` is used to both *create* the token and *verify* it. If another microservice needs to verify the token, you have to securely give it the exact same secret key. If the secret leaks from *any* service, an attacker can forge admin tokens instantly.

**Asymmetric Encryption (`RS256`)** solves this. You generate a key pair:

* **Private Key**: Held *only* by the central Auth Server. Only this server can create and sign new tokens.
* **Public Key**: Shared with every other microservice or API. These services use the public key to verify that the token was signed by the Auth Server. They *cannot* use the public key to forge new tokens.

*Implementation in Node.js:*

```javascript
// Signing (Auth Server Only)
const privateKey = fs.readFileSync('private.pem');
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

// Verifying (Any Microservice)
const publicKey = fs.readFileSync('public.pem');
jwt.verify(token, publicKey, { algorithms: ['RS256'] }, (err, payload) => { ... });
```

### 9.2 Refresh Token Rotation (RTR)

Storing a refresh token in the browser's `localStorage` or even a cookie carries a risk. If it's stolen, the attacker has permanent access until the token expires (e.g., 7 days).

**Refresh Token Rotation** is a defensive measure:

1. When you use a Refresh Token to get a new Access Token, the server *also* gives you a **brand new Refresh Token**.
2. The old Refresh Token is immediately invalidated in the database.
3. **The Trap**: If an attacker stole your old Refresh Token and tries to use it *after* you already rotated it, the Auth Server detects that a used/invalidated refresh token was just presented. Because this indicates a token theft, the server immediately revokes **the entire tree** of associated tokens, logging out both the legitimate user and the attacker instantly.

### 9.3 Instant Invalidation using Redis (The Denylist)

Since you cannot mathematically "revoke" a signed JWT before its `exp` time is up, the only way to log a user out forcefully across all systems is a Denylist.

1. Every time a user logs out intentionally (or gets banned), you extract the `jti` (JWT ID claim) from their token.
2. You save it in a very fast, in-memory database like **Redis**. Set the Redis key to automatically expire at the exact same time the JWT naturally expires.
3. Your `authenticateToken` middleware must now query Redis for *every single API request* to see if the token is blacklisted.
   *Trade-off*: You are giving up the pure "Stateless" benefit of JWTs (no database lookups) to achieve absolute security and instant revocation.

### 9.4 OAuth 2.0 & OpenID Connect (OIDC)

JWTs are simply the underlying data format used by major, globally standard identity protocols.

* **OAuth 2.0**: An authorization framework. When you use "Login with Google", OAuth is what allows Google to securely issue an `access_token` to your app.
* **OpenID Connect (OIDC)**: Sits on top of OAuth 2.0. It strictly standardizes the format of the JWT (called an `id_token` in OIDC) so that applications know exactly how to extract the user's name, email, and profile picture securely.

## 10. Role-Based Access Control (RBAC) with JWT

**Role-Based Access Control (RBAC)** is a security paradigm where system access is strictly restricted based on the roles assigned to individual users (e.g., `admin`, `editor`, `viewer`, `user`).

### 10.1 How RBAC works in JWT

Because JWTs are self-contained, they are uniquely and perfectly suited for RBAC. Instead of forcing the server to query a database to check a user's role on every single API request, **you inject the user's role directly into the JWT payload (claims) when they log in.**

**Example Token Payload with RBAC:**

```json
{
  "sub": "user_id_9876",
  "name": "Aditya",
  "role": "admin",
  "permissions": ["read:users", "write:users", "delete:users"],
  "iat": 1616239022,
  "exp": 1616242622
}
```

### 10.2 The Verification Flow

When a user attempts to access a protected route (like a dashboard, or deleting data), the server handles it statelessly:

1. **Authentication**: The server mathematically verifies the token signature using its secret. If the signature is valid, it implicitly proves that the `role: "admin"` claim inside it is completely legitimate and hasn't been tampered with by the user.
2. **Authorization**: The server extracts the `role` from the decoded payload. If `role === 'admin'`, the server processes the request. If `role === 'viewer'`, the server instantly rejects the request with a `403 Forbidden` error. *(You can see this exact logic implemented in Section 8 via the `authorizeRole` middleware!)*

### 10.3 Roles vs. Permissions (Scopes)

In more complex, enterprise-level applications, assigning a simple `role` might limit flexibility. Instead of just embedding `"role": "editor"`, modern systems often embed an array of granular permissions known as **scopes**.

* Instead of protecting an API route with `authorizeRole("editor")`, you protect it with `requireScope("post:edit")`.
* This means you can dynamically give unique permission sets to specific users without having to hardcode dozens of different generic "roles" into your backend logic.

### 10.4 Security Considerations for RBAC in JWT

1. **Role Revocation Lag**: If you demote a user from `"admin"` to `"user"` in your database, **their current active JWT still says they are an admin**. They will retain top-level privileges until their access token expires. *Fix*: Keep access tokens extremely short-lived (5-15 minutes), so their role change forces a newly generated token soon.
2. **Payload Bloat**: Do not embed massive lists of hundreds of permissions inside a token. Remember, a JWT is transmitted in the HTTP Header of *every single request*. If a user has a massive amount of granular permissions, store their core `role_id` in the token, and let the backend service look up the specific permissions mapped to that role ID internally.

### 10.5 Express.js Implementation of RBAC

Here is a focused, standalone Express program that specifically isolates the Role-Based Access Control logic:

```javascript
import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
const SECRET = "super_secret_key";

// --- 1. LOGIN (Generating token with Roles & Scopes) ---
app.post("/login", (req, res) => {
    const { username } = req.body;
  
    // In a real app, you would look up these roles/permissions from a database
    let payload = {};
    if (username === "admin_aditya") {
        payload = { 
            username: "Aditya", 
            role: "admin", 
            scopes: ["read:data", "delete:data", "manage:users"] 
        };
    } else {
        payload = { 
            username: "Guest", 
            role: "user", 
            scopes: ["read:data"] 
        };
    }

    const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
    res.json({ token });
});

// --- 2. CORE AUTHENTICATION MIDDLEWARE ---
const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).send("No token provided");

    jwt.verify(token, SECRET, (err, user) => {
        if (err) return res.status(403).send("Invalid token");
        req.user = user; // Attach payload (including role/scopes) to request
        next();
    });
};

// --- 3. BASIC ROLE MIDDLEWARE ---
const requireRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ error: "Access Denied: Insufficient Role" });
        }
        next();
    };
};

// --- 4. ADVANCED SCOPE/PERMISSION MIDDLEWARE ---
const requireScope = (requiredScope) => {
    return (req, res, next) => {
        if (!req.user.scopes || !req.user.scopes.includes(requiredScope)) {
            return res.status(403).json({ error: "Access Denied: Missing Permission" });
        }
        next();
    };
};

// --- 5. PROTECTED ROUTES ---

// Route 1: Anyone logged in
app.get("/dashboard", authenticate, (req, res) => {
    res.send(`Welcome ${req.user.username}`);
});

// Route 2: Restricted by strict Role
app.get("/admin-panel", authenticate, requireRole("admin"), (req, res) => {
    res.send("Welcome to the Admin Panel");
});

// Route 3: Restricted by granular Scope (Permissions)
app.delete("/delete-user", authenticate, requireScope("manage:users"), (req, res) => {
    res.send("User deleted successfully.");
});

app.listen(3000, () => console.log("RBAC Server running on port 3000"));
```

## 11. Core Express Security: Helmet.js

While JWT rigorously handles *Authentication* and *Authorization*, it does not protect the HTTP transport layer or the user's browser rendering layer. If an attacker uses XSS (Cross-Site Scripting) or Clickjacking on your authenticated page, your mathematically secure JWT token is compromised.

This is where **Helmet** comes in. Helmet is a vital Express middleware that automatically configures 15+ complex HTTP Response Headers to lock down your node application by default.

### 11.1 How Helmet complements JWT
If you are storing your JWTs in web cookies (which is the recommended best practice against XSS), you absolutely must use Helmet to rigidly enforce Strict Transport Security (HSTS) and comprehensive Content Security Policies (CSP).

### 11.2 What does Helmet actually do?
When you define `app.use(helmet())`, it automatically configures security headers like:
1.  **Strict-Transport-Security (HSTS)**: Forces the user's browser to *only* communicate with your server over secure HTTPS. Extremely important if transmitting sensitive JWT tokens.
2.  **Content-Security-Policy (CSP)**: The ultimate defense against XSS. It stops the browser from running hacker scripts injected onto your page, which crucially protects the `localStorage` where you might accidentally store your JWTs.
3.  **X-Frame-Options**: Prevents Clickjacking by rigidly stopping evil sites from embedding your dashboard in a hidden `<iframe>`.
4.  **X-Powered-By**: Helmet explicitly *removes* the `X-Powered-By: Express` header so automated hacker bots scanning the internet don't instantly know what backend framework you're running.

### 11.3 Real-World Integration Example
Helmet is so critical that almost every professional enterprise Express API runs it immediately. 

```bash
npm install helmet
```

```javascript
import express from 'express';
import helmet from 'helmet';

const app = express();

// Put Helmet as one of the VERY FIRST middlewares so it securely wraps your entire application stack.
app.use(helmet()); 

// You can also custom-tweak specific Helmet settings if the defaults block your frontend (e.g., loading an external font)
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: ["'self'", "https://trusted-images.com"],
        }
    }
}));
```
