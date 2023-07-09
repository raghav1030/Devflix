import React from 'react'
import CTAbutton from '../../common/CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({position, heading, subHeading, CTAbtn1, CTAbtn2, codeBlock, backgroundGradient, codeColor}) => {
    return (
        <div className={`flex ${position} my-16 justify-center gap-36 align-top`}>
            
            <div className='w-[50%] flex-col  '>
                <div className='text-4xl'>
                    {heading}
                </div>
                <div className=' text-richblack-300 text-[17px] tracking-wide font-[500px] mt-6 '>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-9' >
                    <CTAbutton active={CTAbtn1.active} linkTo={CTAbtn1.linkto}  >
                        <div className='flex gap-2 items-center' >
                            {CTAbtn1.text}
                            <FaArrowRight/>
                        </div>
                    </CTAbutton >

                    <CTAbutton active={CTAbtn2.active} linkTo={CTAbtn2.linkto}  >
                        <div className='flex gap-2 items-center' >{CTAbtn2.text}</div>
                    </CTAbutton >
                </div>
            </div>

            {/* Section 2 Coding Animation */}
            <div className='w-[100%] flex items-start justify-start h-fit py-4 text-[10px] gap-2 lg:w-[500px] bg-blur-[1px] border--[1px]  pt-0  '>

                <div className={`absolute w-96 h-64 left-[calc(50% - 372.95px/2 - 76.53px)] top-[calc(50% - 257.05px/2 - 47.47px)]  opacity-[0.2] filter-[var(blur: 34px)] transform-matrix-3d(1, 0, -0.03, 1, 0, 0) ${backgroundGradient}`}   >

                </div>

                <div className='text-center font-[500px] text-[15px]  leading-[25px] flex flex-col w-[10%] text-richblack-400  font-inter  '  >
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                    <p>13</p>
                </div>

                <div className={`w-[90%] flex-col gap-[22px] text-[15px] leading-[25px] font-[500px] tracking-wider  font-mono ${codeColor}   `}   >
                    <TypeAnimation 
                    style={
                        {
                            display: 'block',
                            whiteSpace: "pre-line", 
                            
                            
                        }
                    }
                    sequence={[codeBlock, 10000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation = {true}
                    curson={true}
                    wrapper={'div'}
                    />
                </div>
                

                <div>

                </div>
            </div>

        </div>
    )
}

export default CodeBlocks