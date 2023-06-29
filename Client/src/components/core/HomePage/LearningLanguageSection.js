import React from 'react'
import HighlightText from '../../common/HighlightText'
import KnowYourProgress from '../../../assets/Images/Know_your_progress.png'
import  CompareWithOthers from '../../../assets/Images/Compare_with_others.png'
import PlanYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAbutton from '../../common/CTAbutton'

const LearningLanguageSection = () => {
  return (
    <div className='mt-[140px] mb-32 ' >
        <div className='flex flex-col gap-5 items-center justify-center '>

            <div className='text-4xl font-[500px] text-center '>
                Your Swiss Knife for <HighlightText text={'learning any language'}></HighlightText>
            </div>

            <div className="text-center text-richblack-600 mx-auto text-base font-medium w-[75%]  ">
                Using Spin making learning multiple languages easy, with 20+ languages, realistic voice-over, progress tracking, custom schedule and more 
            </div>

            <div className='flex flex-row justify-center items-center mt-5 mx-auto  ' >
                <img className='object-contain -mr-32 ' loading='lazy' src={KnowYourProgress} alt="Know Your Progress" />
                <img className='object-contain' loading='lazy' src={CompareWithOthers} alt="Compare with others" />
                <img className='object-contain -ml-32' loading='lazy' src={PlanYourLessons} alt="Plan your lessons" />
            </div>

            <div className='w-fit ' >
                <CTAbutton active={true} linkTo={'/signup'}> Learn More </CTAbutton>
            </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection