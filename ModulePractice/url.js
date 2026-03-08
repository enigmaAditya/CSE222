import {URL} from 'url'
const url = new URL("http://localhost:3001/products?id=10&name=laptop")
console.log(url)
console.log(url.host)
console.log(url.hostname)
console.log(url.port)
