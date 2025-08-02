
const express = require("express");
const app = express();
const tasks = require('./routes/tasks')
const connectDB= require('./db/connect')
require('dotenv').config()
const notfound = require('./middleware/not-found')
const errorhandlemiddleware = require('./middleware/error_handle')

//middleware
app.use(express.static('./public'))
app.use(express.json())



// Routes

app.use('/api/v1/tasks', tasks)
app.use(notfound)
app.use(errorhandlemiddleware)

// -----Here server is call d--------------------------------------------------------------------------------------------------------------
const port = process.env.PORT ||3000;

const start = async ()=>{
     try {
          await connectDB(process.env.MONGO_URI)
          app.listen(port,console.log(`server is listening on ${port}...`))

     } catch (error) {
          console.log(error);
          
     }
}

start()