import React, { useState } from 'react';
import axios from 'axios';

function Community() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setErrorCode] = useState(false);
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }

  const handleContentChange = (event) => {
    setContent(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userId = '123'; // replace with actual user ID
    const postForm = { title, content };

    try {
      const response = await axios.post(`/posts/${userId}`, postForm);
      console.log(response.data); // do something with the response
    } catch (error) {
      setErrorCode(true);
      console.error(error);
    }

    setTitle('');
    setContent('');
  }

  return (
    <div className="Community">
      Community
      <div class="communityContainer">
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={handleTitleChange} />
          </label>
          <label>
            Content:
            <textarea value={content} onChange={handleContentChange} />
          </label>
          <button className="addPostButton">Add Post</button>
        </form>
        <div class=" cards">
          <div class="card">
            <h2>EXAMPLE community post title: What do I try in New York?</h2>
            <div class="card__content">
              <p>
                EXAMPLE post details: Think you're up to the challenge. Recently picked up running and trying to keep improving
              </p>
              <div>Posted by: user</div>
              <div class="card_stats">
                <div>
                  <p>Likes: </p>
                </div>
                <div>
                  <p>Comments: </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Community;
