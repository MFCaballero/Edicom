import React from 'react';
import BuildingAddForm from '../BuildingAddForm/BuildingAddForm';
import Container from '@material-ui/core/Container';
import '../Buildings.module.css';


function BuildingsAdd() {
    return (
        <Container>
            <BuildingAddForm/>
        </Container>
    );
}

export default BuildingsAdd;