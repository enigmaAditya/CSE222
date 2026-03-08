import express from 'express';
import { userValidationRules, validate } from './validation.js';

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Route with validation
app.post('/register', userValidationRules, validate, (req, res) => {
    const { username, email } = req.body;
    res.status(201).json({
        success: true,
        message: `User ${username} registered successfully with email ${email}!`,
        data: req.body
    });
});

// Home route
app.get('/', (req, res) => {
    res.send('<h1>Express Validation Example</h1><p>Send a POST request to <code>/register</code> with JSON body to test validation.</p>');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test validation by sending a POST request to http://localhost:${PORT}/register`);
});
