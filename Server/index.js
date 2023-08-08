const express = require('express')
const app = express()

const {cloudinaryConnect} = require('./config/cloudinary')
const {dbConnect} = require('./config/databse')
const UserRoutes = require('./routes/User')
const PayementsRoutes = require('./routes/Payments')
const ProfileRoutes = require('./routes/Profile')
const CourseRoutes = require('./routes/Course')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const fileUpload = require('express-fileupload')
require('dotenv').config()

const PORT = process.env.PORT || 4000

app.use(express.json())
app.use(cookieParser())

dbConnect()
cloudinaryConnect()

app.use(
    cors({
        origin : "http://localhost:3000",
        credentials : true,
    })
)

app.use(
    fileUpload({
        useTempFiles : true,
        tempFileDir : '/tmp'
    })
)

app.use('/api/v1/auth', UserRoutes) 
app.use('/api/v1/course', CourseRoutes) 
app.use('/api/v1/payment', PayementsRoutes) 
app.use('/api/v1/profile', ProfileRoutes) 

app.get('/' , (req, res) => {
    req.status(200).json({
        success : true,
        message : "Your App is Up and Running"
    })
})

app.listen(PORT , () => {
    console.log(`Server Initialised at Port ${PORT}` )
})