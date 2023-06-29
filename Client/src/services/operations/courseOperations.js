import { courseEndpoints } from "../ApiEndpoints";
import {apiConnector} from '../ApiConnector'
import {toast} from 'react-hot-toast'


const {
    GET_ALL_COURSE_API,
    COURSE_DETAILS_API,
    EDIT_COURSE_API,
    COURSE_CATEGORIES_API,
    CREATE_COURSE_API,
    CREATE_SECTION_API,
    CREATE_SUBSECTION_API,
    UPDATE_SECTION_API,
    UPDATE_SUBSECTION_API,
    GET_ALL_INSTRUCTOR_COURSES_API,
    DELETE_SECTION_API,
    DELETE_SUBSECTION_API,
    DELETE_COURSE_API,
    GET_FULL_COURSE_DETAILS_AUTHENTICATED,
    LECTURE_COMPLETION_API,
    CREATE_RATING_API,
} = courseEndpoints



export const  fetchCourseCategories =  async() =>{
    let result = []
    const toastId = toast.loading('Loading...')
    try {
        const response = await apiConnector('get', COURSE_CATEGORIES_API)
        console.log("Course Categories" , response)

        if(!response.data.data){
            throw new Error('Nothing to show in Course Categories')
        }

        result = response?.data?.data

        console.log("result " , result)

        

        toast.success("Course categories fetched")
    } catch (e) {
        toast.error('Error')
        console.error(e)
    }

    toast.dismiss(toastId)
    return result
}

export const editCourseDetails = async(formData , token) =>{
    const toastId = toast.loading("Loading..")
    
    try {
        const response = await apiConnector('PUT' , EDIT_COURSE_API, formData , null , {
            Authorisation : `Bearer ${token}`
        } )
        console.log('Printing edit course api call response' , response)
        console.log('Printing Course details' , response.data.courseDetails)
        toast.success('Course Edited')
        return response.data.courseDetails
    } catch (e) {
        toast.error('Could Update Course Details')
        console.error(e)
        console.log("Error while calling api for Course Details Updation")
    }


    toast.dismiss(toastId)
}


export const addCourseDetails = async(formData , token) =>{
    const toastId = toast.loading("Loading..")
    console.log(CREATE_COURSE_API)
    console.log(formData)
    console.log(token)
    try {
        const response =  await apiConnector('post', CREATE_COURSE_API, null, 
        {
            Authorisation: `Bearer ${token}`
        })  
        console.log('Printing Create course api call response' , response)
        console.log('Printing Course details' , response.data.course)
        toast.success('Course Created')
        return response.data.course
    } catch (e) {
        toast.error('Could Not Add Course Details')
        console.error(e)
        console.log("Error while calling api for Course Details Creation")
    }


    toast.dismiss(toastId)
}