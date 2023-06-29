import React from 'react'

const Stats = [
    {
        count : "5K",
        label : "Active Students"
    },
    {
        count : "10+",
        label : "Mentors"
    },
    {
        count : "200+",
        label : "Courses"
    },
    {
        count : "50+",
        label : "Awards"
    },
]

const StatsComponent = () => {
  return (
    <div className='bg-richblack-800 flex  h-32 w-full items-center justify-center gap-32 mt-28 ' >

            {
                Stats.map((data, index) => (
                    <div key={index} className='flex flex-col justify-center items-center' >
                        <div className='text-richBlack-5 text-[22px] font-bold tracking-wide '  >
                            {data.count}
                        </div>

                        <div className='text-richblack-100 text-[18px] tracking-wide' >
                            {data.label}
                        </div>
                    </div>
                ))
            }

    </div>
  )
}

export default StatsComponent