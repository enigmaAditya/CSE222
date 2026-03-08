import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    if (path === '/') {
        // Home Page
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: Arial; padding: 20px;">
                    <h1>Node.js Practice Questions</h1>
                    <ul>
                        <li><a href="/natural-numbers">Q1: Print 10 Natural Numbers</a></li>
                        <li><a href="/word-count-form">Q2: Save Text and Count Words</a></li>
                    </ul>
                </body>
            </html>
        `);
    } else if (path === '/natural-numbers') {
        // Q1: Print 10 Natural Numbers
        res.writeHead(200, { 'Content-Type': 'text/html' });
        let content = '<h3>10 Natural Numbers:</h3><ul>';
        for (let i = 1; i <= 10; i++) {
            content += `<li>${i}</li>`;
        }
        content += '</ul><br><a href="/">Back to Home</a>';
        res.end(content);
    } else if (path === '/word-count-form') {
        // Q2: Form to enter text
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <body style="font-family: Arial; padding: 20px;">
                    <h3>Enter text to save and count words:</h3>
                    <form action="/save-text" method="GET">
                        <textarea name="text" rows="4" cols="50" placeholder="Type something here..."></textarea><br><br>
                        <button type="submit">Save and Count</button>
                    </form>
                    <br><a href="/">Back to Home</a>
                </body>
            </html>
        `);
    } else if (path === '/save-text') {
        // Q2: Process saving and counting
        const text = parsedUrl.query.text || "";
        
        fs.writeFile('data.txt', text, (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("Error saving file");
                return;
            }

            fs.readFile('data.txt', 'utf-8', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end("Error reading file");
                    return;
                }

                const wordCount = data.trim() === "" ? 0 : data.trim().split(/\s+/).length;
                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
                    <div style="font-family: Arial; padding: 20px;">
                        <h3>Success!</h3>
                        <p><b>Text Saved:</b> ${data}</p>
                        <p><b>Word Count:</b> ${wordCount}</p>
                        <br><a href="/word-count-form">Try Again</a> | <a href="/">Back to Home</a>
                    </div>
                `);
            });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("Page not found");
    }
});

server.listen(4000, () => {
    console.log("Practice server running at http://localhost:4000");
});
