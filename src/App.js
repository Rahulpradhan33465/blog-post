import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import memories from './Images/memories.png';
import useStyles from './style';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
const App = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const classes = useStyles();
  return (
    <Container
      maxWidth="lg"
      style={{ paddingLeft: '5px', paddingRight: '5px' }}
    >
      <AppBar
        position="static"
        color="inherit"
        style={{ display: 'flex', flexDirection: 'row' }}
        className={classes.appBar}
      >
        <Typography variant="h4" align="center" className={classes.heading}>
          Memories
        </Typography>
        <img src={memories} alt="memories logo" className={classes.image} />
      </AppBar>
      <Grow in>
        <Container>
          <Grid
            container
            justify="space-between"
            alignItems="stretch"
            spacing={3}
            className={classes.mainContainer}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form setCurrentId={setCurrentId} currentId={currentId} />
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  );
};

export default App;
