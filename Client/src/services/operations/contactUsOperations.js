import { apiConnector } from "../ApiConnector";
import { contactusEndpoint } from "../ApiEndpoints"; 

export const contactUsFormSubmit = (data, setLoading) => {
    return async() => {
        console.log("Calling api for data", data)
        setLoading(true)

        try {
            // const response = await apiConnector('post' , contactusEndpoint.CONTACT_US_API, data)
            const response = {success : "OK"}
            console.log("Printing response" , response)
        } catch (e) {
            console.error(e)
        }

        setLoading(false)
    }
}