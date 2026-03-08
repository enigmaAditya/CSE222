# Lecture 20: Document Modeling & Indexing

## 1. The Real-World Problem
Imagine you have a **Post** and its **Comments**.
In a SQL database, you store them in two tables and "Join" them. 
**Problem A:** Joins are slow. To show one post with 100 comments, the CPU has to search, filter, and merge 101 rows from different parts of the disk.
**Problem B (Search):** If you have 10 million products and you search for "Blue Laptop", the computer has to read 10 million files one by one (Linear Scan). This takes seconds.
**The Solution:** **Document Modeling** (Embedding) and **Indexes** (B-Trees).

## 2. Why Naive Approaches Fail
- **Naive Approach (Reference everything):** Treat MongoDB like SQL and put IDs in every document.
- **Why it Fails:** You lose the performance benefit of NoSQL. You are now doing "Application-level Joins" (fetching Post, then fetching Comments in separate Node.js calls), which is even slower than SQL joins.
- **Naive Approach (Index every field):** "I'll index Name, Price, Date, and Category."
- **Why it Fails:** Every Index is a separate file on disk. Every time you **Insert** a product, MongoDB has to update **5 files**. This makes your Writes extremely slow.

---

## 3. Mental Model: The Book Index
If you want to find "Event Loop" in a 500-page book:
1. You don't read every page (Linear Scan).
2. You go to the **Index** at the back.
3. You find "E", then "Event Loop".
4. It tells you "Page 42".
5. You go directly to Page 42.
- **The Index is an ordered list of keywords with pointers to the actual data.**

---

## 4. Formal Definition: B-Tree
MongoDB uses a **B-Tree (Balanced Tree)** data structure for its indexes. This allows it to find any value in a collection of 1 billion items in approximately **30 comparisons**.

---

## 5. Internal Working: Embedding vs Referencing

### 5.1 Embedding (One-to-Few)
Staging data inside the same document.
```json
{
  "title": "My Post",
  "comments": [
    { "user": "Aditya", "text": "Great post!" },
    { "user": "Ishu", "text": "Loved it!" }
  ]
}
```
- **Rule:** If data is accessed together, store it together.
- **Limit:** A single document cannot exceed **16MB**. Don't embed if you expect 1 million comments.

### 5.2 Referencing (One-to-Many / Many-to-Many)
Storing the ID of the related document.
```json
{ "title": "My Post", "author_id": "507f1f..." }
```
- Use this when data grows unboundedly or is shared (e.g., one Author for 1,000 Posts).

---

## 6. Query Optimization: The ESR Rule
When creating a **Compound Index** (indexing multiple fields), order matters:
1. **E**quality: Fields you match exactly (`status: "active"`).
2. **S**ort: Fields you use to order the data (`price: -1`).
3. **R**ange: Fields with counts or ranges (`stock: { $gt: 10 }`).
- **If you put Range before Sort, the index is much less efficient.**

---

## 7. How it fits into Node.js
We define indexes in our code to ensure the database stays fast.

```javascript
// Native Driver Example
const collection = db.collection('products');

// Create an Index on 'name'
await collection.createIndex({ name: 1 });

// Create a Compound Index following ESR
await collection.createIndex({ category: 1, price: -1, stock: 1 });
```

---

## 8. Common Beginner Mistakes
- **Neglecting the 16MB limit:** Trying to store an entire chat history in one User document. It will eventually crash.
- **Case Sensitivity:** By default, an index on "apple" won't find "Apple". Use **Collation** for case-insensitive searching.

---

## 9. Performance Considerations: RAM and Indexes
**CRITICAL:** For a database to be fast, the **Index must fit in RAM**.
- Actual data can be on the slow Hard Drive (SSD).
- But the "Index Card" must be in the "Brain" (RAM).
- If your "Working Set" (Indexes) exceeds RAM, performance drops by 90% (this is called "Paging").

---

## 10. Security Implications
- **Index Injection:** If you allow users to pass the "Sort" field as a variable, they can force the database to use an unindexed field, causing a "Denial of Service" (DoS) by crashing your CPU.

---

## 11. Edge Cases: TTL Indexes
MongoDB has a special index type called **TTL (Time To Live)**. 
- You set a field `createdAt`. 
- You tell MongoDB: "Delete this document 3600 seconds after it was created."
- Perfect for **OTP** codes, **Sessions** (Lecture 16), and **Temporary Logs**.

---

## 12. When NOT to use this
- Don't Use Compound Indexes if you only ever query one field at a time. It wastes disk space.

---

## 13. Connection to Previous Topics
- Indexes speed up **Filtering** (Unit II routes).
- Modeling affects how we **Stream** data (Lecture 7).
- TTL Indexes replace manual **Cleanup Logic** in Node.js.

---

## 14. How this appears in Real Production
- **Performance Tuning:** Developers use `.explain("executionStats")` to see if their query is using an Index or doing a "COLLSCAN" (The dreaded linear scan).
- **Search Engines:** Using "Text Indexes" for Google-like search inside your app.

---

## Assignment
1. Create a collection with 1 million dummy records (use a for-loop).
2. Search for a specific record *without* an index and time it using `console.time()`.
3. Create an index on that field and run the search again. Observe the 100x speedup.
4. Try to create a TTL index that deletes a document after 60 seconds.

## Up Next
**CRUD at Scale & Pagination.** We will learn how to handle millions of results without timing out the browser using "Cursors" and "Limit/Skip" vs "Seek" pagination.
