# Lecture 17: Authentication vs Authorization (RBAC)

## 1. The Real-World Problem
Imagine you have a blogging platform.
- A **Guest** should only be able to Read posts.
- An **Author** should be able to Create/Edit their own posts.
- An **Admin** should be able to Delete *any* post.
**Problem:** How do you organize this without writing 500 `if/else` statements in every route? You need a central system to manage **Permissions**.

## 2. Why Naive Approaches Fail
- **Naive Approach (Boolean flags in the DB):** `is_admin`, `is_author`, `is_editor`.
- **Why it Fails:** As your app grows, you might end up with 50 booleans per user. If a user is an Author AND an Editor, which one wins? It becomes a logic nightmare.
- **Naive Approach (Hardcoded Checks):** `if(user.role === 'admin')` inside every controller.
- **Why it Fails:** If you want to change "Author" to "Content Creator", you have to find and replace that string in 100 files.

---

## 3. Mental Model: The Airport
1. **Authentication (Passport Check):** The officer looks at your passport and says: "Yes, you are Aditya." (You have a valid identity).
2. **Authorization (Boarding Pass):** The flight attendant looks at your ticket and says: "You are Aditya, but your seat is 42B. You cannot go into the Cockpit or First Class."
- **Identity (AuthN) does not equal Permission (AuthZ).**

---

## 4. Formal Definitions
- **Authentication (AuthN):** The process of verifying who a user is.
- **Authorization (AuthZ):** The process of verifying what a user has access to.
- **RBAC (Role-Based Access Control):** An approach to restricting system access to authorized users based on their assigned roles.

---

## 5. Internal Working: The RBAC Matrix
Think of it as a table:

| Role | Browse | Post_Create | Post_Delete |
| :--- | :--- | :--- | :--- |
| **Guest** | YES | NO | NO |
| **Admin** | YES | YES | YES |

Instead of checking the **Role**, you check the **Permission** required for that specific action.

---

## 6. How it fits into Node.js
We use **Middleware Factories** (Lecture 15) to create a permission checker.

```javascript
// Central Config
const roles = {
    admin: ['read', 'write', 'delete'],
    author: ['read', 'write'],
    guest: ['read']
};

// RBAC Middleware Factory
const checkPermission = (action) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Attached by Auth Middleware (Lecture 16)
        const userPermissions = roles[userRole];

        if (userPermissions.includes(action)) {
            next();
        } else {
            res.status(403).json({ error: "Access Denied: Unsufficient Permissions" });
        }
    };
};

// Usage in Routes
app.post('/create-post', checkPermission('write'), (req, res) => { ... });
app.delete('/post/:id', checkPermission('delete'), (req, res) => { ... });
```

---

## 7. Code Example: ABAC (Attribute-Based Access Control)
Sometimes roles aren't enough. An Author can edit *their own* posts, but not someone else's.
```javascript
app.put('/post/:id', checkPermission('write'), async (req, res, next) => {
    const post = await db.find(req.params.id);
    if (post.authorId === req.user.id || req.user.role === 'admin') {
        next(); // Allow edit
    } else {
        res.status(403).send('You do not own this post');
    }
});
```

---

## 8. Common Beginner Mistakes
- **Confusing 401 and 403:**
    - `401 Unauthorized`: "I don't know who you are. Log in." (Authentication failed).
    - `403 Forbidden`: "I know who you are, but you are not allowed here." (Authorization failed).
- **Client-Side "Security":** Hiding the "Delete" button in the UI. **Attackers don't use your UI.** They use tools like Postman to call your API directly. **Security must happen on the Backend.**

---

## 9. Security Implications
- **Privilege Escalation:** If an attacker can change their role to `admin` in the Database or the JWT, they own the system.
- **Broken Access Control:** (OWASP #1 Risk). This happens when a developer forgets to put the middleware on even *one* sensitive route.

---

## 10. Performance Considerations
- Role checking is very fast (just an array lookup).
- If your permission system is complex (millions of rules), you might need an external service like **Ory Keto** or **AWS IAM**.

---

## 11. Edge Cases & Failure Scenarios
- **Role Inheritance:** Should an "Editor" automatically have all "Author" permissions?
- **Solution:** Design your `roles` object to be hierarchical or use a library like `accesscontrol`.

---

## 12. When NOT to use this
- **Simple Apps:** If your app only has "Users" and "Admins", a simple `if(user.isAdmin)` check is fine. Don't over-engineer.

---

## 13. Connection to Previous Topics
- Relies on **JWT/Sessions** (Lecture 16) to get the `user` identity.
- Uses **Middleware Pipeline** (Lecture 11/15).
- Follows the **Factory Pattern** (Lecture 15).

---

## 14. How this appears in Real Production
- **GitHub:** Repositories have "Read", "Write", "Admin" roles.
- **Discord:** Highly granular role system with custom colors and permissions.

---

## Assignment
1. Create a `roles.js` configuration file.
2. Write a middleware that checks if a user is "Banned" before allowing them to access any route.
3. Fix the "Owner Check" logic: ensure a user can only delete their own comments unless they are an admin.

## Up Next
The final piece of Unit III: **Security Headers and Common Attacks.** We will learn about the "OWASP Top 10" and how to protect our server from being hacked.
