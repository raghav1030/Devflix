import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const OpenRoute = ({children}) => {

    const {token} = useSelector((state) => (state.auth))
    const navigate = useNavigate()

    if(token === null){
        return children
    }
    else{
        navigate('/dashboard/my-profile')
    }
    
}

export default OpenRoute