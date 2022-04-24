import React, {useEffect, useState} from 'react';
import PostContent from './PostContent.js';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Searcher from './Searcher.js';
import Pagination from './Pagination.js'

//Основной блок постов, а также поисковое поле
function PostBlock() {
  
  const [posts, setPosts] = useState([])
  const [searchValue, setSearchValue] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //Функция для получения информации для постов
  async function fetchPosts() {
    const response = await axios.get("http://jsonplaceholder.typicode.com/posts");
    setPosts(response.data);
  }

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

  //Получение текущей страницы
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Изменение страницы
  const paginate = pageNumber => setCurrentPage(pageNumber);

  if (posts.length === 0) {
    return (
      <Grid container
            direction="column"
            justifyContent="center"
            alignItems="center"
      >
        <Searcher searchValue={searchValue} setSearchValue={setSearchValue} />
        
        <h1 className='posts-not-found'>
          Посты не найдены!
        </h1>
      </Grid>
    )
  }

  return (
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Searcher searchValue={searchValue} setSearchValue={setSearchValue}/>

        <h2 className="current-page">
          Страница №{currentPage}
        </h2>

        <Grid item maxWidth="500px">
          {currentPosts.map(post =>
            <PostContent post={post} key={post.id}/>  
          )}
        </Grid>

        <Pagination 
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
        />

      </Grid>
  );
}

export default PostBlock;
