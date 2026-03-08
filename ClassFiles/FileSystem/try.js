import fs from 'fs'
try{
    let data = fs.readFileSync("sample.txt")
    console.log(`File read: ${data}`)
    console.log("Make a new file named aditya.txt")
}
catch(err){
    console.log("Error in reading the file")
}
