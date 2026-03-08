import ee from 'events'
const myEmitter = new ee()
let max = myEmitter.getMaxListeners()
console.log(max)
myEmitter.setMaxListeners(30)
for (let i = 0; i < 25; i++) {
    myEmitter.on("myevent", () => {
        console.log(`Listener No. ${i} called`)
    })
}
myEmitter.emit(`myevent`)
