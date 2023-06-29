const mongoose = require('mongoose')
require('dotenv').config()

exports.dbConnect = () => {
    try{
        mongoose.connect(process.env.DATABASE_URL, {
            useUnifiedTopology : true,
            useNewUrlParser : true
        })

        console.log('Connection with Database Successful')

    } catch(e){
        console.error(e)
        console.log("error occured in connecting to the Database")
        process.exit(1)
    }
}