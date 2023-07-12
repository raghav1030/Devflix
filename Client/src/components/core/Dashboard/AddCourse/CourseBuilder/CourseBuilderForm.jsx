import React , {useState} from 'react'
import { set, useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn';
import {BiAddToQueue} from 'react-icons/bi'
import {useDispatch, useSelector} from 'react-redux'
import { BiArrowToRight } from 'react-icons/bi';
import NestedView from './NestedView'
import { setStep, setEditCourse, setCourse } from '../../../../../redux/slices/courseSlice';
import {toast} from 'react-hot-toast'
import { updateSection, createSection } from '../../../../../services/operations/courseOperations';


const CourseBuilderForm = () => {


    const {
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch()

    const[editSectionName , setEditSectionName] = useState(false)
    const {course} = useSelector(state => state.course)
    const [loading , setLoading] = useState(false) 
    const {token} = useSelector(state => state.auth)

    console.log("Printing course" , course)

    function cancelEditSectionName(){
        setEditSectionName(false)
        setValue('sectionName' , '')
    }

    function goBack(){
        dispatch(setStep(1))
        dispatch(setEditCourse(true))
    }

    function goToNext() {
        if(course.courseContent.length > 0){
            toast.error("Please Enter Atleast One Section")
        }

        if(course.courseContent.some((subSection => subSection.length === 0))){
            toast.error("Please Add Atleast one Sub Section")
        }

        dispatch(setStep(3))
    }

    async function onSubmit(data){
        setLoading(true)

        let result = null 
        
    
        if(editSectionName){
            try {
                result = await updateSection({
                    sectionName : data.sectionName,
                    sectionId : editSectionName,
                    courseId : course._id,
                    
                } , token)

                console.log("section updated")

            } catch (e) {
                console.error(e)
            }
        }
        else{

            try {
                result = await createSection({
                    sectionName : data.sectionName,
                    courseId : course._id
                }, token )
                console.log("section created")
                
            } catch (e) {
                console.error(e)
            }


        }

        if(result){
            dispatch(setCourse(result))
            setEditSectionName(null)
            setValue("sectionName" , "")
        }

        setLoading(false)
    }

    function handleChangeEditSectionName (sectionId, sectionName) {

        if(editSectionName === sectionId){
            cancelEditSectionName()
            return
        }

        setEditSectionName(sectionId)
        setValue("sectionName" , sectionName)
    }

    

return (
    <div>
        <h1>CourseBuilderForm</h1>

        <form action="submit" onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-10'>
            
            <label >
                <p>Section Name</p>
                <input type="text" name='sectionName' {...register("sectionName" , {
                    required : true,
                })} 
                className='w-full'/>

                {errors.sectionName && <p className='text-red-500'>This field is required</p>}
            </label>

            <div className='flex items-center  gap-16' >
                <IconBtn 
                text={editSectionName ? 'Edit Section Name' : "Create Section"}
                type={'submit'}
                outline={true}
                customClassName={'text-yellow-200 '}
                >

                    <BiAddToQueue className='text-xl'/>

                    
                    
                    
                </IconBtn>

                {
                    editSectionName && (
                        <button
                        type={'button'}
                        onClick={cancelEditSectionName}
                        className='text-richblack-300 underline text-sm  '>
                            Cancel Edit
                        </button>
                    )
                }
            </div>
            
        </form>

        {
            course.courseContent.length  > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
            )

        }

            <div className='flex gap-6 mt-4 justify-end' >
                <button onClick={goBack} className='cursor-pointer flex items-center rounded-md  ' >Back</button>
                <IconBtn text={"Next"} onClick={goToNext}  ><BiArrowToRight></BiArrowToRight></IconBtn>

            </div>

    </div>
)
}

export default CourseBuilderForm