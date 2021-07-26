import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getComplaintsByUser } from '../../../../redux/complaints/complaintsActions';
import { DataGrid, GridRowParams } from '@material-ui/data-grid';
import { Button, Box } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import theme from '../../../themeStyle';
import AddIcon from '@material-ui/icons/Add';

function UserComplaints({ complaints }) {
    console.log(complaints)

    const columns = [
        {field: 'id', headerName: '#', flex: 0.5},
        {field: 'date', type: 'dateTime', headerName: 'Fecha', flex: 1},
        {
            field: 'title', 
            headerName: 'Asunto', 
            flex: 3.5,
            renderCell: (GridRowParams) => (
                <Link to={`/public/1/complaintdetail/${GridRowParams.id}`}>
                    {GridRowParams.value}
                </Link>
            )
        },
        {
            field: 'state', 
            headerName: 'Estado', 
            flex: 2,
            valueFormatter: (params) => {
                const valueFormatted = (params.value === 'opened') ? 'Abierto' : 'Cerrado';
                return valueFormatted
            }
        },
    ]

    const complaintsData = complaints && complaints?.map(complaint => {
        return {
            id: complaint.id,
            date: complaint.date,
            title: complaint.subject,
            state: complaint.state,
        }
    })

    const currentUserData = useSelector(state => state.userReducer.userDetail);

    return (
        <ThemeProvider theme={theme}>
            <h2>Mis reclamos</h2>
            <Link to={`/public/AddComplaints/${currentUserData?.id}`}>
                <Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '140px',marginBottom:'60px',marginTop:'-50px'}}>
                    <AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                </Button>
            </Link>
            <div style={{ height: 400, width: '100%' }}>
                <Box display="flex" justifyContent="center" height="100%" border={0}>
                    <DataGrid columns={columns} rows={complaintsData} pageSize={5} />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default UserComplaints;