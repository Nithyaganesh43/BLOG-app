import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHeart, FaShare, FaComment } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const MainSectionStyle = styled.section`
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #121212;
  color: #ffffff;
  padding: 2rem 0;
  flex-wrap: wrap;
`;

const BlogContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 80vw;
  background-color: #1e1e1e;
  padding: 3rem;
  border-radius: 10px;
  gap: 1rem;
  @media (max-width: 1024px) {
    width: 90vw;
    padding: 2rem;
  }
  @media (max-width: 768px) {
    width: 95vw;
    padding: 1rem;
  }
`;

const Blog = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  max-width: 350px;
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  flex: 1 1 300px;
  @media (max-width: 768px) {
    width: 100%;
  }
  h3,
  h5,
  p {
    margin: 10px 0;
  }
  p {
    font-size: 14px;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const FooterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 1rem;
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
  span {
    font-size: 0.9rem;
    color: #bbb;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #f39c12;
  }
  svg {
    margin-right: 5px;
  }
`;

const fetchUserInfo = async (setUser) => {
  try {
    const response = await fetch(
      'https://ping-server-2.onrender.com/getMyInfo',
      { credentials: 'include' }
    );
    const userData = await response.json();
    setUser(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  
    const [blogs, setBlogs] = useState([]);
    const [userId, setUserId] = useState(null); 
  useEffect(() => {
    fetchUserInfo(setUser);
  }, [setUser]);
  return (
    <div className="Profile-container">
      <h1>Profile</h1>
      <div className="author">
        <img
          src={user?.profileUrl}
          alt={user?.fullName}
          className="profile-pic"
        />
        <span>{user?.fullName}</span>
      </div>
      <div className="divider"></div>

      <h1>My Blogs</h1>
    </div>
  );
}; 

export default Profile;
