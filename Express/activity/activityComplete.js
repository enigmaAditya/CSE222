// Collect user name & email, display on next page, store in JSON, show all in table

import express from 'express'
import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import { fileURLToPath } from 'url'

const port = 8000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }))

// Route 1: Show the form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'submitForm.html'))
})

// Route 2: Handle form submission — save data & show it
app.post("/submit", (req, res) => {
    let { name, email } = req.body
    let newUser = { name, email }

    // Read existing data, add new user, write back
    let users = []
    if (fs.existsSync('users.json')) {
        let data = fs.readFileSync('users.json', 'utf-8')
        users = JSON.parse(data)
    }
    users.push(newUser)
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2))

    // Compress the file using gzip
    let readFile = fs.createReadStream('users.json')
    let gzip = zlib.createGzip()
    let compressedFile = fs.createWriteStream('users.json.gz')
    readFile.pipe(gzip).pipe(compressedFile)
    compressedFile.on('finish', () => {
        console.log('File compressed successfully!')
    })

    // Display submitted data on next page
    res.send(`
        <h2>Submitted Successfully!</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <br>
        <a href="/data">View All Users</a> | <a href="/">Submit Another</a>
    `)
})

// Route 3: Display all users in a table
app.get('/data', (req, res) => {
    if (!fs.existsSync('users.json')) {
        res.send('<h2>No data yet!</h2><a href="/">Go back</a>')
        return
    }

    let data = fs.readFileSync('users.json', 'utf-8')
    let users = JSON.parse(data)

    let tableRows = users.map((user, i) =>
        `<tr><td>${i + 1}</td><td>${user.name}</td><td>${user.email}</td></tr>`
    ).join('')

    res.send(`
        <h2>All Users</h2>
        <table border="1" cellpadding="8" cellspacing="0">
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
            ${tableRows}
        </table>
        <br>
        <a href="/">Add More</a>
    `)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
