import React from 'react'
import { toast } from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar/Sidebar'

const Dashboard = () => {
  const { loading: authLoading } = useSelector((state) => state.auth)
  const { loading: profileLoading } = useSelector((state) => state.profile)

  if (authLoading || profileLoading) {
    return (
      <div className="flex justify-center items-center mx-auto absolute inset-0">
        {toast.loading('Loading')}
        Loading...
      </div>
    )
  }

  return (
    <div className=" relative flex min-h-[calc(100vh-3.5rem)]">
      <Sidebar></Sidebar>
      <div className="h-[calc(100vh-3.5rem)] overflow-auto flex-1 ">
        <div className="mx-auto w-11/12 max-w-[1080px] py-10 ">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
