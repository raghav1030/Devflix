const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
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
    password : {
        type : String,
        required : true,
    },
    accountType : {
        type : String,
        enum : ['Admin', 'Student', 'Instructor'],
        required : true
    },
    additionalDetails : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile',
    },
    courses : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Course"
        }
    ],
    image : {
        type : String,
        required : true,
    },
    token : {
        type : String
    },
    resetPasswordExpires : {
        type : Date
    },
    courseProgress : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "CourseProgress"
        }
    ],

    // ye samajhna hai
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    allOTP : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'OTP'
    }

},

    // Adding timestamps for when document created or last modified
    {timestamps : true},
);

module.exports = mongoose.model('User', userSchema)