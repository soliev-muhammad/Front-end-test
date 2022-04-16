import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';

//Модальное окно

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 400,
  bgcolor: 'background.paper',
  border: '2px solid secondary',
  boxShadow: 24,
  p: 4,
};

function ModalWin(props) {
  const [open, setOpen] = React.useState(false);
  const [comments, setComments] = useState([])
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  //Функция взятия дополнителной информации(комментарий) из источника на основе id поста 
  async function getCommentByPostId(id) {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${props.post.id}/comments`);
      setComments(response.data);
  }

  useEffect(() => {
      getCommentByPostId()
  }, [])

  return (
    <div>
      <Button onClick={handleOpen}>Больше</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {comments[0] && comments[0].email}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {comments[0] && comments[0].body}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalWin;
