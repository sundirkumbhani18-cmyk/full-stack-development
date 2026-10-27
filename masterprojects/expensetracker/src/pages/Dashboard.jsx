import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const {user,setUser} = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('userlogin')
        setUser(null)
        alert("Logout")
        navigate('/');
    }
  
  return (
    <div>
        <h1>Admin :- {user?.name}</h1>


        <button onClick={ () => handleLogout() }>Logout</button>
    </div>
  )
}

export default Dashboard