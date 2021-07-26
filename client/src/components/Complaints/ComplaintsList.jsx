import React from "react";
import { Link } from 'react-router-dom' 
import { Button } from '@material-ui/core';
import ComplaintsTable from './ComplaintsTable';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import AddIcon from '@material-ui/icons/Add';

const Complaints = (props) => {

  return (
    <ThemeProvider theme={theme}>
    <div className='contExtAlerts'>
        <div className='componentHeaderAlertsList'>
            <h1 className='contExtAlerts'>
                Reclamos:
            </h1>
        </div>
        <div className='contAlertsTable'>
          <ComplaintsTable/>
        </div>
    </div>
    </ThemeProvider>
);
}

export default Complaints;