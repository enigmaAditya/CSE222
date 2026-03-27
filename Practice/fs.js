import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Write File:
//async:
fs.writeFile('hello.txt', 'Hello, Node.js!', 'utf-8', (err)=>{
    if(err){
        console.log("Write error:", err.message);
        return;
    }
    console.log("File written successfully!")
})

//sync:
try{
    fs.writeFileSync('sync-file.txt', 'Written synchronously!');
    console.log("Sync write done!");
}
catch(err){
    console.log("Error: ",err.message);
}

//with path.join:
const filePath=path.join(__dirname, 'data', 'output.txt');
fs.writeFile(filePath, 'Safe path!', 'utf-8', (err)=>{
    if(err){
        console.log("Error: ", err.message);
    }
})


//Read File:
//async: (with utf-8 returns string)
fs.readFile('hello.txt', 'utf-8', (err, data)=>{
    if(err){
        console.log("Error: ", err.message);
        return;
    }
    console.log("Content: ", data);

})

//(without utf-8 encoding returns buffer(raw binary)):
fs.readFile('hello.txt', (err, data)=>{
    console.log("Buffer: ", data);
    console.log("String: ", data.toString()); //output: Hello, Node.js!
})

//sync:
try{
    const content =fs.readFileSync("hello.txt", 'utf-8');
    console.log("Sync content: ", content);
}
catch(err){
    console.log("Error: ",err.message);
}

//using path.join:
fs.readFile(path.join(__dirname, 'hello.txt'), 'utf-8', (err, data)=>{
    if(err){
        console.log("Error: ",err.message);
        return;
    }
    console.log(data);
})


//Appendimg File:
//async:
fs.appendFile('hello.txt', '\n this is appende text!', (err)=>{
    if(err){
        console.log("Error: ", err.message);
        return;
    }
    console.log("text appended!");
})

//sync:
fs.appendFileSync("hello.txt", '\nAnother appended line!');


//Rename File:
fs.rename("hello.txt", 'New.txt', (err)=>{
    if(err) return console.log(err);
    console.log("Renamed successfully")
})

//Deleting File:
fs.unlink("New.txt", (err)=>{
    if(err) return console.log("err");
    console.log("File deleted successfully");
})

//Check File existence:
if(fs.existsSync("hello.txt")){
    console.log("File exists!")
}
else{
    console.log("File does not exist!");
}


//Working with JSON:

const student={
    name: "Rahul",
    age: 21,
    courses: ["Node.js", "React", "MongoDB"],
    isActive: true,
    address: {
        city: "Phagwara",
        pin: "144411"
    }
};
const jsonString= JSON.stringify(student);
console.log(jsonString);
console.log(typeof jsonString ); //string


const jsonData= '{"name":"Priya","age":22,"city":"Delhi"}';
const parsedObject=JSON.parse(jsonData);
console.log(parsedObject);
 console.log(parsedObject.name);
 console.log(parsedObject.age);
 console.log(typeof parsedObject);

const users = [
    { id: 1, name: "Rahul", email: "rahul@test.com" },
    { id: 2, name: "Priya", email: "priya@test.com" },
    { id: 3, name: "Amit", email: "amit@test.com" }
];

fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
console.log("Json file created!");


//Read JSON from File:
//async:

fs.readFile("users.json", 'utf-8', (err, data)=>{
    if(err) return console.log(err);
    
    //data is a string so we must parse to use as a object:
    const usersArray=JSON.parse(data);
    console.log("All users: ", usersArray);
    console.log("First user: ", usersArray[0].name); //Rahul 

    const user=usersArray.find(u=>u.id ===2);
    console.log("Found: ", user);
})

//sync:
const rawData=fs.readFileSync("users.json", "utf-8");
const usersFromFile= JSON.parse(rawData);
console.log("Users: ",usersFromFile);

//Update JSON file (Read->MOdify->Write back):
fs.readFile('users.json', 'utf-8', (err, data)=>{
    if(err) return console.log(err);

    //step 1: parse existing data:
    const usersArray = JSON.parse(data);

    //step 2: Add new user:
    usersArray.push({
        id: 4,
        name: "Sneha",
        email: "sneha@test.com"
    })

    //step 3: Write updated data back to file:
    fs.writeFile("users.json", JSON.stringify(usersArray, null, 2), (err)=>{
        if(err) return console.log(err);
        console.log("User added to JSON file!");
    })
})

//Import JSON File directly (ES Module):
import data from './users.json' assert {type: 'json'};
