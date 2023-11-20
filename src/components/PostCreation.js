import React, { useState, useRef } from 'react';
import './PostCreation.css'; // Import the CSS file

const PostCreation = () => {
  const [postText, setPostText] = useState('');
  const textareaRef = useRef(null);

  const handlePostTextChange = (event) => {
    setPostText(event.target.value);
    // Auto-expand the textarea as needed
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    console.log('Text Post:', postText);
    setPostText('');
  };

  return (
    <div className="post-creation-container">
      <form onSubmit={handlePostSubmit}>
        <textarea
          ref={textareaRef}
          value={postText}
          onChange={handlePostTextChange}
          placeholder="Create a post"
          className="post-input"
        />
        <button type="submit" className="post-button">
          Post
        </button>
      </form>
    </div>
  );
};

export default PostCreation;
