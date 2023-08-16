import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import viewCourseSlice from '../../../redux/slices/viewCourseSlice'

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus , setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const location = useLocation()
    const navigate = useNavigate()
    const {sectionId, subSectionId} = useParams()

    const {courseSectionData , courseEntireData, totalNoOfLectures, completedLectures} = useSelector(state => state.viewCourse )
    console.log("courseSectionData", courseSectionData , "courseEntireData", courseEntireData, "totalNoOfLectures", totalNoOfLectures, "completedLectures" , completedLectures)
    
    useEffect(()=>{
        const setActiveFlag= ()=>{

            if(!courseSectionData.length) return


            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection?.findIndex(data => data._id === subSectionId)
            const activeSubSectionId = courseSectionData?.[currentSectionIndex].subSection?.[currentSubSectionIndex]?._id

            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id) 
            setVideoBarActive(activeSubSectionId)
        }

        

        console.log("Render 2")
        setActiveFlag()

    },[courseSectionData, courseEntireData, location.pathname ])

    return (
        <div>

            {/* for buttons and headinng */}
            <div>
                <div>
                    <div onClick={()=> navigate('/dashboard/enrolled-courses')} >
                        Back
                    </div>

                    <div>
                        <IconBtn text={"Add Review"}
                        onClick={()=> setReviewModal(true)}
                        ></IconBtn>
                    </div>
                </div>  

                <div>
                    <p>
                    {courseEntireData?.courseName}
                    </p>
                    <p>
                        {completedLectures?.length} / {totalNoOfLectures}
                    </p>
                </div>          
            </div>

            <div>
                {courseSectionData?.map((section, index) => 
                <div 
                onClick={() => setActiveStatus(section?._id)}
                key={index}

                >
                    <div>
                        <div>
                            {section?.sectionName}
                        </div>
                    </div> 
                    
                    <div>
                        {
                            activeStatus === section._id && (
                                <div
                                >
                                    {
                                        section?.subSection.map((subSection) => (
                                            <div
                                            className={`${subSection._id === videoBarActive ? 'bg-yellow-200 text-richblack-900 ' : "bg-richblack-900 text-white"} flex gap-3 `}
                                            onClick={()=>{
                                                navigate(`/view-course/${courseEntireData._id}/section/${section._id}/sub-section/${subSection._id}`)
                                            }}
                                            key={subSection._id} >
                                                <input type="checkbox"
                                                // checked={completedLectures.includes(subSection._id)}
                                                />

                                                <span 
                                                >
                                                    {subSection.title}
                                                </span>
                                            </div>
                                        ))    
                                    }
                                </div>
                            ) 
                        }
                    </div>    
                </div>
                )}
            </div>
        </div>
    )
}

export default VideoDetailsSidebar