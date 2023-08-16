import {toast} from 'react-hot-toast'
import { apiConnector } from "../ApiConnector"
import { studentEndpoints } from '../ApiEndpoints'
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { setPaymentLoading} from '../../redux/slices/courseSlice'
import { resetCart } from '../../redux/slices/cartSlice'


const {
    COURSE_PAYMENT_API,
    COURSE_VERIFY_API,
    SEND_PAYMENT_SUCCESS_EMAIL_API
} = studentEndpoints

const loadScript = async (src) => {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(true)
        }

        document.body.appendChild(script);
    })
}


export async function buyCourse(courses, token , userDetails, navigate, dispatch){

    const toastId = toast.loading("Loading...")
    try {
        const response = loadScript('https://checkout.razorpay.com/v1/checkout.js')

        
        if(!response){
            toast.error('Razorpay SDK failed')
            return
        }

        console.log(token)
        const orderResponse = await apiConnector('POST' , COURSE_PAYMENT_API, {courses}, {
            Authorization : `Bearer ${token}`
        } )

        if(!orderResponse){
            throw new Error('Got nothing in the capture payment api response ')
        }

        console.log("orderResponse of capture payment api response" , orderResponse)

        const options = {
            key : process.env.RAZORPAY_KEY,
            currency : orderResponse?.data?.message?.currency,
            amount : orderResponse?.data?.message?.amount,
            order_id: orderResponse.data.message.id,
            name : 'Devcomm',
            description : 'Thankyou for purchasing the course',
            image : rzpLogo,
            prefill : {
                name : `${userDetails?.firstName}`,
                email : userDetails?.email
            },
            handler : function(response){
                sendPaymentSuccessEmail(response, orderResponse.data.message.amount, token)

                verifyPayment({...response, courses} , token , navigate, dispatch)
            },
            theme: {
                color: "#3399cc"
            }
        }

        const paymentObject = new window.Razorpay(options)

        paymentObject.open()

        paymentObject.on('payment.failed', function (response){
            toast.error("OOPS! Payment Failed :( ")
           console.log(response.error)
        });



    } catch (e) {
        console.error(e)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}


async function verifyPayment (data , token, navigate, dispatch) {
    const toastId = toast.loading('Loading...')
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector('POST' , COURSE_VERIFY_API, data, {
            Authorization : `Bearer ${token}`
        })

        if(!response){
            throw new Error('Verify Payement sent no response')
            toast.error("Didn't got verify payment response")
        }

        toast.success('payment Successful, The course is added to your dashboard')
        navigate('/dashboard/enrolled-courses')
        dispatch(resetCart())

    } catch (e) {
        console.log("PAYMENT VERIFY ERROR....", e);
        toast.error("Could not verify Payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}


const sendPaymentSuccessEmail = async(response, amount , token) =>{
    const toastId = toast.loading('Loading...')
    try {
        const result = await apiConnector('post' , SEND_PAYMENT_SUCCESS_EMAIL_API, {
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        } , {
            Authorization: `Bearer ${token}`
        })

        toast.dismiss(toastId);
        console.log(result)

    } catch (e) {
        console.log("PAYMENT SUCCESS EMAIL ERROR....", e);
        
    }


}