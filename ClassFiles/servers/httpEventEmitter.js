import http from 'http';
import { EventEmitter } from 'events';
import fs from 'fs';

const myEmitter = new EventEmitter();

const server = http.createServer((req, res) => {
    if (req.url === "/") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
            <h3>Click on the button to view the data!</h3>
            <a href="/fetch">
                <button>View Data</button>
            </a>
        `);
    } else if (req.url === "/fetch") {
        fs.readFile("items.json", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("<p style=color:red>Data not found</p>");
                return;
            }

            const parsedData = JSON.parse(data);
            let rows = '';

            // Listen for 'row' events to build the table
            myEmitter.once('startProcessing', () => {
                rows = ''; // Reset rows for a new request
            });

            myEmitter.on('row', (item) => {
                rows += `<tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                </tr>`;
            });

            myEmitter.once('done', () => {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(`
                    <table border=1>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                        ${rows}
                    </table>
                    <br>
                    <a href="/"><button>Back to Home</button></a>
                `);
                // Remove listeners to avoid memory leaks/duplicated rows on subsequent requests
                myEmitter.removeAllListeners('row');
            });

            // Start processing
            myEmitter.emit('startProcessing');
            for (let i = 0; i < parsedData.length; i++) {
                myEmitter.emit('row', parsedData[i]);
            }
            myEmitter.emit('done');
        });
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
