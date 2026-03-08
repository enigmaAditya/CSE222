import { body, validationResult } from 'express-validator';

/**
 * Common validation rules for the application.
 */
export const userValidationRules = [
    body('username')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email address'),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),
];

/**
 * Middleware to handle validation results.
 * If there are validation errors, it returns a 400 response with the errors.
 */
export const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    
    return res.status(400).json({
        success: false,
        errors: errors.array().map(err => ({
            field: err.path,
            message: err.msg
        }))
    });
};
