import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { getServices, putService, deleteService, filterServicesAdmin } from '../../../redux/services/servicesAction';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import filter from '../../../utils/filter-remove.png';
import PopUp from './PopUp';
import styles from "./Styles.module.css";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';



function ServicesTable(props) {
  const filteredServices = useSelector(state => state.servicesReducer.filteredServicesAdmin)
  //const allServices = useSelector(state => state.servicesReducer.allServices)
  const dispatch = useDispatch();

  

  const complaints = filteredServices?.map(service => {
    let stateSpanish;
    if (service.accepted === false) stateSpanish = "Pendiente"
    else stateSpanish = "Aceptado"
    return {
      id: service.id,
      building: service.building?.name,
      date: moment(service.createdAt).format("DD/MM/YYYY"),
      title: service.title?.toUpperCase(),
      state: stateSpanish,
      provider: service.provider,
      enrollment: service.enrollment,
      contact: service.contact,
      detail: service.detail,
      /* edit: `/alertsUpdate/${complaint.id}` */
    }
  })


  const buildingSelect = complaints.map(element => element = element.building).filter((value, index, self) => self.indexOf(value) === index);
  const statusSelect = complaints.map(element => element = element.state).filter((value, index, self) => self.indexOf(value) === index);



  const columns = [
    { field: 'id', headerName: 'ID', flex: 1.5, hide: true },
    { field: 'building', headerName: 'Edificio', flex: 2 },
    { field: 'date', headerName: 'Fecha', flex: 1 },
    { field: 'title', headerName: 'Titulo', flex: 2,renderCell: (params) => (
      <Link className={styles.detail} onClick={(e) => handleEventClick(e, params.row)}>
        {params.formattedValue}
      </Link>
    ) },
    { field: 'contact', headerName: 'Contacto', flex: 1 },
    { field: 'state', headerName: 'Estado', flex: 1 },
  ]

  const [input, setInput] = useState({
    building: 'All',
    status: 'All'
  })
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const handleEventClick = (clickInfo, data) => {
    setAlertProps({
        id: data.id,
        title: data.title,
        detail: data.detail,
        provider: data.provider,
        enrollment: data.enrollment,
        contact: data.contact,
        building: data.building,
        date: data.date,
        state: data.state
    })
    setDisplayPopUp(true);
}


  function handleSelect(e) {
    setInput({ ...input, [e.target.name]: e.target.value })
  };

  function handleSelectAll(e) {
    setInput({ building: 'All', status: 'All'})
    dispatch(filterServicesAdmin({ building: 'All', status: 'All'}))
}

  useEffect(() => {
    dispatch(getServices())
  },[dispatch])

  useEffect(() => {
    dispatch(filterServicesAdmin(input))
  },[input,setInput]);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <div style={{ height: 400, width: '100%' }}>
      <div className= {styles.contSelectsComplaintsTable}>
      <PopUp setPop={setDisplayPopUp} display={displayPopUp} setDisplay={setDisplayPopUp} alertProps = {alertProps}/>
      <Grid container justify="flex-start" alignItems="center" className={classes.paper} item xs={6} sm={3}>
        <FormControl style={{width: '200px'}}>
            <InputLabel id="demo-controlled-open-select-label">Edificio</InputLabel>
            <Select name="building" onChange={handleSelect} value={input.building}>
            <MenuItem value="All">
              <em>All</em>
            </MenuItem >
            
            {buildingSelect.map((building, index) =>
              <MenuItem value={building} key={index}>{building}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Grid container justify="flex-start" alignItems="center" className={classes.paper} item xs={6} sm={3}>
        <FormControl style={{ width: '200px' }}>
          <InputLabel id="demo-controlled-open-select-label">Estado</InputLabel>
          <Select name="status" onChange={handleSelect} value={input.status}>
            <MenuItem value="All">
              <em>All</em>
            </MenuItem >

            {statusSelect.map((status, index) =>
              <MenuItem value={status} key={index}>{status}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Grid>
      <Button variant="contained" color="secondary" style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px', marginTop: "13px"}} onClick={handleSelectAll}>
          <img style={{width: "25px", height:"25px"}} src={filter}></img>
      </Button>
      </div>
      <div style={{ display: 'flex', height: '100%' }}>
        <DataGrid rows={complaints} columns={columns} pageSize={5} />
      </div>
    </div>
    </ThemeProvider>
  );
}
export default ServicesTable;