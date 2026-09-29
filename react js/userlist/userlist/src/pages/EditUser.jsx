import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {

    const navigate = useNavigate();

    const {userid} = useParams();

     const [users,setUsers] = useState(
                localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
        )

        const [formdata,setFormData] = useState({
            name : '',
            email : ''
        })
    

    useEffect(()=>{
       
        let single = users.find(val => val.id == userid);
        setFormData({
            name : single?.name || " ",
            email : single?.email || " "
        })
        
        
    },[userid])



  
    
        const handleChange = (e) => {
            const {name,value} = e.target
    
            setFormData({
                ...formdata,
                [name] : value
            })
        }
    
        const handleSubmit = (e) => {
            e.preventDefault();

            let up = users.map((val)=>{
                if(val.id == userid){
                    val.name = formdata.name,
                    val.email = formdata.email
                }
                return val;
            })
            localStorage.setItem('users',JSON.stringify(up));
            alert("user update")
            navigate('/');
        }

  return (
    <div align="center">
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Name :{" "}
          <input
            type="text"
            name="name"
            onChange={handleChange}
            value={formdata.name}
          />
        </p>
        <p>
          Email :{" "}
          <input
            type="text"
            name="email"
            onChange={handleChange}
            value={formdata.email}
          />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
      <hr />
      <Link to={`/`}>View Users</Link>
    </div>
  );
};

export default EditUser;