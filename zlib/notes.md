# Node.js Zlib (Gzip Compression & Decompression) Notes

## Modules Used
```javascript
import fs from "fs"
import zlib from "zlib"
```
- `fs` — File System module for reading/writing files via streams.
- `zlib` — Provides compression/decompression using Gzip, Deflate, etc.

---

## Gzip Compression

```javascript
let readable = fs.createReadStream("input.txt")
let writable = fs.createWriteStream("input.txt.gz")
let gzip = zlib.createGzip()

readable.pipe(gzip).pipe(writable)
```

### Flow:
```
source (input.txt) -> transform (gzip compress) -> destination (input.txt.gz)
```

- `createReadStream` — reads the file as a stream (chunk by chunk).
- `createGzip()` — creates a transform stream that compresses data.
- `createWriteStream` — writes the compressed data to a `.gz` file.
- `.pipe()` — connects streams together: read → compress → write.

### Important:
Do NOT pass `"utf-8"` encoding to `createReadStream` when piping to gzip.
Gzip needs raw Buffer data, not strings.

```javascript
// ❌ Wrong — converts to string, breaks gzip
fs.createReadStream("input.txt", "utf-8")

// ✅ Correct — keeps raw Buffer
fs.createReadStream("input.txt")
```

---

## Gzip Decompression (Gunzip)

```javascript
let gunzip = zlib.createGunzip()
let readable2 = fs.createReadStream("input.txt.gz")
let writable2 = fs.createWriteStream("output.txt")

readable2.pipe(gunzip).pipe(writable2)
```

### Flow:
```
source (input.txt.gz) -> transform (gunzip decompress) -> destination (output.txt)
```

---

## Why `writable.on("finish", ...)` is Needed

Streams in Node.js are **asynchronous**. When you call `.pipe()`, it starts
the operation but **does not wait** for it to finish. Code below it runs immediately.

### Problem Without `writable.on`:
```javascript
readable.pipe(gzip).pipe(writable)          // Compression starts (async)
readable2.pipe(gunzip).pipe(writable2)      // Decompression starts IMMEDIATELY
// ❌ input.txt.gz isn't fully written yet → Z_BUF_ERROR: unexpected end of file
```

### Solution With `writable.on("finish", ...)`:
```javascript
readable.pipe(gzip).pipe(writable)

writable.on("finish", () => {
    // This runs ONLY after input.txt.gz is fully written
    let gunzip = zlib.createGunzip()
    let readable2 = fs.createReadStream("input.txt.gz")
    let writable2 = fs.createWriteStream("output.txt")
    readable2.pipe(gunzip).pipe(writable2)  // ✅ Safe to decompress now
})
```

### Breakdown:
- `writable` — the write stream for `input.txt.gz`
- `.on("finish", ...)` — listens for the "finish" event (fires when all data is flushed to file)
- `() => { ... }` — callback that runs only AFTER writing is complete

Think of it as: "When you're done writing the compressed file, THEN start decompressing it."

---

## Common Error: Z_BUF_ERROR

```
Error: unexpected end of file
  code: 'Z_BUF_ERROR'
```

### Causes:
1. The `.gz` file doesn't exist yet (compression hasn't run).
2. The `.gz` file is incomplete (decompression started before compression finished).
3. The file is not a valid gzip file (corrupted or wrong format).

### Fix:
Always ensure compression is **fully complete** before starting decompression,
using `writable.on("finish", callback)`.

---

## Complete Working Example

```javascript
import fs from "fs"
import zlib from "zlib"

// Step 1: Compress
let readable = fs.createReadStream("input.txt")
let writable = fs.createWriteStream("input.txt.gz")
let gzip = zlib.createGzip()

readable.pipe(gzip).pipe(writable)

// Step 2: Decompress AFTER compression finishes
writable.on("finish", () => {
    console.log("Compression done! Now decompressing...")
    let gunzip = zlib.createGunzip()
    let readable2 = fs.createReadStream("input.txt.gz")
    let writable2 = fs.createWriteStream("output.txt")
    readable2.pipe(gunzip).pipe(writable2)

    writable2.on("finish", () => {
        console.log("Decompression done!")
    })
})
```
