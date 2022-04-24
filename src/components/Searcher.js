import React from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

function Searcher({searchValue, setSearchValue}) {

  return (
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
  )
}

export default Searcher;