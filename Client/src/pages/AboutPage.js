import React from 'react'
import HighlightText from '../components/common/HighlightText'
import aboutus1 from '../assets/Images/aboutus1.webp'
import aboutus2 from '../assets/Images/aboutus2.webp'
import aboutus3 from '../assets/Images/aboutus3.webp'
import FoundingStory from '../assets/Images/FoundingStory.png'
import {CgQuote } from 'react-icons/cg'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/common/Footer'

const AboutPage = () => {
  return (
    <div className='w-screen flex flex-col justify-center items-center' >
        {/* Section 1 */}

        <div className='flex flex-col items-center mx-auto max-w-11/12  h-[400px] bg-richblack-800  pt-16 gap-4 ' >

            <div className='  ' >
                <h1 className='flex flex-col justify-center items-center text-4xl font-[500px] ' >Driving Innovation in Online Education for a <HighlightText text={'Brighter Future'} ></HighlightText></h1>
            </div>

            <div className='max-w-fit w-[60%]  text-richblack-200 text-md text-center mx-auto '>
                <p>Devcomm is at the forefront of the driving innovation in online education. We're passionate about creating a brighter future by offering cutting edge courses, leveraging emerging technologies, and nurtuing a vibrant learning community. </p>
            </div>

            <div className='flex justify-center items-center gap-x-3 mt-10 ' >
              <img src={aboutus1} alt="Random img" height={200} width={350} />
              <img src={aboutus2} alt="Random img" height={200} width={350} />
              <img src={aboutus3} alt="Random img" height={200} width={350} />
            </div>

        </div>

        {/* Section 2 */}
        <div className='w-11/12 mt-64 mx-auto flex  flex-col'>

          <span>
            <CgQuote className=' text-4xl translate-x-32 text-richblack-100 translate-y-5 ' /> 
          </span>

          <h1 className='text-richblack-100  font-[600px] text-3xl leading-[45px] mx-auto w-[75%]' >
          We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"} />, <HighlightText text={"expertise"} gradientColors={'from-[#ff512f] to-[#f09819] '} />, and community to create an <HighlightText text={"unparalleled education experience."} gradientColors={'from-[#e65c00] to-[#f9d423] '} />
          </h1>

          <span>
            <CgQuote className=' text-4xl translate-x-[40rem] -translate-y-14 text-richblack-100 ' /> 
          </span>
        </div>

        {/* Section 3 */}
        <section className='max-w-11/12 w-11/12  mt-24 mx-auto flex flex-col items-center justify-center gap-24 text-[18px]  '>

          <div className=' mx-auto justify-center items-center flex   gap-16  ' >

            <div className=' flex flex-col gap-5 lg:w-[600px]  '>
              <h2 className='text-3xl ' >
                <HighlightText text={'Our Founding Story'} gradientColors={'from-[#833ab4] via-[#fd1d1d] to-[#fcb045] '} />
              </h2>

              <p className='text-richblack-100 text-[16px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, obcaecati. Reiciendis impedit quidem rem repellat voluptas quos expedita, sit corrupti sequi accusantium soluta ad unde earum odit cumque esse eaque.
              </p>

              <p className=' text-[16px] text-richblack-100  ' >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsa perferendis, obcaecati optio maxime distinctio modi ab asperiores quidem quis deserunt laudantium quibusdam ex omnis similique at! Adipisci, veniam pariatur!

              </p>
            </div>



            <div className='  lg:w-[600px]    ' >
              <img src={FoundingStory} width={600} alt="Our Founding Story" className='w-fit shadow-xl shadow-pink-900  '  />
            </div>

          </div>

          <div className='  mx-auto justify-center items-start flex gap-16 ' >

            <div className='  flex flex-col gap-5 lg:w-[600px]'>
              <h2 className='text-3xl ' >
                <HighlightText text={'Our Vission'} gradientColors={'from-[#ff512f] to-[#f09819] '} />
              </h2>

              <p className='text-richblack-100 text-[16px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, obcaecati. Reiciendis impedit quidem rem repellat voluptas quos expedita, sit corrupti sequi accusantium soluta ad unde earum odit cumque esse eaque.
              </p>

              <p className=' text-[16px] text-richblack-100  ' >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsa perferendis, obcaecati optio maxime distinctio modi ab asperiores quidem quis deserunt laudantium quibusdam ex omnis similique at! Adipisci, veniam pariatur!

              </p>
            </div>

            <div className=' flex flex-col gap-5  lg:w-[600px] '>
              <h2 className='text-3xl ' >
                <HighlightText text={'Our Mission'} />
              </h2>

              <p className='text-richblack-100 text-[16px]'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, obcaecati. Reiciendis impedit quidem rem repellat voluptas quos expedita, sit corrupti sequi accusantium soluta ad unde earum odit cumque esse eaque.
              </p>

              <p className=' text-[16px] text-richblack-100  ' >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente ipsa perferendis, obcaecati optio maxime distinctio modi ab asperiores quidem quis deserunt laudantium quibusdam ex omnis similique at! Adipisci, veniam pariatur!

              </p>
            </div>

            

          </div>

        </section>
        

        {/* Section 4 */}
        <StatsComponent/>


        {/* Section 5 */}
        <div  className='w-11/12 mx-auto mt-28 ' >
          <LearningGrid/>
        </div>

        {/* Section 6 */}

        <div className='mx-auto max-w-11/12  ' >
          <ContactFormSection/>
        </div>

        {/* Section 7 */}

        <footer className='w-full mt-36' >
          <Footer></Footer>
        </footer>






    </div>
  )
}

export default AboutPage

