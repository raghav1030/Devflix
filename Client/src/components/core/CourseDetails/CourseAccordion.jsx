import React, { useRef, useState } from 'react'
import {MdKeyboardArrowUp , MdComputer} from 'react-icons/md'
import convertSecondsToDuration from '../../../utils/convertSecondsIntoDuration'

const CourseAccordion = ({courseContent}) => {


    
    function sectionDuration(subSections){
        let duration = 0 
        subSections.forEach(subSection => {
            duration += subSection.timeDuration
            duration = Math.ceil(duration)
        });

        const updatedDuration = convertSecondsToDuration(duration)
        return updatedDuration  
    }

    const sectionRef = useRef(null)
    const subSectionRef = useRef(null)

    const [sectionExpand , setSectionExpand] = useState(false)
    const [subSectionExpand , setSubSectionExpand] = useState(false)

    const toggleSectionAccordion = () => {

        setSectionExpand(!sectionExpand)
        console.log(sectionExpand , sectionRef)

        sectionRef.current.style.maxHeight = sectionExpand ? `${sectionRef.current.scrollHeight}px` : `0px` 

    }

    
    const toggleSubSectionAccordion = () => {

        setSubSectionExpand(!subSectionExpand)

        subSectionRef.current.style.maxHeight = subSectionExpand ? `${subSectionRef.current.scrollHeight}px` : `0px` 
    }
    
   

  return (
    <div>
        {
            courseContent.map(courseSection => 
                <div key={courseSection._id} >
                    
                    <div className='flex justify-between items-center' onClick={toggleSectionAccordion}>
                        <span className='flex justify-start items-center gap-3 '>
                            <MdKeyboardArrowUp/> <span>{courseSection?.sectionName}</span>
                        </span>

                        <span className='flex justify-start items-center gap-3 '>
                            <span>{courseSection?.subSection.length} lecture(s) </span> <span>{sectionDuration(courseSection?.subSection)}  </span>
                        </span>

                    </div>
                    
                    <div ref={sectionRef} style={{maxHeight : "0px"}}>
                        {
                            courseSection?.subSection.map((subSection => 
                                <div key={subSection?._id} >
                                    <div className='flex justify-between' onClick={toggleSubSectionAccordion}>
                                        <span className='flex justify-start items-center gap-3'>
                                            <MdComputer/> <span>{subSection.title} </span>  <MdKeyboardArrowUp/>
                                        </span>

                                        <span>
                                            {convertSecondsToDuration(subSection.timeDuration)}
                                        </span>
                                    </div>

                                    <div ref={subSectionRef} >
                                        {subSection?.description}
                                    </div>
                                </div>
                                ))
                        }
                    </div>
                </div>
                )
        }
    </div>
  )
}

export default CourseAccordion