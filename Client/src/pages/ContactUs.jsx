import React from "react";
import { BsChatLeftTextFill, BsGlobeCentralSouthAsia } from "react-icons/bs";
import ContactUsForm from "../components/common/ContactUsForm";
import Footer from "../components/common/Footer";
import { FiPhoneCall } from "react-icons/fi";
import * as Icon1 from "react-icons/bi";
import * as Icon3 from "react-icons/hi2";
import * as Icon2 from "react-icons/io5";

const ContactUs = () => {
  const contactDetails = [
    {
      icon: "HiChatBubbleLeftRight",
      heading: "Chat on us",
      description: "Our friendly team is here to help.",
      details: "info@Devflix.com",
    },
    {
      icon: "BiWorld",
      heading: "Visit us",
      description: "Come and say hello at our office HQ.",
      details:
        "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
    },
    {
      icon: "IoCall",
      heading: "Call us",
      description: "Mon - Fri From 8am to 5pm",
      details: "+123 456 7869",
    },
  ];

  return (
    <div className="w-screen flex flex-col mx-auto mt-16">
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row ">
        {/* <div className='flex flex-col justify-center items-start bg-richblack-800 lg:w-[60%] p-4 h-fit gap-12 rounded-md tracking-wide' >
                <div className='flex flex-col items-start justify-center gap-2 lg:w-fit' >
                    <h3 className='flex  text-lg gap-3 items-center text-richblack-5' >
                        <BsChatLeftTextFill></BsChatLeftTextFill>
                        Chat with us
                    </h3>

                    <p className='text-richblack-200 text-md leading-[1rem] ' >Our frindly team is here to help</p>
                    <a className='text-richblack-200 text-md leading-[1rem] ' href="mailto:info@Devflix.com">info@Devflix.com</a>

                </div>

                <div className='flex flex-col items-start justify-center gap-2 w-fit'>
                    <h3 className='flex  text-lg gap-3 items-center text-richblack-5'>
                        <BsGlobeCentralSouthAsia></BsGlobeCentralSouthAsia>
                        Visit us
                    </h3>

                    <p className='text-richblack-200 text-md leading-[1rem] '>Visit our official HQ at</p>
                    <p className='text-richblack-200 text-md leading-[1rem] '>Devflix Pvt Ltd, NCR</p>
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


                
            </div> */}
        <div className="lg:w-[40%]">
          <div className="flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6">
            {contactDetails.map((ele, i) => {
              let Icon = Icon1[ele.icon] || Icon2[ele.icon] || Icon3[ele.icon];
              return (
                <div
                  className="flex flex-col gap-[2px] p-3 text-sm text-richblack-200"
                  key={i}
                >
                  <div className="flex flex-row items-center gap-3">
                    <Icon size={25} />
                    <h1 className="text-lg font-semibold text-richblack-5">
                      {ele?.heading}
                    </h1>
                  </div>
                  <p className="font-medium">{ele?.description}</p>
                  <p className="font-semibold">{ele?.details}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col mb-16">
          <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
            Got a Idea? We&apos;ve got the skills. Let&apos;s team up
          </h1>
          <p className="">
            Tell us more about yourself and what you&apos;re got in mind.
          </p>

          <div className="mt-7">
            <ContactUsForm />
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
