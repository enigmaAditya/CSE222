import q from 'querystring'
const qs = "id=10&name=laptop&price=78000"
const parsedData = q.parse(qs)
console.log(parsedData)
console.log(parsedData.price)