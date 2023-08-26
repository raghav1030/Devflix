import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authOperations";
import { BsArrowLeft } from "react-icons/bs";

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [mailSent, setEmailSent] = useState(false);

  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  };
  return (
    <div className=" w-screen flex items-center justify-center absolute inset-0  ">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className=" flex flex-col lg:w-[444px] h-max mx-auto gap-3   ">
          <h1 className="text-3xl ">
            {mailSent ? "Check Your Email" : "Reset your password"}
          </h1>

          <p className="text-richBlack-600  text-sm  ">
            {mailSent
              ? `We have sent the reset email to ${(<span> ${email} </span>)}`
              : "Have no fear. We'll email you the instructions to reset your password. If you don't have access to your email, we can try account recovery. "}
          </p>

          <form
            action="submit"
            onSubmit={handleOnSubmit}
            className=" w-full flex flex-col justify-center items-start gap-4 "
          >
            {!mailSent && (
              <label className="w-full flex flex-col justify-center items-start gap-3  ">
                <p className="text-sm  ">Email Address</p>
                <input
                  type="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="w-full px-4 bg-richblack-800 border-b border-richblack-300 text-md text-richblack-5 h-11 rounded-lg "
                />
              </label>
            )}

            {
              <button className="w-full bg-yellow-50 text-richblack-900 h-10 font-semibold rounded-lg ">
                {!mailSent ? "Reset Password" : "Resend Email"}
              </button>
            }
          </form>

          <div className="text-richblue-200 text-sm flex gap-2">
            <NavLink
              to="/login"
              className={"flex gap-2 items-center justify-center "}
            >
              <BsArrowLeft></BsArrowLeft> <p> Back to Login </p>
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
