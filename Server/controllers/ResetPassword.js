const User = require('../models/User')
const mailSender = require('../utils/mailSender')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

exports.resetPasswordToken = async (req, res) => {
    try{
        const {email} = req.body

    const user = await User.findOne({email : email})

    if(!user){
        return res.status(401).json({
            success : false,
            message : "Email not registered. Kindly Sign Up first"
        })
    }

    const token = await crypto.randomUUID()

    const updatedDetaiils = await User.findOneAndUpdate(
        {email : email}, 
        {token : token,
        resetPasswordExpires : Date.now() + 5*60*1000}, 
        {new: true}
        ) 

        const url = `http://localhost:3000/updatePassword/${token}`

        console.log(token)

        await mailSender(email, "Generate Password Link", `Password Generation Link : ${url}`)
    

            return res.status(200).json({
                success : true,
                message : "Password Generation Link sent through email"
            })
        } catch(e){
            console.error(e)
            res.status(500).json({
                success : false,
                message : "Error occured while generating/sending reset password link"
            })
        }
}


exports.resetPassword = async (req, res) =>{
    try{
        const {password, confirmPassword, token} = req.body

    if(password !== confirmPassword){
       return res.status(401).json({
            success : false,
            message : "Password and confirm password did not match"
        })
    }

    const userDetails = await User.findOne({token : token})
    
    if(!userDetails){
        return res.status(401).json({
            success : false,
            message : "You are not authorised to move further as the token does not match with the token that is saved in your database and linked with this ID"
        })
    }

    if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(402).json({
            success : false,
            message : "Your token is expired as you took more than 5 minutes. Please retry "
        })
    }

    console.log(password)

    const encryptPassword = await bcrypt.hash(password, 10)

    await User.findOneAndUpdate({token : token}, {password : encryptPassword}, {new: true})

    return res.status(200).json({
        success : true,
        message : "Password Changed Successfully",
        password : encryptPassword
    })
    } 

    catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while resetting password "
        })
    }

}