import ee from 'events'
let products = [
    { id: 1, name: "laptop", price: 56000, stock: 10 },
    { id: 2, name: "smartphone", price: 34000, stock: 5 },
    { id: 3, name: "headphone", price: 3400, stock: 7 },
    { id: 4, name: "charger", price: 2000, stock: 8 }
]

function placeOrder(user, productid, quantity) {
    const order = new ee()
    const product = products.find((p) => {
        return p.id === productid
    })
    /*Same as: 
    const product = products.find((p) =>
        p.id === productid )
     #because if we remove the curly braces from the arrow function the return statement is implicit
    */
    order.on("OrderFailed", (user, reason) => {
        console.log(`Order Failed for ${user}: ${reason}`)
    })
    if (!product) {
        order.emit("OrderFailed",user, "Product not found")
        return
    }
    if (product.stock < quantity) {
        order.emit("OrderFailed", user, `Insufficient stock. You can only place order for ${product.stock} ${product.name}.`)
        return
    }

    order.on("NewOrder", (user) => {
        console.log(`Order confirmed through email for ${user}`)
    })
    order.on("NewOrder", (user, product, quantity) => {
        product.stock = product.stock - quantity
        console.log(`Stock updated for ${product.name} to ${product.stock}`)
    })
    order.on("NewOrder", (user) => {
        console.log(`Track order for ${user}`)
    })
    order.emit("NewOrder", user, product, quantity)
}

// placeOrder("Aditya", 1, 2)
// placeOrder("Kartik", 3, 3)
// placeOrder("Ayush", 4, 5)
// placeOrder("Abhay", 4, 2)
// placeOrder("Aryan", 4, 6)
// placeOrder("Aadarshni", 3, 4)
placeOrder("Aadarshni", 3, 9)
placeOrder("Aditya", 99, 1)
