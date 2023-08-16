const { default: mongoose } = require('mongoose')
const {instance} = require('../config/razorpay')
const Course = require('../models/Course')
const User = require('../models/User')
const {courseEnrollmentEmail } = require('../mail/templates/courseEnrollment')
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail')
const mailSender = require('../utils/mailSender')
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress')



// exports.capturePayment = async (req, res) =>{
//     const {courseId} = req.body
//     const userId = req.user.id

//     if(!courseId){
//         return res.status(401).json({ 
//             success : false,
//             message : "Course is not selected"
//         })
//     }

//     let course 
//     try {
//         course = await Course.findById(courseId)

//         if(!course){
//             return res.status(404).json({
//                 success : false,
//                 mesage : "Course not found"
//             })
//         }

//         let uid = new mongoose.Types.ObjectId(courseId)

//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(500).json({
//                 success : false,
//                 message : "Student is already enrolled in this course"
//             })
//         }

//     } catch (error) {
//         console.log(error)
//         return res.status(500).json({
//             success : false,
//             message : "Something went wrong while validating user and course credentials"
//         })
//     }

//     const amount = course.price
//     const currency = 'INR'

//     const options = {
//         amount : amount*100,
//         currency : currency,
//         receipt : Math.random(Date.now()).toString(),
//         notes : {
//             courseId : courseId,
//             userId : userId
//         }
//     }

//     try{
//         const payementResponse = await instance.orders.create(options)
//         console.log(payementResponse)

//         return res.status(200).json({
//             success : true,
//             message : "Order created successfully",
//             course : course.courseName,
//             thumbnail : course.thumbnail,
//             orderId : payementResponse.id,
//             amount : payementResponse.amount
//         })
//     } catch(e){
//         return res.status(500).json({
//             success : false,
//             message : "Something went wrong while creating an order for the payement"
//         })
//     }


// }

// exports.verifySignature = async (req, res) =>{
//     const webHookSecret = '123456789haha'   

//     const signature = req.headers('x-razorpay-signature') 

//     const shasum = crypto.createHmac('sha256', webHookSecret)
//     shasum.update(JSON.stringify(req.body))
//     const digest = shasum.digest('hex')

//     if(digest === signature){
//         const {courseId, userId} = req.payload.payement.entity.notes
        
//         try {
            
//             const enrolledStudent = await User.findByIdAndUpdate(userId , {$push : {courses : courseId}}, {new : true} )
    
//             if(!enrolledStudent){
//                 return res.status(404).json({
//                     success : false,
//                     message : "User not found or unable to get updated for the newly bought course in User model"
//                 })
//             }
    
//             const enrolledCourse = await Course.findByIdAndUpdate(courseId , {$push : {studentsEnrolled : userId}}, {new : true})
        
//             if(!enrolledCourse){
//                 return res.status(404).json({
//                     success : false,
//                     message : "Course not found or students enrolled property failed to get  updated"
//                 })
//             }

//             const emailVerification = await mailSender(enrolledStudent.email , "Welcome to DevCom", courseEnrollmentEmail)

//             return res.status(200).json({
//                 success : true,
//                 message : `${enrolledStudent.name} got successfully enrolled in ${enrolledCourse.courseName} course`
//             })


//         } catch (error) {
//             return res.status(500).json({
//                 success : false,
//                 message : "Something went wrong while updating User or Course schema"
//             })
//         }
        
        
//     }

//     else{
//         return res.status(404).json({
//             success : false,
//             message : "signature and web hook secret doesn't match"
//         })
//     }


    

    

// }

exports.capturePayment = async(req, res) => {
    const {courses} = req.body
    const userId = req.user.id

    if(courses.length === 0){
        return res.status(400).json({
            success : false,
            message : "No Course Selected"
        })
    }

    let totalAmount = 0

    for(const course_Id of courses){
        let course 

        try {
            course = await Course.findById({_id : course_Id})

            if(!course){
                return res.status(400).json({
                    success : false,
                    message : `${course_Id} is an invalid course Id`

                })
            }

            // const uid  = new mongoose.Types.ObjectId(userId);
            // if(course.studentsEnrolled.includes(uid)) {
            //     return res.status(400).json({success:false, message:"Student is already Enrolled"});
            // }

            totalAmount += course.price
        } catch (e) {
            console.error(e)
            return res.status(400).json({
                success :  false,
                message : "SOmething went wrong while Calculating amount "
            })
        }
    }

    const options = {
        amount : totalAmount*100,
        currency : "INR",
        receipt : Math.random(Date.now()).toString
    }

    try {
        const payementResponse = await instance.orders.create(options)

        return res.status(200).json({
            success : true,
            message : payementResponse
        })
    } catch (e) {
        // console.error(e)
        return res.status(500).json({
        success : false,
        message : "Something went wrong while creating instance of payement order"
    })   
    }
}


exports.verifyPayment = async(req, res)=> {
    const {razorpay_order_id} = req.body
    const {razorpay_payment_id} = req.body
    const {razorpay_signature} = req.body
    const {courses} = req.body
    const userId = req.user.id

    if(!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId){
        return res.status(400).json({
            success : false,
            message : "Insufficient Input"
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest('hex')

    if(expectedSignature === razorpay_signature){
        await enrollStudents(courses, userId, res)
        //return res
        return res.status(200).json({success:true, message:"Payment Verified"});

    }

    else{
        return res.status(500).json({
            success : false,
            message : "Payement failed As Signature does not matched"
        })   
    }
}

const enrollStudents = async(courses, userId, res) => {

    if(!courses || !userId) {
        return res.status(400).json({success:false,message:"Please Provide data for Courses or UserId"});
    }

    for(const courseId of courses) {
        try{
            //find the course and enroll the student in it
        const enrolledCourse = await Course.findOneAndUpdate(
            {_id:courseId},
            {$push:{studentsEnrolled:userId}},
            {new:true},
        )

        if(!enrolledCourse) {
            return res.status(500).json({success:false,message:"Course not Found"});
        }

        const courseProgress = await CourseProgress.create({
            userId : userId,
            courseId : courseId,
            completedVideos : []
        })   


        //find the student and add the course to their list of enrolledCOurses
        const enrolledStudent = await User.findByIdAndUpdate(userId,
            {$push:{
                courses: courseId,
                courseProgress : courseProgress._id,
                
            }},{new:true})
        

        ///bachhe ko mail send kardo
        const emailResponse = await mailSender(
            enrollStudents.email,
            `Successfully Enrolled into ${enrolledCourse?.courseName}`,
            courseEnrollmentEmail(enrolledCourse?.firstName, `${enrolledStudent?.lastName}`)
        )    
        //console.log("Email Sent Successfully", emailResponse.response);
        }
        catch(error) {
            console.log(error);
            return res.status(500).json({success:false, message:error.message});
        }
    }

}


// exports.sendPaymentSuccessEmail = async(req, res) => {
//     const {orderId, paymentId, amount} = req.body;

//     const userId = req.user.id;

//     if(!orderId || !paymentId || !amount || !userId) {
//         return res.status(400).json({success:false, message:"Please provide all the fields"});
//     }

//     try{
//         //student ko dhundo
//         console.log("userId" , userId)

        
//         const enrolledStudent = await User.findById(userId);
//         console.log(enrolledStudent)

//         if(!enrolledStudent){
//             return res.status(400).json({
//                 success: false,
//                 message : "Couldn't find the student details"
//             })
//         }
//         await mailSender(
//             enrolledStudent.email,
//             `Payment Recieved`,
//              paymentSuccessEmail(`${enrolledStudent.firstName}`,
//              amount/100,orderId, paymentId)
//         )
//     }
//     catch(error) {
//         console.log("error in sending mail", error)
//         return res.status(500).json({success:false, message:"Could not send email"})
//     }
// }

exports.sendPaymentSuccessEmail = async(req, res) => {
    const {orderId, paymentId, amount} = req.body;

    const userId = req.user.id;

    if(!orderId || !paymentId || !amount || !userId) {
        return res.status(400).json({success:false, message:"Please provide all the fields"});
    }

    try{
        //student ko dhundo
        console.log(typeof(userId))
        const enrolledStudent = await User.findById({_id : userId});

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
             paymentSuccessEmail(`${enrolledStudent.firstName}`,
             amount/100,orderId, paymentId)
        )
    }
    catch(error) {
        console.log("error in sending mail", error)
        return res.status(500).json({success:false, message:"Could not send email"})
    }
}
