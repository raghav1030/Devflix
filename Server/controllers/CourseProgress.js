const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")


exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body
    const userId = req.user.id
    
    try {
            const subSection = await SubSection.findById(subSectionId)

            if(!subSection){
                return res.status(404).json({
                    success : false,
                    error : "Sub Section Not found for the corresponding sub section id"
                })
            }

            let courseProgress = await CourseProgress.findOne({
                courseId : courseId,
                userId : userId
            })

            if(!courseProgress){
                return res.status(404).json({
                    success : false,
                    message : "Course Progress does not exists"
                })
            }

            else{
                    if(courseProgress.completedVideos.includes(subSectionId)){
                        return res.status(401).json({
                            success : false,
                            message : "Sub section alreay exists in the completed Videos"
                        })
                    }

                    courseProgress.completedVideos.push(subSectionId)

                }

                await courseProgress.save()

                
            return res.status(200).json({
                success : true,
                message : "Sub section added to completed videos in course progress"
            })

           
        
    } catch (e) {
        return res.status(500).json({
            success : false,
            message : "Something went wrong while adding the sub section to course Progress "
        })
    }
}

