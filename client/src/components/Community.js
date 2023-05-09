import '../App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';

function Community() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState(undefined);

  let li = null;

  useEffect(() => {
    async function fetchData() {
      try {
        let { data } = await axios.get('http://localhost:5000/posts');
        setPostsData(data)
        setIsLoading(false)
        console.log(data);
      } catch (e) {
        setIsLoading(true)
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const buildCard = (post) => {
    return (

      <div className="Community">
        Community

        <div class="communityContainer">
          <div class=" cards">
            <div class="card">
              <h2>{post.title}</h2>
              <div class="card__content">
                <p>
                  {post.content}
                </p>
                <div>Posted by: {post.username}</div>
                <div class="card_stats">
                  <div>
                    <p>Likes: {post.likes.length} </p>
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
  li = postsData && postsData.map((post) => {
    return buildCard(post);
  });
  return (
    <div className="App-body">
      <ul className="list-unstyled">{li}</ul>
    </div>
  );
}

export default Community;
