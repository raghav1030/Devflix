import React, { useState } from 'react'
import HighlightText from '../../common/HighlightText'
import {HomePageExplore} from '../../../data/homepage-explore'
import CourseCard from './CourseCard'

const tabName = [
    'Free',
    'New to coding',
    'Most popular',
    'Skill paths',
    'Career Paths',

]

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabName[0])
    const [courses, setCourses] = useState(HomePageExplore[0].courses)
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses.heading)

    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((course) => course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }




  return (
    <div>
        <div className='text-4xl font-[500px] text-center  '>
            Unlock the
            <HighlightText text={'Power of Code '} ></HighlightText> 
        </div>

        <p className='text-center text-richblack-300 text-lg font-[250px] mt-3 ' >
            Learn to build anything you can imagine
        </p>

        <div className='flex rounded-full bg-richblack-800 border-richblack-100 gap-1 px-1 py-1 mb-5 mt-5 '>
            {
                tabName.map((element, index) => {
                    return <div className={`text-[16px] flex items-center gap-2    bg-richblack-800 transition-all duration-100 cursor-pointer px-7 py-2 hover:bg-richblack-900 hover:text-richblack-5 rounded-full ${currentTab === element ? 'bg-richblack-900 text-richblack-5 font-[200px] ' : 'text-richblack-200'} `}
                    key={index}
                    onClick={() => setMyCards(element)}
                    >
                        {element}
                    </div>
                })
            }
        </div>

        {/* Course Card */}

        <div className='absolute flex gap-10 justify-between w-full' >
            {
                courses.map((element, index) => {
                    return(
                        <CourseCard key={index} cardData={element} currentCard={currentCard} setCurrentCard={setCurrentCard} ></CourseCard>
                    )
                })
            }
        </div>

    </div>
  )
}

export default ExploreMore