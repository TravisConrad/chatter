import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as needed
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth(); // Use the auth context
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // Redirect to the profile page if the user is already logged in
    if (isLoggedIn) {
      navigate('/profile');
    }
  }, [isLoggedIn, navigate]);

  const toggleLogin = () => {
    setIsLogin(!isLogin);
  };

  const handleRegistration = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data); // Handle the response from the backend (e.g., success or error)
      if (response.status === 201) {
        const userId = data._id; // Assuming the backend returns _id
        setIsLoggedIn(true); // Update the login state upon successful registration
        navigate(`/profile/${userId}`); // Navigate to the profile page with _id
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const handleLogin = async (userData) => {
    try {
      const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data); // Handle the response from the backend (e.g., success or error)
      if (response.status === 200) {
        const userId = data._id; // Assuming the backend returns _id
        setIsLoggedIn(true); // Update the login state upon successful login
        navigate(`/profile/${userId}`); // Navigate to the profile page with _id
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="welcome-container">
      <img src="/chatter-logo.png" alt="Chatter Logo" className="logo" />
      <h1 className="welcome-header">Welcome to Chatter</h1>
      {isLogin ? <LoginForm onLogin={handleLogin} /> : <RegisterForm onRegister={handleRegistration} />}
      <button onClick={toggleLogin} className="toggle-button">
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default WelcomeScreen;
