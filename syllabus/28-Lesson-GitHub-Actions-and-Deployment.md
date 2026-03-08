# Lecture 28: GitHub Deployment Pipelines (CI/CD)

## 1. The Real-World Problem
You finished your code. Now you need to put it on a server (e.g., Render, Railway, AWS).
**The Manual Way:**
1. Run tests on your laptop.
2. If they pass, use FileZilla or SSH to upload files.
3. Restart the server.
**The Problem:** You are human. You might forget to run the tests. You might upload the wrong folder. You might accidentally delete a production file.
**The Result:** "Downtime" and a very stressful Friday night.

## 2. Why Naive Approaches Fail
- **Naive Approach (Git Push -> Automatic Deploy without tests):** Connecting your GitHub directly to your host.
- **Why it Fails:** If you push a syntax error (like a missing `}`), the host will try to deploy it, the server will crash, and your site will be offline until you fix the typo.
- **Naive Approach (Manual SSH):** Logging into the server and running `git pull`.
- **Why it Fails:** Doesn't scale. If you have 5 servers, you have to log in 5 times.

---

## 3. Mental Model: The Quality Control Factory
Imagine a car factory.
1. The **Worker** (You) builds a door (Code).
2. The door moves on a **Conveyor Belt** (Pipeline).
3. A **Robot** (GitHub Action) checks if the door is the right size (Tests).
4. If the size is wrong, the belt stops and sounds an alarm (Email notification).
5. If the size is right, the belt moves the door to the final car (**Deployment**).

---

## 4. Formal Definition: YAML (Yet Another Markup Language)
GitHub Actions are defined using **YAML** files. YAML is a human-readable data format used for configuration. It uses **Indentation** (Spaces) instead of brackets to define structure.

---

## 5. Internal Working: The Runner

When you "Push" code to GitHub, GitHub starts a **Virtual Machine** (The Runner).
1. It downloads your code.
2. It installs Node.js.
3. It runs `npm install`.
4. It runs `npm test`.
5. If everything returns "Exit Code 0" (Success), it triggers the final step.

---

## 6. How it fits into Node.js: The Workflow File

Create a file at `.github/workflows/main.yml`.

```yaml
name: Node.js CI/CD

on:
  push:
    branches: [ main ] # Only run when code is pushed to main

jobs:
  build-and-test:
    runs-on: ubuntu-latest # A clean Linux VM
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test

  deploy:
    needs: build-and-test # Only run if tests pass
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Webhook
        run: curl -X POST ${{ secrets.DEPLOY_WEBHOOK_URL }}
```

---

## 7. Common Beginner Mistakes
- **YAML Indentation:** Using Tab instead of Space. YAML will crash and give a "Bad Indentation" error.
- **Hardcoding Secrets:** Putting your database password in the `.yml` file.
- **The Solution:** Use **GitHub Secrets**. Go to Settings -> Secrets and add your variables there. They are encrypted and invisible.

---

## 8. Performance Considerations: Caching
Every time the Action runs, it downloads all `node_modules` (can be 500MB+). This is slow.
- **Optimization:** Use **Caching**. GitHub can "remember" your modules between runs, making your pipeline 3x faster.

---

## 9. Security Implications: Branch Protection
If anyone can push to `main`, anyone can crash the site.
- **Solution:** Enable **Branch Protection**. Require a "Pull Request" and a "Passing Build" before any code is allowed into the `main` branch.

---

## 10. Edge Cases: Pipeline Failure during Deploy
What if the tests pass, the deploy starts, but the server runs out of disk space?
- **Solution:** **Rolling Deploys.** The old version stays alive until the new version reports "Healthy".

---

## 11. When NOT to use this
- **Personal Local Sandbox:** If you are just playing around with a script for 5 minutes, you don't need a pipeline.

---

## 12. Connection to Previous Topics
- Uses **Bash Commands** (Unit I).
- Requires a **Testing Suite** (Lecture 27).
- Uses **HTTP Webhooks** (Lecture 2).

---

## 13. How this appears in Real Production
- **DevOps Engineer:** A specialized role that *only* builds and maintains these pipelines.
- **Slack Integration:** Getting a notification in your company chat: "Build #402 Failed on main."

---

## Assignment
1. Create a public repository on GitHub.
2. Create the `.github/workflows/test.yml` file.
3. Push a code change that **fails** the test. Watch GitHub show a "Red X".
4. Fix the code and push again. Watch the "Green Checkmark" appear.

## Up Next
**API Versioning.** We will learn how to update your code without breaking the mobile apps of users who haven't updated yet.
