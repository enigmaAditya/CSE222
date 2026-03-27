import http from 'http'
//  const server = http.createServer((req, res)=>{
//     console.log(`Request received: ${req.method} ${req.url}`)
// })
// server.listen(3000, ()=>{
//     console.log("Server is listening on port 3000")
// })

// // Setting up a basic http server:
// const server2 = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type" : "text/plain"})

//     res.end("Hello world")
// })

// server2.listen(3001)
// console.log("server is running at http://localhost:3001")

// //Server 3 with HTML response:
// const server3 = http.createServer((req, res)=>{
//     res.writeHead(200, {"Content-Type":"text/html"})
//     res.end(`
//         <html>
//         <head><title>My Server</title></head>
//         <body>
//             <h1>Welcome to Node.js</h1>
//             <p>You requested: ${req.url}</p>
//             <p>Method: ${req.method}</p>
//         </body>
//         </html>
//         `)
// })
// server3.listen(3001)
// console.log("server is running at http://localhost:3001")

//Server4 with JSON response:
const server4= http.createServer((req, res)=>{
    const data={
        message: "Hello from API",
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method
    }
    res.writeHead(200, {"Content-Type":"appplication/json"})
    res.end(JSON.stringify(data))
})
server4.listen(3001)
console.log("server is running at http://localhost:3001")