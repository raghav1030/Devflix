import React from 'react';
import HighlightText from '../components/common/HighlightText'
import { FaArrowRight } from 'react-icons/fa';
import {NavLink} from 'react-router-dom';
import CTAbutton from '../components/common/CTAbutton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import ReviewSlider from '../components/core/HomePage/ReviewSlider';


const Home = () => {
return (
    <div>
        {/* Section 1 */}
        <div className='relative mx-auto flex flex-col text-white justify-center max-w-maxContent items-center w-11/12 gap-6   '>
            <NavLink to={'signup'}>

                <button className='group mx-auto'>
                <div className='flex gap-[5px] mt-16 mx-auto justify-center items-center font-bold bg-richblue-800 text-richblack-300 transition-all duration-100 hover:scale-95  p-[5px] rounded-[500px] shadow-custom group-hover:bg-richblack-900 ease-linear'>
                    <p>Become an Instructor </p> <FaArrowRight></FaArrowRight>
                </div>
                </button>

            </NavLink>

            <div className='flex space-x-2 text-4xl mx-auto max-w-fit text-center'>
                <p> Empower Your Future With </p>  <HighlightText text={'Coding Skills'}/>
            </div>

            <div className='max-w-fit w-[80%]  text-richblack-200 text-lg text-center '>
                <p>With our online codung courses, you can learn at your own space, from anywhere in this world, and get access to a wealth of resouces, including hands-on projects, quizzes and personalised feedback from Instructor</p>
            </div>

            <div className='flex gap-7 mt-6'>
                <CTAbutton active={true} linkTo={'/signup'} >Learn More</CTAbutton>

                <CTAbutton active={false} linkTo={'/login'} >Book a Demo</CTAbutton>
            </div>

            <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <div className='lg:w-[1035px] relative bg-white   '>
                    <div className='lg:w-[1035px]  -translate-y-[15px] -translate-x-[15px] '>
                        <video src={Banner} type='video/mp4' loop muted autoPlay></video>
                    </div>
                </div>
            </div>

            <div className='lg:w-[1035px]' > 
                <CodeBlocks 
                position={'lg:flex'}
                heading={
                    <div>
                        Unlock Your 
                        <HighlightText text={'Coding Potential'}/>
                        with our online courses
                    </div>
                }
                subHeading={'Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you.'}
                
                CTAbtn1={
                    {
                        text: "Try it yourself",
                        linkTo: '/signup',
                        active : true
                    }
                }

                CTAbtn2={
                    {
                        text: "Learn More",
                        linkTo: '/login',
                        active : false
                    }
                }

                codeBlock={`<!DOCTYPE html> \n <html> \n <head> \n <title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <ahref="/">Header</a> </h1> \n <nav> \n <a href="one/">One</a> \n <a href="two/">Two</a> \n <a href="three/">Three</a> \n </nav>`}

                codeColor={'text-[#E7BC5B]'}

                backgroundGradient={''}
                />
            </div>

            <div className='lg:w-[1035px] lg:h-fit mx-auto -mt-4  ' > 
                <CodeBlocks 
                position={'lg:flex-row-reverse'}
                heading={
                    <div>
                        Start
                        <HighlightText text={'Coding Potential'}/>
                        coding in seconds
                    </div>
                }
                subHeading={`Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.`}
                
                CTAbtn1={
                    {
                        text: "Continue Lessons",
                        linkTo: '/signup',
                        active : true
                    }
                }

                CTAbtn2={
                    {
                        text: "Learn More",
                        linkTo: '/login',
                        active : false
                    }
                }

                codeBlock={`<!DOCTYPE html> \n <html> \n <head> \n <title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n </head> \n <body> \n <h1> <ahref="/">Header</a> </h1> \n <nav> \n <a href="one/">One</a> \n <a href="two/">Two</a> \n <a href="three/">Three</a> \n </nav>`}

                codeColor={'text-[#E7BC5B]'}

                backgroundGradient={''}
                />
            </div>

            
                <ExploreMore></ExploreMore>
        </div>
        {/* Section 2 */}

        <div className="bg-pure-greys-5 text-richblack-700">
        <div className="homepage_bg h-[320px]">
          {/* Explore Full Catagory Section */}
          <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8">
            <div className="lg:h-[150px]"></div>
            <div className="flex flex-row gap-7 text-white lg:mt-8">
              <CTAbutton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-2">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAbutton>
              <CTAbutton active={false} linkto={"/login"}>
                Learn More
              </CTAbutton>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 ">
          {/* Job that is in Demand - Section 1 */}
          <div className="mb-10 mt-[-100px] flex flex-col justify-between gap-7 lg:mt-20 lg:flex-row lg:gap-0">
            <div className="text-4xl font-semibold lg:w-[45%] ">
              Get the skills you need for a{" "}
              <HighlightText text={"job that is in demand."} />
            </div>
            <div className="flex flex-col items-start gap-10 lg:w-[40%]">
              <div className=" text-lg ">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAbutton active={true} linkto={"/signup"}>
                <div className="">Learn More</div>
              </CTAbutton>
            </div>
          </div>

          {/* Timeline Section - Section 2 */}
          <TimelineSection />

          {/* Learning Language Section - Section 3 */}
          <LearningLanguageSection />
        </div>
      </div>
    
        {/* Section 3 */}
        
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        {/* Become a instructor section */}
        <InstructorSection />

        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />
      </div>

        

        {/* Section 4 */}
        <Footer/>
        </div>
    )
}

export default Home