# Lecture 6: Callbacks and the EventEmitter Patterns

## 1. The Real-World Problem
We established that Node.js is "Non-blocking". But if a function (like `readFile`) is non-blocking, it means it returns **immediately** before the task is done.
**Problem:** If the function returns immediately, how do we get the data back when it's eventually ready? We need a way to say: "Hey, do this task, and when you are finished, **call me back**."

## 2. Why Naive Approaches Fail
**Naive Approach (Polling / Infinite Loop):**
```javascript
let data = null;
fs.readFile('large.txt', (err, result) => { data = result; });

while(data === null) { 
    // Keep checking... 
} 
console.log(data);
```
**Why it Fails:** This is a **Blocking Loop**. Because Node is single-threaded, the `while` loop will use 100% of the CPU. The `readFile` callback will **never** run because the thread is busy spinning in the loop. The program hangs forever.

## 3. The Callback Pattern
### 3.1 Mental Model: The Pizza Buzzer
You order a pizza. They don't make you stand at the counter (Blocking). They give you a **Buzzer** (The Callback). You go sit down, check your phone, talk to friends. When the pizza is ready, the buzzer goes off. You handle the event.

### 3.2 Formal Definition
A **Callback** is a function passed as an argument to another function, which is intended to be executed after the first function's task is completed.

### 3.3 The "Error-First" Convention
In Node.js, the first argument of a callback is **ALWAYS** the error.
```javascript
fs.readFile('file.txt', (err, data) => {
    if (err) {
        // Handle failure
        return;
    }
    // Handle success
});
```
**Why?** Because in an async world, you can't use `try/catch` effectively. The error might happen 5 seconds after your `try/catch` block has already finished executing.

---

## 4. The EventEmitter: The Observer Pattern
Sometimes a task isn't "one and done". Sometimes multiple things happen over time (e.g., a user clicking a button multiple times, or a server receiving many requests).

### 4.1 Mental Model: The Radio Station
- **The Station (Emitter):** Broadcasts music on a specific frequency.
- **The Listeners (Observers):** Tune in to that frequency. When music plays, they react.
- **Key Point:** The Station doesn't need to know who is listening. It just broadcasts.

### 4.2 Code Example: Minimal vs Realistic
**Minimal:**
```javascript
const EventEmitter = require('events');
const myEmitter = new EventEmitter();

// 1. Subscribe (Listener)
myEmitter.on('greet', (name) => {
    console.log(`Hello ${name}`);
});

// 2. Publish (Emit)
myEmitter.emit('greet', 'Aditya');
```

---

## 5. The Complete EventEmitter API Reference

### 5.1 Methods (Syntax & Deep Usage)

| Method | Syntax | Description |
| :--- | :--- | :--- |
| **`.on(event, cb)`** | `emitter.on('msg', (data) => {})` | **Primary Method.** Adds a listener function to the end of the listeners array. |
| **`.addListener()`** | `emitter.addListener('msg', cb)` | Exact alias for `.on()`. Used in older codebases. |
| **`.emit(event, args)`**| `emitter.emit('msg', 'hello')` | Synchronously calls each listener for the named event. |
| **`.once(event, cb)`** | `emitter.once('init', () => {})` | Adds a listener that triggers **only once** and then removes itself. |
| **`.prependListener()`**| `emitter.prependListener('e', cb)`| Adds a listener to the **beginning** of the listeners array (runs first). |
| **`.prependOnceListener()`**| `emitter.prependOnceListener('e', cb)`| Adds a one-time listener to the **beginning** of the array. |
| **`.removeListener()`** | `emitter.removeListener('e', cb)` | Removes a specific listener function. Requires reference to the function. |
| **`.off(event, cb)`** | `emitter.off('e', cb)` | Alias for `.removeListener()`. Preferred for readability. |
| **`.removeAllListeners()`**| `emitter.removeAllListeners('e')`| Removes all listeners for a specific event or ALL events if no argument. |
| **`.setMaxListeners(n)`**| `emitter.setMaxListeners(30)` | Increases the limit (default 10) before Node prints a memory leak warning. |
| **`.getMaxListeners()`**| `emitter.getMaxListeners()` | Returns the current maximum listener limit. |
| **`.listenerCount(e)`** | `emitter.listenerCount('msg')` | Returns the number of people listening to a specific event. |
| **`.listeners(e)`** | `emitter.listeners('msg')` | Returns a **copy** of the array of listeners for the event. |
| **`.rawListeners(e)`** | `emitter.rawListeners('msg')` | Returns a copy of the array of listeners, including wrappers (like `once`). |
| **`.eventNames()`** | `emitter.eventNames()` | Returns an array of all event strings with at least one listener. |

### 5.2 Built-in Events (The System Signals)

| Event | When is it triggered? |
| :--- | :--- |
| **`'newListener'`** | Emitted **before** a listener is added. Great for validation. |
| **`'removeListener'`**| Emitted **after** a listener is removed. |
| **`'error'`** | **CRITICAL.** If emitted and not handled by an `.on('error')`, the app crashes. |

---

### 5.3 Advanced "How to Use" Examples

#### A. Controlling Execution Order with `prependListener`
```javascript
order.on('pay', () => console.log('This runs second'));
order.prependListener('pay', () => console.log('This runs first!'));
order.emit('pay');
```

#### B. Cleaning up with `removeAllListeners`
```javascript
// Shutdown sequence
process.on('SIGTERM', () => {
    myEmitter.removeAllListeners(); // Safety first
});
```

#### C. Investigating Listeners with `rawListeners`
```javascript
myEmitter.once('greet', () => {});
console.log(myEmitter.listeners('greet'));    // [Function] 
console.log(myEmitter.rawListeners('greet')); // [Object] (shows the once-wrapper)
```

---

**Realistic (Production Grade):**
In real systems, you extend the class to add logic.
```javascript
const EventEmitter = require('events');

class UserBookingSystem extends EventEmitter {
    constructor() {
        super();
        this.bookings = [];
    }

    register(userName) {
        console.log(`Processing registration for ${userName}...`);
        
        // Simulate database save
        this.bookings.push(userName);
        
        // Emit events so other modules can react
        this.emit('register', userName);
        this.emit('audit_log', { action: 'register', user: userName, time: Date.now() });
    }
}

// Usage in another file:
const system = new UserBookingSystem();

system.on('register', (user) => {
    console.log(`[Email Service] Sending welcome email to ${user}`);
});

system.on('register', (user) => {
    console.log(`[Ticket Service] Generating PDF for ${user}`);
});

system.status = 'READY';
system.register('Alice');
```

---

## 5. Internal Working: Synchronous or Asynchronous?
**CRITICAL INTERVIEW POINT:** The EventEmitter executes all listeners **SYNCHRONOUSLY** in the order they were registered.
- If you have 10 listeners for 'register', the Emitter calls Listener 1, then 2, then 3... **all on the same tick**.
- If Listener 2 has an infinite loop, Listener 3 will never run.

---

## 6. Common Beginner Mistakes
1. **Emitter Memory Leaks:** 
   - If you keep adding listeners (`.on`) inside a loop or another callback, Node will eventually crash. 
   - **Limit:** Node warns you if you add more than 10 listeners to a single object.
2. **Forgetting `.catch()` or `error` event:**
   - If an EventEmitter emits an `'error'` event and NO ONE is listening, the Node process will **crash** immediately.

## 7. Technical Syntax Deep-Dive (Key Essentials)

### 7.1 Array.find() vs Array.filter()
When searching for a single record (like a product ID):
- **`.find()`**: Returns the FIRST element that matches. Returns `undefined` if no match is found.
- **`.filter()`**: Returns an ARRAY of all matches. Returns `[]` if no match is found.

**The "Truthy" Trap:**
```javascript
// WRONG: Always returns the first item because 'p' is an object (truthy)
const product = products.find((p) => { 
    p.id === 1; 
    return p; 
});

// CORRECT: Returns the result of the comparison (true/false)
const product = products.find((p) => p.id === 1);
```

### 7.2 Strict Equality ( === ) vs Loose Equality ( == )
- **`==` (Loose):** Converts types before comparing. `5 == "5"` is `true`. This causes "Ghost Bugs".
- **`===` (Strict):** No type conversion. `5 === "5"` is `false`. **Always use `===` in backend logic.**

### 7.3 Case Sensitivity in Events
Event names are **case-sensitive** strings.
- `emitter.on('myevent', ...)` works.
- `emitter.emit('myEvent')` will **FAIL** to trigger the listener above.
- Always use consistent casing (all lowercase is recommended).

---

## 8. Practical Pattern: The "FailedOrder" Event
Instead of just logging errors, professional systems emit error events. This allows you to log failures, send alerts, or update a database from one central place.

```javascript
// Step 1: Assign a listener for failure
order.on("OrderFailed", (user, reason) => {
    console.error(`[ALERT] ${user}'s order failed: ${reason}`);
});

// Step 2: Emit if validation fails
if (product.stock < quantity) {
    order.emit("OrderFailed", user, "Insufficient Stock");
    return;
}
```

---

## 9. Performance Considerations
- EventEmitter is extremely fast (just an array of functions).
- However, if you have 1000 listeners for one event, the single thread will be busy for a long time executing them all sequentially.

## 10. Connection to previous topics
- **The Event Loop** (Lecture 4) is the engine.
- **The EventEmitter** is the steering wheel we use to tell the engine what to do.
- Most core modules (HTTP Server, FS Streams) **ARE** EventEmitters. When you do `server.on('request')`, you are using this exact pattern.

---

## Assignment
1. Open your `ClassFiles/emitterProduct.js`.
2. Implement the `OrderFailed` event pattern we discussed.
3. Fix the `find()` logic to use an implicit return or a proper boolean return.
4. Experiment: Add a listener for `'error'` and see what happens if you emit it without a listener.

## Up Next
We dive into the "Heavy Lifting" of Node.js: **Buffers, Streams, and the File System**. We will learn why `fs.readFileSync` is the enemy of performance and how to handle huge files without running out of RAM.
