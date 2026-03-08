import express from 'express'
const app=express()
import foodrouter from './foodroutes.js'
app.use(foodrouter)
app.listen(3000,()=>console.log('Server started on port 3000'))