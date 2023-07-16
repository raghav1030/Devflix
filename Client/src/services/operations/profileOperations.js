import { toast } from "react-hot-toast";
import { apiConnector } from "../ApiConnector";
import { profileEndpoints } from "../ApiEndpoints";

const  {GET_USER_ENROLLED_COURSES_API} = profileEndpoints


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

        courses = result.data 

        if(!result.data.data){
            throw new Error(result.data.message)
        }

    } catch (error) {
        console.log('Error occured while calling the enrolled courses api')
        console.error(error) 
    }
    toast.dismiss(toastId)
    return courses
}  