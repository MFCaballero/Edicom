import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBuildings } from '../../redux/building/buildingActions';
import BuildingsTable from '../Buildings/BuildingsTable/BuildingsTable';
import { Container, Button } from '@material-ui/core';
import styles from "./Buildings.module.css";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import AddIcon from '@material-ui/icons/Add';


function Buildings() {
    const buildings = useSelector(state => state.buildingReducer.allBuildings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getBuildings());
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Container style={{display: "flex", flexDirection: "column", justifyContent: "center",  marginLeft: "35px"}}>
                <div className={styles.componentHeaderBL}>
                    <h1 className="buildingHeader">
                        Edificios:
                    </h1>
                    <Link to="/buildingadd" className="buildingButton">
                        <Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '20px'}}>
                            <AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                        </Button>
                    </Link>
                </div>
                <BuildingsTable data={buildings} />
            </Container>
        </ThemeProvider>
    );
}

export default Buildings;