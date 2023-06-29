import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import  countryCode from '../../data/countryCode.json'
import {contactUsFormSubmit} from '../../services/operations/contactUsOperations'

const ContactUsForm = () => {


    const [loading, setLoading] = useState(false)


    const {
        register,
        handleSubmit,
        reset, 
        formState: {errors, isSubmitSuccessful}
    } = useForm()


    const submitContactForm = async(data) => {
        console.log("Calling api for data", data)
        
        contactUsFormSubmit(data)

        // setLoading(true)

        // try {
        //     // const response = await apiConnector('post' , contactusEndpoint.CONTACT_US_API, data)
        //     const response = {success : "OK"}
        //     console.log("Printing response" , response)
        // } catch (e) {
        //     console.error(e)
        // }

        // setLoading(false)  
        // console.log("Form Submitted")
    }


    useEffect(()=> {
        if(isSubmitSuccessful){
            reset({
                email : "",
                firstName : "",
                lastName : "",
                message : "",
                contactNumber : "",
                countryCode : "",
            } , [isSubmitSuccessful, reset])
        }
    })



    return (
        <form onSubmit={handleSubmit(submitContactForm)} action='submit' > 
            <div className='flex flex-col gap-3  ' >
                {/* FirstName */}

                <div className='flex gap-5 w-full  '>
                    <label className='flex flex-col gap-2 w-full ' >
                        <p className='text-richblack-25 ' >First Name</p>

                        <input type="text" placeholder='Enter First Name' name='firstName' {...register('firstName', {required: true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                        />

                        {
                            errors.firstName && (
                                <span>
                                    Please enter your First Name
                                </span>
                            )
                        }
                    </label>

                    <label className='flex flex-col gap-2 w-full ' >
                        <p className='text-richblack-25 ' > Last Name</p>

                        <input type="text" placeholder='Enter Last Name' name='lastName' {...register('lastName')} className="lg:w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

                    </label>

                </div>

                <div>
                    <label className='flex flex-col gap-2 ' >
                        
                        <p className='text-richblack-25' >Email Address</p>

                        <input type="text" placeholder='Enter Your Email Address' name='email' id='email' {...register('email' , {required : true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

                        {
                            errors.email && (<span>
                                Please Enter Your Email Address
                            </span>)
                        }
                    </label>
                </div>

                <div>
                    <label className='flex flex-col gap-2 ' >
                        <p className='text-richblack-25'>
                        Contact Number
                        </p>

                        <div className='flex gap-3 '>


                        <select name="countryCode" id="countryCode" className="w-[20%]  rounded-[0.5rem] bg-richblack-800  text-richblack-5" defaultValue="India +91" {...register('countryCode')}>
                            {countryCode.map((data, index) => (
                                <option value={data.code} key={index} className='text-richblack-100'>
                                    <div className='flex gap-5 ' >
                                    <span>{data.code}</span> <span>{data.country}</span>
                                    </div>
                                </option>
                            ))}
                        </select>

                        <input type="tel" placeholder='Enter Your Contact Number' id='contactNumber' name='contactNumber' {...register('countryCode' , {required:true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" {...register("contactNumber" ,
                        {
                        required : {value:true , message : "Please Enter Phone Number" },
                        maxLength : {value:10, message:"Invalid Contact Number"}
                        }
                        )} />


                        </div>

                        {
                            ( errors.contactNumber) && (<span>
                                Please Enter Your Contact Number
                            </span>)
                        }
                    </label>
                </div>

                <div>
                    <label className='flex flex-col gap-2 ' >
                        
                        <p className='text-richblack-25' >Message </p>

                        <textarea  cols='30' rows='7' placeholder='Enter Your Message' name='message' id='message' {...register('message' , {required : true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

                        {
                            errors.message && (<span>
                                Please Enter Your Message
                            </span>)
                        }
                    </label>
                </div>

                    <button type='submit' className=' bg-yellow-50 font-semiBold text-black text-xl  w-full rounded-md h-11 ' >Send Message</button>

            </div>
        </form>
    )
}

export default ContactUsForm