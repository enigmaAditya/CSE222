# Lecture 23: SQL Fundamentals & Relational Modeling

## 1. The Real-World Problem
Imagine you are building a **Banking System**. 
A "Transaction" must strictly link one "Sender Account" to one "Receiver Account". 
**Problem A:** In NoSQL (Lecture 19), a user could accidentally delete their account, but their ID would still exist in 1,000 transaction documents (Orphaned Data).
**Problem B:** If a user change their "Legal Name", in a denormalized NoSQL database, you would have to find and update that name in every single transaction document. If the server crashes halfway, half the transactions have the old name and half have the new one.
**The Result:** Your bank data is now inconsistent and unreliable.

## 2. Why Naive Approaches Fail
- **Naive Approach (NoSQL with manual checks):** Writing complex Node.js code to ensure that every `author_id` actually exists before saving a post.
- **Why it Fails:** This is "Application-level integrity". If another app (maybe a mobile team) connects to the same database and forgets the check, they will corrupt your data. The **Database** itself should be the one to say "No".

---

## 3. Mental Model: The Spreadsheet vs The Map
- **NoSQL (The Independent Folders):** Each folder is a self-contained unit. If you move a folder, nothing else breaks.
- **SQL (The Interconnected Ledger):** It's like a giant web of strings. If you want to delete a "Customer", the database checks if there are any "Orders" tied to that customer. If yes, it blocks the delete (**Foreign Key Constraint**).

---

## 4. Formal Definition: Relational Database
A **Relational Database** stores data in tables with rows and columns. It uses **SQL (Structured Query Language)** for data manipulation and ensures integrity via **Normalization** and **Constraints**.

---

## 5. Internal Working: Normalization (1NF, 2NF, 3NF)

Normalization is the process of organizing data to reduce **Redundancy**.

### 5.1 First Normal Form (1NF): No Multi-valued cells
- **Wrong:** Column `hobbies` = "Coding, Cricket, Music".
- **Right:** Every cell contains exactly one value.

### 5.2 Second Normal Form (2NF): No Partial Dependencies
- Every non-key column must depend on the **entire** Primary Key. (Separating "Products" from "Orders").

### 5.3 Third Normal Form (3NF): No Transitive Dependencies
- If Column A depends on B, and B depends on C, then A should not be in the same table as C.
- **Rule of Thumb:** "The Key, the Whole Key, and Nothing but the Key, so help me Codd." (Codd's Rule).

---

## 6. How it fits into Node.js
We use the `pg` (PostgreSQL) driver to send raw SQL strings.

```javascript
const { Client } = require('pg');
const client = new Client({ connectionString: '...' });

await client.connect();

// Joining two tables in a single lightning-fast database operation
const res = await client.query(`
    SELECT users.name, orders.amount 
    FROM users 
    JOIN orders ON users.id = orders.user_id 
    WHERE users.id = $1
`, [123]);

console.log(res.rows);
```

---

## 7. Common Beginner Mistakes
- **The "Over-Normalization" Trap:** Splitting every single property into its own table (e.g., a table just for colors, a table just for sizes). This leads to "Join Hell" where one simple query needs 20 joins, which kills performance.
- **N + 1 problem (SQL Edition):** Fetching a list of users, then in a loop, fetching orders for each user. **The Solution:** Use one `JOIN` query instead.

---

## 8. Performance Considerations: Indexes in SQL
Just like MongoDB (Lecture 20), SQL uses **B-Trees**. 
- However, SQL is much faster at joining indexed columns.
- **Clustered Index:** In PostgreSQL, the table is physically stored in the order of the primary key. This makes range queries (e.g., "All users from ID 100 to 200") extremely fast.

---

## 9. Security Implications: SQL Injection
If you write `query("SELECT * FROM users WHERE id = " + userInput)`, a user could send `1; DROP TABLE users`.
- **Solution:** **Parameterized Queries** (using `$1`, `$2` placeholders). The database treats the input as "Data", never as "Code".

---

## 10. Edge Cases: JSONB in PostgreSQL
Modern PostgreSQL is a "Hybrid". It has a **JSONB** column type.
- You can store a flexible JSON document *inside* a strict SQL table.
- You can even **index** the JSON fields.
- **Result:** You get NoSQL flexibility with SQL integrity. This is why PostgreSQL is the most popular database today.

---

## 11. When NOT to use this approach
- **Unstructured Data:** If you are storing raw sensor logs from billions of IoT devices where every log has a different format, the overhead of a strict schema will slow you down.

---

## 12. Connection to Previous Topics
- SQL queries return **Arrays of Objects** similar to MongoDB results.
- Relational modeling is the opposite of **Embedding** (Lecture 20).
- Uses **TCP/IP** (Lecture 2) and **Connect Strings** (Lecture 19).

---

## 13. How this appears in Real Production
- **Fintech:** Every bank and stock exchange uses SQL (usually PostgreSQL or Oracle).
- **ERP/CRM:** Systems like Salesforce or SAP rely on deep relational links.

---

## Assignment
1. Install PostgreSQL and a GUI like **pgAdmin** or **DBeaver**.
2. Create two tables: `authors` and `books`. Ensure `books` has a `FOREIGN KEY` pointing to `authors.id`.
3. Try to delete an author who still has books. Observe the "Constraint Violation".
4. Write a `JOIN` query to show all books along with their author's name.

## Up Next
**ACID Properties & SQL Execution.** We will learn about "Transactions" and how a database guarantees that money is never "lost" during a transfer.
