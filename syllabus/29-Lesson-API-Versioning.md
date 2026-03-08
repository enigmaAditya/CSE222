# Lecture 29: API Versioning & Backward Compatibility

## 1. The Real-World Problem
Imagine you have an App with **1 million users**. 
In Version 1, you return `name: "Aditya"`. 
In Version 2, you decide to split it into `firstName: "Aditya"` and `lastName: "Sharma"`.
**The Problem:** Half of your users are using an old Android app that expects `name`. If you update the server to only use `firstName`, the old app will **crash** with "Cannot read property 'name' of undefined". 
You cannot force all 1 million users to update their app at the same time.
**The Result:** Your most loyal (old) users are now angry.

## 2. Why Naive Approaches Fail
- **Naive Approach (Just changing the code):** "They should just update their app."
- **Why it Fails:** This is called a **Breaking Change**. In production, this is the #1 way to lose customers.
- **Naive Approach (Conditional Logic inside logic):** `if(req.is_old_app) { return name } else { return firstName }`.
- **Why it Fails:** Your code becomes a "Spaghetti" mess of `if/else` that is impossible to maintain.

---

## 3. Mental Model: The Legacy Bridge
Imagine building a new, better highway. 
You don't blow up the old bridge while cars are still on it. 
You build the new bridge next to it. 
You slowly encourage people to use the new bridge. 
Only when the old bridge is empty (Zero users) do you dismantle it.

---

## 4. Formal Definition: Semantic Versioning (SemVer)
Version numbers are written as `Major.Minor.Patch` (e.g., `2.1.4`).
1. **Major:** Breaking changes (e.g., changing `name` to `firstName`).
2. **Minor:** New features that don't break old stuff (e.g., adding a `birthday` field).
3. **Patch:** Bug fixes.

---

## 5. Internal Working: Three Ways to Version

### 5.1 URL Versioning (The Standard)
The most common way. Clear and easy to cache.
`/api/v1/users` vs `/api/v2/users`

### 5.2 Header Versioning
Keeps the URL clean. Professional but harder for beginners to debug.
`Accept: application/vnd.myapi.v2+json`

### 5.3 Query Param Versioning
Used by companies like Stripe for granular date-based versioning.
`/users?version=2024-02-03`

---

## 6. How it fits into Node.js: Express Routing Logic

We use **Express Routers** (Lecture 10) to separate versions.

```javascript
// routes/v1.js
const v1Router = express.Router();
v1Router.get('/user', (req, res) => res.json({ name: "Aditya" }));

// routes/v2.js
const v2Router = express.Router();
v2Router.get('/user', (req, res) => res.json({ firstName: "Aditya", lastName: "S" }));

// main.js
app.use('/v1', v1Router);
app.use('/v2', v2Router);
```

---

## 7. Common Beginner Mistakes
- **Shadow Deleting:** Forgetting that an old version exists and accidentally changing its database schema. If V1 expects a `name` column and you delete it from SQL, V1 breaks even if the V1 code is untouched.
- **The Solution:** **Database Migrations** (Lecture 25) must be backward compatible.

---

## 8. Performance Considerations: Code Duplication
If V1 and V2 share 90% of the same code, don't copy-paste the whole file.
- **Solution:** Move the shared logic into **Services** or **Utilities** (Unit II) and call them from both routers.

---

## 9. Security Implications: Deprecation
Older versions often have security bugs. 
- **Solution:** Send a `Warning` header in the response of old versions: `Warning: 299 - "This version will be disabled on 2024-12-31. Please upgrade."`

---

## 10. Edge Cases: Breaking the Database
What if the V2 database structure is completely different from V1?
- **Solution:** Use **View Layers** or **Adapters**. The controller for V1 should take the new database data and "shape" it to look like the old data before sending it.

---

## 11. When NOT to use this
- **Internal Tools:** If you are the only one using the API (e.g., for your own frontend), you can just update both at once. Don't waste time on versioning.

---

## 12. Connection to Previous Topics
- Uses **Express Routing** (Lecture 10).
- Relies on **JSON structure** (Unit I).
- Fits into the **REST architectural style** (Unit II).

---

## 13. How this appears in Real Production
- **Stripe API:** Famous for having ultra-stable versioning. They support versions from 10 years ago!
- **Twitter/Facebook API:** Often use "Deprecation Cycles" of 6-12 months.

---

## Assignment
1. Create a `v1` and `v2` folder.
2. Implement a `/product` route in both.
3. In `v2`, change the response structure (e.g., put `price` inside a `details` object).
4. Verify that calling `/v1/product` still works perfectly without the new structure.

## Up Next
**Final Lecture: AI & LLMs in Backend Development.** We wrap up the whole course by learning how to use Gemini and OpenAI to build "Intelligent" APIs.
