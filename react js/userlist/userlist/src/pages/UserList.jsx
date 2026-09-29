import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const UserList = () => {

    const navigate = useNavigate();

     const [users,setUsers] = useState(
            localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : []
     )

     const [filter,setFilter] = useState([]);

     const [searchName,setSearchName] = useState("");

     const [sorting,setSorting] = useState("");

     const [city,setCity] = useState("")

     
     

     const filterFunction = () => {
        let filteredNames = [...users];
        if(searchName){
            filteredNames = users.filter((item)=>{
                return item.name.toLowerCase().includes(searchName.toLowerCase())
            })
        }

        if(sorting){
            if(sorting === "asc"){
                filteredNames.sort((a, b) => {
                    return a.name.localeCompare(b.name);
                });
            }else{
                filteredNames.sort((a, b) => {
                    return b.name.localeCompare(a.name);
                });
            }
           
        }

        if(city){
            filteredNames = users.filter(val => val.city === city);
            console.log(filteredNames);
            
        }

         setFilter(filteredNames)

        
     }


     //search wise name useeffect working
     useEffect(()=>{
        setFilter(users)
        filterFunction();
     },[searchName,sorting,city])



     const handleDelete = (id) => {
        let did = users.filter(val => val.id != id);
        localStorage.setItem('users',JSON.stringify(did));
        alert("delete user");
        setUsers(did);
     }

  return (
    <div align="center">
        <h2>User List</h2>
        <input type="text" onChange={ (e) => setSearchName(e.target.value) } value={searchName}placeholder='search name'/>
        <hr />

        <select name='sorting' onChange={ (e) => setSorting(e.target.value) }>
            <option value="">---Select Sort---</option>
            <option value="asc">Asc</option>
            <option value="dsc">Dsc</option>
        </select>
        <hr />

        <select name='city' onChange={ (e) => setCity(e.target.value)} value={city}>
            <option>---select city---</option>
            <option value="surat">surat</option>
        </select>
            <hr />

        <table width="500" border="1">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Name</td>
                    <td>Email</td>
                    <td>City</td>
                    <td>Action</td>
                </tr>
            </thead>
            <tbody>
                {
                    filter.map((user)=>{
                        return (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.city}</td>
                                <td>
                                    <button onClick={ () => handleDelete(user.id) }>Delete</button>
                                    <button onClick={ () => navigate(`/edit/${user.id}`) }>Edit</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        <hr />
        <Link to={`/add`}>Add User</Link>
    </div>
  )
}

export default UserList