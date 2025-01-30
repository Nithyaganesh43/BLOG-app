import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaTrash, FaHeart, FaShare } from 'react-icons/fa';
import moment from 'moment';
import './BlogInfo.css';

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

const fetchBlogData = (id, setBlog) => {
  fetch('https://ping-server-2.onrender.com/getOneFullBlog', {
    method: 'POST',
    body: JSON.stringify({ blogId: id }),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((data) => {
      setBlog(data);
    });
};

const like = async (id) => {
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

const BlogInfo = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [comment, setComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserInfo(setUser);
  }, []);

  useEffect(() => {
    fetchBlogData(id, setBlog);
  }, [id]);

  const addComment = async () => {
    if (!comment.trim()) return;
    await fetch('https://ping-server-2.onrender.com/addCommentBlog', {
      method: 'POST',
      body: JSON.stringify({ blogId: id, message: comment }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchUserInfo();
    fetchBlogData(id, setBlog);
    setComment('');
  };

  const deleteComment = async (commentId) => {
    await fetch('https://ping-server-2.onrender.com/deleteCommentBlog', {
      method: 'POST',
      body: JSON.stringify({ blogId: id, commentId }),
      headers: { 'Content-Type': 'application/json' },
    });
    fetchUserInfo();
    fetchBlogData(id, setBlog);
  };
console.log(blog)
  return blog && user ? (
    <div className="BlogInfocontainer">
      <div className="BlogInfocontent">
        <p dangerouslySetInnerHTML={{ __html: blog.processedContent }} />
        <div className="BlogInfofooter-section">
          <div className="BlogInfoauthor">
            <img
              src={blog.author[0]?.profileUrl || ''}
              alt={blog.author[0]?.fullName || 'Author'}
            />
            <span>{blog.author[0].fullName}</span>
          </div>
          <button
            className="BlogInfoicon-button"
            onClick={async () => {
              await like(id);
              fetchBlogData(id, setBlog);
            }}>
            <FaHeart
              style={{
                color: blog.likes.includes(user.UserId) ? 'red' : 'white',
              }}
            />{' '}
            {blog.likes.length}
          </button>
          <button
            className="BlogInfoicon-button"
            onClick={async () => {
              try {
                await navigator.share({
                  title: 'Check this out!',
                  text: 'Interesting link:',
                  url: 'http://localhost:3000/blog/' + blog._id,
                });
              } catch (err) {
                console.error('Sharing failed', err);
              }
            }}
            style={{
              color: 'white',
            }}>
            <FaShare
              style={{
                color: 'white',
              }}
            />
            share
          </button>
        </div>
        <h2>Comments</h2>
        <textarea
          id="commentSection"
          className="BlogInfocomment-input"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />
        <button className="BlogInfobutton" onClick={addComment}>
          Post
        </button>
        {blog.comments.map((c) => (
          <div className="BlogInfocomment" key={c._id}>
            <div>
              <div className="BlogInfocommenter">
                <img
                  src={c.user[0].profileUrl || ''}
                  alt={c.user[0]?.fullName || 'Anonymous'}
                />
                <p>{c.user[0]?.fullName || 'Anonymous'}</p>
              </div>
              <p id="cmt">{c.text}</p>
              <p>{moment(c.createdAt).fromNow()}</p>
              {user?.UserId === c.user[0]?.UserId && (
                <div className="BlogInfoactions">
                  <button
                    className="BlogInfoicon-button"
                    onClick={() => {
                      deleteComment(c.createdAt);
                    }}>
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="BlogInfocontainer">Loading...</div>
  );
};

export default BlogInfo;
