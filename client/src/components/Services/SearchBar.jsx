import React , {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SearchIcon from '@material-ui/icons/Search';
import {Button} from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import GradeIcon from '@material-ui/icons/Grade';
import { useDispatch } from "react-redux";
import { filterServices, sortServices } from '../../redux/services/servicesAction';
import { makeStyles } from '@material-ui/core/styles';
import './Services.css';

/* const useStyles = makeStyles((theme) => ({
    formControl: {
      minWidth: 500,
      maxWidth: 500
    }
  })); */



export default function SearchBar( { servicesList } ) {
    const dispatch = useDispatch();
    //const classes = useStyles();

    // className={classes.formControl}

    function handleChange(e){
        dispatch(filterServices(e.target.value))
    }

    function handleChangeAuto(e){
        dispatch(filterServices(servicesList[e.target.value]))
    }

    function handleSortAZ() {
        dispatch(sortServices('az'))
    }

    function handleSortStar() {
        dispatch(sortServices('stars'))
    }

    return (
        <div className="contExtSearchBar">
            <Autocomplete style= {{width: '350px'}}    
                onChange = {e => handleChangeAuto(e) }            
                id="searchBarAutocomplete"
                freeSolo
                options={servicesList && servicesList.map((option) => option)}
                renderInput={(params) => (
                    <TextField 
                        {...params} 
                        label="Buscar"
                        onChange = {e => handleChange(e) }
                        margin="normal" 
                        variant="outlined"
                        startAdornment={
                            <InputAdornment  position="start">
                                <SearchIcon />
                            </InputAdornment>
                        }
                    />
                )}
            />
            <Button onClick={handleSortAZ} variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px'}}>
                <SortByAlphaIcon style={{ fontSize: 25, color: "#212121" }}/>
            </Button>
            <Button onClick={handleSortStar} variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px'}}>
                <GradeIcon style={{ fontSize: 25, color: "#212121" }}/>
            </Button>
            
        </div>
    );
}


