import { useState } from "react";

const FormValidation = () => {

    const [formData,setFormData] = useState({
        name : '',
        email : '',
        password : '',
        gender : '',
        hobby : [],
        city : ''
    })

    const handleChange = (e) => {

        const {name , value , checked , type} = e.target

        if(type === "checkbox"){
            let hob = [...formData.hobby];
            if(checked){
                hob.push(value);
            }else{
                hob = hob.filter((item)=>{
                    return item != value
                })
            }
            setFormData({
                ...formData,
                hobby : hob
            })
        }else{
            setFormData({
                ...formData,
                [name] : value
            })
        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
    }

    

    return (
        <>
            <div>
                <h2>Registration Form</h2>

                <form onSubmit={handleSubmit}>

                    {/* Name */}
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />

                    <br /><br />

                    {/* Email */}
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    <br /><br />

                    {/* Password */}
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter password"
                    />

                    <br /><br />

                    {/* Gender */}
                    <label>Gender:</label>

                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={handleChange}
                    />
                    Male

                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={handleChange}
                    />
                    Female

                  
                   

                    <br /><br />

                    {/* Hobby */}
                    <label>Hobby:</label>

                    <input
                        type="checkbox"
                        name="hobby"
                        value="Cricket"
                        onChange={handleChange}
                    />
                    Cricket

                    <input
                        type="checkbox"
                        name="hobby"
                        value="Music"
                        onChange={handleChange}
                    />
                    Music

                    <input
                        type="checkbox"
                        name="hobby"
                        value="Reading"
                        onChange={handleChange}
                    />
                    Reading

                    <input
                        type="checkbox"
                        name="hobby"
                        value="Gaming"
                        onChange={handleChange}
                    />
                    Gaming

                    <br /><br />

                    {/* City */}
                    <label>City:</label>

                    <select
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                    >
                        <option value="">-- Select City --</option>
                        <option value="Surat">Surat</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                    </select>

                    <br /><br />

                    <button type="submit">Submit</button>

                </form>
            </div>
        </>
    )
}
export default FormValidation;