import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tr , Th, Td, Thead, Tbody} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseOperations'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const CoursesTable = ({courses , setCourses}) => {

    const [loading , setLoading] = useState(false)
    const  {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [confirmationModal, setConfirmationModal] = useState(null)
    // console.log(confirmationModal)
    const navigate = useNavigate()

    async function handleCourseDelete(courseId){

        setLoading(true)

        try {
            await deleteCourse({courseId : courseId} , token)
        
            const result = await fetchInstructorCourses(token)
            
            if(result){
                setCourses(result)
                setConfirmationModal(null)
            }
        } catch (e) {
            console.error(e)
        }
        setLoading(false)
    }

  return (
    <div className='' >
        <Table className='flex flex-col ' >
            <Thead>

                <Tr>
                    <Th>
                        Courses
                    </Th>
                    <Th>
                        Duration
                    </Th>
                    <Th>
                        Price
                    </Th>
                    <Th>
                        Actions
                    </Th>
                </Tr>
                
            </Thead>

            <Tbody>
                {
                    courses.length === 0 ? 
                    (
                        <Tr>
                            <Td>
                                No Courses Found
                            </Td>
                        </Tr>
                    ) :
                    courses.map(course => (
                        <Tr key={course._id} className='flex gap-x-10 border-richblack-800 ' >
                            <Td className='gap' >
                                <img src={course?.thumbnail} alt="Course Image" className='h-[150px] w-[220px] rounded-md object-cover ' />
                            </Td>
                                
                                <Td>

                                <div>
                                    <p>{course?.courseName}</p>
                                    <p>{course?.description}</p>
                                    <p>Created : <span>  </span></p>
                                    {
                                        course?.status === COURSE_STATUS.DRAFT ? (
                                            <p className='text-pink-50' >DRAFTED</p>
                                            )
                                            : (
                                                <p className='text-yellow-50'  >
                                                    PUBLISHED
                                                </p>
                                            )
                                    }

                                </div>

                                </Td>


                            <Td>
                                2 hr 30 min
                            </Td>

                            <Td>
                                {course?.price}
                            </Td>

                            <Td  >

                            <div className='flex items-center justify-between gap-6'>

                            <button
                            
                            disabled={loading}
                            onClick={() => {
                                navigate(`/dashboard/edit-course/${course._id}`)
                            }}
                            className='bg-yellow-5 text-black p-1 rounded-md'
                            >
                                Edit
                            </button>
                            
                            <button 
                            disabled={loading}
                            onClick={()=>{
                                setConfirmationModal({
                                    text1 : "Do you want to delete this course ? ",
                                    text2 : "All the data related to this course will be deleted",
                                    btn1Text : "Delete",
                                    btn2Text  : "Cancel",
                                    btn1Handler : !loading  ? () => handleCourseDelete(course._id) : () => {},
                                    btn2Handler  : !loading ? () => setConfirmationModal(null) : () => {}
                                })
                                

                            }} >
                                Delete
                            </button>

                            </div>

                            </Td>

                        </Tr>
                        )) 
                    }
            </Tbody>
        </Table>

        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} ></ConfirmationModal>
        }
    </div>
  )
}

export default CoursesTable