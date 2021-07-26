import React, { useEffect, useState } from "react";
import { Link , useParams} from 'react-router-dom' 
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import BookingsTable from './BookingsTable';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle'; 
import AddIcon from '@material-ui/icons/Add';
import { getAmenityById } from '../../../redux/amenities/amenitiesActions';

const AmenitieDetail = (props) => {

  const { id } = useParams();
  const { name } = useParams();

  const Amenitie = useSelector(state => state.amenitiesReducer.amenityDetail)
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getAmenityById(id))
  },[])



  return (
    <ThemeProvider theme={theme}>
    <div className='contExtAlerts'>
        <div className='componentHeaderAlertsList'>
            <h1 className='contExtAlerts'>
                {name}:
            </h1>
        </div>
        <div className='contAlertsTable'>
          <BookingsTable amenitieId={id}/ >
        </div>
    </div>
    </ThemeProvider>
);
}

export default AmenitieDetail;