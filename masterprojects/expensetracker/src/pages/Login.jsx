
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const Login = () => {
    const navigate = useNavigate();

    const { user, setUser } = useAuth();

    const [formdata, setFormData] = useState({
        email: "",
        password: ""
    });

    const handlechange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formdata,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`http://localhost:3000/users?email=${formdata.email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const result = await res.json();




            if (result.length > 0 && result[0].email == formdata.email && result[0].password == formdata.password) {
                let storeUser = result[0];
                setUser(storeUser)
                localStorage.setItem('userlogin', JSON.stringify(storeUser))
                alert("User Login")


                if (storeUser?.role === "admin") {
                    navigate('/admindash')
                } else {
                    navigate('/dash')
                }

            } else {
                alert("Invalid Email or Password")
            }


        } catch (err) {
            console.log(err);
        }
    };


    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg border-0 p-4" style={{ width: "100%", maxWidth: "420px" }}>

                <h1 className="text-center text-primary mb-4">
                    Login User
                </h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formdata.email}
                            onChange={handlechange}
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
                            value={formdata.password}
                            onChange={handlechange}
                            placeholder="Enter Password"
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 py-2">
                        Login
                    </button>
                </form>

                <hr className="my-4" />

                <p className="text-center mb-0">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-decoration-none fw-semibold">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}



export default Login;