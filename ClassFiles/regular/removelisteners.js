import ee from 'events'
const myEmitter = new ee()
function myListener(){
    console.log("Hello there")
}
myEmitter.on("myevent",myListener)
setInterval(()=>{
    myEmitter.emit(`myevent`)
}, 3000);

setTimeout(()=>{
    myEmitter.removeListener("myevent", myListener)
    console.log("Listener Removed")
}, 10000);