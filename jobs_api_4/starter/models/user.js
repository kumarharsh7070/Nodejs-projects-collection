const mongoose = require('mongoose')

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'Please provide valid name'],
        minlenght:3,
        maxlength:50,
    },
    email:{
        type:String,
        require:[true,'Please provide valid email'],
       match: [
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}(\.[0-9]{1,3}){3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Please provide a valid email'
  ],
  unique:true,
    },
    password:{
        type:String,
        required:[true, 'Please provide password'],
        minlength:6,
        maxlength:12,
    }
})

module.exports = mongoose.model('User',Userschema)