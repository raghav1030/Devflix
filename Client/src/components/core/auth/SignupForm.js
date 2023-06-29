import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'
import { setSignupData } from '../../../redux/slices/authSlice'
import { useDispatch } from 'react-redux'
import { ACCOUNT_TYPE } from '../../../utils/constants'
import Tab from '../../common/Tab'
import { sendOtp } from '../../../services/operations/authOperations'
import { useNavigate } from 'react-router-dom'



const SignupForm = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData , setFormData] = useState({
        firstName : "",
        lastName : "",
        password : "",
        confirmPassword : "",
        email : "",
    })

    const {firstName, lastName, password, confirmPassword, email} = formData

    const tabData = [
        {
            id : 1,
            tabName : 'Student',
            type : ACCOUNT_TYPE.STUDENT
        },
        {
            id : 2,
            tabName : "Instructor",
            type : ACCOUNT_TYPE.INSTRUCTOR
        }
    ]

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleOnChange = (e) => {
        setFormData((prev) => ({
            ...prev , [e.target.name] : e.target.value
        }) 
            
        )
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword){
            return toast.error('Password does not match')
        }

        const signupData = {
            ...formData, accountType
        }

        console.log(formData)
        console.log(signupData)
        dispatch(setSignupData(signupData))


        dispatch(sendOtp(formData.email, navigate))

        // Reset the data as data has been validated
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })

        setAccountType(ACCOUNT_TYPE.STUDENT)
    }

    

return (
    <div>
        <Tab accountType={accountType} setAccountType={setAccountType} tabData={tabData} ></Tab>
        <form action="submit" onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
        <div className="flex gap-x-4">
            <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
                required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                placeholder="Enter first name"
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            </label>
            <label>
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
                required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                placeholder="Enter last name"
                style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            </label>
        </div>

        <label className="w-full">
        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            style={{
            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
        />
        </label>   

        <div className="flex gap-x-4">
        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
            required
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handleOnChange}
            placeholder="Enter Password"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                >
                {showPassword ? (
                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
            </span>
        </label> 

        <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
            Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
            required
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            placeholder="Confirm Password"
            style={{
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5"
            />
            <span
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
            {showConfirmPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
            </span>
        </label>
    </div>
        <button
            type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-[600px]  text-richblack-900"
            >
            Create Account
        </button>
    </form>
</div>

    
)
}

export default SignupForm