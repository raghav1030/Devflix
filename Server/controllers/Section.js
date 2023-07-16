const Section = require('../models/Section')
const Course = require('../models/Course')

exports.createSection = async (req, res) =>{
    try {
        const {courseId, sectionName} = req.body

        if(!courseId || !sectionName){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const newSection = await Section.create({sectionName})
        
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, {$push : {courseContent : newSection}}, {new: true}).populate({path : 'courseContent' , populate : {path :'subSection'}}).exec()
        // Hw : how to populate subsection also in this 

        res.status(200).json({
            success : true,
            message : "New section created successfully",
            section : newSection,
            course : updatedCourseDetails
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating a new section"
        })
    }
}


exports.updateSection = async (req, res) => {
    try{
        const {sectionId , sectionName, courseId } = req.body
        console.log("sectionId" , sectionId)
        console.log("sectionName" , sectionName)


        if(!sectionId || !sectionName){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const section = await Section.findByIdAndUpdate(sectionId, {sectionName: sectionName}, {new:true}).populate('subSection').exec()

        // console.log("Update Section Data", section)

        // const updateCourse = await Course.findByIdAndUpdate(courseId , {courseContent : })

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        }).exec()


        return res.status(200).json({
            success : true,
            message : "Section updated successfully",
            data : course,
        })
    }
    catch(e){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while upating section"
        })
    }
}

exports.deleteSection = async (req, res) => {
    try{
        // asssuming if the ID is coming in parameter like '/deleteSection/:id'
        const {sectionId, courseId } = req.body

        if(!sectionId || !courseId ){
            return res.status(400).json({
                success : false,
                message : "All fields are required"
            })
        }

        const deleteFromCourse = await Course.findByIdAndUpdate(courseId , {$pull : {courseContent : sectionId}}, {new: true})
        console.log(deleteFromCourse)

        if(!deleteFromCourse){
            return res.status(402).json({
                success : false,
                message : "Unable to update course while deleting section",
            })
        }
        const section = await Section.findByIdAndDelete(sectionId)

        if(!section){
            return res.status(402).json({
                success : false,
                message : "Section unable to delete"
            })
        }



        return res.status(200).json({
            success : true,
            message : "Section Deleted Successfully",
            data : deleteFromCourse

        })
    }
    catch(e){
        return res.status(500).json({
            success : false,
            message : "Something went wrong while Deleting section"
        })
    }
}