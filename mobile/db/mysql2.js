const mysql2=require('mysql2') 
const pool =mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'Pass@123',
    database:'mobileStoreBooking'
})

module.exports=pool