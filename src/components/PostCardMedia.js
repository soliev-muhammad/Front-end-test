import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CardMedia from '@mui/material/CardMedia';

//блок для интеграции картины с постом

function PostCardMedia(props) {
      
  const [photos, setPhotos] = useState([])

  //Функция взятия картины из источника на основе id поста
  async function getPhotoByPostId(id) {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/albums/${props.post.id}/photos`);
    setPhotos(response.data);
  }

  useEffect(() => {
    getPhotoByPostId()  
  }, [])

  return (
    <div>
        <CardMedia
          component="img"
          height="140"
          image={photos[0] && photos[0].url}
          alt={photos[0] && photos[0].title}
          photo={photos}
        />
    </div>
  )      
  }

export default PostCardMedia;
