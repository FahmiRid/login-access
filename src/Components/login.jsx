import React, { useState } from "react";
import axios from 'axios';
import '../styles/login.css';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update the handleSubmit function in login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:5000/api/login', formData);
    const { user } = response.data;
    console.log(user);
    navigate('/home', { state: { user } }); // Pass the user object in the state
  } catch (error) {
    console.error('Login failed:', error.response.data.message);
  }
};


  return (
    <div className="login-container">
      <form className="form" onSubmit={handleSubmit}>
        <ul className="wrapper">
          <li style={{ "--i": 4 }}>
            <input
              className="input"
              type="text"
              placeholder="Name"
              required
              name="username"  // Added the 'name' attribute
              value={formData.username}  // Added the 'value' attribute
              onChange={handleChange}  // Added the 'onChange' handler
            />
          </li>
          <li style={{ "--i": 3 }}>
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </li>
          <li style={{ "--i": 1 }}>
            <button type="submit">Submit</button>
          </li>
        </ul>
      </form>
    </div>
  );
}
