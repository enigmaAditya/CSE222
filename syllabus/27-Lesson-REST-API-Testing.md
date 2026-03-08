# Lecture 27: REST API Testing & CI/CD Fundamentals

## 1. The Real-World Problem
Imagine you have a project with **100 routes**. You make a tiny change to the "Login" logic to fix a bug.
**The Problem:** How do you know that your fix didn't accidentally break the "Checkout" or "Profile" page? 
If you test manually using Postman, it will take you 5 hours to check all 100 routes. Most developers get lazy, skip the test, and then the site crashes in front of the customer.
**The result:** Loss of trust and money.

## 2. Why Naive Approaches Fail
- **Naive Approach (Testing in Production):** "If it breaks, my users will tell me."
- **Why it Fails:** By the time a user tells you, you've already lost 10% of your sales. It's high-risk and unprofessional.
- **Naive Approach (Console.log testing):** Relying on logs while you write the code.
- **Why it Fails:** Logs are temporary. Once you delete them, you have no way to repeat the test 6 months later.

---

## 3. Mental Model: The Safety Net
Imagine a trapeze artist performance. 
- **The Artist:** Your Code.
- **The Performance:** The App running.
- **The Net:** Your Automated Tests.
The net is invisible while things go well, but the moment the artist makes a mistake, the net catches them before they hit the ground. **Tests provide the confidence to move fast.**

---

## 4. Formal Definitions
- **Unit Testing:** Testing one tiny function in isolation.
- **Integration Testing:** Testing how different parts (Express + Database) work together.
- **CI (Continuous Integration):** Automatically running tests every time you "Push" code to GitHub.
- **CD (Continuous Deployment):** Automatically sending code to the server ONLY if the tests pass.

---

## 5. Internal Working: Supertest & Jest

Supertest is a library that allows you to "simulate" HTTP requests without actually starting your server on a network port. It calls your `app` object directly in memory.

1. **Jest:** The test runner. It provides the `test()` and `expect()` functions.
2. **Supertest:** The HTTP agent. It sends `GET / POST` and checks the status codes.

---

## 6. How it fits into Node.js: The Implementation

First, export your `app` without calling `app.listen()` (Lecture 10).

**app.js:**
```javascript
const express = require('express');
const app = express();
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));
module.exports = app;
```

**app.test.js:**
```javascript
const request = require('supertest');
const app = require('./app');

describe('GET /health', () => {
  test('It should respond with 200 and ok status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });
});
```

---

## 7. Common Beginner Mistakes
- **Testing with a Real Database:** If your test deletes a user, that user is gone from your DB forever.
- **The Solution (Mocking):** Tell the test to use a "Fake" database or a temporary in-memory database.
- **Forgetting `async/await`:** If you don't `await` the request, the test will finish before the server replies, and it will always "pass" even if there's an error.

---

## 8. Performance Considerations: Test Speed
If your tests take 10 minutes to run, developers will stop running them.
- **Optimization:** Use **Parallel testing**. Jest can run 4 tests at the same time using Worker Threads (Lecture 3).

---

## 9. Security Implications: Environmental Leaks
Never use real API keys (like Stripe or Gmail) in your test files.
- **Solution:** Use `.env.test` files and ensure they are added to `.gitignore`.

---

## 10. Edge Cases: Race Conditions in Tests
If Test A creates a user with `id: 1` and Test B tries to do the same at the same time, they will clash.
- **Solution:** Every test should have its own "Clean Room" (setup and teardown logic).

---

## 11. When NOT to use this
- **Disposable Prototypes:** If you are building an app for a 24-hour hackathon, writing tests is a waste of time.
- **Visual Styles:** Don't test CSS with backend tests. Backend tests are for **Logic** and **Data**.

---

## 12. Connection to Previous Topics
- Uses **HTTP Status Codes** (Lecture 2).
- Relies on **Modules/Exports** (Lecture 5).
- Uses **Async/Await** (Lecture 8).

---

## 13. How this appears in Real Production
- **GitHub Actions:** When you see a "Green Checkmark" on a pull request, itu means the CI server ran these tests and they passed.
- **Test Coverage:** Companies aim for "80% Coverage", meaning 80% of their code lines are verified by at least one test.

---

## Assignment
1. Install Jest and Supertest: `npm install jest supertest`.
2. Create an Express route `/add?a=5&b=10` that returns the sum.
3. Write a test to check:
   - Does it return 15?
   - Does it return 400 if `a` is missing?
4. Run `npm test` and see your first green pass.

## Up Next
**GitHub Deployment Pipelines.** We will learn how to automate the "Green Checkmark" and deploy the code to a real server.
