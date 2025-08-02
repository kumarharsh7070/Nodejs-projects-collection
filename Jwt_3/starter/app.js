require("dotenv").config();

const express = require("express")
const app = express()

const mainRouter = require('./routes/main')
const notFoundMiddleware=require('./middleware/not-found')
const errorHandlermiddleware=require('./middleware/error-handler')

// middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1',mainRouter)
app.use(notFoundMiddleware)
app.use(errorHandlermiddleware)

const port = process.env.Port || 3000
const start = async()=>{
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
        
    }
}

start()