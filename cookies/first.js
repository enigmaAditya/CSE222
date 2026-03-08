import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = 8000;

app.use(cookieParser());

app.get('/', (req, res) => {
    const theme = req.cookies.theme || 'light';//how it works: if cookie is not found then it will set it to light
    const bgColor = theme === 'dark' ? '#1a1a1a' : '#f0f0f0';//if cookie is dark then it will set the background color to dark else light
    const textColor = theme === 'dark' ? '#f0f0f0' : '#1a1a1a';//if cookie is dark then it will set the text color to dark else light
    const buttonBg = theme === 'dark' ? '#333' : '#ddd';//if cookie is dark then it will set the button background color to dark else light
    const buttonHover = theme === 'dark' ? '#444' : '#ccc';//if cookie is dark then it will set the button hover color to dark else light

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Theme Switcher</title>
            <style>
                body {
                    background-color: ${bgColor};
                    color: ${textColor};
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    transition: background-color 0.4s ease, color 0.4s ease;
                }
                .container {
                    text-align: center;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    background: ${theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)'};
                    backdrop-filter: blur(10px);
                }
                h1 { margin-bottom: 2rem; }
                .btn-group { display: flex; gap: 1rem; }
                a {
                    text-decoration: none;
                    background-color: ${buttonBg};
                    color: ${textColor};
                    padding: 0.8rem 1.5rem;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: background-color 0.2s;
                }
                a:hover {
                    background-color: ${buttonHover};
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Current Theme: ${theme.toUpperCase()}</h1>
                <div class="btn-group">
                    <a href="/set-theme/light">Light Mode</a>
                    <a href="/set-theme/dark">Dark Mode</a>
                </div>
            </div>
        </body>
        </html>
    `);
});

app.get('/set-theme/:theme', (req, res) => {
    const theme = req.params.theme;
    if (theme === 'light' || theme === 'dark') {
        res.cookie('theme', theme, { maxAge: 900000, httpOnly: true });
    }
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Theme Switcher server running at http://localhost:${PORT}`);
});
