import {createServer} from 'net'
const server= createServer((socket)=>{
    console.log('Client connected')
    socket.on('data',(data)=>{
        console.log('Received', data.toString());
        socket.write("Hello from Server")
    })
    socket.on('end', ()=>{
        console.log("Client Disconnected");
    })
})
server.listen(3001, ()=>{
    console.log("Server is listening onport 3001")
})
