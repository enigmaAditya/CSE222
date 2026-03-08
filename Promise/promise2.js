let x=2;
let y=3;
let result=x+y;
// async function fetchalldata(){
//     let fetchdata=await fetch('https://jsonplaceholder.typicode.com/users');
//     console.log(await fetchdata.json());
// }
// fetchalldata()

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((data)=> data.json())    //convert to JSON
    .then((jsonData)=>console.log(jsonData))  //log JSON
    .catch((error)=> console.log(error)) 

console.log(result);


function getdata(callback){
    setTimeout(()=>{
        callback("data received");
    },2000);
}
getdata((data)=>{
    console.log(data);
})

//what is callbackhell: 