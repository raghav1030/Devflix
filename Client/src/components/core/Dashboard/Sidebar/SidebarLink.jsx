import React from 'react'
import * as Icons from 'react-icons/vsc'
import { matchPath, useLocation ,  NavLink } from 'react-router-dom'
import { matchRoutes } from 'react-router-dom'


const SidebarLink = ({link, iconName}) => {
    const Icon = Icons[iconName]
    const location = useLocation()

    const matchRoutes = (route) => {
        return matchPath({path: route}, location.pathname)
    }

    return (
        <NavLink to={link?.path} className={`${matchRoutes(link?.path) ? 'bg-yellow-800' : 'bg-opacity-0'} relative text-sm font-medium px-8 py-2 transition-colors duration-200`} >

            <span className={`${matchRoutes(link?.path) ? "opacity-100 " : "opacity-0"} absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50  `} >
            </span>

                <div className='flex items-center gap-2 ' >
                    <Icon className='text-lg' ></Icon>
                    <span className={`  ${matchRoutes(link?.path) && 'text-richBlack=100  '} text-richBlack-100   `}  >{link?.name}</span>
                </div>

        </NavLink>
)
}

export default SidebarLink