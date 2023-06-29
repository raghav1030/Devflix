const nodemalier = require('nodemailer')

const mailSender = async (email, title, body) =>{
    try{
        let transporter = nodemalier.createTransport({
            host : process.env.MAIL_HOST,
            auth : {
                user : process.env.MAIL_USER,
                pass : process.env.MAIL_PASSWORD,
            }
        })

        let info = await transporter.sendMail({
            from : "weBuildcomm",
            to : `${email}`,
            subject : `${title}`,
            html : `${body}`
        })

        console.log("Mail Sent Successfully");
        return info

    } catch(e) { 
        console.error(e)
        console.log("error occured in sending email")
    }
}

module.exports = mailSender