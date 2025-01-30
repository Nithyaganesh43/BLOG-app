import React, { useEffect, useState } from 'react';
import './Editblog.css';

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

const Editblog = () => {
  const [user, setUser] = useState(null);
  const [blog,setBlog]=useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserInfo(setUser);
    setBlog(JSON.parse(window.localStorage.getItem('editBlog')));
  }, []);
useEffect(()=>{
if(blog)
{
    console.log(blog)
    setTitle(blog.title);
    setDescription(blog.description);
    setCoverImageUrl(blog.coverImgUrl);
    setContent(blog.content);
}
},[blog])
  useEffect(() => {
    let preview = '';

    if (title) preview += `<div><h1>${title}</h1></div>`;
    if (description) preview += `<div><h2>${description}</h2></div>`;
    if (coverImageUrl)
      preview += `<img src="${coverImageUrl}" alt="Cover Image" style=" max-height:300px; border-radius:10px;"/>`;

    if (content) {
      const lines = content.split('\n');
      lines.forEach((line) => {
        if (line.trim().startsWith('***') && line.trim().endsWith('***')) {
          preview += `<div><h1>${line.trim().slice(3, -3)}</h1></div>`;
        } else if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
          preview += `<div><h2>${line.trim().slice(2, -2)}</h2></div>`;
        } else if (line.trim().startsWith('$') && line.trim().endsWith('$')) {
          preview += `<div><img style="max-width:300px; max-height:300px; border-radius:10px;" src="${line
            .trim()
            .slice(
              1,
              -1
            )}" alt="Image" style="width:100%;height:auto;"/></div>`;
        } else if (line.trim().startsWith('#') && line.trim().endsWith('#')) {
          preview += `<div><a href="${line.trim().slice(
            1,
            -1
          )}" target="_blank">${line.trim().slice(1, -1)}</a></div>`;
        } else if (line.trim().startsWith('%') && line.trim().endsWith('%')) {
          preview += `<div>${line.trim().slice(1, -1)}</div>`;
        } else {
          preview += `<div><p>${line}</p></div>`;
        }
      });
    }

    setPreviewContent(preview);
  }, [title, description, coverImageUrl, content]);

  const handleUpdate = async () => {
    if (!title || !description || !coverImageUrl || !content) {
      setError('All fields are required!');
      return;
    }

    setError('');  
    const blogData = {
        blogId:blog._id,
      title,
      coverImgUrl: coverImageUrl,
      description,
      content,
      processedContent: previewContent,
    };

    try {
      const response = await fetch(
        'https://ping-server-2.onrender.com/updateBlog',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(blogData),
        }
      );

      if (response.ok) {
        alert('Blog Updated successfully!');
        setTitle('');
        setDescription('');
        setCoverImageUrl('');
        setContent('');
        setPreviewContent('');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create the blog!');
      }
    } catch (error) {
      setError('An error occurred while creating the blog.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="blog-container">
      <div className="CreationContainer">
        <h1>Edit Your Blog Here</h1>
        <div className="author">
          <img
            src={user?.profileUrl}
            alt={user?.fullName}
            className="profile-pic"
          />
          <span>{user?.fullName}</span>
        </div>
        <div className="divider"></div>
        <h3>Title</h3>
        <input
          className="input-box Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h5>Description</h5>
        <input
          className="input-box Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h6>Cover Image Url</h6>
        <input
          type="URL"
          className="input-box CoverImageUrl"
          placeholder="CoverImageUrl"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
        <h6>Content</h6>
        <textarea
          className="textarea Content"
          rows={10}
          maxLength={2500}
          value={content}
          onChange={(e) => setContent(e.target.value)}></textarea>
        <p>Rules of writing content</p>
        <ul className="rules-list">
          <li>Heading ***Heading***</li>
          <li>SubHeadings **SubHeadings**</li>
          <li>PlainText plainText</li>
          <li>Image $imageUrl$</li>
          <li>Links #linkUrl#</li>
          <li>Iframe %iframeCode%</li>
        </ul>
        {error && <p className="error">{error}</p>}
      </div>
      <div className="previewContainer">
        <h3>Preview</h3>
        <div
          className="previewArea"
          dangerouslySetInnerHTML={{ __html: previewContent }}></div>
        <button className="publishButton" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
};

export default Editblog;
