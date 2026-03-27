import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Create a big file for testing:
const writeBig = fs.createWriteStream(path.join(__dirname, 'bigfile.txt'));
for(let i=0; i<10000; i++){
    writeBig.write(`Line ${i+1}: This is line number ${i+1}  of our big file.\n`);
}
writeBig.end();

//Readable Stream:
const readstream = fs.createReadStream(path.join(__dirname, 'bigfile.txt'),{
    encoding:'utf-8',
    highWatermrk: 1024
});

let chunkCount=0;
readstream.on("data", (chunk)=>{
    chunkCount++;
    console.log(`--- Chunk ${chunkCount} (${chunk.length} chars) ---`);
    
})
readstream.on("end", ()=>{
    console.log(`Done reading! Total chunks: ${chunkCount}`)
})
readstream.on("error", (err)=>{
    console.log("Read Error:", err.message)
})

//Writable Stream:
const writestream = fs.createWriteStream(path.join(__dirname, 'output.txt'))

writestream.write("First line of data\n")
writestream.write("Second line of data\n")
writestream.write("Third line of data\n")

writestream.end("Last line (passed to end)\n")
writestream .on('finish', ()=>{
    console.log("All data written to output.txt!")
})
writestream.on("error", (err)=>{
    console.log("Error in writing to the file: ", err.message)
})


//Piping -- Conects readable stream to writing stream:
const src = fs.createReadStream(path.join(__dirname, 'bigfile.txt'))
const dest = fs.createWriteStream(path.join(__dirname, 'copy.txt'))
src.pipe(dest);

dest.on('finish', ()=>{
    console.log("File copied using pipe!")
})

//Pipe Chaining (Read -> Transform -> Write):
import zlib from 'zlib' 
fs.createReadStream('bigfile.txt')
    .pipe(zlib.createGzip ())
    .pipe(fs.createWriteStream('bigfile.txt.gz'))
    .on('finish', ()=> console.log("Compressed using pipe chain!"));
