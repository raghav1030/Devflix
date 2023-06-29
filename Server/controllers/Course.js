const Course = require('../models/Course')
const Category = require('../models/Category')
const User = require('../models/User')
const {uploadImageToCloudinary} = require('../utils/imageUploader')
const { default: mongoose } = require('mongoose')

exports.createCourse = async(req, res) =>{
    try {
        const{ courseName , courseDescription, whatYouWillLearn,  price, category, tag, instructions } = req.body
        let {status} = req.body
        const {thumbnail} = req.files

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !tag || !thumbnail ){
            return res.status(400).json({   
                success : false,
                message : "Fill out all the details"
            })
        }

        const userId = req.user.id
        const instructorDetails = await User.findById(userId, {accountType : "Instructor"})

        // console.log("instructorDetails" , instructorDetails)


        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor not found"
            })
        }

        const categoryDetails = await Category.findById(category)

        if(!categoryDetails){
            return res.status(404).json({
                success : false,
                message : "Invalid Category"
            })
        }

        console.log("Category details : " , categoryDetails)

        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.MEDIA_FOLDER)

        console.log("thumbnail" , thumbnailImage)

        if(!status || status === 'undefined'){
            status = 'Draft'
        }

        
        const newCourse = await Course.create({
            courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
        })

        console.log("new Course" , newCourse)

        const updateUser = await User.findByIdAndUpdate({_id: instructorDetails._id}, {$push: {courses : newCourse._id}}, {new:true})

        const updateCategory = await Category.findByIdAndUpdate({_id: categoryDetails._id}, {$push: {course : newCourse._id}}, {new:true})

        return res.status(200).json({
            success : true,
            message : "Course Created Successfully",
            course : newCourse,
            user : updateUser,
            category : updateCategory
        })

    } catch (e) {
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating course"
        })
    }
}



exports.getAllCourses = async (req,res) =>{
    try {
        const allCourses = await Course.find({}, {courseName : true, courseDescription : true, price: true,
        thumbnail : true, ratingAndReview : true, studentsEnrolled: true}).populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "All courses fetched Successfully",
            courses : allCourses
        })



    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching the data for all courses"
        })
    }
}

exports.getCourseDetails = async (req, res) =>{
    try {
        const {courseId} = req.body

        const courseDetails = await Course.findById(courseId).populate({
                                                                    path : 'instructor',
                                                                    populate : {
                                                                        path : "additionalDetails"
                                                                    }
                                                                }).populate('category')
                                                                .populate('ratingAndReview')
                                                                .populate({
                                                                    path : 'courseContent',
                                                                    populate : {
                                                                        path :"subSection"
                                                                    },
                                                                }).populate({
                                                                    path : "studentsEnrolled",
                                                                    populate : {
                                                                        path : "additionalDetails"
                                                                    }
                                                                }).exec()

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Invalid course id"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Course Details successfully fetched",
            course : courseDetails
        })

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            success : false,
            message : `Something went wrong while fetching the course details`,
            error : error.message                           
        })
    }
}

exports.getPublishedAllCourses = async (req,res) =>{
    try {
        const allCourses = await Course.find({status : 'Published'}, {courseName : true, courseDescription : true, price: true,
        thumbnail : true, ratingAndReview : true, studentsEnrolled: true}).populate("instructor").exec();

        return res.status(200).json({
            success : true,
            message : "All Published courses fetched Successfully",
            courses : allCourses
        })



    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Error occured while fetching the data for all Published courses"
        })
    }
}

exports.updateCourseDetails = async (req, res) => {
    try{
        const{ courseName , courseDescription, whatYouWillLearn,  price, category, tag, instructions, status, courseId } = req.body

    const {thumbnail} = req.files
    // const arr = [courseName, courseDescription, whatYouWillLearn, price, category, tag, instructions , status]

    const courseDetails = await Course.findById(courseId)

    if (courseName) courseDetails.courseName = courseName;
    if (courseDescription) courseDetails.courseDescription = courseDescription;
    if (whatYouWillLearn) courseDetails.whatYouWillLearn = whatYouWillLearn;
    if (price) courseDetails.price = price;
    if (category) courseDetails.category = category;
    if (tag) courseDetails.tag = tag;
    if (instructions) courseDetails.instructions = instructions;
    if (status) courseDetails.status = status;

    if(thumbnail){
        const uploadThumbnail = await uploadImageToCloudinary(thumbnail, process.env.MEDIA_FOLDER)
        courseDetails.thumbnail = uploadThumbnail.secure_url
    }

    console.log(courseDetails)

    await courseDetails.save()

    return res.status(200).json({
        success : true,
        message : "Course details updated",
        courseDetails : courseDetails
    })
}   
    catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while updating the course details"
        })
    }
}

exports.deleteCourse = async (req, res) =>{

    try{
        const {courseId} = req.body

        if(!courseId){
            return res.status(404).json({
                success : false,
                message : "Course Id not available"
            })
        }

        const  courseDetails = await Course.findById(courseId).populate('studentsEnrolled')

        const studentsEnrolledArray = courseDetails.studentsEnrolled

        studentsEnrolledArray.map(async (id) =>{
            id = new mongoose.ObjectId.Types(id)
            const deleteFromUser = await  User.findByIdAndUpdate(id, {$pull : {course : id}}, {new: true})
        })

        const courseDelete = await Course.findByIdAndDelete(courseId)

        if(!courseDelete){
            return res.status(402).json({
                success : false,
                message : "Unable to delete the course or find course"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Course successfully deleted"
        })
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while deleting course"
        })
    }
    
}