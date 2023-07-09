import React from 'react'
import { learningGridData } from '../../../data/aboutus-LearningGrid'
import HighlightText from '../../common/HighlightText'
import CTAbutton from '../../common/CTAbutton'

const LearningGrid = () => {
return (
    <div className='grid lg:grid-cols-4 lg:grid-rows-2 mx-auto mb-10 max-w-full  '>
        {
            learningGridData.map((data, index) => (
                <div key={index} className={`lg:h-[280px] ${data.order % 2 === 1 ? ('bg-richblack-800') : ("bg-richblack-900")} ${data.order === 3 && "lg:col-start-2"} ${data.order === -1 && 'lg:col-span-2 pl-0'} p-5  `}   >

                    {data.order === -1 ? 
                    (
                        <div className='flex flex-col  gap-6 lg:w-[90%] pb-5   bg-richblack-900 '  >
                            
                            <h2 className='text-3xl font-[400px] text-richblack-50 ' > {data.heading} <HighlightText text={data.highlightText} /> </h2>

                            <p className='text-richblack-100 tracking-wide leading-[1.5rem] text-[16px] ' >{data.description}</p>

                            <div className='w-44' >
                            <CTAbutton  linkTo={data.btnLink} active={true} >{data.btnText}</CTAbutton>
                            </div>
                        </div>
                    ) :
                    (   

                        <div className='flex flex-col gap-8 p-5  ' >
                            <p className='text-2xl font-[500px] ' >{data.heading}</p>
                            <p className='text-richblack-100  text-[16px] ' >{data.description}</p>
                        </div>
                    )}
                </div>
            ))
        }
    </div>
)
}

export default LearningGrid