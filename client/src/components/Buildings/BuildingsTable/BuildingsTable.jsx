import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import { DataGrid, GridRowParams } from '@material-ui/data-grid';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { borders } from '@material-ui/system';
import theme from '../../themeStyle';

function BuildingsTable(props) {
    const buildingsData = props.data;
    
    const columns = [
        { field: 'id', hide: true },
        { field: 'cata', headerName: 'Nº Catastral', flex: 2 },
        { 
            field: 'name', 
            headerName: 'Nombre', 
            flex: 3.5,
            renderCell: (GridRowParams) => (
                <Link to={`/buildingDetail/${GridRowParams.id}`}>
                    {GridRowParams.value}
                </Link>
            )
        },
        { field: 'address', headerName: 'Dirección', flex: 2 },
        { field: 'floor', headerName: 'Pisos', flex: 1.5 },
        { field: 'apartments', headerName: 'Dtos.', flex: 1.5 },
        {
            field: 'edit',
            headerName: 'Edit',
            flex: 1.5,
            renderCell: (params) => (
                <Link to={`${params.value}`}>
                    <Button variant="contained" size="small" color="secondary" style={{ fontWeight: 1000 }}>
                        Editar
                    </Button>
                </Link>
            )
        }
    ]

    const buildings = buildingsData.map(building => {
        return {
            id: building.id,
            cata: building.cata,
            name: building.name,
            address: building.address,
            floor: building.floor,
            apartments: building.cant_apartments,
            edit: `/buildingupdate/${building.id}`
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <div style={{ height: 400, width: '100%' }}>
                <Box display="flex" justifyContent="center" height="100%" border={0}>
                    <DataGrid 
                        rows={buildings} 
                        columns={columns} 
                        pageSize={5} 
                    />
                </Box>
            </div>
        </ThemeProvider>
    );
}

export default BuildingsTable;