import { toast } from "react-hot-toast"
import { apiConnector } from "../ApiConnector"
import { catalogData } from "../ApiEndpoints"


export const getCatalogPageData = async(categoryId) => {
    
    let result = []
    const toastId = toast.loading('Loading...')
    console.log("CategoryId", categoryId)

    try {
        const response = await apiConnector('POST' , catalogData.CATALOGPAGEDATA_API ,{categoryId : categoryId})
        
        if(!response?.data.success){
            throw new Error ('Could not fetch Category page data');
        }
        result = response?.data?.data 
        console.log(response)



    } catch (e) {
        console.error(e)
        console.log("API ERROR MESSAGE OF CATALOGDATA API ...." , e )
        result = e.response?.data
    }

    toast.dismiss(toastId)
    return result    

}