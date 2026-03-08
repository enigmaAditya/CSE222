import fs from 'fs'
// let w = fs.createWriteStream("test.txt",
// {encoding:"utf-8"})
// w.write("We are using the streams in Node.js")
// w.end()
// w.on("finish",()=>{
//     console.log("Finished writing the data")
// })
// w.on("error",(err)=>{
//     console.log("Error writing the file", err)
// })

// // 2. Writing multiple chunks
// let w2 = fs.createWriteStream("test2.txt",
// {encoding:"utf-8"})
// w2.write("First chunk\n")
// w2.write("Second chunk\n")
// w2.write("Third chunk\n")
// w2.end()
// w2.on("finish",()=>{
//     console.log("Finished writing the data in test2.txt")
// })
// w2.on("error",(err)=>{
//     console.log("Error writing the file", err)
// })

//duplex stream:
let w = fs.createWriteStream("test.txt",
{encoding:"utf-8"})
w.write("We are using the streams in Node.js")
//read the file now:
w.end(()=>{
    let r = fs.createReadStream("test.txt",
    {encoding:"utf-8"})
    r.on("data",(chunk)=>{
        console.log(chunk)
    })
    r.on("end",()=>{
        console.log("Finished reading the data")
    })
    r.on("error",(err)=>{
        console.log("Error reading the file", err)
    })
})
w.on("finish",()=>{
    console.log("Finished writing the data")
})
w.on("error",(err)=>{
    console.log("Error writing the file", err)
})