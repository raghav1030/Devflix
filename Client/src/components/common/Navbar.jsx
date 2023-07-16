import React, { useState } from 'react'
import { NavLink, matchPath, matchRoutes, useLocation, useParams } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import  {NavbarLinks} from '../../data/navbar-links'
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import ProfileDropdown from '../core/auth/ProfileDropdown'
import { useEffect } from 'react'
import { apiConnector } from '../../services/ApiConnector'
import { categories } from '../../services/ApiEndpoints'
import {FiChevronDown } from 'react-icons/fi'
import { ACCOUNT_TYPE } from '../../utils/constants'


const Navbar = () => {

    const {token} = useSelector((state) => state.auth)
    const  {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)

    const location = useLocation()

    const [subLinks, setSubLinks] = useState([''])

    // const subLinks = [
    //     {
    //         title : 'Python',
    //         link : "/catalog/python"
    //     },
    //     {
    //         title : 'Web Development',
    //         link : "/catalog/web-development"
    //     },
    // ]
    

    async function fetchApi(){
        try {
            console.log( "Category api ", categories.CATEGORIES_API)

            const result = await apiConnector('get', categories.CATEGORIES_API)
            console.log("Printing sublinks data : " , result)
            console.log( "Category api result", result.data)
            setSubLinks(result.data.data)
        } catch (e) {
            console.log("Something went wrong while fetching API")
            console.error(e)
        }
    }

    console.log(subLinks)

    useEffect( () => {
        fetchApi()
    }, [])
    

    const matchRoutes = (route) =>{
        return matchPath({path:route}, location.pathname)
    }

    return (
    <nav className='w-screen flex  h-14 items-center justify-center border-b border-richblack-600 '>
        <div className='max-w-maxContent w-11/12 flex items-center justify-between  '>
            <div>
                <NavLink to={'/'} >
                    <img src={logo} alt="Study Notion" height={42} width={160} />
                </NavLink>
            </div>

        
            <ul className='flex  gap-x-6 text-richblack-25' >
                {
                    NavbarLinks.map((link, index) => {
                        return <li key={index}>
                                    {
                                        link.title === 'Catalog' ? 
                                        (
                                        <div className='flex items-center justify-center group cursor-default gap-1  relative   text-richblack-5'>
                                            <p className=' '>{link.title} </p>
                                            
                                            <FiChevronDown/>

                                            <div className='group-hover:visible hover:visible absolute invisible lg:w-fit w-max bg-richblack-5  text-richblack-900 h-fit flex flex-col gap-3 rounded-md transition-all duration-200 ease-in translate-y-[20%] translate-x-[-50%] py-4 px-2  left-[50%] top-[50%] z-50 '>
                                                <div className='absolute left-[50%] top-0 h-[18px] w-[18px] rotate-45 rounded-sm bg-richblack-5 -translate-y-2 translate-x-[20px] '>    
                                                </div>

                                                {
                                                        subLinks?.length && (
                                                            
                                                            subLinks
                                                                .map((subLink, i) => (
                                                                  <NavLink
                                                                    to={`/catalog/${subLink?.name
                                                                    //   .split(" ")
                                                                    //   .join("-")
                                                                    //   .toLowerCase()
                                                                    }  `
                                                                    }
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                  >
                                                                    <p>{subLink.name}</p>
                                                                  </NavLink>
                                                                ))
                                                            
                                                        )  
                                                        
                                                    }
                                            </div>
                                        </div>
                                        ) : 
                                        (
                                            <NavLink to={link?.path} > <p  className={`${matchRoutes(link?.path) ? "text-yellow-300" : "text-richblack-5"}`} > {link.title} </p> </NavLink>
                                        )
                                    }
                                </li>
                    }) 
                }
            </ul>

                <div className='flex gap-x-4 items-center ' >
                    {
                        user && user?.accountType !== 'Instructor' && (
                            <NavLink to='/dashboard/cart'  >
                                <div className='relative '>
                                    <AiOutlineShoppingCart className='w-7 h-7'/>

                                    {
                                        totalItems > 0 &&
                                        <span>
                                            {totalItems}
                                        </span>
                                    }
                                </div>
                            </NavLink>
                        )
                    }

                    {
                        token === null && (
                            <NavLink to='/login'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[5px] text-richBlack-100 rounded-md '>
                                    Log in
                                </button>
                            </NavLink>
                        )
                    }


                    {
                        token === null && (
                            <NavLink to='/signup'>
                                <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[5px] text-richBlack-100 rounded-md '>
                                    Sign up
                                </button>
                            </NavLink>
                        )
                    }

                    {
                        token !== null && <ProfileDropdown></ProfileDropdown>
                    }
                </div>

        </div>
    </nav>
    )
}

export default Navbar