# Walkthrough: INT222 – Advanced Web Development (The Complete Curriculum)

Congratulations! We have successfully constructed a production-grade, 30-lecture curriculum for **INT222: Advanced Web Development**. This course takes a strict "Bottom-Up" approach, assuming zero prior knowledge and building up to professional-level system architecture.

## 🚩 Course Structure
The curriculum is organized into 6 core units, located in the `/syllabus` directory.

### 🧱 Unit I: Foundations & Node.js Internals
- **Lectures 1-8**: Covers TCP/IP, HTTP, the Node.js Event Loop, Streams, Buffers, and the FS module.
- **Key Outcome**: Understanding how Node.js manages concurrency with a single thread and how bytes move through the OS.

### 🌐 Unit II: Express Deep Dive & Architecture
- **Lectures 9-12**: Advanced HTTP (Keep-Alive, Caching), the Express Layer stack, Middleware pipelines, and Monolith vs Microservices.
- **Key Outcome**: Mastering the request-response lifecycle and industrial-grade error handling.

### 🔌 Unit III: Sockets, Middleware Patterns, & Security
- **Lectures 13-18**: WebSockets, Socket.IO internals, Factory patterns for middleware, Sessions vs JWT, and OWASP Top 10 security (Helmet.js, XSS, CSRF).
- **Key Outcome**: Building real-time, secure, and authenticated applications.

### 🍃 Unit IV: MongoDB & Mongoose (NoSQL)
- **Lectures 19-22**: Why NoSQL exists, BSON/WiredTiger internals, ESR Indexing rule, Pagination strategies, and Mongoose `.lean()` vs full documents.
- **Key Outcome**: Managing high-velocity, flexible data at scale.

### 🐘 Unit V: PostgreSQL & Prisma (SQL)
- **Lectures 23-26**: Relational modeling (1NF-3NF), ACID transactions, SQL Execution plans, the Rust-based Prisma engine, and the final Mongo vs Postgres tradeoff.
- **Key Outcome**: Ensuring 100% data integrity for financial and complex systems.

### 🚀 Unit VI: Testing, Deployment, & AI
- **Lectures 27-30**: Automated testing (Jest/Supertest), GitHub CI/CD pipelines, API Versioning (Backward compatibility), and AI/LLM integration (Gemini/OpenAI).
- **Key Outcome**: Preparing applications for production and future-proofing with AI.

---

## 🛠️ Pedagogical Approach
Every single lecture (`.md` file) follows a mandatory **14-point schema**:
1.  **The Real-World Problem**
2.  **Why Naive Approaches Fail**
3.  **Mental Models** (Analogies like The Hotel Key, The Phone Call, The Conveyor Belt)
4.  **Formal Definitions**
5.  **Internal Workings** (What happens in RAM/Disk/Thread Pool)
6.  **Code Examples** (Naive vs Expert)
7.  **Common Beginner Mistakes**
8.  **Performance Considerations**
9.  **Security Implications**
10. **Edge Cases & Failure Scenarios**
11. **When NOT to use this**
12. **Connection to Previous Topics**
13. **Production Realities**
14. **Practical Assignment**

---

## 📂 Deliverables
All files are located in: `c:\Users\adity\OneDrive\Desktop\INT222\syllabus\`

| Unit | Lectures |
| :--- | :--- |
| **Unit I** | 04, 05, 06, 07, 08 |
| **Unit II** | 09, 10, 11, 12 |
| **Unit III** | 13, 14, 15, 16, 17, 18 |
| **Unit IV** | 19, 20, 21, 22 |
| **Unit V** | 23, 24, 25, 26 |
| **Unit VI** | 27, 28, 29, 30 |

---

## 📈 Next Steps for the USER
- **Review Assignments**: Each lecture ends with a practical assignment. Implement these in the `ClassFiles/` folder.
- **Verification**: Use the provided tests in Lecture 27 to verify your code logic.
- **Deployment**: Use the workflow pattern in Lecture 28 to push your finished project to GitHub.

**Final Mission Status: SUCCESS. The complete INT222 curriculum is ready for study.**
