import React, { useState} from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs'
import {useSelector} from 'react-redux'
import { useDispatch } from 'react-redux'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authOperations'

const UpdatePassword = () => {
    const {loading} = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [formData, setFormData] = useState({
        password: "", confirmPassword: ""
    })

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const {password , confirmPassword} = formData

    const token = location.pathname.split('/').at(-1)


    const handleChange = (e) => {
        setFormData(prev => (
            {...prev, [e.target.name] : e.target.value}
        ))
    }

    function handleOnSubmit(e){
        
        e.preventDefault()
        dispatch(resetPassword(password , confirmPassword, token, navigate ))
    }
    
return (

    <div className='w-screen  flex justify-center items-center inset-0 absolute ' >
        {
            loading ?
            <div>
                Loading...
            </div> : 

            <div className='flex flex-col lg:w-[444px] gap-2 ' >
                <h1 className='text-3xl  ' >Choose New Password</h1>
                <p className='text-sm text-richblack-300  ' >Almost done. Enter your new password and you're all set.</p>

                <form action="submit" onSubmit={handleOnSubmit} className='space-y-2 flex flex-col justify-start gap-2' >

                    <label className='flex flex-col gap-1 ' >
                    <p className=' text-richblack-5 ' >New Password <sup className='text-pink-100 ml-1'>*</sup> </p>

                    <div className='flex justify-end items-center gap-1 ' >

                        <input type={showPassword ? 'text' : 'password'}
                        required
                        name='password'
                        value={password}
                        onChange={handleChange} 
                        className='  bg-richblack-700 rounded-md p-2 h-11 w-full text-1xl  relative   ' />
                        

                        <span  className='flex justify-end absolute z-20 -translate-x-4 ' onClick={() => setShowPassword(prev => !prev )} >
                            {
                                showPassword ? <AiFillEye fontSize={24} ></AiFillEye> : <AiFillEyeInvisible fontSize={24}></AiFillEyeInvisible>
                            }
                        </span>
                    </div>
                    </label>


                    <label className=' ' >
                    <p className=' text-richblack-5 ' >Confirm Password <sup className='text-pink-100 ml-1'>*</sup> </p>
                    <div className='flex justify-end items-center gap-1  ' >

                        <input type={showConfirmPassword ? 'text' : 'password'}
                        required
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleChange}
                        className='  bg-richblack-700 rounded-md p-2 h-11 w-full text-1xl  relative   ' />
                        

                        <span className='flex justify-end absolute z-20 -translate-x-4 ' onClick={() => setShowConfirmPassword(prev => !prev)} >
                            {
                                showConfirmPassword ? <AiFillEye className=' '  fontSize={24} ></AiFillEye> : <AiFillEyeInvisible fontSize={24}></AiFillEyeInvisible>
                            }
                        </span>
                    </div>
                    </label>

                    <button className='bg-yellow-50 text-black text-md font-semibold w-full rounded-md h-9  ' >
                        Update Password
                    </button>

                    <div className='text-richblue-200 text-sm flex gap-2' >
                    <NavLink to='/login' className={'flex gap-2 items-center justify-center ' } >
                        <BsArrowLeft></BsArrowLeft> <p> Back to Login </p>
                    </NavLink>
                </div>

                </form>
            </div>
        }
    </div>
)
}

export default UpdatePassword