const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    gender : {
        type : String,
    },
    about : {
        type : String,
        trim :  true
    },
    contactNumber : {
        type : Number,
        trim : true
    },
    dateOfBirth : {
        type : String,
    },
})

module.exports = mongoose.model('Profile', profileSchema)