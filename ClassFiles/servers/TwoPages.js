import http from 'http';
import fs, { readFileSync } from 'fs'
let server = http.createServer((req, res) => {
    if (req.url == "/home") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end("<h1 style=color:green>Home Page</h1>")
    } else if (req.url == "/about") {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        res.end("<h1 style=color:blue>About Page</h1>")
    } else if (req.url == "/image") {
        fs.readFile("Made2.png", (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end("Image not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'image/png' });
                res.end(data);
            }
        });
    } else if (req.url == "/product") {

        // res.writeHead(404, {
        //     'Content-Type': 'text/html'
        // })
        // let data = readFileSync("product.txt");
        // res.end(`${data}`);
        fs.readFile("product.txt", "utf-8", (err, data) => {
            if (err) {
                res.writeHead(404, {
                    'Content-Type': 'text/html'
                })
                // console.log(err);
                res.end("<p style=color:crimson>No data found</p>");
            } else {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                // const style = "<style>body{background-color: green;}</style>";
                // res.write(style);
                //insert an image from local machine:
                res.write("<img src='/image' style='max-width: 500px; display: block; margin-bottom: 20px;'>");
                res.end(`<pre style=font-family:Arial; font-size:20px>${data}</pre>`)
            }
        })

    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        })
        res.end("<p style=color:red>Page you are looking for does not exist:(</p>")
    }
})
server.listen(3000)