import React, { useState } from 'react'
import { logout } from '../../../../services/operations/authOperations'
import {sidebarLinks} from '../../../../data/dashboard-links'
import { useDispatch, useSelector } from 'react-redux' 
import { toast } from 'react-hot-toast'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../../../common/ConfirmationModal'

const Sidebar = () => {
    const {loading : authLoading} = useSelector((state) => state.auth)
    const {loading : profileLoading, user} = useSelector((state) => state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [confirmationModal, setConfirmationModal] = useState(null)

    if(authLoading || profileLoading) {
        return <div className='flex justify-center items-center mx-auto absolute inset-0' >
            {toast.loading("Loading")}
            Loading...
        </div>
    }
return (
    <div className='' >
        <div className='bg-richblack-800 flex  flex-col border-r-richBlack-700 py-16 h-[calc(100vh-3.5rem)] min-w-[222px] ' >
            <div className='flex flex-col  ' >
                {
                    sidebarLinks.map((link) => {
                        if (link.type && user?.accountType !== link.type) return null
                        return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                        )
                })
            }
            </div>

            <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600 ' ></div>

            <div className='flex flex-col ' >
                <SidebarLink link={{name : "Settings", path: "dashboard/settings"}} iconName={"VscSettings"}   ></SidebarLink>

                <button onClick={() => setConfirmationModal({
                    text1 : "Are you sure?",
                    text2 : "You will be logged out of your account!",
                    btn1Text : "Logout",
                    btn2Text : "Cancel",
                    btn1Handler : ()=> {dispatch(logout(navigate))},
                    btn2Handler : ()=> setConfirmationModal(null)
                })}  
            className="px-8 py-2 text-sm font-medium text-richblack-300" >
                    <div className="flex items-center gap-x-2  ">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>    
            </div>
        </div>

    {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
)
}

export default Sidebar