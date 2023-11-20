import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Adjust the path as needed
import WelcomeScreen from './components/WelcomeScreen';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserProfile from './components/UserProfile';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap your routes with AuthProvider */}
        <div className="App">
          <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            {/* Dynamic route for UserProfile */}
            <Route path="/profile/:_id" element={<UserProfileWrapper />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

// Wrapper component to pass _id to UserProfile
const UserProfileWrapper = () => {
  // Use the useAuth hook to access the authentication context
  const { isLoggedIn } = useAuth();

  // Retrieve _id from URL parameters
  const { _id } = useParams();

  return isLoggedIn ? <UserProfile _id={_id} /> : <div>Please log in to view this page.</div>;
}

export default App;
