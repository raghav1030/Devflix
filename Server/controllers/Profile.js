const User = require('../models/User')
const Profile = require('../models/Profile')
const Course = require('../models/Course')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const { default: mongoose } = require('mongoose')
const CourseProgress = require('../models/CourseProgress')

exports.updateProfile = async (req, res) => {
    try {
        const {about="", dateOfBirth="", contactNumber="", gender=""} = req.body
        const {id} = req.user

        const userDetails = await User.findById(id)

        const profileId = userDetails.additionalDetails
        const profileDetails = await Profile.findById(profileId)

        profileDetails.gender = gender
        profileDetails.about = about
        profileDetails.contactNumber = contactNumber
        profileDetails.dateOfBirth = dateOfBirth

        await profileDetails.save()

        res.status(200).json({
            success : true,
            message : "Profile has been Updted Successfully"
        })

        


    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while updating Profile"
        })
    }
}

exports.deleteAccount = async (req, res) =>{
    try {
        const id = req.user.id 

        console.log(id)
        const userDetails = await User.findById(id)
        
        if(!userDetails){
            return res.status(404).json({
                success : false,
                message : "User doesn't exist"
            })
        }

        const userProfileId = userDetails.additionalDetails._id
        
        await Profile.findByIdAndDelete(userProfileId)  

        const courses = userDetails.courses

        courses.map(async (courseId) =>{
            const course = await Course.findByIdAndUpdate(courseId,{
                $pull : {studentsEnrolled : id}
            }, {new : true})
        })

        const deleteUser = await User.findByIdAndDelete(id)

        res.status(200).json({
            success : true,
            message : "User has been Deleted Successfully"
        })


    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while Deleting Profile"
        })
    }

}
        

exports.updateDisplayPicture = async (req, res) => {
    try{

        const userId = req.user.id

        const image = req.files.displayPicture

        const displayPictureUpload = await uploadImageToCloudinary(image, process.env.MEDIA_FOLDER , 1000,1000)

        const uploadDetails = await User.findByIdAndUpdate(userId, {image : displayPictureUpload.secure_url}, {new: true})

        if(!uploadDetails){
            return res.status(402).json({
                success : false,
                message : "Image file failed to upload"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Image successfully uploaded",
            data : uploadDetails
        })
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while uploading the display picture"
        })
    }


}

exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id

        const userDetails = await User.findById(id).populate('additionalDetails').exec()

        res.status(200).json({
            success : true,
            message : "Profile details has been fetched Successfully"
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching User Details"
        })
    }
}

exports.getEnrolledCourses = async (req, res) =>{ 
    try{
        const {id} = req.user
        
        let enrolledCourses = await User.findById(id).populate({ path : 'courses',
        populate :{
            path : "instructor",
            populate : {
                path : "additionalDetails"
            },
        },
            populate : {

                path : "category",
            },
            populate : {
                path : "ratingAndReview",
            },
            populate : {
                path : "courseContent",
                populate : {
                    path : "subSection"
                }
            }
        })
        .populate("courseProgress")
        .exec()

        

        if(!enrolledCourses) {
            return res.status(404).json({
                success : false,
                message : "User not found or the can't populate courses"
            })
        }

        

        enrolledCourses = enrolledCourses.toObject()
        for(let  i = 0; i < enrolledCourses.courseProgress.length; i++ ){
            const courseId = enrolledCourses.courseProgress[i].courseId
             
            const courseDetails = await Course.findOne({
                _id : courseId,
            },
            ).populate('courseContent')

            let totalSubSections = 0

            for(let j = 0 ; j < courseDetails.courseContent.length ; j++){
                console.log("courseDetails.courseContent[i].subSection.length" , courseDetails.courseContent[i].subSection.length)
                totalSubSections += courseDetails.courseContent[i].subSection.length
            }
           

            let completedSubSections = enrolledCourses.courseProgress[i].completedVideos.length

            const completedSubSectionPercentage = Math.floor((completedSubSections/totalSubSections) * 100)
            console.log("completedSubSectionPercentage" , completedSubSectionPercentage )
            console.log("completedSubSections" , completedSubSections)
            console.log("totalSubSections", totalSubSections)


            enrolledCourses.courses[i].courseProgressPercentage = completedSubSectionPercentage



        }

        // console.log(enrolledCourses)
        return res.status(200).json({
            success : true,
            message : "Courses in which user is enrolled were found",
            data : {
                enrolledCourses : enrolledCourses.courses,
                // completedSubSectionPercentage : completedSubSectionPercentage
            }

        })
    }   catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something wen wrong while fetching the ccourse enrolled for the user"
        })
    }
}

    
exports.instructorDashboard = async(req, res ) => {

    try {
        const courseDetails = await Course.find({instructor : req.user.id})

        const courseData = courseDetails.map(course => {
            const totalStudents = course.studentsEnrolled.length
            const totalIncome = totalStudents*course.price

            const courseDataWithStats = {
                _id : course._id,
                courseName : course.courseName,
                courseDescription : course.courseDescription,
                totalStudents,
                totalIncome
            }

            return courseDataWithStats
        })

        return res.status(200).json({
            success : true,
            message : "Course data with stats fetched",
            courses : courseData
        })

        



    } catch (e) {
        return res.status(500).json({
            success : false,
            message : "SOmething went wrong while fetching instructor dashboard details"
        })
    }
}