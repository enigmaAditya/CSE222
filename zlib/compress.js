import zlib from "zlib"
let data = "Meet me at the restaurant and lets plan something special:)!"
zlib.gzip(data,(err,buffer)=>{
    if(err){
        console.log("Error in compression")
    }
    else{
        console.log("Compressed data:",buffer)
        console.log("Decompressed data:",buffer.toString())
        zlib.gunzip(buffer,(err,buffer2)=>{
            if(err){
                console.log("Error in decompression")
            }
            else{
                console.log("Decompressed data:",buffer2.toString())
            }
        })
    }
})

//what is event driven architecture in node.js:
//Event-driven architecture is a design pattern where the flow of the program is determined by events or actions that occur in the system. In Node.js, events are used to handle asynchronous operations, such as file I/O, network requests, and user input.

//give mesuch questions and their answers:
/*
1. What is event loop in Node.js?
2. What is callback queue in Node.js?
3. What is event emitter in Node.js?
4. What is event listener in Node.js?
Answers:
1. Event loop is a mechanism in Node.js that handles the execution of callbacks and other tasks in a non-blocking manner.
2. Callback queue is a queue of callbacks that are waiting to be executed.
3. Event emitter is an object that emits events and allows other objects to listen to those events.
4. Event listener is an object that listens to events and executes callbacks when those events occur.

*/