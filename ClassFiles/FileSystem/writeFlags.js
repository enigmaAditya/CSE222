import fs from 'fs'
fs.writeFile("pizza.txt", "I love pizza",{flag: 'wx'}, (err)=>{
    if(err){
        console.log("File already exists. Please change the file name!")
    }
    else{
        console.log("Content written intothe file:)")
    }
})