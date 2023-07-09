const jwt = require('jsonwebtoken')
require('dotenv').config()


const User = require('../models/User')

exports.auth = async (req, res, next) =>{
    try{
        // extract Token
        const token = req.cookies.token  || req.body.token || req.header("Authorisation").replace("Bearer", "");

        console.log(token)

        if(!token){
            return res.status(404).json({
                success : false,
                message : "Token is Missing"
            })
        }

        try {
            const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
            console.log(verifyToken);
            req.user = verifyToken;
            return res.status(200).json({
                success: true,
                message: "Token Verified"
            });
            
        } catch(e) {
            console.error(e);
            return res.status(401).json({
            success: false,
            message: "Error while verifying tokens"
        });
    }
    
    next();
    
    
}
    catch(e){
        console.error(e)
        return res.status(401).json({
            success : false,
            message : "Something went wrong while validating Tokens"
        })
    }
}

exports.auth = async (req, res, next) => {
    try{
        //extract token
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorisation").replace("Bearer ", "");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log("Details from token Authorisation",decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue 
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}
exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(200).json({
                success : false,
                message : "This is a Protected Route for Admin only."
            })
        }

        next()
       
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Error occurred while verifying the Admin Role"
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(200).json({
                success : false,
                message : "This is a Protected Route for Instructor only."
            })
        }

        console.log("Instructor Verified")

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Error occurred while verifying the Instructor Role"
        })
    }
}



exports.isStudent = async (req, res, next) => {
    try {
        if(req.user.accountType !== "Student"){
            return res.status(200).json({
                success : false,
                message : "This is a Protected Route for Student only."
            })
        }

        next()

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : "Error occurred while verifying the Student Role"
        })
    }
}