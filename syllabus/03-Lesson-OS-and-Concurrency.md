# Lecture 3: OS, Processes, Threads, and Concurrency

## 1. The Real-World Problem
We learned that a server is a "Receptionist". But standard computers have limited CPUs (brains).
**Problem:** How can a **Dual-Core** laptop run Chrome (50 tabs), Spotify, VS Code, and Node.js (handling 1000 requests) *all at the same time*?
If one program crashes (e.g., a buggy game), why doesn’t the whole OS die?

## 2. Why Naive Approaches Fail
**Naive Approach (MS-DOS):** Only run one program at a time.
**Failure:** You cannot listen to music while coding.
**Naive Approach (Cooperative Multitasking):** Programs say "I yield CPU" when done.
**Failure:** If one program freezes (infinite loop), the entire computer freezes.

## 3. Formal Definitions & Mental Models

### 3.1 The Process (The Factory)
*   **Definition:** An instance of a running program. It has its **own isolated memory space**.
*   **Mental Model:** A completely separate Factory building.
*   **Isolation:** If Factory A catches fire (crashes), Factory B is safe. Factory A cannot steal tools (memory) from Factory B.
*   **Cost:** Heavy. Building a factory takes time (Booting up).
*   **Node.js:** Each running Node script is ONE Process.

### 3.2 The Thread (The Worker)
*   **Definition:** A unit of execution *inside* a process.
*   **Mental Model:** A Worker inside the Factory.
*   **Shared Memory:** Workers in the same factory share the cafeteria (Heap Memory). If one worker poisons the food, all workers die.
*   **Cost:** Light. Hiring a worker is faster than building a factory.
*   **Node.js:** By default, your code runs on **ONE Thread** (The Main Thread).

### 3.3 Context Switching (The Cost of Multitasking)
How does a 1-Core CPU run 2 Threads? It switches very fast.
*   **Mechanism:**
    1.  Save Thread A's state (Registers, Stack).
    2.  Load Thread B's state.
    3.  Run Thread B for 10ms.
    4.  Repeat.
*   **The Hidden Cost:** Switching is **NOT FREE**. It is "overhead".
*   **Analogy:** You are writing code. Someone interrupts you to ask a question.
    *   Time to answer: 10 seconds.
    *   Time to "get back in the zone" (load context): 5 minutes.
    *   *If you are interrupted every 10 seconds, you get ZERO work done.* (Thrashing).

## 4. Concurrency vs Parallelism

*   **Concurrency:** Handling multiple tasks at once (interleaving).
    *   *Analogy:* One juggler keeping 3 balls in the air. Only one ball touches a hand at a time.
*   **Parallelism:** Doing multiple tasks at the exact same instant.
    *   *Analogy:* Two jugglers, each holding a ball.
*   **Node.js Philosophy:** Node is **Single-Threaded Concurrent**. It juggles 10,000 requests using one hand (Process) extremely efficiently.

## 5. The Event Loop (The Concept)
Before we look at *Node's* Event Loop, what is an Event Loop *theoretically*?

**Premise:**
If threads are expensive (Context Switching) and dangerous (Race Conditions/Deadlocks), let's avoid them.
Instead, let's have **ONE** thread that does **nothing but** route tasks.

**The Loop:**
```javascript
while (queue.hasMessages()) {
  message = queue.pop();
  handle(message);
}
```
1.  **UI Systems:** Android, iOS, and Browser JS all use this. The "Main Thread" draws the UI. If you run a heavy calculation on Main Thread, the UI freezes.
2.  **Node.js:** The "Main Thread" accepts requests. If you block it, the server freezes.

## 6. Blocking vs Non-Blocking (OS Level)
*   **Blocking Syscall:** Code asks OS "Read this file". OS suspends the thread until disk is ready.
*   **Non-Blocking Syscall:** Code asks OS "Read this file". OS returns "Okay, started" immediately. Code continues. OS interrupts (Signal) later when done.

## 7. Common Beginner Mistakes
1.  **"Node is Multi-threaded because it handles many users."**
    *   No. It handles many users *concurrently*, not *in parallel* (mostly).
2.  **"Threads are better because they are parallel."**
    *   Threads introduce **Deadlocks** (Worker A waits for B, B waits for A) and **Race Conditions** (Two workers edit the same file -> Data Corruption). Node avoids this by removing threads from your code.

## 8. Performance Implications
*   **Memory Footprint:** Apache (Thread per request) uses ~1MB per user. 10k users = 10GB RAM.
*   **Node (Event Loop):** 1 Process. High throughput, low RAM.
*   **CPU Bound:** Node is BAD at this. 1 Thread cannot use 8 Cores to compute Pi.

## 9. How This Connects to Node.js
Node.js was built to exploit **Non-Blocking OS calls** using a **Single Thread Event Loop** to handle **high concurrency** with **low resources**.

---

## Assignment
1.  **Visualize:** Open Task Manager (Windows) or Activity Monitor (Mac). Look at "Threads" count for Chrome vs Node.
2.  **Code Experiment (Simulate Blocking):**
    ```javascript
    // DONT DO THIS IN PROD
    const start = Date.now();
    while(Date.now() - start < 5000) {} // Block for 5s
    console.log("Done");
    ```
    Run this. Try to interact with the process. It's dead.

## Up Next
We graduate to **UNIT I**. We will decompose Node.js itself. libuv, V8, and the *real* phases of the Node Event Loop.
