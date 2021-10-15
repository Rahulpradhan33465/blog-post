import React, { useState, useEffect } from 'react';
import { Paper, Typography, TextField, Button } from '@mui/material';
import useStyles from './style';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';

const initialState = {
  creator: '',
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};
const Form = ({ setCurrentId, currentId }) => {
  const dispatch = useDispatch();
  const [postData, setPostData] = useState(initialState);

  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentId) {
      dispatch(updatePost(currentId, postData));
      setCurrentId(0);
    } else {
      dispatch(createPost(postData));
    }

    setPostData(initialState);
  };
  const clear = () => {
    setCurrentId(0);
    setPostData(initialState);
  };
  const classes = useStyles();
  return (
    <Paper className={`${classes.paper} ${classes.root}`}>
      <form
        onSubmit={handleSubmit}
        className={classes.form}
        autoComplete="off"
        noValidate
      >
        <Typography variant="h6">
          {currentId ? 'Edit your blog' : 'Create Your Own Blog'}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          fullWidth
          label="Creator"
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          fullWidth
          label="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          fullWidth
          label="Message"
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          fullWidth
          label="Tags"
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />

        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          fullWidth
          className={classes.buttonSubmit}
          variant="contained"
          type="submit"
          size="large"
          color="primary"
          style={{ marginBottom: 5 }}
        >
          {currentId ? 'Edit' : 'Post'}
        </Button>
        <Button
          fullWidth
          onClick={clear}
          variant="contained"
          size="small"
          color="secondary"
          style={{ marginBottom: 5 }}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
