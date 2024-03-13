const express = require('express')
const colors = require('colors') 
const connectDB = require('./config/db')
const dotenv = require('dotenv').config();
const port = process.env.PORT || 5000;
connectDB();
const app = express();
const {errorHandler} = require('./middleware/errorMiddleware')

app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.use('/api/goals/' , require('./routes/goalRoutes') )
app.use('/api/users/' , require('./routes/userRoutes') )
app.use(errorHandler)
// app.post('/mafi' , (req,res)=>{
//     if(!req.body.text){
//         res.status(500) 
//         throw  new Error('Please add a text field')
//     }
//         res.status(200).json({message:'Set Goals'})
    
// })
// app.use(errorHandler)


app.listen(port, () => console.log(`Server started on port  http://localhost:${port}`))

 