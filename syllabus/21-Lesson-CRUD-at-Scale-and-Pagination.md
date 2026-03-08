# Lecture 21: CRUD at Scale & Pagination

## 1. The Real-World Problem
Imagine you have **10 million users**. You want to show them in an "Admin Dashboard".
**Problem A (Memory):** If you do `db.users.find().toArray()`, Node will try to load all 10 million objects into RAM. The server will **crash** with "Out of Memory" (Lecture 7).
**Problem B (Performance):** If you show 10 users per page, how do you get Page 500,000?

## 2. Why Naive Approaches Fail
- **Naive Approach (Offset Pagination):** `db.users.find().skip(5000000).limit(10)`.
- **Why it Fails:** To "Skip" 5 million records, MongoDB physically has to **read every single one** of those 5 million records and then throw them away. As you go to deeper pages, the request takes longer and longer (e.g., Page 1 = 1ms, Page 1000 = 5 seconds).
- **Naive Approach (Select *):** Fetching the entire user object including their personal bio and profile picture just to show their "Name" in a list.
- **Why it Fails:** Massive waste of Network Bandwidth (Lecture 2) and RAM.

---

## 3. Mental Model: The Bookmark
- **Offset (The Skip):** You tell a child: "Count 5,000,000 grains of sand, then show me the next 10." The child is exhausted before reaching the goal.
- **Keyset (The Bookmark):** You tell the child: "Go to the grain of sand where the last one was `ID: 8892`, and show me the next 10." The child uses the **Index** (Lecture 20) and goes directly there in 1ms.

---

## 4. Formal Definition: Cursors
A **Cursor** is a pointer to the result set of a query. In Node.js, a MongoDB Cursor is a **Readable Stream** (Lecture 7). It doesn't fetch everything at once; it fetches data in **batches**.

---

## 5. Internal Working: Keyset Pagination (Seek Method)

Instead of `skip()`, we use a **Filter** on the last seen ID.

1. **Page 1:** `db.users.find().sort({ _id: 1 }).limit(10)`
   - *Result:* We get 10 users. The last user has `_id: 507f...`.
2. **Page 2:** `db.users.find({ _id: { $gt: "507f..." } }).sort({ _id: 1 }).limit(10)`
   - *Result:* MongoDB uses the `_id` index to jump immediately to the "bookmark" and fetch the next 10.

---

## 6. Optimization: Projections
**Projection** is the process of telling MongoDB: "Only give me these specific fields."

```javascript
// Node.js example
// 1 = Include, 0 = Exclude
const dashboardData = await users.find({}, { 
    projection: { name: 1, email: 1, _id: 0 } 
}).toArray();
```
- **Performance Win:** If your document is 100KB but the Name is 10 bytes, you save 99.9% of the bandwidth.

---

## 7. How it fits into Node.js
Using the Stream API for massive exports.

```javascript
const cursor = collection.find({});

// Processing 1 million records with ONLY 1MB of RAM
cursor.on('data', (doc) => {
    // Process one doc at a time
    console.log(doc.name);
});

cursor.on('end', () => console.log('Finished'));
```

---

## 8. Common Beginner Mistakes
- **Sorting on non-unique fields:** If you sort by `firstName` and skip/limit, you might miss people because 100 people have the name "Aditya". **Always include a unique field like `_id` in your sort.**
- **Assuming `.countDocuments()` is fast:** On a giant collection, count is slow. Store the count in a separate "Metadata" document if you need it instantly.

---

## 9. Performance Considerations: Covered Queries
**The Holy Grail of DB Performance.**
If you have an index on `{ name: 1 }` and you query:
`db.users.find({ name: "Aditya" }, { projection: { name: 1, _id: 0 } })`
- MongoDB **never even reads the data file** (hard drive).
- It gets the answer directly from the **Index** (RAM).
- This is called a **Covered Query** (Execution stats show `indexOnly: true`).

---

## 10. Security Implications
- **Leakage via Count:** If you show `Total Products: 42,991`, a competitor can track exactly how many sales you made yesterday by checking the number again.

---

## 11. Edge Cases: Cursor Timeouts
By default, MongoDB closes a cursor if it's idle for 10 minutes. If you are doing heavy processing in your `data` event, the cursor might die midway. Use `noCursorTimeout` for long-running batch jobs (but remember to close it manually!).

---

## 12. When NOT to use this approach
- **Seek Pagination** is bad if you need "Go to Page 55" randomly. It only works for "Next" and "Previous" buttons. If you need a random-access page picker, you have to use `skip` (and accept the slow speed).

---

## 13. Connection to Previous Topics
- Uses **Streams API** (Lecture 7).
- Relies on **Indexes** (Lecture 20).
- Fits into **REST API standard** (Unit II).

---

## 14. How this appears in Real Production
- **Infinite Scroll:** Used by TikTok, Instagram, Twitter (all use Keyset/Cursor pagination).
- **Data Warehousing:** Exporting millions of rows to a CSV file for analysis.

---

## Assignment
1. Insert 1,000 documents with an `age` field.
2. Implement two routes: `/users-skip?page=2` (using skip) and `/users-seek?lastId=...` (using seek).
3. Use `console.time()` to compare them.
4. Try a "Covered Query" and verify using `.explain()` that it doesn't touch the "COLLSCAN".

## Up Next
The final piece: **Mongoose Internals & Pitfalls.** We will learn how to add a "Schema" back to MongoDB without losing flexibility.
