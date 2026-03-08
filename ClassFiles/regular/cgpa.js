import ee from 'events'
const cgpa = new ee()

cgpa.on('marks', (user_name) =>{
    console.log("Students marks are uploaded: ", user_name)
})

cgpa.on('marks', (user_name, m1, m2, m3, m4, m5, m6, m7, m8) =>{
    const cga = ((m1 + m2+ m3 + m4 + m5+ m6 + m7 + m8)/800)*10
    console.log("CGPA scored by %c: %d", user_name, cga )
})

cgpa.emit('marks', "Karan", 79, 44, 56, 77, 63, 62, 67 );

