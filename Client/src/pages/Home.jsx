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

            <div className='mt-14 mx-auto relative shadow-blue-200'>
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

            <div>
                <ExploreMore></ExploreMore>
            </div>
        </div>
        {/* Section 2 */}

        <div className='bg-pure-greys-5 text-richblack-700'>

            <div className='homePage_bg h-[310px] ' >

                <div className='max-w-maxContent w-11/12 flex-col justify-center  gap-6 mx-auto text-white pt-[200px] ' >
                    <div className='flex gap-7 justify-center ' >
                        <CTAbutton active={true} linkTo={'/signup'} >
                            <div className='flex gap-2 items-center justify-center'>
                                <div>
                                Explore Full Catalog
                                </div>
                                <FaArrowRight/>
                            </div>
                        </CTAbutton>

                        <CTAbutton active={false} linkTo={'/signup'} >
                            <div>
                                Learn More
                            </div>
                        </CTAbutton>
                    </div>
                </div>

            </div>

            <div className='max-w-maxContent w-11/12 flex flex-col  justify-between items-center pt-16 mb-6  mx-auto  '>

                <div className='flex items-start justify-center gap-12 '>
                    <div className='text-4xl font-semibold w-[45%]  '>
                        Get the skills you need for a <HighlightText text={'job that is in demand'} />
                    </div>

                    <div className='flex flex-col gap-10 w-[40%] items-start   '>
                        <div className='text-[16px] font-semiBold text-richblack-800 '>
                            The modern StudyNotion dictates its own terms. Today, to be a competetive specialist requires more than professional skills
                        </div>
                        
                        <CTAbutton active={true} linkTo={'/signup'} >Learn More</CTAbutton>
                        
                    </div>
                </div>

                
            <TimelineSection></TimelineSection>
            <LearningLanguageSection></LearningLanguageSection>
            </div>

        </div>

        {/* Section 3 */}
        
        <div className='w-11/12 max-w-maxContent flex flex-col mx-auto items-center bg-richblack-900 text-white gap-8 ' >

            <InstructorSection></InstructorSection>

            


            <div>

            </div>
        </div>

        {/* Section 4 */}
        <Footer/>
        </div>
    )
}

export default Home