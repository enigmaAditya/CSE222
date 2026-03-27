import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    const url = req.url;

    if (url === '/') {
        // Logging for root URL
        const logMessage = `Request received on ${new Date().toLocaleString()}\n`;
        fs.appendFile('log.txt', logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            }
        });

        res.write('Welcome to the Home Page!');
        res.end();
    } else if (url === '/about') {
        res.write('Welcome to the About Page!');
        res.end();
    } else if (url === '/contact') {
        res.end('Welcome to the Contact Page!');
    }
    else if(url === '/log'){
        fs.readFile('log.txt', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end('No logs found.');
                return;
            }
            const logs = data.split('\n').filter(line => line.trim());
            let table = '<table border="1"><thead><tr><th>Log Entry</th></tr></thead><tbody>';
            logs.forEach(log => {
                table += `<tr><td>${log}</td></tr>`;
            });
            table += '</tbody></table>';
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(table);
        });
        
    }
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

