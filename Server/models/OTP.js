const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const otpTemplate = require('../mail/templates/emailVerificationEmail')

const OTPSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    otp : {
        type : String,
        required : true,
    },
    createdAt : {
        type : Date,
        default : Date.now(),
        expires : 5*60 
    }
})

async function sendVerificationEmail (email , otp){
    try {
        const mailResponse = await mailSender(email, "Verification Email from DevComm", otpTemplate(otp))
        console.log("OTP Sent Successfully : ", mailResponse)
    } catch (error) {
        console.error(error);
        console.log("Error occured while sending mail")
    }
}

OTPSchema.pre('save', async function(next){
    await sendVerificationEmail(this.email, this.otp)
    next()
})

module.exports = mongoose.model('OTP', OTPSchema)