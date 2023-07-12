import { courseEndpoints } from "../ApiEndpoints";
import {apiConnector} from '../ApiConnector'
import {toast} from 'react-hot-toast'
import { setCourse } from "../../redux/slices/courseSlice";
import { useDispatch } from "react-redux";


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



export const addCourseDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    
    try {
      const response = await apiConnector("POST", CREATE_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorisation: `Bearer ${token}`,
      })
      console.log("CREATE COURSE API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Course Details")
      }
      toast.success("Course Details Added Successfully")
      result = response?.data
      console.log("response?.data?.data", response?.data)
      console.log("course added in the course slice ")
    } catch (error) {
      console.log("CREATE COURSE API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  export const createSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SECTION_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("CREATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Create Section")
      }
      toast.success("Course Section Created")
      result = response?.data?.course
      console.log("response?.data" , response?.data)
    } catch (error) {
      console.log("CREATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }

  
  export const updateSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", UPDATE_SECTION_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("UPDATE SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Update Section")
      }
      toast.success("Course Section Updated")
      result = response?.data?.data
    } catch (error) {
      console.log("UPDATE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  }


export const createSubSection = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
      const response = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
        Authorisation: `Bearer ${token}`,
      })
      console.log("CREATE SUB-SECTION API RESPONSE............", response)
      if (!response?.data?.success) {
        throw new Error("Could Not Add Lecture")
      }
      toast.success("Lecture Added")
      result = response?.data?.data
    } catch (error) {
      console.log("CREATE SUB-SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
  } 