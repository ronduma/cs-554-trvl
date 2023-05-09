// import '../App.css';
// import React, { useState, useEffect } from 'react';
// import { Link, useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, Typography, } from '@mui/material';
// import { useLocation } from 'react-router-dom'

// const PostDetails = () => {
//     //take in a whole post, content , title, user posted, likes, and comments
//     // const { postId } = useParams();
//     // const [postData, setPostData] = useState(undefined);
//     const [loading, setLoading] = useState(true);
//     const [postData, setPostData] = useState(undefined)
//     const location = useLocation();

//     const data = location.state;
//     // const classes = useStyles();

//     const [error, setErrorCode] = useState(false);



//     // useEffect((post) => {
//     //     async function fetchPostData() {
//     //         try {
//     //             const { response } = await axios.get(`/posts/${post.data._id}`);
//     //             setPostData(response);
//     //             setLoading(false);
//     //             console.log(postData);
//     //         } catch (e) {
//     //             console.error(e);
//     //             setErrorCode(true);
//     //         }
//     //     }
//     //     fetchPostData();
//     // }, [])

//     if (error) {
//         return (
//             <div>
//                 <h2>Error 404: Post cannot be found</h2>
//             </div>
//         )
//     } else {
//         return (
//             setPostData(axios.get(`/posts/${data.post._id}`))

//             // <div className="post">
//             //     <Link to="/community">
//             //         <button>Back to Community</button>
//             //     </Link>
//             //     <br></br>
//             //     <br></br>
//             //     <Grid>
//             //         <Grid>
//             //             <Card className="postCard"
//             //                 variant="outlined"
//             //                 sx={{
//             //                     maxWidth: 500,
//             //                     height: 'auto',
//             //                     marginLeft: 'auto',
//             //                     marginRight: 'auto',
//             //                     paddingBottom: '20px',
//             //                     borderRadius: 5,
//             //                     border: '1px solid #1e8678',
//             //                     boxShadow:
//             //                         '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
//             //                 }}>
//             //                 <CardActionArea>
//             //                     <Typography
//             //                         // className={classes.titleHead}
//             //                         gutterBottom
//             //                         variant="h6"
//             //                         component="h3"
//             //                     >
//             //                         {postData.title}
//             //                     </Typography>
//             //                     <Typography
//             //                         variant="body2"
//             //                         color="textSecondary"
//             //                         component="p"
//             //                     >
//             //                         {postData.content}
//             //                     </Typography>
//             //                     <Typography
//             //                         variant="body2"
//             //                         color="textSecondary"
//             //                         component="p"
//             //                     >
//             //                         {postData.likes}
//             //                     </Typography>
//             //                     <Typography
//             //                         variant="body2"
//             //                         color="textSecondary"
//             //                         component="p"
//             //                     >
//             //                         {postData.replies}
//             //                     </Typography>
//             //                 </CardActionArea>
//             //             </Card>
//             //         </Grid>
//             //     </Grid>
//             // </div>
//             // console.log("im tired")

//         )
//     }
// }

// export default PostDetails;
