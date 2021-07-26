import React from 'react';
import AlertsUser from '../Alerts/AlertsUser';
import { Link } from "react-router-dom";
import {Button} from "@material-ui/core";
import { useSelector } from 'react-redux';

function UserHome({ user }) {
    console.log('This is User Home', user)
    const currentUserData = useSelector(state => state.userReducer.userDetail);
    return (
        <div>
            <h2>{user && user.name}</h2>
            <ul>
                <li>Contacto: {user && user.contact}</li>
                <li>Email: {user && user.email}</li>
            </ul>
            {/* <Link to={`/public/${currentUserData?.id}`}>
               <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16, fontWeight: 1000 }}
               >
                  Editar mis datos
               </Button>
            </Link> */}
            <div>
                <div>
                    <AlertsUser id={ user?.id }/>
                </div>
            </div>
        </div>
    );
}

export default UserHome;