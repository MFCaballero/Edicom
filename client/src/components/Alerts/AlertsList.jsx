import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom' 
import { Button } from '@material-ui/core';
import AlertsTable from './AlertsTable';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import './Alerts.css';
import AddIcon from '@material-ui/icons/Add';

const Alerts = (props) => {

  return (
    <ThemeProvider theme={theme}>
    <div className='contExtAlerts'>
        <div className='componentHeaderAlertsList'>
            <h1 className='contExtAlerts'>
                Alertas:
            </h1>
            <Link to="/alertsAdd" >
                <Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '20px', marginTop: '30px'}}>
                    <AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                </Button>
            </Link>
        </div>
        <div className='contAlertsTable'>
          <AlertsTable/>
        </div>
    </div>
    </ThemeProvider>
);
}

export default Alerts;