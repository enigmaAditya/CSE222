import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fs.readFile("pizza.txt", (err, data) => {
        if (err) {
            console.log(err);
            res.end();
        }
        const style = "<style>body{background-color: red;}</style>";
        res.write(style);
        res.write(data);
        res.end()
    })
    
    // res.write("This is my first program of HTTP server in Node.js\n");
    // res.write("<h1 style='color: red;'>This is the second line</h1>");
    // res.end()
});

server.listen(3001, () => {
    console.log("Server is running at port number 3000");
});