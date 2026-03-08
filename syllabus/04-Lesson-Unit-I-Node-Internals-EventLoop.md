# Lecture 4: The Deep Internals of the Node.js Event Loop

## 1. The Real-World Problem
We know Node.js is "Single Threaded" and "Non-Blocking". But how does it *actually* track 10,000 timers, database connections, and file reads simultaneously without losing track?
If your code says `setTimeout(fn, 0)`, why does it sometimes take 1ms and sometimes 10ms?
**Problem:** We need a precise mechanism to order operations when 50 asynchronous things finish at the exact same millisecond.

## 2. The Lie: "Node.js is Single Threaded"
This is only 50% true.
*   **Javascript Land (V8):** Single Threaded. Your code runs on one thread.
*   **C++ Land (Libuv):** Multi-threaded. Node.js uses a library called `libuv` which maintains a **Thread Pool** (default size: 4 threads) for heavy tasks like File I/O, Compression (zlib), and Crypto.

## 3. Formal Definition: The Event Loop
The Event Loop is a C++ program inside Node.js that orchestrates the offloading of tasks to the OS/Kernel and handles the execution of callbacks when those tasks complete.

## 4. Internal Working: The 6 Phases (The Heart of Node)
When Node.js starts, it initializes the Event Loop. Every "tick" of the loop passes through 6 phases. **Node only moves to the next phase when the current phase's queue is EMPTY.**

### Phase 1: Timers
*   **What:** Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
*   **Technically:** Node checks "Is `now > registered_time`?" If yes, run callback.

### Phase 2: Pending Callbacks
*   **What:** Executes I/O callbacks deferred to the next loop iteration. (System operations like TCP errors).

### Phase 3: Idle, Prepare
*   **What:** Internal Node.js usage only. You can ignore this.

### Phase 4: Poll (The Waiting Room) - **CRITICAL**
*   **What:** Retrieves new I/O events (Did we get data on the socket? Did the file finish reading?).
*   **Logic:**
    1.  If queue has items -> Execute them synchronously until empty.
    2.  If queue empty -> **Node BLOCKS (Sleeps)** here waiting for new I/O request to finish.
    *   *This is why Node uses 0% CPU when idle.*

### Phase 5: Check
*   **What:** Executes `setImmediate()` callbacks.
*   **Why:** This phase runs immediately after the Poll phase. If you just read a file, `setImmediate` will run *before* any timers.

### Phase 6: Close Callbacks
*   **What:** Handling closed connections (e.g. `socket.on('close', ...)`).

## 5. The "Secret" Priority Queues: Microtasks
There are two mini-queues that are checked **AFTER EVERY OPERATION** (not just every phase).
1.  **process.nextTick() Queue:** Highest Priority. Runs immediately after the current C++ -> JS crossing is finished.
2.  **Promise Microtask Queue:** Logic inside `.then()` or `await`.

**Priority Order:**
`nextTick` > `Promise` > `Event Loop Phases`

## 6. Code Example: Proving the Order

```javascript
const fs = require('fs');

console.log('1. Script Start');

setTimeout(() => {
  console.log('2. setTimeout 0ms');
}, 0);

setImmediate(() => {
  console.log('3. setImmediate');
});

fs.readFile(__filename, () => {
  console.log('4. File Read (Poll Phase)');
  
  // From inside I/O, Check (setImmediate) is ALWAYS before Timer
  setTimeout(() => console.log('5. Timer inside I/O'), 0);
  setImmediate(() => console.log('6. Immediate inside I/O'));
});

Promise.resolve().then(() => {
  console.log('7. Promise Microtask');
});

process.nextTick(() => {
  console.log('8. process.nextTick');
});

console.log('9. Script End');
```

**Output Explanation:**
1.  **Sync:** `1. Script Start` -> `9. Script End`.
2.  **Microtasks:** `8. process.nextTick` (Highest Priority) -> `7. Promise Microtask`.
3.  **Timers:** `2. setTimeout 0ms` (Technically race condition with Immediate depending on boot speed, but usually Timers first).
4.  **Poll (I/O):** `4. File Read`.
    *   *Inside I/O callback context:* The Poll phase completes. Next phase is **Check**.
    *   **Therefore:** `6. Immediate inside I/O` runs BEFORE `5. Timer inside I/O`.

## 7. Common Beginner Mistakes
1.  **Thinking `setTimeout(fn, 1000)` guarantees 1000ms.**
    *   False. It guarantees *minimum* 1000ms. If you block the main thread for 5 seconds with a `while` loop, the timer waits 6 seconds.
2.  **Overusing `process.nextTick`:**
    *   It can "starve" the I/O. If you recursively call `nextTick`, Node will never go to the I/O phase to read files.

## 8. When NOT to use this?
*   Do not try to build "Real-time" systems that require **microsecond precision** (like High Frequency Trading) in Node.js. Garbage Collection or an Event Loop delay can cause random 10ms spikes.

## 9. Performance Considerations: The Thread Pool
*   Standard methods like `fs.readFile`, `crypto.pbkdf2` run in the C++ Thread Pool.
*   The literal pool size is `UV_THREADPOOL_SIZE` (default 4).
*   **Implication:** If you try to encrypt 10 passwords at once, 4 will run, 6 will wait.
*   **Optimization:** You can set `process.env.UV_THREADPOOL_SIZE = 64` on boot to increase concurrency for these specific tasks.

---

---

---

## 10. Syntax: The Internals Toolkit

| Method / Variable | Use Case | Guarantees |
| :--- | :--- | :--- |
| **`process.nextTick(callback)`** | Urgent logic that must run *before* the Event Loop continues. | Highest priority microtask. |
| **`setImmediate(callback)`** | Logic that should run in the 'Check' phase. | Runs after I/O callbacks. |
| **`setTimeout(cb, ms)`** | Delayed execution in the 'Timers' phase. | Minimum delay. |
| **`timer.unref()`** | Allows the Node process to exit even if the timer is active. | Keeps timer running but doesn't "block" exit. |
| **`timer.ref()`** | Opposite of `unref()`. Forces Node to stay alive for the timer. | The default behavior. |
| **`process.memoryUsage()`** | Returns an object describing RAM usage (heap, stack). | Useful for detecting memory leaks. |
| **`process.uptime()`** | Returns how many seconds the Node process has been running. | For health checks and monitoring. |
| **`process.hrtime()`** | High-resolution real time in `[seconds, nanoseconds]`. | For precise performance profiling. |
| **`process.env.UV_THREADPOOL_SIZE`**| Increasing background concurrency. | Must be set before any async call. |

---

## 11. Advanced Internals: Monitoring & Lifecycle
Standard Node programs exit when there is "no more work to do" (The Event Loop is empty).
- **Control**: Using `timer.unref()` allows an app to exit while keeping a background task running (like a log-cli that shouldn't wait for a heartbeat timer).
- **Diagnostics**: `process.memoryUsage()` is your first line of defense against memory leaks in long-running servers.

---

## Assignment
1.  Run the code example above 10 times. Does the order of `setTimeout` vs `setImmediate` change at the top level? (It might).
2.  Create a `setInterval` that logs every second, then call `unref()` on it. See if the process exits immediately.
3.  Log `process.memoryUsage()` at the start and end of a script that creates a 1,000,000 element array.

## Up Next
Now that we understand the Engine, we look at the **Modules**.
We will learn **REPL**, **CommonJS vs V8 Internals**, and why `require()` is actually a function that wraps your code in an IIFE (Immediately Invoked Function Expression).
