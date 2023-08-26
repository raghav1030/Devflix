import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import  CountryCode from '../../data/countryCode.json'
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
        // <form onSubmit={handleSubmit(submitContactForm)} action='submit' > 
        //     <div className='flex flex-col gap-3  ' >
        //         {/* FirstName */}

        //         <div className='flex gap-5 w-full  '>
        //             <label className='flex flex-col gap-2 w-full ' >
        //                 <p className='text-richblack-25 ' >First Name</p>

        //                 <input type="text" placeholder='Enter First Name' name='firstName' {...register('firstName', {required: true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
        //                 />

        //                 {
        //                     errors.firstName && (
        //                         <span>
        //                             Please enter your First Name
        //                         </span>
        //                     )
        //                 }
        //             </label>

        //             <label className='flex flex-col gap-2 w-full ' >
        //                 <p className='text-richblack-25 ' > Last Name</p>

        //                 <input type="text" placeholder='Enter Last Name' name='lastName' {...register('lastName')} className="lg:w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

        //             </label>

        //         </div>

        //         <div>
        //             <label className='flex flex-col gap-2 ' >
                        
        //                 <p className='text-richblack-25' >Email Address</p>

        //                 <input type="text" placeholder='Enter Your Email Address' name='email' id='email' {...register('email' , {required : true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

        //                 {
        //                     errors.email && (<span>
        //                         Please Enter Your Email Address
        //                     </span>)
        //                 }
        //             </label>
        //         </div>

        //         <div>
        //             <label className='flex flex-col gap-2 ' >
        //                 <p className='text-richblack-25'>
        //                 Contact Number
        //                 </p>

        //                 <div className='flex gap-3 '>


        //                 <select name="countryCode" id="countryCode" className="w-[20%]  rounded-[0.5rem] bg-richblack-800  text-richblack-5" defaultValue="India +91" {...register('countryCode')}>
        //                     {countryCode.map((data, index) => (
        //                         <option value={data.code} key={index} className='text-richblack-100'>
        //                             <div className='flex gap-5 ' >
        //                             <span>{data.code}</span> <span>{data.country}</span>
        //                             </div>
        //                         </option>
        //                     ))}
        //                 </select>

        //                 <input type="tel" placeholder='Enter Your Contact Number' id='contactNumber' name='contactNumber' {...register('countryCode' , {required:true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" {...register("contactNumber" ,
        //                 {
        //                 required : {value:true , message : "Please Enter Phone Number" },
        //                 maxLength : {value:10, message:"Invalid Contact Number"}
        //                 }
        //                 )} />


        //                 </div>

        //                 {
        //                     ( errors.contactNumber) && (<span>
        //                         Please Enter Your Contact Number
        //                     </span>)
        //                 }
        //             </label>
        //         </div>

        //         <div>
        //             <label className='flex flex-col gap-2 ' >
                        
        //                 <p className='text-richblack-25' >Message </p>

        //                 <textarea  cols='30' rows='7' placeholder='Enter Your Message' name='message' id='message' {...register('message' , {required : true})} className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5" />

        //                 {
        //                     errors.message && (<span>
        //                         Please Enter Your Message
        //                     </span>)
        //                 }
        //             </label>
        //         </div>

        //             <button type='submit' className=' bg-yellow-50 font-semiBold text-black text-xl  w-full rounded-md h-11 ' >Send Message</button>

        //     </div>
        // </form>

        <form
      className="flex flex-col gap-7 "
      onSubmit={handleSubmit(submitContactForm)}
    >
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="firstname" className="lable-style">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Enter first name"
            className="form-style"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="-mt-1 text-[12px] text-yellow-100">
              Please enter your name.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 lg:w-[48%]">
          <label htmlFor="lastname" className="lable-style">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            placeholder="Enter last name"
            className="form-style"
            {...register("lastname")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="lable-style">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter email address"
          className="form-style"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Email address.
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phonenumber" className="lable-style">
          Phone Number
        </label>

        <div className="flex gap-5">
          <div className="flex w-[81px] flex-col gap-2">
            <select
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Enter first name"
              className="form-style"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code} className=''>
                    {ele.code} -{ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[calc(100%-90px)] flex-col gap-2">
            <input
              type="tel"
              name="phonenumber"
              id="phonenumber"
              placeholder="12345 67890"
              className="form-style"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="lable-style">
          Message
        </label>
        <textarea
          name="message"
          id="message"
          cols="30"
          rows="7"
          placeholder="Enter your message here"
          className="form-style"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="-mt-1 text-[12px] text-yellow-100">
            Please enter your Message.
          </span>
        )}
      </div>

      <button
        disabled={loading}
        type="submit"
        className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
         }  disabled:bg-richblack-500 sm:text-[16px] `}
      >
        Send Message
      </button>
    </form>
    )
}

export default ContactUsForm