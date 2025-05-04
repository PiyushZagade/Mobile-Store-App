const express=require('express')
const app=express()
const userRouter=require('./routes/user')
const mobileRouter=require('./routes/mobile')
const orderRouter=require('./routes/orders')
const myMiddleware = require('./routes/middleware')
const cors = require('cors')


app.use(cors())
app.use('/mobile',express.static('images'))
app.use(express.json())
app.use(myMiddleware)
app.use('/mobile',mobileRouter)
app.use('/user',userRouter)
app.use('/orders',orderRouter)


app.listen(8080,'localhost',()=> {
    console.log("Server started at port 8080")
})