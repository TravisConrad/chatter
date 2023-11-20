import React, { useState } from "react";
import "./LoginForm.css";
import "../Common.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as needed

const LoginForm = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth(); // Use the setIsLoggedIn function from the auth context
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const json = await response.json();
      if (response.status === 200) {
        setIsLoggedIn(true); // Update the global authentication state

        // Navigate to the profile page. Adjust as per your routing logic
        console.log(json._id);
        navigate(`/profile/${json._id}`);
      } else {
        // If login is not successful, alert the message from the server
        alert(json.message);
      }
    } catch (error) {
      alert("Error in logging in");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="email"
        name="email"
        className="form-input"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        className="form-input"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="form-button">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
