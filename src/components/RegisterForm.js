import React, { useState } from "react";
import "./RegisterForm.css";
import "../Common.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Adjust the import path as needed

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAuth(); // Use the setIsLoggedIn function from the auth context
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    dob: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);

    try {
      const response = await fetch("http://localhost:3000/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          dob: formData.dob,
          password: formData.password,
        }),
      });

      const json = await response.json();
      if (response.status === 201) {
        setIsLoggedIn(true); // Update the global authentication state

        // Navigate to the profile page. Adjust as per your routing logic
        navigate(`/profile/${json._id}`);
      } else {
        alert(json.message); // If registration is not successful, alert the message from the server
      }
    } catch (error) {
      alert("Error in registration");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="text"
        name="dob"
        value={formData.dob}
        onFocus={(e) => (e.target.type = "date")}
        onBlur={(e) => (e.target.type = "text")}
        onChange={handleChange}
        placeholder="Date of Birth"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />
      {passwordError && <p>Passwords do not match!</p>}
      <button type="submit" className="form-button">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
