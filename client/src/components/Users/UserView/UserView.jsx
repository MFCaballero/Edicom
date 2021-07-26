import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom' 
import { Button, Container } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import UserHome from "./UserHome/UserHome";
import UserComplaints from "./UserComplaints/UserComplaints";
import UserComplaintDetail from './UserComplaints/UserComplaintDetail';
import { getUser } from '../../../redux/users/userActions';
import { getApartmentById } from '../../../redux/apartments/apartmentsActions';
import { getComplaintsByUser } from '../../../redux/complaints/complaintsActions';
import styles from './UserView.css';

const UserView = (props) => {
    const currentUser = JSON.parse(localStorage.getItem('profile'));
    const userDetail = useSelector(state => state.userReducer.userDetail);
    const apartmentDetail = useSelector(state => state.apartmentReducer.apartmentDetail);
    const userComplaints = useSelector(state => state.complaintsReducer.userComplaints);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(currentUser && currentUser.id) dispatch(getComplaintsByUser(currentUser.id))
    }, []);

    useEffect(() => {
        if(userDetail && userDetail.apartmentId) dispatch(getApartmentById(userDetail.apartmentId))
    }, [userDetail]);
    
    
    return (
        <ThemeProvider theme={theme}>
            <Container style={{display: "flex", flexDirection: "column", justifyContent: "center",  marginLeft: "35px"}}>
                <div className="componentHeader">
                    <div className="apartmentHeading">
                        <h1 className="apartmentNumber">{apartmentDetail && apartmentDetail.number_apartment}</h1>
                        <ul className="apartmentInfo">
                            <li><b>Nº Catastral:</b> {apartmentDetail && apartmentDetail.cata_apartment}</li>
                            <li><b>Superficie:</b> {apartmentDetail && apartmentDetail.mt2} m2</li>
                        </ul>
                    </div>
                </div>
                <Switch>
                    <Route 
                        exact path={`/public/:id`}
                        render={() => <UserHome user={userDetail && userDetail} />}
                    />
                    <Route 
                        exact path={`/public/:id/complaints`}
                        render={() => <UserComplaints complaints={userComplaints && userComplaints} />}
                    />
                    <Route 
                        exact path={`/public/:id/complaints`}
                        render={() => <UserComplaints complaints={userComplaints && userComplaints} />}
                    />
                    <Route
                        path='/public/:id/complaintDetail/:id'
                        render={({match}) => <UserComplaintDetail match={match} complaints={userComplaints && userComplaints} />}
                    />
                </Switch>
            </Container>
        </ThemeProvider>
    );
}

export default UserView;