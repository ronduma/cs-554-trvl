import React, { useState, useEffect } from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material'


const CommentCard = ({ comment }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardHeader
        title={comment.username}
      />
      <CardContent>
        <Typography variant="body2" component="p">
          {comment.content}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;