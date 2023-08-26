import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Table, Tr , Th, Td, Thead, Tbody} from 'react-super-responsive-table'
import { COURSE_STATUS } from '../../../../utils/constants'
import { useNavigate } from 'react-router-dom'
import ConfirmationModal from '../../../common/ConfirmationModal'
import { deleteCourse, fetchCourseDetails, fetchInstructorCourses } from '../../../../services/operations/courseOperations'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { formattedDate } from '../../../../utils/formattedDate'
import {HiClock} from 'react-icons/hi'
import {FiEdit2} from 'react-icons/fi'
import {FaCheck} from 'react-icons/fa'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { toast } from 'react-hot-toast'
import convertSecondsToDuration from '../../../../utils/convertSecondsIntoDuration'


const CoursesTable = ({courses , setCourses}) => {

    const [loading , setLoading] = useState(false)
    const  {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [confirmationModal, setConfirmationModal] = useState(null)
    // console.log(confirmationModal)
    const navigate = useNavigate()
    const TRUNCATE_LENGTH = 30


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

    // async function handleCourseEdit(courseId){
    //   setLoading(true)

    //   try {
    //     const result = await fetchCourseDetails(token)
    //     console.log(result)
    //   } catch (e) {
    //     toast.error("Can't fetch the course Details")
    //   }
    // }

    function calculateCourseDuration(course){
      // console.log(course)
      let totalDuration = 0
      course?.courseContent?.forEach(section => {
        // console.log(section)
        section?.subSection?.forEach(subSection => {
          // console.log(subSection?.timeDuration)
          totalDuration += Math.round(Math.floor(subSection?.timeDuration))
        })      
      })

      totalDuration = convertSecondsToDuration(totalDuration)
      // console.log(totalDuration)

      return totalDuration
    }

    // console.log(courses)

  return (
    <>
      <Table className="rounded-xl border border-richblack-800 ">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-richblack-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                No courses found
                {/* TODO: Need to change this state */}
              </Td>
            </Tr>
          ) : (
            courses?.map((course) => (
              <Tr
                key={course._id}
                className="flex gap-x-10 border-b border-richblack-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-richblack-300">
                      {course.courseDescription.split(" ").length >
                      TRUNCATE_LENGTH
                        ? course.courseDescription
                            .split(" ")
                            .slice(0, TRUNCATE_LENGTH)
                            .join(" ") + "..."
                        : course.courseDescription}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formattedDate(course.createdAt)}
                    </p>
                    {course?.status == COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        {course?.status}
                      </p>
                    ) : (
                      <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                          <FaCheck size={8} />
                        </div>
                        {course?.status}
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  {calculateCourseDuration(course)}
                </Td>
                <Td className="text-sm font-medium text-richblack-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-richblack-100 ">
                  <button
                    disabled={loading}
                    onClick={() => {
                      navigate(`/dashboard/edit-course/${course._id}`)
                    }}
                    title="Edit"
                    className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => {
                      setConfirmationModal({
                        text1: "Do you want to delete this course?",
                        text2:
                          "All the data related to this course will be deleted",
                        btn1Text: !loading ? "Delete" : "Loading...  ",
                        btn2Text: "Cancel",
                        btn1Handler: !loading
                          ? () => handleCourseDelete(course._id)
                          : () => {},
                        btn2Handler: !loading
                          ? () => setConfirmationModal(null)
                          : () => {},
                      })
                    }}
                    title="Delete"
                    className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CoursesTable