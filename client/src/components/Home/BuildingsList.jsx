import React from 'react';
import { Paper, Button, Grid } from '@material-ui/core';
import './Home.css';
import { Link } from 'react-router-dom';

export default function BuildingsList(props) {
  return (
    <Grid className='carusel'>
    <img className='imgCarusel'src={props.item.image} alt="not found" />
    <Paper className='paperCarusel'>
        <Grid className='infoBuilding'>
        <h2 style={{color:"white"}}>{props.item.name}</h2>
        <h4 style={{color:"white"}}>{props.item.address}</h4>
        <Link to={`/buildingDetail/${props.item.id}`}>
        <Button variant="contained" color="secondary" style={{ fontWeight: 1000 }} className="CheckButton">
            Detalle
        </Button>
        </Link>
        </Grid>
    </Paper>
    </Grid>
  );
}