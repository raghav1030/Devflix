import React, { useEffect, useState } from 'react'
import {Outlet , useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector } from 'react-redux'
import { getFullDetailsOfCourse } from '../services/operations/courseOperations'
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures, updateCompletedLectures } from '../redux/slices/viewCourseSlice'
import {setCompletedLectures, setCourseSectionData, setEntireCourseData , setTotalNoOfLectures, updateCompletedLectures} from "../redux/slices/viewCourseSlice"
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'

const ViewCourse = () => {

    const [reviewModal , setReviewModal] = useState(null)

    const {courseId, subSectionId} = useParams()

    const {token} = useSelector(state => state.auth)

    const location = useLocation()
    
    const dispatch  = useDispatch()

    const {courseSectionData, courseEntireData , completedLectures} = useSelector(state => state.viewCourse)
    // const [courseData, setCourseData] = useState(null)

    const setCourseSpecificDetails = async () => {
        const courseData = await getFullDetailsOfCourse(courseId , subSectionId, token)
        console.log("courseData" , courseData)
        // setCourseData(courseData)
        dispatch(setCourseSectionData(courseData?.courseDetails?.courseContent))
        dispatch(setEntireCourseData(courseData?.courseDetails))
        dispatch(setCompletedLectures(courseData?.completedVideos))

        console.log("courseSectionData, courseEntireData , completedLectures" , courseSectionData, courseEntireData , completedLectures)
        console.log("courseData?.completedVideos" , courseData?.completedVideos)
        console.log("courseData?.courseDetails?.courseContent" , courseData?.courseDetails?.courseContent[0])
        console.log("courseData?.courseDetails" , courseData?.courseDetails)
        

        let lectures = 0

        courseData?.courseDetails?.courseContent?.forEach(sec => {
            lectures += sec.subSection.length
        });

        dispatch(setTotalNoOfLectures(lectures))
    }


    useEffect(()=>{
        console.log("Render 1")
        setCourseSpecificDetails()
        
    }, [])


    

  return (
    <div>
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        <div>
            <Outlet></Outlet>
        </div>

        {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}></CourseReviewModal> 
        }
    </div>
  )
}

export default ViewCourse