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
*   `typ`: The type of the token, which is `JWT`.
*   `alg`: The signing algorithm being used, such as HMAC SHA256 (`HS256`) or RSA (`RS256`).

This JSON object is Base64Url encoded to form the first part of the JWT.
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

### 2.2 Payload
The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims:

*   **Registered Claims**: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims.
    *   `iss` (Issuer): Who issued the token.
    *   `sub` (Subject): Whom the token refers to.
    *   `aud` (Audience): Who the token is intended for.
    *   `exp` (Expiration Time): Time after which the JWT expires.
    *   `nbf` (Not Before): Time before which the JWT must not be accepted for processing.
    *   `iat` (Issued At): Time at which the JWT was issued.
    *   `jti` (JWT ID): Unique identifier for the JWT (useful for preventing replay attacks).
*   **Public Claims**: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.
*   **Private Claims**: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims (e.g., `role`, `user_id`).

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
1.  **Login**: The user logs in with their credentials (username/password).
2.  **Validation**: The server validates the credentials.
3.  **Token Generation**: Upon successful validation, the server generates a JWT containing the user's claims and signs it with a secret key (or private key).
4.  **Token Return**: The server sends the JWT back to the client.
5.  **Storage**: The client stores the JWT (usually in an `HttpOnly` cookie or `localStorage`).
6.  **Subsequent Requests**: For every subsequent request to a protected route, the client sends the JWT, typically in the `Authorization` header using the `Bearer` schema:
    `Authorization: Bearer <token>`
7.  **Verification**: The server verifies the token's signature using its secret key (or public key). If valid and not expired, it processes the request. If invalid, it returns a `401 Unauthorized` error.

## 4. Advanced Concepts

### 4.1 Symmetric vs. Asymmetric Signing
*   **Symmetric (HS256)**: Both the party generating the token and the party verifying it use the **same secret**. This is fast but less secure if multiple microservices need to verify the token, as you'd have to share the secret with all of them.
*   **Asymmetric (RS256, ES256)**: The token is signed using a **private key** and verified using a **public key**. The authentication server holds the private key, and resource servers (APIs) hold the public key. This is highly recommended for microservices architectures.

### 4.2 JWKS (JSON Web Key Set)
When using asymmetric encryption, the server needs a way to distribute its public keys. An authorization server (like Auth0, AWS Cognito, or Keycloak) exposes a `/jwks.json` endpoint containing the public keys in JWK format. APIs can fetch this file, cache it, and use it to verify incoming JWTs dynamically without having keys hardcoded.

### 4.3 JWS vs. JWE
*   **JWS (JSON Web Signature)**: This is the standard JWT we've discussed. The data is encoded and signed, but not encrypted. It represents data integrity and authenticity.
*   **JWE (JSON Web Encryption)**: This takes it a step further and encrypts the payload, hiding the content from anyone who doesn't have the decryption key. A JWE consists of 5 parts instead of 3.

### 4.4 Refresh Tokens
A standard JWT (`access_token`) should have a short lifespan (e.g., 15 minutes) to minimize the window of opportunity if stolen. To prevent the user from having to log in every 15 minutes, a `refresh_token` is also issued.
*   **Access Token**: Short-lived, used to access APIs.
*   **Refresh Token**: Long-lived (e.g., 7 days), securely stored, used to request a *new* access token from the authentication server when the current one expires. Can be easily revoked by the server.

## 5. Security Best Practices & Vulnerabilities

### 5.1 Storage (XSS vs. CSRF)
Where should you store the token on the frontend?
*   **`localStorage` / `sessionStorage`**: Vulnerable to **XSS (Cross-Site Scripting)**. If an attacker injects malicious JavaScript into your site, they can easily read `localStorage` and steal the token.
*   **`HttpOnly` Cookies**: Vulnerable to **CSRF (Cross-Site Request Forgery)** but immune to XSS (JavaScript cannot read them).
**Best Practice**: Store the JWT in a `Secure`, `HttpOnly`, `SameSite=Strict` cookie. This mitigates most XSS risks, and CSRF can be blocked using Anti-CSRF tokens or relying on modern `SameSite` cookie attributes.

### 5.2 The "alg": "none" Attack
Older JWT libraries had a critical flaw where they would accept a token with `"alg": "none"`. An attacker could take a valid token, modify the payload (e.g., change `admin: false` to `admin: true`), set the algorithm to `none`, remove the signature, and the server would accept it as valid.
**Mitigation**: Always explicitly specify and enforce the expected algorithm(s) when verifying a token in your backend.

### 5.3 Token Revocation
Because JWTs are stateless, you cannot simply "delete" a session on the server to log a user out. A JWT remains valid until its `exp` time is reached.
**Strategies for Revocation / Logout:**
1.  **Short Expiry + Refresh Tokens**: The best approach. Make access tokens expire in 5 minutes. On logout, revoke the refresh token in the database. The access token will expire naturally very quickly.
2.  **Denylist (Blacklist)**: When a user logs out, store the JWT's `jti` (JWT ID) in a database or Redis cache until it expires. Every API request must check this database to see if the token is denylisted. This re-introduces state and hurts performance.
3.  **Token Versioning**: Add a `token_version` integer to the user in your database. Include this version in the JWT payload. On password change or forced logout, increment the database `token_version`. On every request, compare the JWT's version to the database version.

### 5.4 Do NOT put sensitive data in the payload
JWTs are Base64 encoded, not encrypted. If you put a user's password, SSN, or private email in the JWT, anyone who intercepts the token or finds it in browser storage can easily decode and read it.

### 5.5 Avoid Large Payloads
JWTs are sent with *every* HTTP request as a header. If you put too much data in the claims (e.g., a massive list of permissions), the token becomes very large. HTTP headers have limits, and sending huge headers on every request wastes bandwidth. Keep the payload lean (User ID, Role, standard claims).

## 6. Token vs. Session-based Authentication

| Feature | Session-Based (Cookies) | Token-Based (JWT) |
| :--- | :--- | :--- |
| **State** | Stateful (Session ID stored in server memory/DB). | Stateless (Server validates signature mathematically). |
| **Scalability** | Harder. Requires sticky sessions or a shared session store (like Redis) across multiple servers. | Easier. Any server with the secret/public key can validate the token. |
| **Cross-Domain (CORS)** | Very difficult due to cookie cross-origin restrictions. | Easy. Tokens in the `Authorization` header work seamlessly across different domains/APIs. |
| **Payload** | Client only stores Session ID. Server looks up data from DB. | Client stores all data (claims). Server doesn't need DB lookup for basic identity. |
| **Revocation** | Easy. Server destroys the session from memory/DB. | Hard. Requires complex strategies like blacklists or short expiries. |

## 7. Structure Inspector Example
If you want to play around with JWTs, copy any token and paste it into **[jwt.io](https://jwt.io)**. Their debugger will immediately decode the header and payload, and let you provide a secret to verify the signature.
