import './Logging.css';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router';
import Home from '../Home/Home.js';
import Form from '../Spending/Form';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Render from '../HomeTenant/Render'
import { Header } from '../HomeTenant/Header';



function Logging() {
	return (
		<Container className="Logging">
			<CssBaseline />
				<BrowserRouter>
					<Route exact path="/logging" component={Header} />
					<Route exact path="/logging" component={Render} />
				</BrowserRouter>
		</Container>
	);
}

export default Logging;
