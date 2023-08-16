import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../../services/operations/profileOperations';
import ProgressBar from '@ramonak/react-progress-bar';
import { useNavigate } from 'react-router-dom';
import {setCompletedLectures, setCourseSectionData, setEntireCourseData , setTotalNoOfLectures, updateCompletedLectures} from "../../../../redux/slices/viewCourseSlice"


const EnrolledCourses = () => {

    const {token}  = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const navigate = useNavigate()

    const dispatch = useDispatch()


    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            console.log(response)

            setEnrolledCourses(response);

            dispatch(setCourseSectionData([]))
            dispatch(setEntireCourseData([]))
            dispatch(setCompletedLectures([]))
            dispatch(setTotalNoOfLectures(0))


        }
        catch(error) {
            console.log("Unable to Fetch Enrolled Courses");
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
    },[]);

// console.log(enrolledCourses)


return (
    <div className='text-white'>

        <div>Enrolled Courses</div>
        {
            !enrolledCourses ? (<div>
                Loading...
            </div>)
            : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>)
            : (
                <div>
                    <div>
                        <p>Course Name</p>
                        <p>Durations</p>
                        <p>Progress</p>
                    </div>
                    {/* Cards shure hote h ab */}
                    {
                        enrolledCourses.map((course,index)=> (
                            <div key={index} >
                                <div onClick={()=> navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course?.courseContent?.[0]?.subSection?.[0]?._id}`
                                )}>
                                    <img  src={course.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <p>{course.courseDescription}</p>
                                    </div>
                                </div>

                                <div>
                                    {course?.totalDuration}
                                </div>

                                <div>
                                    <p>Progress: {course.courseProgressPercentage || 0}% of {course.courseName}</p>
                                    <ProgressBar
                                        completed={course.courseProgressPercentage || 0}
                                        height='8px'
                                        isLabelVisible={false}
                                        />
                                </div>
                            </div>
                        ))
                    }
                </div>
            )
        }
    
    </div>
)
}

export default EnrolledCourses
