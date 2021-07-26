import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { getComplaints, filterComplaints } from '../../redux/complaints/complaintsActions';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import filter from '../../utils/filter-remove.png';
import PopUp from './PopUp';
import styles from "./Styles.module.css";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';



function AlertsTable(props) {
  const filteredComplaints = useSelector(state => state.complaintsReducer.filteredComplaints)
  const allComplaints = useSelector(state => state.complaintsReducer.allComplaints)
  const dispatch = useDispatch();

  

  const complaints = filteredComplaints?.map(complaint => {
    let stateSpanish;
    if (complaint.state === "opened") stateSpanish = "Abierto"
    else stateSpanish = "Cerrado"
    return {
      id: complaint.id,
      building: complaint.building.name,
      date: moment(complaint.date).format("DD/MM/YYYY"),
      concept: complaint.subject,
      state: stateSpanish,
      detail: complaint.details,
      importance: complaint.importance,
      edit: `/alertsUpdate/${complaint.id}`
    }
  })

  const currencies = [
    {
      value: 'opened',
      label: 'Abierto',
    },
    {
      value: 'closed',
      label: 'Cerrado',
    },
  ];

  const [currency, setCurrency] = React.useState('opened');

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const importanceSelect = complaints.map(element => element = element.importance).filter((value, index, self) => self.indexOf(value) === index);
  const buildingSelect = complaints.map(element => element = element.building).filter((value, index, self) => self.indexOf(value) === index);
  const statusSelect = complaints.map(element => element = element.state).filter((value, index, self) => self.indexOf(value) === index);



  const columns = [
    { field: 'id', headerName: 'ID', flex: 1.5, hide: true },
    { field: 'building', headerName: 'Edificio', flex: 2 },
    { field: 'date', headerName: 'Fecha', flex: 1 },
    { field: 'concept', headerName: 'Concepto', flex: 2,renderCell: (params) => (
      <Link className={styles.detail} onClick={(e) => handleEventClick(e, params.row)}>
        {params.formattedValue}
      </Link>
    ) },
    { field: 'importance', headerName: 'Importancia', flex: 1 },
    { field: 'state', headerName: 'Estado', flex: 1 },
  ]

  const [input, setInput] = useState({
    building: 'All',
    importance: 'All',
    status: 'All'
  })
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const handleEventClick = (clickInfo, data) => {
    setAlertProps({
        id: data.id,
        title: data.concept,
        detail: data.detail,
        importance: data.importance,
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
    setInput({ building: 'All', importance: 'All', status: 'All'})
    dispatch(filterComplaints({ building: 'All', importance: 'All', status: 'All'}))
}

  useEffect(() => {
    dispatch(getComplaints())
  },[dispatch])

  useEffect(() => {
    dispatch(filterComplaints(input))
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
          <InputLabel id="demo-controlled-open-select-label">Importancia</InputLabel>
          <Select name="importance" onChange={handleSelect} value={input.importance}>
            <MenuItem value="All">
              <em>All</em>
            </MenuItem >

            {importanceSelect.map((importance, index) =>
              <MenuItem value={importance} key={index}>{importance}</MenuItem>
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
        <DataGrid sortModel={[
    {
      field: 'date',
      sort: 'desc',
    },
  ]}
  rows={complaints} columns={columns} pageSize={5} />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default AlertsTable;