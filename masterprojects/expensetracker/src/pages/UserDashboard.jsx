import React from 'react'
import { useAuth } from '../context/AuthContext'

const UserDashboard = () => {

    const {user} = useAuth()
    
  return (
    <div>
        <h1>Welcome to User :- {user?.name}</h1>
    </div>
  )
}

export default UserDashboard