import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const inputFile = path.join(__dirname, 'sample.txt')
const compressedFile= path.join(__dirname, "sample.txt.gz")
const decompressedFile= path.join(__dirname, "sample_restored.txt")

//create a sample file:
fs.writeFileSync("sample.txt", "Hello World".repeat(1000))
console.log("Sample file created");

//compress: read-> gzip transform -> write:
const readstream = fs.createReadStream(inputFile);
const writestream = fs.createWriteStream(compressedFile);
const gzip = zlib.createGzip();
readstream.pipe(gzip).pipe(writestream);

//Decompression --- Inside the finish callback :
writestream.on('finish', ()=>{
    console.log("Compression complete!")

    const readcompressed= fs.createReadStream(compressedFile)
    const writeDecompressed= fs.createWriteStream(decompressedFile)
    const gunzip = zlib.createGunzip();

    readcompressed.pipe(gunzip).pipe(writeDecompressed);

    writeDecompressed.on('finish', ()=>{
        console.log("Decompression completed!")
    })
    writeDecompressed.on('error', (err)=>{
        console.log("Decompression error: ", err.message)
    })
})
writestream.on("error", (err)=>{
    console.log("Compression error: ", err.message)
})

