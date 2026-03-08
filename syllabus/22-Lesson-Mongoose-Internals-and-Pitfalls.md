# Lecture 22: Mongoose Internals & Pitfalls

## 1. The Real-World Problem
MongoDB is "Schema-less".
**Problem:** If one developer saves `price: 100` (Number) and another saves `price: "100"` (String), the "Total Revenue" calculation in your app will crash or return garbage.
**The Solution:** **Mongoose**. It is an **ODM (Object Document Mapper)** that brings strict rules (Schema) to the flexible world of MongoDB.

## 2. Why Naive Approaches Fail
- **Naive Approach (Validation inside every route):** Writing `if (typeof price !== 'number')` in every controller.
- **Why it Fails:** Massive code duplication. It's easy to forget one field, leading to data corruption.
- **Naive Approach (Raw Driver):** The raw MongoDB driver returns a plain object. If you want to add a method like `user.getFullName()`, you have to manually attach it to every object you fetch.

---

## 3. Mental Model: The Legal Contract
Think of a **Mongoose Schema** as a legal contract.
- If a document wants to enter the Database "Building", it must pass through the **Mongoose Guard**.
- The guard checks if it has a Name, if the Email is valid, and if the Age is above 18.
- If it fails, the document is rejected. If it passes, Mongoose "wraps" it in a **Special Suit** (The Mongoose Document) that has extra powers (methods).

---

## 4. Formal Definition: ODM
An **Object Document Mapper (ODM)** is a library that maps a database's document-oriented records to objects in an application's programming language. It handles validation, type casting, and business logic.

---

## 5. Internal Working: Hooks, Virtuals, and Middleware

### 5.1 Middleware (Hooks)
Mongoose allows you to run code **Pre** (before) or **Post** (after) an event like `save` or `find`.
- **Use Case:** Automatically "Hash a password" (Lecture 16) every time a user is saved.

```javascript
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
```

### 5.2 Virtuals
Fields that live only in code, not in the database.
- **Use Case:** `firstName` + `lastName` -> `fullName`.
- **Performance:** Since it's not stored, it saves disk space but requires a tiny bit of CPU to calculate.

---

## 6. Optimization: The `.lean()` Pitfall
**CRITICAL FOR PERFORMANCE.**
By default, Mongoose returns "Mongoose Documents". These are heavy objects with change-tracking, getters, setters, and internal state.
- **The Problem:** Returning 1000 Mongoose documents can use **10x more RAM** than 1000 raw objects.
- **The Solution:** Use `.lean()`.

```javascript
const users = await User.find().lean();
```
- This tells Mongoose: "Just give me raw Javascript Objects. Don't wrap them."
- **Win:** 90% faster and 90% less RAM. **Use this for Read-Only operations.**

---

## 7. The Relationship Pitfall: `.populate()`
Mongoose allows you to simulate "Joins" using `.populate()`.
- **Internal:** Mongoose does **NOT** do a join in the database.
- It fetches the first document, finds the ID, and then sends a **SEPARATE** query to the database to find the related document.
- **Danger:** If you have 100 posts and you `.populate('author')`, Mongoose might send **101 queries** to the database. This is the **N+1 Problem**.

---

## 8. Common Beginner Mistakes
1. **Arrow Functions in Methods:** `userSchema.methods.getName = () => { return this.name }`.
   - **FAIL:** Arrow functions don't have their own `this` (Unit I). `this` will be undefined. **Always use regular `function()` for Mongoose methods/hooks.**
2. **Missing `next()` in Hooks:** If you forget `next()` in a `pre('save')` hook, the server will hang forever and never save.

---

## 9. Security Implications: Schema Validation
- **Strict Mode:** By default, Mongoose strips out any fields that aren't in the schema. This prevents **Mass Assignment** attacks where an attacker sends `admin: true` in a registration form.

---

## 10. Performance Considerations: Buffering
Mongoose allows you to start querying **before** the database connection is finished! 
- It "buffers" those requests in RAM.
- **Risk:** If your database takes 60 seconds to connect, your server RAM might explode with waiting queries. Always wait for `mongoose.connect()` to resolve before starting the app.

---

## 11. Edge Cases: Discriminators
If you have a `User` schema, but `PremiumUser` has extra fields, you can use **Discriminators**. They allow you to share a base schema but have different models in the same collection.

---

## 12. Connection to Previous Topics
- Hooks use the **Middleware Pattern** (Lecture 11).
- Virtuals use **JS Accessors** (getters/setters).
- `.lean()` goes back to raw **POJOs** (Unit I).

---

## 13. How this appears in Real Production
- **Audit Logs:** Using a `post('save')` hook to record who changed what in the DB.
- **Soft Deletes:** Overwriting the `find` hook to automatically exclude documents where `deletedAt` is set.

---

## Assignment
1. Create a User Schema with a "Pre-save" hook to automatically convert the email to lowercase.
2. Create a "Full Name" virtual.
3. Fetch 500 documents with and without `.lean()` and measure the time difference.
4. Experiment with `.populate()` and look at the MongoDB logs to see how many queries are actually fired.

## END OF UNIT IV
We have mastered NoSQL internals, modeling, and the Mongoose abstraction.
**Next Module:** **UNIT V – PostgreSQL & Prisma.** We return to the world of strict relations and SQL to see the other side of the database coin.
