import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { profileEndpoints } from "../ApiEndpoints";

const  {
    GET_USER_ENROLLED_COURSES_API,
    GET_INSTRUCTOR_DATA_API
} = profileEndpoints


export async function getUserEnrolledCourses(token){
    
    const toastId = toast.loading('Loading...')
    let courses = []
    try {
        const result =  await apiConnector('get', GET_USER_ENROLLED_COURSES_API, null, 
        {
            Authorization: `Bearer ${token}`
        })  

        toast.success('Courses Fetched')
        console.log("Enrolled Courses : ", result)

        courses = result.data.data.enrolledCourses

        console.log(courses)

        if(!result.data.data.enrolledCourses){
            throw new Error(result.data.data.message)
        }

    } catch (error) {
        console.log('Error occured while calling the enrolled courses api')
        console.error(error) 
    }
    toast.dismiss(toastId)
    return courses
}  


export async function getInstructorData(token){
    const toastId = toast.loading("Loading...")

    let result = []

    try {
        const response = await apiConnector("get" , GET_INSTRUCTOR_DATA_API , null , {
            Authorization: `Bearer ${token}`
        })
        
        console.log("GET_INSTRUCTOR_DATA_API RESPONSE", response)

        result = response?.data?.courses
        
    } catch (e) {
        console.log("GET_INSTRUCTOR_COURSES_API ERROR" , e)
        toast.error("Could not fetch Instructor Data")
    }
    toast.dismiss(toastId)
    return result
}