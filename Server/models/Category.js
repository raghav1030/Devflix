const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    course : [ 
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course",
            required : true,
        },
    ]
})

module.exports = mongoose.model('Category', categorySchema)