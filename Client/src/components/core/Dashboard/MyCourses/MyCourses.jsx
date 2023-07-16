import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { fetchInstructorCourses } from '../../../../services/operations/courseOperations'
import IconBtn from '../../../common/IconBtn'
import CoursesTable from './CoursesTable'

const MyCourses = () => {

    const  {token} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [courses , setCourses] = useState([])
    const [loading , setLoading] = useState(false)

    const fetchCourses = async() => {
        // setLoading(true)
        try {
            const result = await fetchInstructorCourses(token)
            console.log(result)
            if(result){
                setCourses(result)
            }
            console.log("Control Reached till end of api call")

        } catch (e) {
            console.error(e)
        }

        // setLoading(false)
    }

    

    // useEffect(()=>{
        // },[])
        
    useEffect(()=>{
            fetchCourses()
        console.log("Hello fromMy course")
    },[])
    
  return (
    <div  >
        <div className='flex justify-between  '>
            <h1>
                My Courses
            </h1>

            <IconBtn 
            text={"Add Course"}
            onClick={() => navigate('/dashboard/add-course')}
             ></IconBtn>
        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses} ></CoursesTable>
        }
    </div>
  )
}

export default MyCourses