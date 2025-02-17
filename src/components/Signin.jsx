import { useState } from 'react'
import './Home.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
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

    axios.post("http://localhost:5000/signin", formData)
      .then(async (res) => {
        alert("User signed in");
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);

        // const newTodo = new Todo({userId:data.userId,token:data.token});
        // await newUser.save();

        // Ensure navigate happens after setting values
        setTimeout(() => {
          navigate("/todos");
        }, 500);
      })
      .catch((err,) =>{ console.error(err)
        alert("invalid credentials")
      });
  }

  return (
    <>
      <h1 className='signinheading'>Enter Credentials to SignIn</h1>
      <div className='signincontainer'>
        <form onSubmit={handleSubmit}>
          <div className="username2"> <label >Username:</label>
            <input value={formData.username} type="text" name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="email2">
            <label >Email:</label>
            <input value={formData.email} type="email" name="email" placeholder="Email" onChange={handleChange} required />
          </div>
          <div className="password2">
            <label >Password:</label>
            <input value={formData.password} type="password" name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <button type="submit" onClick={handleSubmit}>Sign In</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
