import fs from 'fs'
let readstream = fs.createReadStream("test.txt",
{encoding:"utf-8"})
let data = ""
readstream.on("data", (chunk)=>{
    console.log(chunk)
    data = chunk
})
readstream.on("end",()=>{
    console.log("Finished reading the data")
    //word count:
    const wordCount = data.trim() === "" ? 0 : data.trim().split(/\s+/).length;
    console.log("Word count:", wordCount)
    //char count:
    const charCount = data.length;
    console.log("Character count:", charCount)
    //line count:
    const lineCount = data.split("\n").length;
    console.log("Line count:", lineCount)
})
readstream.on("error", (err)=>{
    console.log("Error reading the file", err)
})