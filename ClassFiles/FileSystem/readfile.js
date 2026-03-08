import fs from 'fs'
// fs.readFile("img.jpg", null, (err, data)=>{
//     if(err){
//         console.log(`Error in reading the file: ${err}`)
//     }
//     else{
//         console.log(`Contents of the file are:\n${data}`)
//     }
// })
let data = fs.readFileSync("sample.txt")
console.log(`File read: ${data}`)
console.log("Make a new file named aditya.txt")