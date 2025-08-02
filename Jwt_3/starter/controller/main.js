const jwt = require("jsonwebtoken")
const customAPIEroor = require("../errors/custom-error")
const login =async (req,res)=>{
    const{username,password}=req.body
    // mongo
    // joi
    // check in the controller
    if(!username || !password){
       throw new customAPIEroor('Please provide email and password ',400)
    }
    // just for demo, normally provided by DB!!!
    const id = new Date().getDate()

    // try to keep payload small better experience
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
    
    res.status(200).json({msg:'user created',token})
}

const dashboard = async (req,res)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer")){
            throw new customAPIEroor('No token provided ',401)

    }
    const token = authHeader.split(' ')[1]
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded);
        
    } catch (error) {
        throw new customAPIEroor('Not authorized to access this route',401)

    }
    const lucyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, john Doe`,secret:`Here is your authorized data, you r lucky number is ${lucyNumber}`})
}   

module.exports ={
    login,dashboard
}