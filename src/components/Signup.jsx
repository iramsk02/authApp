import { React, useState, handleChange } from 'react'
import './Home.css'
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();

    axios({
      // Endpoint to send files
      url: "http://localhost:5000/signup",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(formData),

      // Attaching the form data
      data: formData,
    })
      // Handle the response from backend here
      .then((res) => {
        // alert("user signed up")
        alert(res.data.message)
        console.log(res.data);
      })

      // Catch errors if any
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <h1 className='signupheading'>Enter Credentials to SignUp</h1>
      <div className='signupcontainer'>
        <form onSubmit={handleSubmit}>
          <div className="username1"> <label >Username:</label>
            <input value={formData.username} type="text" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="email1">
            <label >Email:</label>
            <input value={formData.email} type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="password1">
            <label >Password:</label>
            <input value={formData.password} type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" onClick={handleSubmit}>Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
