import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, GridRowParams } from '@material-ui/data-grid';
import { Button, Box } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from '../../../themeStyle';
import styles from './UserComplaintDetail.css';

function UserComplaintDetail(props) {
    const [complaint, setComplaint] = useState([{
        id: '',
        subject: '',
        date: '',
        importance: '',
        state: '',
        details: '',
        image: '',
    }])
    const complaintId = props.match.params.id
    const complaints = props.complaints

    useEffect(() => {
        if (complaints) {
            const currentComplaint = complaints.filter(complaint => complaint.id === Number(complaintId))
            setComplaint(currentComplaint)
        }
    }, [])
    
    function getImageAvailability(complaintImage) {
        if (complaintImage !== '') {
            return 'hasImage'
        } else {
            return 'noImage'
        }
    };
    const imageDisplay = getImageAvailability(complaint[0].image);

    return (
        <ThemeProvider theme={theme}>
            <h2>Detalle de reclamo</h2>
            <div className="complaintInfo">
                <h3>Asunto: {complaint[0].subject}</h3>
                <ul>
                    <li>Fecha de inicio: {complaint[0].date}</li>
                    <li>Importancia: {complaint[0].importance}</li>
                    <li>Estado: {(complaint[0].state === 'opened') ? 'Abierto' : 'Cerrado'}</li>
                </ul>
            </div>
            <div className="complaintDetails">
                <p>{complaint[0].details}</p>
                <div>
                    {}
                    <img 
                        src={complaint[0].image} 
                        alt={complaint[0].subject} 
                        className={imageDisplay}
                    />
                </div>
            </div>            
        </ThemeProvider>
    );
}

export default UserComplaintDetail;