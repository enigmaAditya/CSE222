import fs from "fs"
import zlib from "zlib"

let readable=fs.createReadStream("input.txt", "utf-8")
let writable=fs.createWriteStream("input.txt.gz")
let gzip=zlib.createGzip()

/* 
source <-> transform(Compression) <-> destination
*/
readable.pipe(gzip).pipe(writable)
writable.on("finish", () => {
    console.log("Compression done! Now decompressing...")
    let gunzip=zlib.createGunzip()
    let readable2=fs.createReadStream("input.txt.gz")
    let writable2=fs.createWriteStream("output.txt")
    readable2.pipe(gunzip).pipe(writable2)
})



