import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories, editCourseDetails, addCourseDetails } from '../../../../services/operations/courseOperations'
import ChipInput from './ChipInput'
import UploadImage from './UploadImage'
import RequirementField from './RequirementField'
import { setCourse, setStep } from '../../../../redux/slices/courseSlice'
import IconBtn from '../../../common/IconBtn'
import {COURSE_STATUS} from '../../../../utils/constants'
import { toast } from 'react-hot-toast'
// import { current } from '@reduxjs/toolkit'

const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState:{errors}
    } = useForm({
        defaultValues : {
            tag : []
        }
    })

    const dispatch = useDispatch()

    const {course , editCourse} = useSelector((state => state.course))
    const {token} = useSelector((state) => state.auth)
    const [loading ,setLoading ] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    async function getCourseCategoriesDetails(){

        setLoading(true)

        try{
            const result = await fetchCourseCategories()
            if(courseCategories){
                setCourseCategories(result)
            }
        } catch(e){
            console.error(e)
        }

        setLoading(false)

    }

    useEffect(()=>{

        if(editCourse){
            setValue('description' , course.description)
            setValue('tag' , course.tag)
            setValue('price' , course.price)
            setValue('courseName' , course.courseName)
            setValue('whatYouWillLearn' , course.whatYouWillLearn)
            setValue('category' , course.category)
            setValue('instructions' , course.instructions)
            setValue('thumbnail' , course.thumbnail)
        }

        getCourseCategoriesDetails()
    },[])

    function isFormUpdated(){
        
        const currentValue = getValues()
        console.log(currentValue)
        console.log(course)

        if(currentValue.courseName !== course.courseName ||
            currentValue.description !== course.courseDescription ||
            currentValue.price !== course.price ||
            currentValue.whatYouWillLearn !== course.whatYouWillLearn ||
            currentValue.category !== course.category._id ||
            currentValue.instructions.toString() !== course.instructions.toString() ||
            currentValue.thumbnail !== course.thumbnail ||
            currentValue.tag.toString() !== course.tag.toString() ){
            return true
        }
        else{
            return false
        }

    }

async function submitForm (data){

    console.log(data)


    if(editCourse ){
console.log(data)
        
        if(isFormUpdated()){
            const currentValue = getValues()
            const formData = new FormData()
            formData.append('courseId' , course._id)

            if(currentValue.courseName !== course.courseName){
                formData.append('courseName' , data.courseName)
            }

            if(currentValue.description !== course.courseDescription){
                formData.append('courseDescription' , data.description)
            }

            if(currentValue.price !== course.price){
                formData.append('price' , data.price)
            }

            if(currentValue.whatYouWillLearn !== course.whatYouWillLearn){
                formData.append('whatYouWillLearn' , data.whatYouWillLearn)
            }
            if(currentValue.category !== course.category._id){
                formData.append('category' , data.category)
            }
            if(currentValue.thumbnail !== course.thumbnail){
                formData.append('thumbnail' , data.thumbnail)
            }
            if(currentValue.tag.toString() !== course.tag.toString()){
                formData.append('tag' , JSON.stringify(data.tag))
            }
            if(currentValue.instructions.toString() !== course.instructions.toString()){
                formData.append('instructions' , JSON.stringify(data.instructions))
            }

            setLoading(true)

            try {
                const result = await editCourseDetails(formData , token)
                if(result){
                    dispatch(setCourse(result))
                    dispatch(setStep(2))
                }
                
            } catch (e) {
                console.error(e)
            }
            setLoading(false)
            
        }


        else{
            toast.error('No changes made so far')
        }
        return
    }
    
        const formData = new FormData()
        formData.append('courseName' , data.courseName)
        formData.append('courseDescription' , data.description)
        formData.append('price' , data.price)
        formData.append('whatYouWillLearn' , data.whatYouWillLearn)
        formData.append('category' , data.category)
        formData.append('thumbnail' , data.thumbnail)
        formData.append('tag' , JSON.stringify(data.tag))
        formData.append('instructions' , JSON.stringify(data.instructions))
        formData.append('status' , COURSE_STATUS.DRAFT)

        setLoading(true)


        try {
            console.log(formData)
            const result = await addCourseDetails(formData , token)
            if(result){
                dispatch(setCourse(result))
                dispatch(setStep(2))
            }
            
        } catch (e) {
            console.error(e)
        }
        setLoading(false)


    }
    

return (
    <form 
    onSubmit={handleSubmit(submitForm)} className ='rounded-md bg-richblack-800 border-richblack-700 p-6 space-y-8  ' >
        
            <label>

                <p> Course Title <sup>*</sup> </p>
                <input type="text"
                {...register('courseName', {required : true})}
                placeholder='Enter Course Title '
                className='w-full '
                />
                {
                    errors.courseName && <span>
                        Please Enter Course Title
                    </span>
                }
            </label>

            <label>

                <p> ACourse Description <sup>*</sup> </p>
                <textarea
                {...register('description', {required : true})}
                placeholder='Enter Course Details '
                className='w-full min-h-[140px] '
                />
                {
                    errors.description && <span>
                        Please Enter Course Description
                    </span>
                }

            </label>

            <label>

                <p> Course Price <sup>*</sup> </p>
                <input type="number"
                {...register('price', {required : true})}
                placeholder='Enter Course Price '
                className='w-full  '
                />
                {
                    errors.price && <span>
                        Please Enter Course Title
                    </span>
                }
            </label>

            <label>

                <p> Course Category <sup>*</sup> </p>
                
                <select name="category" id="category" defaultValue='' {...register('category' , {required : true})}>
                    <option value="" disabled>Choose Course Category </option>

                    {
                        !loading &&  courseCategories.map((item , index) => (
                            <option value={item?._id} key={index}>
                                {item?.name}
                            </option>
                        )) 
                    }

                    
                    

                </select>

                {
                        errors.category && (
                            <span>
                                Course category is reqired
                            </span>
                        )
                }

            </label>

            <label>

                <p> Course Benefits <sup>*</sup> </p>
                <textarea 
                {...register('whatYouWillLearn', {required : true})}
                placeholder='Enter Course Benefits '
                className='w-full min-h-[140px]  '
                />
                {
                    errors.price && <span>
                        Please Enter Course Title
                    </span>
                }
            </label>



            <ChipInput 
            label="Tags"
            name='tag'
            placeholder='Enter Tags'
            errors={errors.tag}
            setValue={setValue}
            register={register}
            getValues={getValues}
            watch={watch}
            />

            <UploadImage label="Thumbnail"
            name='thumbnail'
            placeholder='Upload Thumbnail'
            errors={errors.thumbnail}
            setValue={setValue}
            register={register}
            getValues={getValues}
            watch={watch} />

            <RequirementField 
            label="Requirement/Instruction"
            name='instruction'
            placeholder='Enter The pre-requisites for the course'
            errors={errors.tag}
            setValue={setValue}
            register={register}
            getValues={getValues}
            watch={watch}
            />

            <div>
                {
                    editCourse && (
                        <button onClick={() => dispatch(setStep(2))}
                        className='flex gap-2 text-richBlack-100 bg-richBlack-300' >
                            Continue Without Saving
                        </button>
                    )
                }

                <IconBtn
                text={editCourse ? "Next" : "Save Changes And Next"}
                onClick={submitForm}

                ></IconBtn>

                
            </div>

    </form>

    
)
}

export default CourseInformationForm