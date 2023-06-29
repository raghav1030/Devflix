import React from 'react'
import ContactUsForm from '../../common/ContactUsForm'

const ContactFormSection = () => {
    return (
        <div className='flex flex-col gap-5 justify-center items-center mt-24 ' >
            <div className='flex flex-col gap-3 items-center justify-center  ' >

            <h1 className='text-richblack-5 text-center text-4xl font-medium mx-auto  ' >Get in Touch</h1>

            <p  className='text-richblack-400 text-center leading-[1rem] font-medium mx-auto ' >
                We'd love to hear from you. Please fill out this form.
            </p>
            </div  >

            

            <ContactUsForm/>
            
        </div>
    )
}

export default ContactFormSection