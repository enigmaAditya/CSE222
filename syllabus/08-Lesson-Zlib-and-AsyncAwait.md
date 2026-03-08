# Lecture 8: Zlib and Async/Await Internals

## 1. The Real-World Problem (Zlib)
If you send a 5MB JSON file to a browser 100 times, you use 500MB of bandwidth. This costs money and is slow for users on mobile data.
**Problem:** We need a way to **Compress** (Zip) data on the fly as it leaves the server and have the browser **Decompress** (Unzip) it automatically.

## 2. Why Naive Approaches Fail
- **Naive Approach (Sync Zip):** Using a library to zip the whole file in one go.
- **Why it Fails:** Zipping is **CPU Intensive**. If you zip a 1GB file synchronously, your Single Thread (Lecture 4) will be busy for 10 seconds. No user can even visit your homepage during that time.

---

## 3. Zlib: The Transform Stream
### 3.1 Mental Model: The Translator
Imagine a pipe where English text enters one side, and Secret Code exits the other. Zlib is a **Transform Stream** (Lecture 7). It receives chunks of raw data, compresses them using the `Gzip` or `Deflate` algorithm, and pushes them out the other side.

### 3.2 Code Example: Streaming Compression
```javascript
const fs = require('fs');
const zlib = require('zlib');

const source = fs.createReadStream('input.txt');
const destination = fs.createWriteStream('input.txt.gz');
const gzip = zlib.createGzip(); // This is a Transform Stream

// input -> compression -> output
source.pipe(gzip).pipe(destination);

console.log('File compressed using chunks (No RAM spike!)');
```

---

## 4. Async/Await: Beyond Syntax
### 4.1 The Problem (Callback Hell)
When you have 5 async tasks that depend on each other:
```javascript
getData((err, d1) => {
  saveData(d1, (err, d2) => {
    getEmail(d2, (err, d3) => {
      // This is unreadable and error-prone
    });
  });
});
```

### 4.2 Why Async/Await is NOT Magically Synchronous
**Formal Definition:** `async/await` is **Syntactic Sugar** built on top of **Promises** and **Generators**.

### 4.3 Internal Working: The State Machine
When V8 sees the `async` keyword, it wraps the entire function in a Promise.
When it hits the `await` keyword:
1. It physically **pauses** the execution of *that specific function*.
2. It yields control back to the **Event Loop**.
3. It registers the "rest of the function" as a **Microtask** (Lecture 4) to be run when the awaited Promise resolves.

**Mental Model:** Think of `await` as a checkpoint in a video game. You save your progress, walk away to do other chores (other requests), and come back exactly where you left off when the "Save" (Promise) is ready.

---

## 5. Formal Comparison: Callback vs Promise vs Await

| Feature | Callback | Promise | Async/Await |
| :--- | :--- | :--- | :--- |
| **Logic Flow** | Nested (Horizontal) | Chained (Vertical) | Flat (Synchronous Look) |
| **Error Handling** | `if(err)` in every step | `.catch()` at end | `try / catch` |
| **Performance** | Fastest (Raw) | Slight overhead | Same as Promise |

---

## 6. Common Beginner Mistakes
1. **The "Missing Await":**
   ```javascript
   const data = fs.promises.readFile('test.txt'); // Forget await
   console.log(data); // Prints: Promise { <pending> }
   ```
2. **Forgetting `try/catch`:** If an awaited promise fails and you don't have a `try/catch`, you get an `UnhandledPromiseRejection`. In modern Node, this will **crash** your process.

## 7. Performance Considerations
- **Parallel vs Sequential:**
  ```javascript
  // BAD: Takes 2s total
  await task1(); // 1s
  await task2(); // 1s

  // GOOD: Takes 1s total
  const [r1, r2] = await Promise.all([task1(), task2()]);
  ```
- `Promise.all` runs them in parallel (using multiple threads in libuv if they are I/O bound).

---

## 8. Connection to previous topics
- **Zlib** uses **Streams** (Lecture 7).
- **Async/Await** uses **Microtasks** (Lecture 4).
- Everything in Unit I exists to make **Unit II (Express)** possible.

---

## Assignment
1. Create a script that Compresses a file, then Decompresses it using pipes.
2. Rewrite your `eventEmitter.js` logic to use Promises and `async/await` instead of raw callbacks.
3. Experiment with `Promise.all` and `Promise.race`.

## END OF UNIT I
We have mastered the engine. You now know more about Node.js than 80% of professional developers.
**Next Module:** **UNIT II – HTTP & Express.** We are finally going to build a server you can visit in your browser.
