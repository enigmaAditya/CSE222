# Lecture 5: REPL, NPM, and the Module System Internals

## 1. The Real-World Problem
If every programmer had to write their own code for "Connecting to a Database" or "Handling File Uploads" from absolute zero, nothing would ever get built. we need a way to **share code** and **organize projects** so that "File A" can use logic from "File B" without crashing the entire system.

## 2. Why Naive Approaches Fail
**Naive Approach (The `<script>` tag mess):**
In early Browser Javascript, you just linked 10 scripts:
```html
<script src="jquery.js"></script>
<script src="plugin.js"></script> 
<script src="app.js"></script>
```
**Why it Fails:**
- **Global Namespace Pollution:** If `jquery.js` defines a variable `x` and `app.js` also defines `x`, they overwrite each other. This is a nightmare to debug.
- **Dependency Hell:** If `plugin.js` needs `jquery.js` to load FIRST, and you swap the tags, the app breaks.
- **No Versioning:** How do you guarantee the user is using jQuery 3.0 and not 1.0?

## 3. REPL: The Playground
### 3.1 Mental Model
Think of the REPL as a **Calculator for Code**. You type a line, it gives an answer, but it doesn't save anything to a file.

### 3.2 Formal Definition
**REPL** stands for **R**ead, **E**valuate, **P**rint, **L**oop. It is an interactive shell that takes single user inputs, executes them, and returns the result.

### 3.3 Internal Working
1. **Read:** Node waits for you to hit "Enter".
2. **Evaluate:** It passes your string to the V8 engine.
3. **Print:** It converts the result to a string and shows it.
4. **Loop:** It waits for the next command.
*Note:* In REPL, `_` refers to the last evaluated result.

---

## 4. NPM and `package.json`: The Project Blueprint
### 4.1 Mental Model
- **NPM (Node Package Manager):** The World's largest library (like a giant hardware store).
- **package.json:** The **Manifest** or "Shopping List". It tells Node exactly which tools are needed to build this specific project.

### 4.2 The `package.json` Anatomy
```json
{
  "name": "my-backend",
  "version": "1.0.0",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "jest": "^29.0.0"
  }
}
```
- **Dependencies:** Required to run the app (The bricks of the house).
- **DevDependencies:** Only needed while building/testing (The scaffolding - you remove it when the house is done).
- **The Tilde (~) vs Caret (^):**
    - `^4.18.2`: "Give me minor updates (4.19.0). Don't break my major version."
    - `~4.18.2`: "Only give me patches (4.18.3). I am very paranoid."

---

## 5. The Module System Internals (CommonJS)
This is where 99% of developers stop learning. How does `require()` actually work?

### 5.1 The IIFE Wrapping Magic
When you run `node app.js`, Node doesn't just execute your code. It **wraps** it in a secret function.

**Your Code:**
```javascript
const x = 10;
module.exports = x;
```

**What Node actually executes:**
```javascript
(function(exports, require, module, __filename, __dirname) {
    const x = 10;
    module.exports = x;
});
```
### 5.2 Why this is brilliant?
- **Isolation:** Because your code is inside a function, `const x` is **Local** to that function. It doesn't leak to other files.
- **Injected Variables:** This explains where `__dirname` and `module` come from. They aren't global variables; they are **arguments** passed into your file-function by the Node loader.

### 5.3 `exports` vs `module.exports`
- `module` is an object. `exports` is just a **reference** to `module.exports`.
- **Cheat Sheet:** 
    - `module.exports = { ... }` -> Works.
    - `exports.key = value` -> Works.
    - `exports = { ... }` -> **FAILS**. You just broke the reference. Use `module.exports` for bulk exporting.

---

## 6. Core vs Local vs Third-Party
### 6.1 Core Modules
- Built into the Node.js binary. No installation needed.
- Examples: `fs`, `path`, `os`, `http`, `crypto`.
- Usage: `require('node:fs')` (use the prefix for safety).

### 6.2 Local Modules
- Files you wrote in your project.
- Must start with `./` or `../`.
- Usage: `require('./myFile.js')`.

### 6.3 Third-Party Modules
- Installed via `npm install`.
- Lives in `node_modules` folder.
- Usage: `require('express')`. Node follows the **Node Modules Resolution Algorithm** (checks current folder, then parent, then parent's parent...).

---

---

## 7. The Modern Era: ES Modules (ESM)
Node.js originally only supported CommonJS (`require`). Modern Node.js supports ECMAScript Modules (`import`/`export`), which is the same syntax used in React/Frontend.

### 7.1 How to enable ESM?
You cannot just use `import` out of the box. You must tell Node:
1. **Option A:** Add `"type": "module"` to your `package.json`.
2. **Option B:** Use the `.mjs` extension (e.g., `app.mjs`).

### 7.2 The ESM Syntax
**Exporting:**
```javascript
// Named Export
export function addition(a, b) { return a + b; }

// Default Export
export default function multiply(a, b) { return a * b; }
```

**Importing:**
```javascript
// Specific items
import { addition } from './math.js';

// Entire module as an object
import * as math from './math.js';

// Default item
import multiply from './math.js';
```

### 7.3 ESM vs CommonJS
- **ESM is Static:** Imports are resolved *before* code runs.
- **No Globals:** In ESM, `__dirname` and `__filename` do **NOT** exist. You must use `import.meta.url`.
- **Top-Level Await:** ESM allows you to use `await` outside of an `async` function.

---

## 8. Common Beginner Mistakes
1. **Committing `node_modules` to Git:** Never do this. It's too big. Commit `package.json` and `package-lock.json`. Others will run `npm install`.
2. **Missing File Extensions:** In CommonJS, you can do `require('./math')`. In ESM, you **MUST** include the extension: `import { x } from './math.js'`.
3. **Circular Dependencies:** 
    - File A requires File B.
    - File B requires File A.
    - Node handles this by returning an **incomplete object** to prevent infinite loops. This causes "Undefined" bugs.

## 8. Security Implications
- **Supply Chain Attacks:** Someone takes over a popular tiny package (like `left-pad`) and injects malicious code to steal your environment variables.
- **Solution:** Always run `npm audit` and use `npm ci` for production builds.

## 9. Performance Considerations
- **Resolution Speed:** If you have 200 nested folders, `require('lodash')` takes a few extra milliseconds to find the file.
- **Caching:** Node **Caches** modules. If you `require('./db.js')` in 10 different files, the code inside `db.js` only runs **ONCE**. Future calls just get the cached export.

---

---

---

## 9. The Module Resolution Algorithm (The Search Strategy)
When you call `require('x')` or `import 'x'`, Node follows a strict sequence:
1. **Core Modules**: Checked first (e.g., `fs`, `http`).
2. **File Modules**: If X starts with `./`, `/`, or `../`.
   - Node looks for `X.js`, then `X.json`, then `X.node`.
   - If X is a folder, it looks for `X/package.json` (main field) or `X/index.js`.
3. **`node_modules`**: If it's a string name (e.g., `express`).
   - Node checks `node_modules/` in the current folder.
   - If not found, it moves to the **Parent folder** and looks in its `node_modules/`.
   - This continues all the way to the **Root directory**.

---

## 10. Syntax: The NPM & package.json Blueprint

### 10.1 Standard NPM Commands
| Command | Purpose | When to use |
| :--- | :--- | :--- |
| **`npm init -y`** | Initializes a project with default values. | At the very start of a new project. |
| **`npm install <pkg>`** | Installs a package and adds it to `dependencies`. | For libraries your code needs to run (e.g. `express`). |
| **`npm i -D <pkg>`** | Installs as a `devDependency`. | For tools only needed for development (e.g. `nodemon`). |
| **`npm install`** | Installs all packages listed in `package.json`. | After cloning a repository or pulling changes. |

### 10.2 Advanced NPM Toolkit
| Command | Purpose |
| :--- | :--- |
| **`npm run <name>`** | Executes a script defined in `package.json` (e.g., `npm run dev`). |
| **`npm update`** | Updates all packages to the latest matching version in `package.json`. |
| **`npm audit fix`** | Automatically fixes known security vulnerabilities in your dependencies. |
| **`npm ci`** | "Clean Install". Deletes `node_modules` and reinstalls exactly as per `package-lock.json`. (Used in Production). |
| **`npm link`** | Creates a symbolic link to a local package. Used for testing your own libraries. |

### 10.3 The `package.json` Structure
| Field | Purpose | Requirement for ESM |
| :--- | :--- | :--- |
| **`"name"`** | The identifier for your project. | Must be lowercase, no spaces. |
| **`"version"`** | Semantic versioning (Major.Minor.Patch). | e.g., `1.0.0`. |
| **`"type"`** | Tells Node how to handle modules. | **Set to `"module"` to use `import`/`export`.** |
| **`"main"`** | The entry point of your application. | Usually `index.js`. |
| **`"scripts"`** | Custom terminal shortcuts. | `"dev": "node --watch app.js"`. |
| **`"dependencies"`** | Production packages. | Necessary for the app to run. |

---

## 11. Connection to Previous Topics
The **Module System** relies on the **OS Process** we learned:
- Every `require` reads a file from disk (I/O).
- Node uses its single-threaded nature to load these synchronously on startup so the app state is ready before the Event Loop starts accepting requests.

---

## Assignment
1. Create two files: `logger.js` and `app.js`.
2. In `logger.js`, try to export a function using both `exports.log = ...` and then try overwriting `exports = ...`. Observe what happens in `app.js`.
3. Check `console.log(arguments)` at the top of any Node file to see the hidden wrapper arguments.

## Up Next
We will master **Callbacks and the EventEmitter**. We will learn why Node follows the "Observer Pattern" and how the most famous Node objects (like HTTP requests) are actually just EventEmitters in disguise.
