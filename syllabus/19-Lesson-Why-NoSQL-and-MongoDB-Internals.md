# Lecture 19: Why NoSQL & MongoDB Internals

## 1. The Real-World Problem
Imagine you are building **Amazon**. One product is a "Book" (has an ISBN, Author), another is a "T-shirt" (has Size, Color), and another is a "Laptop" (has RAM, CPU).
**Problem:** In a traditional SQL Database (Table-based), every product must fit into the **same** columns. If a Laptop doesn't have a "Color", you store `NULL`. If you add 1,000 different types of products, your table becomes a giant mess of 1,000 columns, 90% of which are `NULL`.
**The Result:** Adding a new category of product requires a "Schema Migration" which can freeze your database for hours.

## 2. Why Naive Approaches Fail
- **Naive Approach (SQL with JSON columns):** Storing all extra data in a single text column.
- **Why it Fails:** You cannot efficiently SEARCH inside that text. To find "All laptops with 16GB RAM", the database has to scan every single row and parse the text (very slow).
- **Naive Approach (EAV Model):** Creating a table with `Key` and `Value` rows.
- **Why it Fails:** To show one product, you have to "Join" 50 rows together. Joins are computationally expensive and slow down as you scale to millions of users.

---

## 3. Mental Model: The Filing Cabinet
- **SQL (The Spreadsheet):** You have a strict ledger. Every row must have exactly the same cells filled.
- **NoSQL / MongoDB (The Folder):** Each product is a "Folder" (Document). Inside the folder, you can have any papers you want. One folder has a "Laptop Specs" sheet, another has a "Garment Tags" sheet. They live in the same drawer (Collection) but they don't have to look the same.

---

## 4. Formal Definition
**MongoDB** is a source-available, cross-platform, **document-oriented** database program. Classified as a **NoSQL** database, MongoDB uses JSON-like documents with optional schemas.

---

## 5. Internal Working: BSON and WiredTiger

### 5.1 BSON (Binary JSON)
MongoDB doesn't actually store JSON. It stores **BSON**.
- **JSON:** Text-based, slow to parse, supports limited types (String, Number, Boolean).
- **BSON:** Binary-based, very fast for the computer to skip through, supports extra types like `Date`, `ObjectId`, and `Binary Data`.
- **Internal:** When you send JSON from Node.js, the MongoDB Driver converts it to Binary before sending it over the wire.

### 5.2 The WiredTiger Engine
This is the "Heart" of MongoDB.
1. **Document-Level Concurrency:** In older databases, if one person was writing to a "Collection", everyone else was blocked. WiredTiger allows 1,000 people to write to 1,000 different documents at the same time.
2. **Compression (Snappy):** It automatically zips your data on the disk to save space.
3. **Journaling:** It writes every change to a "Journal" file first. If your server loses power, MongoDB uses the journal to recover your data without losing a single bit (Lecture 3 - Persistence).

---

## 6. How it fits into Node.js
MongoDB is built in C++, but it speaks "JSON" naturally, making it the perfect partner for Javascript.

```javascript
const { MongoClient } = require('mongodb');

async function connect() {
    const client = new MongoClient('mongodb://localhost:27017');
    await client.connect();
    
    const db = client.db('shop');
    const products = db.collection('products');

    // polymorphic data (different shapes in same collection)
    await products.insertOne({ name: "Book", author: "Homer" });
    await products.insertOne({ name: "Phone", ram: "8GB", color: "Black" });

    console.log("Documents saved in BSON format internally!");
}
```

---

## 7. Common Beginner Mistakes
- **The "Schema-less" Trap:** Just because MongoDB *allows* you to store anything doesn't mean you *should*. If you don't have a plan, your code will crash when it expects `product.price` but finds it missing or stored as a String instead of a Number.
- **Using IDs as Strings:** MongoDB uses `ObjectId`. Comparing a string `"507f1f..."` with an `ObjectId("507f1f...")` in your code will return `false`.

---

## 8. Performance Considerations: Horizontal Scaling
- **SQL Scaling:** Usually "Vertical" (Buy a bigger, more expensive server).
- **MongoDB Scaling:** "Horizontal" (Sharding). You can split your data across 100 cheap servers. MongoDB knows that Users A-M are on Server 1 and Users N-Z are on Server 2.

---

## 9. Security Implications
- **NoSQL Injection:** Instead of `1 OR 1=1`, an attacker might send a JSON object like `{"$gt": ""}` to the password field. If your code isn't sanitizing, this would mean "Find user where password is GREATER THAN nothing" -> Logs them in as Admin.
- **Solution:** Always use an ODM like **Mongoose** (Lecture 22) or strict validation.

---

## 10. Edge Cases & Failure Scenarios
- **Memory Mapping:** MongoDB loves RAM. It maps your files directly into RAM for speed. If your database is 100GB and your RAM is 8GB, it will "swap" heavily and become extremely slow.

---

## 11. When NOT to use this approach
- **Highly Relational Data:** If you are building an accounting system where 50 tables are all linked together and you need complex "Joins", **PostgreSQL (Unit V)** is much better. MongoDB is for "Hierarchical" data (everything about a Product is inside one document).

---

## 12. Connection to Previous Topics
- Uses **Network Sockets** (Lecture 13) to communicate with Node.
- The Driver uses **Async/Await** (Lecture 8) for all operations.
- Data is sent as **Buffers/Binary** (Lecture 7) via BSON.

---

## 13. How this appears in Real Production
- **Content Management (CMS):** Blogs, News sites.
- **Real-time Analytics:** Logging millions of events per second.
- **E-commerce Catalogs:** Handling millions of varied products.

---

## Assignment
1. Install MongoDB locally or use MongoDB Atlas (Cloud).
2. Connect using the `mongodb` native driver.
3. Insert 5 documents with completely different field names into one collection.
4. Try to query for a document using a field that only 1 of them has.

## Up Next
**Document Modeling & Indexing.** We will learn how to structure our data (Embedding vs Referencing) and how "Indexes" allow us to search millions of records in 1 millisecond.
