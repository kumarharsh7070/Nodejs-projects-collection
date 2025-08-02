require("dotenv").config();


const express = require("express");
const app = express();

const connectDB = require('./db/connect')
const productRouter = require('./routes/projects')
// Import middleware
const notfoundmiddleware = require('./middleware/not_found');
const errormiddleware = require('./middleware/error_handler');

// Built-in middleware
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('<h2>StoreAPI</h2><a href="/api/v1/products">products routes</a>');
});

app.use('/api/v1/products', productRouter)

// Custom middleware (use AFTER routes)
app.use(notfoundmiddleware);
app.use(errormiddleware);
const port = process.env.PORT  || 3000
// Start server
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening port ${port}...`));
        
    } catch (error) {
        
    }
    
}
start()