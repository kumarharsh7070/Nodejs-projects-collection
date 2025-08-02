const customAPIEroor = require('../errors/custom-error')

const errorHandlerMiddleware = (err, req,res,next)=>{
    if (err instanceof customAPIEroor) {
        return res.status(err.statusCode).json({msg:err.message})
        
    }
       return res.status(500).send('Something went wrong try again')
}

module.exports = errorHandlerMiddleware