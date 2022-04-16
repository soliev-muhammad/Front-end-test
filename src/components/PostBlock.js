import React, {useEffect, useState} from 'react';
import PostContent from './PostContent.js';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import TextField from '@mui/material/TextField';

//Основной блок постов, а также поисковое поле

function PostBlock() {
  
  const [posts, setPosts] = useState([])
  const [searchValue, setSearchValue] = useState("")
  
  //Функция для взятия информации для постов
  async function fetchPosts() {
    const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
    setPosts(response.data);
  }
  
  useEffect(() => {
    fetchPosts()
  }, [])
  
  //Функция поиска
  useEffect(() => {
      if(searchValue.length) {
      const filteredPosts = posts
        .filter((post) => post.title.includes(searchValue.toString().toLowerCase()))
      setPosts(filteredPosts)
    } else {
      fetchPosts()
    }
  }, [searchValue])

  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
    >
            
    <Grid item width="400px">
      <TextField
        id="filled-search"
        label="Поиск..."
        type="search"
        variant="filled"
        fullWidth
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </Grid>
    
    <Grid item maxWidth="500px">
        {posts.map(post =>
          <PostContent post={post} key={post.id}/>  
        )}
    </Grid>
        
    </Grid>
  );
}

export default PostBlock;
