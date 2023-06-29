import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux'
import { sendOtp, signUp } from '../services/operations/authOperations'
import { NavLink, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

const VerifyOtp = () => {

    const {loading, signupData} = useSelector((state) => (state.auth))

    const {firstName, lastName, email, password, accountType, confirmPassword} = signupData

    const navigate = useNavigate()

    const [otp , setOtp] = useState('')

    const dispatch = useDispatch()
    useEffect(() => {
        console.log(signupData)
        if(!signupData){
            navigate('/signup')
        }
    } ,[] )

    


    function handleOnSubmit(e){
        e.preventDefault()

        dispatch(signUp(firstName, lastName, email, password, confirmPassword, accountType, otp, navigate))
    }


return (
    <div className='w-screen flex justify-center items-center inset-0 absolute  ' >
        {loading ?
            
            (        
                <div className='flex justify-center items-center'>
                    Loading...
                </div>
            ) :
        

            (
                <div className='flex flex-col gap-1' >

                    <h1 className='text-3xl text-richblack-5' >Verify OTP</h1>

                    <p className='text-sm text-richblack-300' >Enter the opt sent to you via email</p>

                    <form action="submit" onSubmit={handleOnSubmit} className='' >

                    <OTPInput
                    name='otp'
                    value={otp}
                    onChange= {setOtp}
                    numInputs={6}
                    renderInput={(props) => <input {...props} className = '  bg-richblack-700 text-richblack-50' /> } 
                    renderSeparator={<span>-</span>}
                    className='w-full'
                    ></OTPInput>

                    <button className='w-full bg-yellow-100 text-black font-2xl text-md rounded-md h-10 ' >
                        Verify
                    </button>
                    </form>


                    <div className='text-richblue-200   text-sm flex gap-2' >
                        <NavLink to='/login' className={'flex gap-2 items-center   justify-center ' } >
                            <BsArrowLeft></BsArrowLeft> <p> Back to Login </p>
                        </NavLink>
                    </div>

                    <button onClick={() => dispatch(sendOtp(signupData.email , navigate))} >
                        Resend it
                    </button>
                </div>
            )
        }
    </div>
)
}

export default VerifyOtp