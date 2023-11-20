import React, { useState, useEffect, useRef } from "react";
import PostCreation from './PostCreation'; // Adjust the import path as needed
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { useAuth } from '../contexts/AuthContext'; // Adjust the import path as needed
import { FaPencilAlt, FaSignOutAlt } from 'react-icons/fa'; // Import FaSignOutAlt and FaPencilAlt directly from 'react-icons/fa'
import "./UserProfile.css";

const UserProfile = () => {
  const { _id } = useParams();
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate(); // Add useNavigate hook

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
    about: "",
  });
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    if (!_id) {
      console.error("_id is undefined");
      return;
    }

    fetch(`http://localhost:3000/user/profile/${_id}`)
      .then((response) =>
        response.ok ? response.json() : Promise.reject("Failed to load")
      )
      .then((data) => setUserInfo(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, [_id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('profilePic', file);

      const response = await fetch(`http://localhost:3000/user/uploadProfilePic/${_id}`, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        // Assuming the backend returns the updated user data with the new profile pic
        setUserInfo(data);
      } else {
        console.error('Failed to upload profile picture');
      }
    } catch (error) {
      console.error('Error during image upload:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const getDefaultProfileImg = () => {
    if (userInfo.firstName && userInfo.lastName) {
      return `https://ui-avatars.com/api/?name=${userInfo.firstName}+${userInfo.lastName}&background=random&color=fff`;
    }
    return 'default_image_url_here';
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout actions here, e.g., clear user data, remove token, etc.
    setIsLoggedIn(false);

    // Navigate back to the WelcomeScreen
    navigate('/');
  };

  return (
    <div>
      <img src="/chatter-logo.png" alt="Chatter Logo" className="user-profile-logo" />
      <button className="logout-button" onClick={handleLogout}>
        <FaSignOutAlt className="logout-icon" /> {/* Modern logout icon */}
      </button>
      <div className="user-profile-container">
        <div className="profile-pic-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <img
            src={userInfo.profilePic || getDefaultProfileImg()}
            alt={`${userInfo.firstName}'s profile`}
            className="profile-pic"
          />
          {isHovering && (
            <div className="profile-pic-edit-overlay" onClick={triggerFileInput}>
              <FaPencilAlt className="edit-icon" />
            </div>
          )}
        </div>
        {userInfo.firstName || userInfo.lastName ? (
          <div className="user-info">
            <h1>{`${userInfo.firstName} ${userInfo.lastName}`}</h1>
          </div>
        ) : (
          <div className="user-info">
            <h1>Loading...</h1>
          </div>
        )}
        <div className="about-section">
          <h3>About Me</h3>
          <p>{userInfo.about}</p>
        </div>
        <div className="upload-section">
          <input type="file" ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        </div>
        
        {/* Add the PostCreation component here */}
        <PostCreation />
      </div>
    </div>
  );
};

export default UserProfile;
