import {createConnection} from 'net';
const client =  createConnection({port:3001}, ()=>{
    console.log("Connected to Server")
    client.write("Hello server")
})
client.on('data', (data)=>{
    console.log("Received", data.toString())
    client.end();
})
client.on('end', ()=>{
    console.log("Disconnected from server!")
})
