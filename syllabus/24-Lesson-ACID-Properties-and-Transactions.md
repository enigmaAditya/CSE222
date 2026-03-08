# Lecture 24: ACID Properties & SQL Execution

## 1. The Real-World Problem
Imagine you are transferring $100 from **Account A** to **Account B**.
1. **Step 1:** Subtract $100 from A.
2. **Step 2:** Add $100 to B.
**The Nightmare:** What if the server's power cord is pulled out exactly **after** Step 1 but **before** Step 2?
- **Result:** $100 has vanished from existence. Account A is poor, and Account B didn't get the money. This is "Data Corruption".

## 2. Why Naive Approaches Fail
- **Naive Approach (NoSQL without Transactions):** In early NoSQL, you just ran two separate `update` commands.
- **Why it Fails:** There is zero guarantee that they both finish. You are relying on "Luck" and "Uptime". In a world with millions of users, "1 in a million" failures happen every day.

---

## 3. Mental Model: The All-or-Nothing Capsule
Think of a **Transaction (BEGIN...COMMIT)** as a time-traveling bubble.
- You step into the bubble.
- You do 10 different things.
- If everything is perfect, you "Pop" the bubble (**COMMIT**), and all 10 things happen at the exact same instant to the outside world.
- If anything goes wrong, you hit the "Abort" button (**ROLLBACK**), and the world resets as if you never even stepped into the bubble.

---

## 4. Formal Definition: ACID
ACID is a set of properties of database transactions intended to guarantee data validity despite errors, power failures, and other mishaps.

1. **A - Atomicity:** All or nothing. No "half-finished" transactions.
2. **C - Consistency:** Only valid data is saved (e.g., balance cannot be negative).
3. **I - Isolation:** If two people transfer money at the exact same time, they don't interfere with each other. The database handles them "one by one" (conceptually).
4. **D - Durability:** Once it says "Success", the data is permanently on the disk (even if the power goes out 1ms later).

---

## 5. Internal Working: The SQL Execution Engine

When you send a query like `SELECT name FROM users WHERE id = 5`, what happens?

1. **Parser:** Checks if your SQL syntax is correct (did you misspell SELECT?).
2. **Query Planner (The Brain):** Looks at your tables. 
   - "Should I use the ID index?"
   - "Is it faster to read the whole table?"
   - It generates an **Execution Plan**.
3. **Executor:** Actually reads the blocks from the disk/SSD.
4. **WAL (Write-Ahead Log):** Before updating the actual table, it writes the change to a "Log" file. If it crashes, it reads the log to finish the job.

---

## 6. How it fits into Node.js: Transactions

```javascript
const client = await pool.connect();

try {
  await client.query('BEGIN'); // Start the "Capsule"
  
  const query1 = 'UPDATE accounts SET balance = balance - 100 WHERE id = 1';
  await client.query(query1);

  const query2 = 'UPDATE accounts SET balance = balance + 100 WHERE id = 2';
  await client.query(query2);

  await client.query('COMMIT'); // Save everything permanently
} catch (e) {
  await client.query('ROLLBACK'); // Undo everything if error occurred
  throw e;
} finally {
  client.release();
}
```

---

## 7. Common Beginner Mistakes
- **Forgetting the ROLLBACK:** If an error happens and you don't rollback, that database connection might stay "In Transition" forever, blocking other users and locking tables.
- **Long-running Transactions:** If your transaction stays open for 10 minutes (maybe waiting for a file upload), it holds **Locks** on the database. No one else can edit those rows until you are done. **Transactions should be fast (ms).**

---

## 8. Performance Considerations: Isolation Levels
The "I" in ACID can be expensive. 
- **Read Committed (Standard):** You only see data that has been saved.
- **Serializable (Strict):** Effectively runs transactions one-by-one. **It's very slow** but prevents "Phantom Reads" (where data appears/disappears between two select calls).

---

## 9. Security Implications: "Race Conditions"
If your code does `if(balance > 100)` in Node, and then `update balance`, two requests hitting at the exact same millisecond might both pass the check before the update happen.
- **Solution:** **Database-level checks.** `UPDATE accounts SET balance = balance - 100 WHERE id = 1 AND balance >= 100`.

---

## 10. Edge Cases: Deadlocks
Transaction A locks Row 1 and wants Row 2.
Transaction B locks Row 2 and wants Row 1.
They wait for each other forever.
- **Result:** PostgreSQL identifies this after a few seconds and **Kills** one of them to save the system.

---

## 11. When NOT to use this approach
- **Social Media "Likes":** If a like count is off by 1 because of a power failure, nobody cares. Using a heavy ACID transaction for every "Like" button click will slow down your app for no reason.

---

## 12. Connection to Previous Topics
- Isolation is a form of **Concurrency Control** (Lecture 3).
- Transactions use **Single Threaded** logic in the lock manager (Lecture 4).
- WAL logs are **Persistent Streams** (Lecture 7).

---

## 13. How this appears in Real Production
- **Banking/Payments:** Stripe, PayPal, and all banks live and die by ACID.
- **Inventory Management:** Ensuring you don't sell the last iPhone to two people at once.

---

## Assignment
1. Create an 'accounts' table with two rows.
2. Write a script that intentionally throws an error between the "Subtract" and "Add" queries.
3. Verify that WITHOUT a transaction, $100 is lost.
4. Add the `BEGIN/COMMIT/ROLLBACK` blocks and verify that the data remains safe even if the script crashes.

## Up Next
**Prisma ORM Internals.** We will learn how to get Type-Safe SQL without writing the messy raw strings we used today.
