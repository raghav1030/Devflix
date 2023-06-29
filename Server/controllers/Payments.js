const { default: mongoose } = require('mongoose')
const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/Course')
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollment')
const mailSender = require('../utils/mailSender')



exports.capturePayment = async (req, res) =>{
    const {courseId} = req.body
    const userId = req.user.id

    if(!courseId){
        return res.status(401).json({ 
            success : false,
            message : "Course is not selected"
        })
    }

    let course 
    try {
        course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                success : false,
                mesage : "Course not found"
            })
        }

        let uid = new mongoose.Types.ObjectId(courseId)

        if(course.studentsEnrolled.includes(uid)){
            return res.status(500).json({
                success : false,
                message : "Student is already enrolled in this course"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while validating user and course credentials"
        })
    }

    const amount = course.price
    const currency = 'INR'

    const options = {
        amount : amount*100,
        currency : currency,
        receipt : Math.random(Date.now()).toString(),
        notes : {
            courseId : courseId,
            userId : userId
        }
    }

    try{
        const payementResponse = await instance.orders.create(options)
        console.log(payementResponse)

        return res.status(200).json({
            success : true,
            message : "Order created successfully",
            course : course.courseName,
            thumbnail : course.thumbnail,
            orderId : payementResponse.id,
            amount : payementResponse.amount
        })
    } catch(e){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating an order for the payement"
        })
    }


}

exports.verifySignature = async (req, res) =>{
    const webHookSecret = '123456789haha'   

    const signature = req.headers('x-razorpay-signature') 

    const shasum = crypto.createHmac('sha256', webHookSecret)
    shasum.update(JSON.stringify(req.body))
    const digest = shasum.digest('hex')

    if(digest === signature){
        const {courseId, userId} = req.payload.payement.entity.notes
        
        try {
            
            const enrolledStudent = await User.findByIdAndUpdate(userId , {$push : {courses : courseId}}, {new : true} )
    
            if(!enrolledStudent){
                return res.status(404).json({
                    success : false,
                    message : "User not found or unable to get updated for the newly bought course in User model"
                })
            }
    
            const enrolledCourse = await Course.findByIdAndUpdate(courseId , {$push : {studentsEnrolled : userId}}, {new : true})
        
            if(!enrolledCourse){
                return res.status(404).json({
                    success : false,
                    message : "Course not found or students enrolled property failed to get  updated"
                })
            }

            const emailVerification = await mailSender(enrolledStudent.email , "Welcome to DevCom", courseEnrollmentEmail)

            return res.status(200).json({
                success : true,
                message : `${enrolledStudent.name} got successfully enrolled in ${enrolledCourse.courseName} course`
            })


        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "Something went wrong while updating User or Course schema"
            })
        }
        
        
    }

    else{
        return res.status(404).json({
            success : false,
            message : "signature and web hook secret doesn't match"
        })
    }


    

    

}

