import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const AddUser = () => {
    const navigate = useNavigate();
    const [users,setUsers] = useState(
        localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
    )

    const [formdata,setFormData] = useState({
        name : '',
        email : '',
        city : ''
    })

    const handleChange = (e) => {
        const {name,value} = e.target

        setFormData({
            ...formdata,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        

        let newUser = {
            id : Date.now(),
            ...formdata
        }

       let alluser = [...users,newUser];
       localStorage.setItem('users',JSON.stringify(alluser));

       alert("user register")
       navigate('/');

        
        
       
    }

  return (
    <div align="center">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
            <p>
                Name : <input type="text" name='name'onChange={handleChange} value={formdata.name}/>
            </p>
             <p>
                Email : <input type="text" name='email' onChange={handleChange} value={formdata.email}/>
            </p>
            <p>
                <label>
                    city
                </label>
                <input type="text" name="city" onChange={handleChange} value={formdata.city}/>
            </p>
             <p>
                <input type="submit" />
            </p>
        </form>
        <hr />
        <Link to={`/`}>View Users</Link>
    </div>
  )
}

export default AddUser