import React from 'react'
import CTAbutton from '../../common/CTAbutton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({position, heading, subHeading, CTAbtn1, CTAbtn2, codeBlock, backgroundGradient, codeColor}) => {
    return (
        <div className={`flex ${position} my-20 justify-between flex lg:gap-10 gap-10`}>
            
            {/* Section 1 */}
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-6  '>
                <div className='text-4xl'>
                    {heading}
                </div>
                <div className=' text-richblack-300 text-[17px] tracking-wide font-[500px]  '>
                    {subHeading}
                </div>
                <div className='flex gap-7 mt-7' >
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
            <div className={`h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] ${backgroundGradient}  `}>

                

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
                    sequence={[codeBlock, 1000, ""]}
                    repeat={Infinity}
                    omitDeletionAnimation = {true}
                    curson={true}
                    wrapper={'div'}
                    />
                </div>
                
            </div>

        </div>
    )
}

export default CodeBlocks