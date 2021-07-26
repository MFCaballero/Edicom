import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import App from './components/App/App.js';
import AppPublic from './components/App/AppPublic.js';
import Logging from './components/App/Logging.js';
import ResetPassword from './components/Logging/resetPassword.jsx';
import { getUser } from './redux/users/userActions';



const AppGlobal = () => {

	const userId = useSelector(state => state.loggingReducer.userId);
	const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));
	
	
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser && currentUser.id) {
			dispatch(getUser(currentUser.id));			//carga en userReducer.userDetail los datos del usuario logueado
			// dispatch(getIdUser())
		}
    }, [currentUser]);

	
	return (
		<BrowserRouter>

			<Switch> 
				<Route 
					path="/logging/restaurarcontraseña" 
					component = {ResetPassword}
				/>

				<Route 
					path="/logging"
					component={ (props) => (
						( !currentUser )
						? 
						( <Logging { ...props } /> )
						:
						(
							currentUser.name === "the admin" 		//Cambiar esto para hacer una validación robusta
							?
							( <Redirect to="/" /> )
							:
							( <Redirect to={`/public/${currentUser.id && currentUser.id}`} /> )
						) 
					)}
				/>

				<Route 
					path="/public"
					component={ (props) => (
						( currentUser )
						? ( <AppPublic { ...props } /> )
						: ( <Redirect to="/logging" /> )
					)}
				/>

				<Route 
					path="/"
					component={ (props) => (
						( (currentUser && currentUser.name === "the admin") )
						? ( <App { ...props } /> )
						: ( <Redirect to="/logging" /> )
					)}
				/>
			
			</Switch>
			
		</BrowserRouter>
	)
}

export default AppGlobal

/*
Index
		AppGlobal
				App
						Componentes
				App public
						Componentes
*/