const SubSection = require('../models/SubSection')
const Section = require('../models/Section')
const { uploadImageToCloudinary } = require('../utils/imageUploader')

exports.createSubSection = async (req, res) =>{
    try{
        const {sectionId, title, description } = req.body

        const video = req.files.video

        if(!sectionId || !video || !description || !title   ){
            return res.status(400).json({
                success : false,
                message : "Fill all the fields"
            })
        }

        const uploadDetails = await uploadImageToCloudinary(video, process.env.MEDIA_FOLDER)

        const subSectionDetails = await SubSection.create({
            title: title,
            timeDuration : uploadDetails.duration,
            description : description,
            videoUrl : uploadDetails.secure_url
        });


        const updateSection = await Section.findByIdAndUpdate(sectionId, {$push : {subSection : subSectionDetails._id }}, {new : true}).populate('subSection').exec()
    
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false,
            message : "Something went wrong while creating the subSection",
            error : e.message
        })
    }

}

exports.createSubSection = async (req, res) => {
    try {
      // Extract necessary information from the request body
        const { sectionId, title, description } = req.body
        const video = req.files.video
  
      // Check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
        return res
            .status(404)
            .json({ success: false, message: "All Fields are Required" })
        }
        console.log(video)

      // Upload the video file to Cloudinary
        const uploadDetails = await uploadImageToCloudinary(
            video,
            process.env.FOLDER_NAME
        )
        console.log(uploadDetails)
      // Create a new sub-section with the necessary information
    const SubSectionDetails = await SubSection.create({
        title: title,
        timeDuration: `${uploadDetails.duration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
    })

      // Update the corresponding section with the newly created sub-section
    const updatedSection = await Section.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
    ).populate("subSection")

      // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error)
    return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
    })
    }
}

exports.updateSubSection = async (req, res) => {
    try{
            const {subSectionId, sectionId , title, description} = req.body
        const video = req.files.videoFile

        const subSectionDetails = await SubSection.findById(subSectionId)
        
        if(!subSectionDetails){
            return res.status(404).json({
                success : false,
                message : "Sub section not found while updating"
            })
        }

        if(title){
            subSectionDetails.title = title
        }

        if(description){
            subSectionDetails.description = description
        }

        if(req.files && req.files.videoFile){
            const uploadDetails = await uploadImageToCloudinary(video , process.env.MEDIA_FOLDER)
            subSectionDetails.timeDuration  = `${uploadDetails.duration}`
            subSectionDetails.videoUrl = uploadDetails.secure_url
        }

        await subSectionDetails.save()

        return res.status(200).json({
            success : true,
            message : "Sub section updated"
        })
    } catch(e){
        console.error(e)
        return res.status(500).json({
            success : false, 
            message : "Something went wrong while updating sub section"
        })
    }

}

exports.deleteSubSection = async (req, res) => {
    try {
        const {sectionId , subSectionId} = req.body

        const sectionDelete = await Section.findByIdAndUpdate(sectionId , {$pull : {subSection : subSectionId  }}, {new : true})
        
        if(!sectionDelete){
            return res.status(402).json({
                success : false,
                message : "Section not found or unable to remove sub section from the section"
            })
        }


        const subSectionDelete = await SubSection.findByIdAndDelete(subSectionId)

        if(!subSectionDelete){
            return res.status(402).json({
                success : false,
                message : "Sub section not found while deleting or Found but couldn't delete"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Sub section removed successfully"
        })
    } catch (e) {
        console.error(e)
        return res.status(500).json({
            sucess : false,
            message : "Something went wrong while deleting sub ssection"
        })
    }
}

