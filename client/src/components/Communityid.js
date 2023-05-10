import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';
import CommentCard from './CommentCard';
import {
  Alert,
  Box,
  Button,
  // FormControl,
  IconButton,
  // Input,
  InputAdornment,
  // InputLabel,
  TextField,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import SendIcon from '@mui/icons-material/Send';
// import InputAdornment from '@mui/material/InputAdornment';

function Communityid() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [postsData, setPostsData] = useState(undefined);
  const [userData, setUserData] = useState(undefined);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState();
  const { id } = useParams();
  
  const commentSection = () => {
    setComments(
    <div>
      {postsData.replies.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
    )
  }

  useEffect(() => {
    axios.get('/profile', {
      withCredentials: true
    })
      .then(response => {
        if (!response.data) {
          navigate('/community')
        }
        setUserData(response.data);
        // console.log("USER DATA", response.data);
        setIsLoggedin(true);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error)
        setIsLoggedin(true);
        setIsLoading(false);
      });
  }, [navigate])
  useEffect(() => {
    async function fetchPost() {
      try {
        console.log("We are going to communityid")
        console.log(id)
        const data  = await axios.get(`http://localhost:5000/posts/${id}`);
        console.log("data is received")
        // console.log(data.data)
        setPostsData(data.data);
        setIsLoading(false);
        // console.log(data);
      } catch (e) {
        setIsLoading(true);
        console.log(e);
      }
    }
    fetchPost();
  }, [id]);

  useEffect(() => {
    if (userData && postsData && postsData.likes.includes(userData.username)) {
      setIsLiked(true);
    }
  }, [userData, postsData]);
  

  const handleLike = async (userId, postId) => {
    console.log(userId, postId)
    setIsLiked(!isLiked);
    try {   
      await axios.put(`http://localhost:5000/posts/like/${userId}/${postId}`, {comment: comment}, { withCredentials: true });
      setPostsData(prevState => ({
        ...prevState,
        likes: isLiked ? prevState.likes.filter(username => username !== userData.username) : [...prevState.likes, userData.username]
      }));
    } catch (error){
      console.log(error)
    }
  }

  const handleComment = (event) => {
    setComment(event.target.value);
    console.log(comment)
  }

  const buildCard1 = (post) => {
    // console.log("postid communityid")
    // console.log(post)
    return (
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
                  { userData && postsData && 
                    <Button onClick={() => handleLike(userData._id, postsData._id)}>
                    {isLiked ? <ThumbUpIcon></ThumbUpIcon>
                    : <ThumbUpOffAltIcon></ThumbUpOffAltIcon> 
                    }
                  </Button>}
                </div>
                <div>
                  <p>Comments: {post.replies.length}</p>
                </div>
              </div>              
            </div>
          </div>
        </div>
        <TextField
          multiline
          label="Leave a comment"
          onChange={handleComment}
          sx={{
            width: "35%"
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={async () => {
                  let newReply = await axios.put(`http://localhost:5000/posts/reply/${userData._id}/${postsData._id}`, {reply : comment}, { withCredentials: true });
                  
                }}>
                  <SendIcon/>
                </IconButton>
                {commentSection()}
              </InputAdornment>
            ),
          }}
        >
         
        </TextField>
        <div>{comments}</div>
      </div>
    );
  };
  if (postsData !== undefined) {
    return buildCard1(postsData);
  }
  else{
    return <p>Loading...</p>;
  }
}  

export default Communityid;