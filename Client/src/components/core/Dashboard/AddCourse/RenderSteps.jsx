import React from 'react'
import {AiFillCheckCircle} from 'react-icons/ai'
import { useSelector } from 'react-redux'

const RenderSteps = () => {

    const steps = [
        {
            id: 1,
            title : "Course Information"
        },
        {
            id: 2 ,
            title : "Course Builder"
        },
        {
            id : 3,
            title : "Publish"
        }
    ]

    const {step} = useSelector((state) => state.course)

    // <div className='flex mx-auto items-center justify-center  ' >
            
    // </div>
return(
    <div className='flex-col gap-2  mx-auto max-w-[600px]  ' >

        <div className='flex justify-center items-center mx-auto w-full  '>

        {
                steps.map((displayStep) => (

                    

                    
                    

                        <div className='flex   items-center justify-center w-full ' >

                        <div className={`${displayStep?.id !== 1 ?  ' h-1 border-t-[1.5px] border-dotted   border-pure-greys-400  w-full  ' : 'hidden'} `}></div>

                            <div className='flex items-center justify-center' >

                                {
                                    displayStep?.id < step ? <AiFillCheckCircle className='rounded-full w-10 h-10 bg-yellow-50' ></AiFillCheckCircle> : 
                                    <div className={`${displayStep?.id === step ? "text-yellow-50 opacity-100 border-yellow-100  bg-yellow-900  " : "text-richBlack-300 opacity-50  bg-richblack-800   " } rounded-full w-10 h-10 flex justify-center items-center  `} >
                                        {
                                            displayStep?.id
                                        }
                                    </div>
                                }
                            
                                    </div>

                        
                            <div className={`${displayStep?.id !== steps.length ?  ' h-1 border-dotted border-t-[1.5px]  border-pure-greys-400 w-full  flex-grow' : 'hidden'} `}></div>


                        </div>

                        
                        
                        


))
}
</div>

                            <div className='flex items-center justify-between title-box mt-2  ' >
                            
                                
                                        <p className='text-sm -translate-x-9 ' >
                                            Course Information
                                        </p>

                                        <p className='text-sm -translate-x-9 ' >
                                            Course Builder
                                        </p>

                                        <p className='text-sm translate-x-[0.3rem]  ' >
                                            Publish
                                        </p>
                                
                            </div>
    </div>
)}

export default RenderSteps

