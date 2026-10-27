import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const Private = () => {

    const {user} = useAuth()

    useEffect(()=>{
        if(!user || user.role != "admin"){
            alert("You not access admin route")
            return <Navigate to={`/`} replace/>
        }
    },[])

    return <Outlet/>
}

export default Private