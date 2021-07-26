import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { Button, Grid, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import { getAlerts, filterAlerts } from '../../redux/alerts/alertActions';
import { DataGrid } from '@material-ui/data-grid';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { makeStyles } from '@material-ui/core/styles';
import './Alerts.css';
import moment from 'moment';
import filter from '../../utils/filter-remove.png';



function AlertsTable(props) {

    const filteredAlerts = useSelector(state => state.alertsReducer.filteredAlerts)
    const allAlerts = useSelector(state => state.alertsReducer.allAlerts)
    const dispatch = useDispatch();

    const alerts = filteredAlerts.map(alert => {
        return {
            id: alert.id,
            building: alert.building.name,
            date: moment(alert.date).format("DD/MM/YYYY"),
            concept: alert.concept,
            detail: alert.details,
            importance: alert.importance,
            edit: `/alertsUpdate/${alert.id}`
        }
    })

    const buildingSelect = alerts.map(element => element = element.building).filter((value, index, self) => self.indexOf(value) === index);
    const importanceSelect = alerts.map(element => element = element.importance).filter((value, index, self) => self.indexOf(value) === index);
    

    


    const columns = [
        { field: 'id', headerName: 'ID', flex: 1.5, hide: true },
        {field: 'building', headerName: 'Edificio', flex: 3},
        {field: 'date', headerName: 'Fecha', flex: 2},
        {field: 'concept', headerName: 'Concepto', flex: 3.5},
        {field: 'importance', headerName: 'Importancia', flex: 2},
        {
            field: 'edit', 
            headerName: 'Edit', 
            flex: 1.5,
            renderCell: (params) => (
                <Link to={`${params.value}`}>                    
                    <Button style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                        Editar
                    </Button>
                </Link>
        )}
    ]
    
    const date1 = new Date('2021-01-01T00:00:00')
    const date2 = new Date(new Date)

    const [input, setInput] = useState({
        since: date1,
        upTo: date2,
        building: 'All',
        importance: 'All'
    })

    

    function handleSinceChange(date) {
        setInput({ ...input, since: date });
    };
    
    function handleUpToChange(date) {
        setInput({ ...input, upTo: date });
    };

    function handleSelect(e) {
        setInput({ ...input, [e.target.name]: e.target.value })
    };

    function handleSelectAll(e) {
        setInput({ since: date1, upTo: date2, building: 'All', importance: 'All'})
        dispatch(filterAlerts({ since: date1, upTo: date2, building: 'All', importance: 'All'}))
    }

    useEffect(() => {
        dispatch(getAlerts());
    }, [dispatch]);

    useEffect(() => {
        dispatch(filterAlerts(input))
    }, [input,setInput]);

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
        <div style={{height: 400, width: '100%'}}>
            <div className='contSelectsAT'>        
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="flex-start" alignItems="center" className={classes.paper} item xs={6} sm={3}>
                  <KeyboardDatePicker
                    name="since"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Desde"
                    format="dd/MM/yyyy"
                    value={input.since}
                    onChange={handleSinceChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }} />
                </Grid>
                <Grid container justify="flex-start" alignItems="center" style ={{marginLeft: "-50px"}} className={classes.paper} item xs={6} sm={3}>
                  <KeyboardDatePicker
                    name="upTo"
                    margin="normal"
                    id="date-picker-dialog"
                    label="Hasta"
                    format="dd/MM/yyyy"
                    value={input.upTo}
                    onChange={handleUpToChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }} />
                </Grid>

                <Grid container justify="flex-start" alignItems="center" style ={{marginLeft: "-50px", marginTop:"7px"}} className={classes.paper} item xs={6} sm={3}>
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
                <Grid container justify="flex-start" style ={{marginLeft: "-100px", marginTop:"7px"}}alignItems="center" className={classes.paper} item xs={6} sm={3}>
                  <FormControl style={{width: '200px'}}>
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
              </MuiPickersUtilsProvider>
              <Button variant="contained" color="secondary" style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px', marginLeft: "-100px", marginTop: "20px"}} onClick={handleSelectAll}>
                  <img style={{width: "25px", height:"25px"}} src={filter}></img>
              </Button>
            </div>
            <div style={{display: 'flex', height: '100%'}}>
                <DataGrid rows={alerts} columns={columns} pageSize={5} />
            </div>
        </div>
    );
}

export default AlertsTable;