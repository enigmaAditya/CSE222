import express from 'express';
import morgan from 'morgan';

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(morgan('dev')); // Logging
app.use(express.json()); // Body parser for JSON
app.use(express.urlencoded({ extended: true })); // Body parser for URL-encoded data

// Routes
app.get('/', (req, res) => {
    res.send({
        message: "Welcome to the Full-Fledged Node.js Server!",
        status: "Running",
        timestamp: new Date().toISOString()
    });
});

app.get('/api/status', (req, res) => {
    res.json({
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    });
});

// Hello route for testing
app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    res.send(`Hello, ${name}!`);
});

// 404 Handler
app.use((req, res, next) => {
    res.status(404).send({
        error: "Not Found",
        message: `The route ${req.originalUrl} does not exist.`
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        error: "Internal Server Error",
        message: err.message
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
    console.log(`Try visiting http://localhost:${PORT}/api/status`);
});
