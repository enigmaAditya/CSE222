// let message = ()=>{
//     console.log("This is my first program")
// }
// message()

// const http = require('http');

// const server = http.createServer((req, res) => {
//     res.end("Hello from Node.js Server!");
// });

// server.listen(3001, () => {
//     console.log("Server is running on port 3000");
// });

import http from 'http';

const server = http.createServer((req, res) => {
    res.end("Hello from Node.js Server with ES6!");
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});