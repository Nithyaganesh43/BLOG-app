import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  FaHeart,
  FaShare,
  FaComment,
  FaTrashAlt,
  FaEdit,
} from 'react-icons/fa';
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
    const userData = JSON.parse(localStorage.getItem('user')); 
    setUser(userData);
  } catch (error) {
    console.error('Error fetching user info:', error);
  }
};

const Profile = () => {
  
  const [activeTab, setActiveTab] = useState('MyBlogs');
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);  
  const navigate = useNavigate();
 const fetchData = async (setBlogs) => {
   try {
     const response = await fetch(
       'https://ping-server-2.onrender.com/getAllBlogs',
       {
         credentials: 'include',
       }
     );
     const data = await response.json();

     setBlogs(
       data.map((blog) => ({
         ...blog,
         likedByUser: blog.likes.includes(user?.UserId),
       }))
     );
   } catch (error) {
     console.error('Error fetching data:', error);
   }
 };
const deleteBlog = async (id) => {
  await fetch('https://ping-server-2.onrender.com/deleteBlog', {
    method: 'POST',
    body: JSON.stringify({ blogId: id }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });
  fetchData(setBlogs);
};

  useEffect(() => {
    fetchUserInfo(setUser);
  }, [setUser]);
  useEffect(() => {
   
    if (user?.UserId) {
      fetchData(setBlogs);
    }
  }, [user]);

  const like = async (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === id
          ? {
              ...blog,
              likes: blog.likes.includes(user?.UserId)
                ? blog.likes.filter((like) => like !== user?.UserId)
                : [...blog.likes, user?.UserId],
            }
          : blog
      )
    );
    try {
      await fetch('https://ping-server-2.onrender.com/addLikeBlog', {
        method: 'POST',
        body: JSON.stringify({ blogId: id }),
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };
 const filteredBlogs = blogs.filter((blog) => {
  
//  console.log(blog.author[0].UserId);
   if (activeTab === 'MyBlogs') {
     return blog.author[0].UserId === user?.UserId;
   } else if (activeTab === 'MyFavoriteBlogs') {
     return blog.likes.includes(user?.UserId);
   } else if (activeTab === 'MyComments') {
    
     return blog.comments.some(
       (comment) => (comment.user[0].UserId==user.UserId)
     );
   }
   return false;
 });
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

      <div className="tabs">
        <button onClick={() => setActiveTab('MyBlogs')}>My Blogs</button>
        <button onClick={() => setActiveTab('MyFavoriteBlogs')}>
          My Favorite Blogs
        </button>
        <button onClick={() => setActiveTab('MyComments')}>My Comments</button>
      </div>
      <div className="divider"></div>
      <MainSectionStyle>
        <BlogContainer>
          {filteredBlogs.map((blog) => {
            if (blog.author[0].UserId == user.UserId) {
              // const fetchBlogs = async () => {
              //   try {
              //     const response = await fetch('https://ping-server-2.onrender.com/getAllBlogs');
              //     const data = await response.json();
              //     setBlogs(data);
              //   } catch (error) {
              //     console.error('Error fetching blogs:', error);
              //   }
              // };

              // const filteredBlogs = blogs.filter((blog) => {
              //   if (activeTab === 'MyBlogs') {
              //     return blog.author[0].UserId === user?.UserId;
              //   } else if (activeTab === 'MyFavoriteBlogs') {
              //     return blog.likes.includes(user?.UserId);
              //   } else if (activeTab === 'MyComments') {
              //     return blog.comments.some((comment) => comment.author.UserId === user?.UserId);
              //   }
              //   return false;
              // });

              // return (
              //   <div className="Profile-container">
              //     <h1>Profile</h1>
              //     <div className="author">
              //       <img src={user?.profileUrl} alt={user?.fullName} className="profile-pic" />
              //       <span>{user?.fullName}</span>
              //     </div>
              //     <div className="divider"></div>

              return (
                <Blog key={blog._id}>
                  <CoverImage
                    src={blog.coverImgUrl}
                    alt={blog.title}
                    onClick={() => navigate(`/blog/${blog._id}`)}
                  />
                  <h3 onClick={() => navigate(`/blog/${blog._id}`)}>
                    {blog.title}
                  </h3>
                  <h5 onClick={() => navigate(`/blog/${blog._id}`)}>
                    {blog.description}
                  </h5>
                  <p onClick={() => navigate(`/blog/${blog._id}`)}>
                    Updated: {new Date(blog.updatedAt).toLocaleString()}
                  </p>
                  <p
                    onClick={() => navigate(`/blog/${blog._id}`)}
                    style={{
                      color: 'pink',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.textDecoration = 'underline')
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.textDecoration = 'none')
                    }>
                    Read Full Blog
                  </p>
                  <FooterSection>
                    <Author>
                      <img
                        src={blog.author[0]?.profileUrl || ''}
                        alt={blog.author[0]?.fullName || 'Author'}
                      />
                      <span>{blog.author[0]?.fullName || 'Anonymous'}</span>
                    </Author>
                    <ButtonContainer>
                      <IconButton onClick={() => like(blog._id)}>
                        <FaHeart
                          style={{
                            color: blog.likes.includes(user?.UserId)
                              ? 'red'
                              : 'white',
                          }}
                        />
                        {blog.likes.length}
                      </IconButton>
                      <IconButton>
                        <FaShare
                          onClick={async () => {
                            try {
                              await navigator.share({
                                title: 'Check this out!',
                                text: 'Interesting link:',
                                url:
                                  'https://blog-app-home.vercel.app/blog/' +
                                  blog._id,
                              });
                            } catch (err) {
                              console.error('Sharing failed', err);
                            }
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <FaComment
                          onClick={() => navigate(`/blog/${blog._id}`)}
                        />{' '}
                        {blog?.comments?.length}
                      </IconButton>
                      <IconButton>
                        <FaEdit
                          onClick={() => {
                            window.localStorage.setItem(
                              'editBlog',
                              JSON.stringify(blog)
                            );
                            navigate(`/Editblog`);
                          }}
                        />
                      </IconButton>
                      <IconButton>
                        <FaTrashAlt
                          onClick={() => {
                            deleteBlog(blog._id);
                          }}
                        />
                      </IconButton>
                    </ButtonContainer>
                  </FooterSection>
                </Blog>
              );
            }
          })}
        </BlogContainer>
      </MainSectionStyle>
    </div>
  );
}; 

export default Profile;
