const User = require('../models/User')
const Course = require('../models/Course')
const RatingAndReview = require('../models/RatingAndReview')
const { default: mongoose } = require('mongoose')


exports.createRating =  async (req, res) =>{
    try{
        const {courseId, review, rating} = req.body
        const {userId} = req.user

        const courseDetails = await User.findById({_id: courseId,
        studentsEnrolled: {$elemMatch : {$eq: userId }} })

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "Course Not found "
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({user : userId, course : courseId})

        if(alreadyReviewed){
            return res.status(401).json({
                success : false,
                message : "User has already made the review"
            })
        }

        const ratingAndReview = await RatingAndReview.create({
            user : userId,
            rating : rating,
            review : review,
            course : courseId
        })

        const updateCourse = await Course.findByIdAndUpdate({_id: courseId}, {$push : {ratingAndReview : ratingAndReview._id}}, {new : true})

        return res.status(200).json({
            success : true,
            message : "Rating and Review successflly created"
        })
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating Rating and Review "
        })
    }
    
}



exports.getAverageRating = async(req, res) => {
    try{
        const {courseId} = req.body

        const result = await RatingAndReview.aggregate([
                                                {
                                                    $match : {
                                                        course : new mongoose.Types.ObjectId(courseId)
                                                    }
                                                },
                                                {
                                                    $group : {
                                                        _id : null,
                                                        averageRating : {$avg : "$rating"}
                                                    }
                                                }
        ])

        if(result.length > 0){

            return res.status(200).json({
            success : true,
            message : "Rating and review fetched",
            averageRating : result[0].averageRating

            })
        }

        return res.status(200).json({
            success : true,
            message : "Average Rating is 0, no ratings given till now"
        })

    } catch (e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching Rating annd review"
        })
    }
}


exports.getAllRating = async (req, res)=>{
    try {
        const allRatingAndReviews = await RatingAndReview.find({})
                                                        .sort({rating : "desc"})
                                                        .populate({
                                                            path : 'user',
                                                            select : "firstName lastName email image"
                                                        })
                                                        .populate({
                                                            path : 'course',
                                                            select : "courseName"
                                                        })

        return res.status(200).json({
            success : true,
            message : "Fetched Average Ratings"
        })

    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while fetching all ratings and review"
        })
    }
}