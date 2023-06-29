import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'

const timeline = [
    {
        Logo : logo1,
        Heading : 'Leadership',
        Description : 'Fully committed to the success of the company'
    },
    {
        Logo : logo2,
        Heading : 'Leadership',
        Description : 'Fully committed to the success of the company'
    },
    {
        Logo : logo3,
        Heading : 'Leadership',
        Description : 'Fully committed to the success of the company'
    },
    {
        Logo : logo4,
        Heading : 'Leadership',
        Description : 'Fully committed to the success of the company'
    },
]


const TimelineSection = () => {
  return (
    <div className='' >
        <div className='flex gap-16 items-center mt-[4rem] '>

            <div className='flex flex-col   ' >
                {
                    timeline.map((element , index) => {
                        return(
                            <div className='flex flex-col gap-[1rem] mt-[1rem] ' key={index} >

                                <div className='flex flex-row justify-center items-center gap-6'>

                                <div className=' h-[52px] min-w-[52px] bg-white shadow-lg shadow-[rgba(0,0,0,0.12)] flex justify-center items-center rounded-full  p-[4px]       ' >
                                    
                                    <img height='19px' width='19px' src={element.Logo} alt='' />
                                    
                                </div>

                                <div>
                                    <h2 className=' text-[18px] text-richblack-900  font-[500px]' >{element.Heading}</h2>
                                    <p className='text-[15px] font-[250px] leading-[24px] text-richblack-700 '>{element.Description}</p> 
                                </div>
                                </div>


                                {
                                    index !== (timeline.length - 1) ? 
                                    
                                    <div className='h-[3.5rem]  w-[1px] border-r border-dashed border-black translate-x-[25px] '> </div>
                                    : 
                                    ''
                                        
                                    
                                }

                                </div>

                                

                        )
                        })
                        }
                </div>

                <div className='relative my-0 '>

                    {/* <div className='absolute w-[750px] height-[480px] left- top- bg-gradient-[117deg] from-[#9cecfb] via-[#65c7f7] to-[#0052d4] opacity-[0.6] blur-[34px] z-10  order-3 ' >
                    </div> */}

                <div className='mt-14 mx-auto  z-20'>
                    <div className='lg:w-[680px] relative bg-white z-30  '>
                        <div className='lg:w-[680px]   -translate-y-[15px] -translate-x-[15px] z-40 order-2 '>
                            <img src={TimelineImage} alt={''}></img>
                        </div>
                    </div>
                </div>

                <div className='absolute w-[511px] h-[128px]  translate-x-[70px] -translate-y-[75px] padding-[42px] gap-[52px]  bg-caribbeangreen-700 flex text-white uppercase py-10 mx-auto  z-40 '>

                    <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-200 px-7  '>
                        <p className='text-3xl font-[500px] '>10</p>
                        <p className='text-caribbeangreen-300 text-sm  ' >Years of Experience</p>
                    </div>

                    <div className='flex flex-row gap-5 items-center  px-7  '>
                        <p className='text-3xl font-[500px] '>250</p>
                        <p className='text-caribbeangreen-300 text-sm  ' >Types of courses</p>
                    </div>

                </div>

                <div>

                </div>



                </div>
            </div>
    </div>
    
  )
}

export default TimelineSection