const mongoose = require('mongoose')

const contactUsSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
        trim : true
    },
    lastName : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    contactNumber : {
        type : String,
        required : true,
        trim : true
    },
})

module.exports = mongoose.model('ContactUs' , contactUsSchema)