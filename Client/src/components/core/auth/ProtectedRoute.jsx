import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {token} = useSelector((state) => (state.auth))

    if(token === null){
        return <Navigate to={'/login'} ></Navigate>
    }

    else{
        return children
    }
}

export default ProtectedRoute