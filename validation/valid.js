import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import {body, validationResult} from 'express-validator'    
const port = 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse form data
app.use(express.urlencoded({ extended: false }))

// Route 1: Show the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'valid.html'))
})
app.post("/submit",[
    body('username').notEmpty().withMessage('Username is required'),
    body('email').notEmpty().isEmail().withMessage('Email is required'),
    body('password').notEmpty().isLength({min:4, max:8}).withMessage('Password is required'),
    body('confirmPassword').notEmpty().withMessage('Confirm Password is required'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let errormessage=errors.array().map(error=>`<li>${error.msg}</li>`);
        res.send(errormessage.join(''));
        // return res.status(400).json({ errors: errormessage });
    }
    else{
        res.send(`Form submitted successfully: Username: ${req.body.username}, Email: ${req.body.email}`);
    }   
})
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})