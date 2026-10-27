import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();
    const [formdata,setFormdata] = useState({
        name : '',
        email : '',
        password : '',
        role : 'user'
    })

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormdata({
            ...formdata,
            [name] : value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try{
            const res = await fetch(`http://localhost:3000/users`,{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(formdata)
            })
            let result = await res.json();
            console.log(result);
            alert("users add")
            navigate('/');
             
        }catch(err){
            console.log(err);
            return false;
        }
        
    }

return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">

        <div className="card shadow-lg border-0 p-4"
             style={{ width: "100%", maxWidth: "450px" }}>

            <h1 className="text-center text-primary mb-4">
                Register User
            </h1>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name" className="form-label fw-semibold">
                        Name
                    </label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter Name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter Email"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="form-control"
                        onChange={handleChange}
                        placeholder="Enter Password"
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 py-2">
                    Register
                </button>

            </form>

            <hr className="my-4" />

            <p className="text-center mb-0">
                Already have an account?{" "}
                <Link to="/" className="text-decoration-none fw-semibold">
                    Login
                </Link>
            </p>

        </div>
    </div>
);

}

export default Register