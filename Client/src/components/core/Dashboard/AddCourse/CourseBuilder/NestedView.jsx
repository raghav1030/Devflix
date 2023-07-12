import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {RxDropdownMenu} from 'react-icons/rx'
import {MdEdit}

const NestedView = () => {

  const {course} = useSelector(state => state.course)
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [addSubSection , setAddSubSection] = useState(null)
  const [viewSubSection , setViewSubSection] = useState(null)
  const [editSubSection , setEditSubSection] = useState(null)

  const [confirmationModal, setConfirmationModal] = useState(null)


  return (
    <div>

      <div className='mt-10 rounded-md bg-richblack-700 p-6 px-8' >
        {
          course.courseContent.map(section => (
            <>
            <details key={section._id} open>

              <summary className='flex flex-col items-start  justify-between gao-x-3 border-b-2  ' >
                <div className='flex gap-3 items-center  ' >
              <RxDropdownMenu></RxDropdownMenu>
              <p>{section.sectionName}</p> 
                </div>

                <div>
                  <button>
                    
                  </button>
                </div>
              </summary>


            </details>
            </>
          ))
        }    
      </div>    
    </div>
  )
}

export default NestedView