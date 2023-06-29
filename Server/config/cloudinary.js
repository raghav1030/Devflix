const cloudinary = require('cloudinary').v2

require('dotenv').config()

exports.cloudinaryConnect = () => {
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
            api_key : process.env.CLOUDINARY_API_KEY,
            api_secret : process.env.CLOUDINARY_API_SECRET,
        })
        console.log("Cloudinary connected successfully")
    } catch (e) {
        console.error(e)
        console.log("Something went wrong while connecting the cloudinary")
    }
}