import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../redux/slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import { editCourseDetails } from '../../../../../services/operations/courseOperations'

const PublishCourse = () => {
    const {register , handleSubmit , getValues, setValue , formState:{errors}} = useForm()
    const {token} = useSelector(state => state.auth)
    const {course} = useSelector(state => state.course)
    const dispatch = useDispatch()
    const [loading , setLoading] = useState(false)

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED ){
            setValue('public' , true)
        }
        console.log("course.status on first render being set to" , course.status)
    },[])

    async function onSubmit(data){
        handleCoursePublish()
    }

    function goToCourses(){
        dispatch(resetCourseState())
        // navigate to MyCourses
    }

    async function handleCoursePublish(){
        if(course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true ||
        course?.status === COURSE_STATUS.PUBLISHED && getValues('public') === true){
            
            goToCourses()
            return
        }

        const formData = new FormData()
        formData.append('courseId', course._id)

        const courseStatus = getValues('public') === true ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        
        formData.append("status", courseStatus)

        setLoading(true)
        const result = await editCourseDetails(formData, token)

        if(result){
            console.log("result", result)
            console.log("course state after resetting the state" , course)
            goToCourses()
            setLoading(false)
        }

    }

    function goBack(){
        dispatch(setStep(2))
    }

    return (
        <div className='rounded-md border-[1px] bg-richblack-800 p-6  border-richblack-700 flex flex-col gap-6 mt-6 '>
            <p>Publish Course</p>
             
             <form action="submit" onSubmit={handleSubmit(onSubmit)}>

                <div>
                    <label className='flex justify-start items-center gap-3' >

                        <input 
                        type="checkbox"
                        name="public"
                        id="public" 
                        {...register("public" , {required : true}) } 
                        className='rounded h-4 w-4 '
                        />

                        <p>Make this course as public</p>
                   
                    </label>
                </div>

                <div className='flex items-center justify-end gap-4'>

                    <button disabled={loading} type='button' onClick={goBack} className='py-2 px-5 bg-richblack-600 flex items-center rounded-md'>
                        Back
                    </button>

                    <IconBtn
                    disabled={loading}
                    text={"Save Changes"}
                    type={"Submit"}

                    ></IconBtn>

                </div>

             </form>
        </div>
    )
}

export default PublishCourse