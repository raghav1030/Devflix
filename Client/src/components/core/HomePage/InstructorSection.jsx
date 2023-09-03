import React from "react";
import Instructor from "../../../assets/Images/Instructor.png";
import HighlightText from "../../common/HighlightText";
import CTAbutton from "../../common/CTAbutton";
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
  return (
    <div className="mt-12">
      <div className="flex flex-row gap-20 items-center  ">
        <div className="w-[50%] ">
          <img src={Instructor} loading="lazy" alt="Instructor" />
        </div>

        <div className="w-[50%] flex flex-col gap-10 ">
          <div className="text-4xl font-[500px] w-[50%]  ">
            Become an
            <HighlightText text={"Instructor"}></HighlightText>
          </div>

          <p className="font-medium text-[16px] w-[90%] text-richblack-300   ">
            Instructors from around the world teach millions of students on
            Devflix. We Provide the tools and skills to teach what you love.
          </p>

          <div className="w-fit ">
            <CTAbutton active={true} linkTo={"/signup"}>
              <div className="flex gap-2 items-center justify-center ">
                Start Learning Now
                <FaArrowRight></FaArrowRight>
              </div>
            </CTAbutton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSection;
