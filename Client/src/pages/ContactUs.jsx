import React from 'react'
import { BsChatLeftTextFill, BsGlobeCentralSouthAsia } from 'react-icons/bs'
import ContactUsForm from '../components/common/ContactUsForm'
import Footer from '../components/common/Footer'
import { FiPhoneCall } from 'react-icons/fi'


const ContactUs = () => {
return (
    <div className='w-screen flex flex-col mx-auto mt-16' >
        <div className='flex w-11/12 gap-32 max-w-maxContent mx-auto mb-36 ' >

            <div className='flex flex-col justify-center items-start bg-richblack-800 w-[40%] p-4 h-fit gap-12 rounded-md tracking-wide' >
                <div className='flex flex-col items-start justify-center gap-2 w-fit' >
                    <h3 className='flex  text-lg gap-3 items-center text-richblack-5' >
                        <BsChatLeftTextFill></BsChatLeftTextFill>
                        Chat with us
                    </h3>

                    <p className='text-richblack-200 text-md leading-[1rem] ' >Our frindly team is here to help</p>
                    <a className='text-richblack-200 text-md leading-[1rem] ' href="mailto:info@devcomm.com">info@devcomm.com</a>

                </div>

                <div className='flex flex-col items-start justify-center gap-2 w-fit'>
                    <h3 className='flex  text-lg gap-3 items-center text-richblack-5'>
                        <BsGlobeCentralSouthAsia></BsGlobeCentralSouthAsia>
                        Visit us
                    </h3>

                    <p className='text-richblack-200 text-md leading-[1rem] '>Visit our official HQ at</p>
                    <p className='text-richblack-200 text-md leading-[1rem] '>Devcomm Pvt Ltd, NCR</p>
                    <p className='text-richblack-200 text-md leading-[1rem] '>Delhi-110045</p>

                </div>

                <div className='flex flex-col items-start justify-center gap-2 w-fit'>
                    <h3 className='flex  text-lg gap-3 items-center text-richblack-5'>
                        <FiPhoneCall></FiPhoneCall>
                        Call us
                    </h3>

                    <p className='text-richblack-200 text-md leading-[1rem] '>Mon - Fri : 8am to 5pm</p>
                    <p className='text-richblack-200 text-md leading-[1rem] '>+123 456 789</p>
                </div>


                
            </div>
                
            <div className='flex flex-col items-start justify-center gap-4 w-fit mx-auto'>
                <div>

                <h2 className='text-4xl text-richblack-5  ' >Got a Idea ? We've got the skills.</h2>
                <h2 className='text-4xl text-richblack-5  ' >Let's Team up</h2>
                </div>
                    
                <p className='text-richblack-100 text-md leading-[1rem]'>Tell us more about you and what you've got in mind.</p>
                
                <div className='my-6 ' >

                <ContactUsForm></ContactUsForm>
                </div>
            </div>

        </div>
            <Footer></Footer>
    </div>
)
}

export default ContactUs