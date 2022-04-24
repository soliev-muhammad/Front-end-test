import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PostCardMedia from './PostCardMedia.js';
import ModalWin from './ModalWin.js';

//Стилевая часть поста и соединение с картиной

function Post(props) {

  return (
    <Card 
        sx={{ maxWidth: 400,
              marginTop: 5, 
              left: 0,
              right: 0,
        }}>
      <PostCardMedia post={props.post}/>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.post.id}. {props.post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.post.body}
        </Typography>
      </CardContent>
      <CardActions>
        <ModalWin post={props.post}/>
      </CardActions>
    </Card>
  );
}

export default Post; 
