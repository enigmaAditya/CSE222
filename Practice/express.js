import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
const app = express();
const PORT = 8000;
const __filename =fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Middlewares:
app.use(express.json()) //parse JSON request bodies
app.use(express.urlencoded({extended: true})) //parse html form data
app.use(express.static('public')) //serve static files

let users=[
    { id: 1, name: "Rahul", email: "rahul@test.com" },
    { id: 2, name: "Priya", email: "priya@test.com" }
]

app.get('/', (req, res)=>{
    res.send('Hello World! Welcome to Express!');
})
app.get('/demo-send', (req, res)=>{
    res.send(`<h1>This is res.send() with HTML</h1>`)
})
app.get('demo-json', (rq, res)=>{
    res.json({message: "This is res.json()", status:"success"})
})
app. get('/get-file', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//GET Requests -- retrieve data:
//get all users:
app.get('/api/users',(req, res)=>{
    res.json(users);
})

//get single user by id - route parameter (:id)
app.get('/api/users/:id', (req, res)=>{
    const userId= parseInt(req.params.id)
    const user = users.find(u => u.id === userId);

    if(!user){
        return res.status(404).json({error: "User not found"})
    }
    res.json(user)
})

// GET with QUERY PARAMETERS (?key=value&key2=value2)
app.get('/api/search', (req, res) => {
    // URL: /api/search?name=Rahul&age=25&sort=asc
    // req.query → { name: 'Rahul', age: '25', sort: 'asc' }
    const { name, age, sort } = req.query;

    console.log("Query:", req.query);

    res.json({
        message: `Searching for ${name}, age ${age}`,
        sorting: sort,
        allParams: req.query
    });
});





app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`)
})