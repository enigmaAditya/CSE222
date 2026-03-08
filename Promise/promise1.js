const myPromise=new Promise((resolve, reject)=>{
    const success=false;
    if(success){
        resolve("Task completed successfully");
    }
    else{
        reject("Taskfailed!");
    }
})
myPromise
 .then((message)=>{
    console.log(message);
 })
 .catch((error)=>{
    console.log(error);
 })