import fs from 'fs'
let data = "This is the content to be written"
fs.writeFile("Test.txt", data, (err)=>{
    if(err){
        console.log("Error in writing into the file")
    }
    else{
        console.log("Contents written into the file")
    }
    fs.readFile("test.txt", null, (err, newData)=>{
        if(err){
            console.log("error in reading the file")
        }
        else{
            console.log(`File read: ${newData}`)
        }
    })
})
/*create an object:
{
name: "Ayuish",
marks: 89,
email: "ay@gmail.com"
}
Write the above content into a file named student.json asynchronously and then read the same synchronously
*/
// let student ={
//     name: "Ayush",
//     marks: 89,
//     email: "ay@gmail.com"
// }

// fs.writeFile("student.json", JSON.stringify(student, null, 5), (err)=>{
//     if(err){
//         console.log("Error in storing the data")
//     }
//     else console.log("Data stored")
    
//     let dataread=fs.readFileSync("student.json", "utf-8")
//     console.log(JSON.parse(dataread))
// })