import React from 'react'
import {NavLink} from 'react-router-dom' 

const CTAbutton = ({children, active, linkTo}) => {
    return (
        <NavLink to={linkTo}>
            <div className={`text-center text-[16px] py-[12px] px-[24px]  rounded-md font-bold ${active ? 'bg-yellow-50 shadow-button-active-primary text-richblack-900 ': 'bg-richblack-800 shadow-button-active-secondary'} transition-all duration-100 hover:scale-95 ease-in-out `} >
                {children}
            </div>
        </NavLink>
    )
}

export default CTAbutton