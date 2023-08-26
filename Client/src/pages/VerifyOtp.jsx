import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import { sendOtp, signUp } from "../services/operations/authOperations";
import { NavLink, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
const VerifyOtp = () => {
  const { loading, signupData } = useSelector((state) => state.auth);

  const { firstName, lastName, email, password, accountType, confirmPassword } =
    signupData;

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(signupData);
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();

    dispatch(
      signUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        accountType,
        otp,
        navigate
      )
    );
  }

  return (
    // <div className='w-screen flex justify-center items-center inset-0 absolute  ' >
    //     {loading ?

    //         (
    //             <div className='flex justify-center items-center'>
    //                 Loading...
    //             </div>
    //         ) :

    //         (
    //             <div className='flex flex-col gap-1' >

    //                 <h1 className='text-3xl text-richblack-5' >Verify OTP</h1>

    //                 <p className='text-sm text-richblack-300' >Enter the opt sent to you via email</p>

    //                 <form action="submit" onSubmit={handleOnSubmit} className='' >

    //                 <OTPInput
    //                 name='otp'
    //                 value={otp}
    //                 onChange= {setOtp}
    //                 numInputs={6}
    //                 renderInput={(props) => <input {...props} className = '  bg-richblack-700 text-richblack-50' /> }
    //                 renderSeparator={<span>-</span>}
    //                 className='w-full'
    //                 ></OTPInput>

    //                 <button className='w-full bg-yellow-100 text-black font-2xl text-md rounded-md h-10 ' >
    //                     Verify
    //                 </button>
    //                 </form>

    //                 <div className='text-richblue-200   text-sm flex gap-2' >
    //                     <NavLink to='/login' className={'flex gap-2 items-center   justify-center ' } >
    //                         <BsArrowLeft></BsArrowLeft> <p> Back to Login </p>
    //                     </NavLink>
    //                 </div>

    //                 <button onClick={() => dispatch(sendOtp(signupData.email , navigate))} >
    //                     Resend it
    //                 </button>
    //             </div>
    //         )
    //     }
    // </div>

    <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
      {loading ? (
        <div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="max-w-[500px] p-4 lg:p-8">
          <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
            Verify Email
          </h1>
          <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
            A verification code has been sent to you. Enter the code below
          </p>
          <form onSubmit={handleOnSubmit}>
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between">
            <NavLink to="/signup">
              <p className="text-richblack-5 flex items-center gap-x-2">
                <BiArrowBack /> Back To Signup
              </p>
            </NavLink>
            <button
              className="flex items-center text-blue-100 gap-x-2"
              onClick={() => dispatch(sendOtp(signupData.email))}
            >
              <RxCountdownTimer />
              Resend it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyOtp;
