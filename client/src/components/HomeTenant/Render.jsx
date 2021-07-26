import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageCard from './ImageCard';
import Text from './Text';
import Title from './Title';
import places from './Static/card';
import useWindowPosition from './Hook/useWindowPosition';
import { Container, CssBaseline } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  //bajo la imagen en responsive
  container: {
    textAlign: 'center',
    /*  marginLeft:'200px', */

    width: '100%',

  },
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
  },
  root2: {
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },

}))


export default function () {
  const classes = useStyles();
  const checked = useWindowPosition('header');
  return (
    <div className={classes.container}>
      <div id="Text" className={classes.root2}   >
        <Text checked={checked} />
      </div>
      <br />
      <Title />
      <div className={classes.root} id="ImageCard">
        <ImageCard place={places[1]} checked={checked} />
        <ImageCard place={places[0]} checked={checked} />
        <ImageCard place={places[2]} checked={checked} />
      </div>
    </div>
  );
}