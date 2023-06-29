const User = require('../models/User')
const Profile = require('../models/Profile')
const Course = require('../models/Course')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const { default: mongoose } = require('mongoose')

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
        
        const enrolledCourses = await User.findById(id).populate('courses').exec()

        if(!enrolledCourses) {
            return res.status(404).json({
                success : false,
                message : "User not found or the can't populate courses"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Courses in which user is enrolled are found"
        })
    }   catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something wen wrong while fetching the ccourse enrolled for the user"
        })
    }
}

    
