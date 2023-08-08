const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    courseName : {
        type : String,
        trim : true,
        required : true
    },
    courseDescription : {
        type : String,
        trim : true,
        required : true
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    whatYouWillLearn : {
        type : String,
        required : true
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Section',
        }
    ],
    ratingAndReview : [
    {   
        type : mongoose.Schema.Types.ObjectId,
        ref : "RatingAndReview"
    }
    ],
    thumbnail : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        require : true,
    },
    tag : {
        type : [String],
        required : true
    },
    category: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category',
        required : true
    },
    instructions: {
		type: [String],
	},
    status : {
        type : [String],
        enum : ["Draft", "Published"]
    },
    studentsEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : true
        }
    ],
    createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model('Course', courseSchema)