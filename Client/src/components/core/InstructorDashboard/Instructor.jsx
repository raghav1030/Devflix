import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux'
import {fetchInstructorCourses} from '../../../services/operations/courseOperations'
import { getInstructorData } from '../../../services/operations/profileOperations'

const Instructor = () => {


        const [loading, setLoading] = useState(false)
        const [instructorData, setInstructorData] = useState(null)
        const [courses , setCourses] = useState([])
        const {token} = useSelector(state => state.auth)

    useEffect(() => {

        const getCourseDataWithStats = async() => {
            setLoading(null)

            const instructorApiData = await getInstructorData(token)
            const result = await fetchInstructorCourses(token)

            console.log(instructorApiData)
            
            if(instructorApiData.length){
                setInstructorData(instructorApiData)
            }

            if(result){
                setCourses(result)
            }

            setLoading(false)

        }

        getCourseDataWithStats()

    } , [])

    const totalAmount = instructorData?.reduce((acc , curr) => acc + curr.totalIncome , 0 )
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudents, 0)

  return (
    <div>
        Hello
    </div>
  )
}

export default Instructor