import http from 'http'
import ee from 'events'
import fs from 'fs'

let view = new ee()
view.on("view", (parsedData, res)=>{
    let rows=''
                for(let i=0; i<parsedData.length; i++){
                    rows+=`<tr>
                    <td>${parsedData[i].id}</td>
                    <td>${parsedData[i].name}</td>
                    <td>${parsedData[i].price}</td>
                    </tr>`
                }
                res.writeHead(200, {"Content-Type": "text/html"})
                res.end(`<table border=1>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    ${rows}
                </table>`)
})
let server = http.createServer((req, res)=>{
    if(req.url == "/"){
        res.writeHead(200, {"Content-Type": "text/html"})
        res.end(`
            <h3>Click on the button to view the data!</h3>
            <a href="/fetch">
            <button>View Data</button
            </a>
        `)
    } else if(req.url == "/fetch"){
        fs.readFile("items.json", "utf-8", (err, data)=>{
            if(err){
                res.writeHead(404, {"Content-Type": "text/html"})
                res.end("<p style=color:red>Data not found</p>")
            } else {
                let parsedData=JSON.parse(data)
                view.emit("view", parsedData, res)
            }
        })
    }

})
server.listen(3000)