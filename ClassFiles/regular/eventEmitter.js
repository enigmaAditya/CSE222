// import ee from 'events'
// const booking = new ee();
// booking.on('register', (user) =>{
//     console.log(`Ticket Generated: ${user}`)
// })
// booking.on('register', (user) =>{
//     console.log(`Email sent: ${user}`)
// })
// booking.on('register', (user, seattype) =>{
//     console.log(`Registration recorded in the system! ${user} - ${seattype}`)
// })
// booking.emit('register', "Aditya", "VIP")
// booking.emit('register', "Sangam", "Regular")
// booking.emit('register', "Ayush", "Premium")
// booking.emit('register', "Aditya")
import ee from 'events'
function MovieTicketBooking(user, seattype){
    const booking = new ee();
    booking.on('register', (user) =>{
        console.log(`Ticket Generated: ${user}`)
    })
    booking.on('register', (user) =>{
        console.log(`Email sent: ${user}`)
    })
    booking.on('register', (user, seattype) =>{
        console.log(`Registration recorded in the system as: ${user} - ${seattype}`)
    })
    booking.emit('register', user, seattype)
}
MovieTicketBooking("Aditya", "VIP")
MovieTicketBooking("Sangam", "Regular")
MovieTicketBooking("Ayush", "Premium")
MovieTicketBooking("Aadarshni", "VIP")