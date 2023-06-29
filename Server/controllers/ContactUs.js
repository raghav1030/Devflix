const ContactUs = require('../models/ContactUs')
const mailSender = require('../utils/mailSender')


exports.contactUs = async (req, res) => {
    const {firstName, lastName, email, contactNumber } = req.body

    if(!firstName || !lastName || !email || !contactNumber){
        return res.status(403).json({
            success : false,
            message : "Fill all the credentials"
        })
    }

    const createContactUs = await ContactUs.create({firstName, lastName, email, contactNumber})

    mailSender(email, `Request Successful for Contacting weBuildcomm` , `<h1>weBuildcomm</h1> <p> This is a callback mail regarding your request for contacting weBuildcomm</p>
    <div>
    <h3>This is a copy of your response</h3>
    Name : ${firstName + lastName}
    Email Address : ${email}
    Contact Number : ${contactNumber}
    </div>
    
    <h4>Our executives will contact you soon !!</h4>
    `)

    mailSender("it21064@glbitm.ac.in" , `Informing about the contact request`, `<h1>weBuildcomm</h1> 
    <div><p>This is to inform you that ${firstName + lastName} has requested for a callback. Kindly check this out. </p>
    <h3>Student Credentials</h3>
    <p>Name : ${firstName + lastName}
    Email Address : ${email}
    Contact Number : ${contactNumber}</p>
    </div>`)


}
