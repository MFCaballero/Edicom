import './App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Header } from '../HomeTenant/Header';
import Sidebar from '../Sidebar/Sidebar';
import Bookings from '../Users/UserView/Bookings/Bookings';
import SidebarUsers from '../SidebarUsers/SidebarUsers';
import UserView from '../Users/UserView/UserView';
import CalendarUser from '../Users/UserView/Alerts/CalendarUser';
import ApartmentBoard from '../Spending/apartmentBoard'
import AlertsUser from '../Users/UserView/Alerts/AlertsUser';
import Subscriptions from '../Users/UserView/Alerts/Subscriptions';
import ServiceContainer from '../Services/ServiceContainer';
import UserExpenses from '../Expenses/UserExpenses';
import UserAddComplaints from '../Users/UserView/UserComplaints/UserAddComplaints';
import ServiceForm from '../Services/ServiceForm';



function AppPublic() {
	return (
		<Container className="App">
			<CssBaseline />
			<BrowserRouter>
				{/* //Poner acá los route con los componentes de la vista del locatario		 */}
				<Route exact path="/public/:id/Bookings" component={Bookings} />
				<Route exact path="/public/spendings/board" component={ApartmentBoard} />
				<Route path="/public" component={SidebarUsers} />
				<Route path="/public" component={UserView} />
				<Route exact path="/public/spendings/board" component={ApartmentBoard} />
				<Route exact path="/public/:id/alerts" component={AlertsUser}/>
				<Route exact path="/public/:id/calendar" component={CalendarUser}/>
				<Route exact path="/public/:id/subscriptions" component={Subscriptions}/>
				<Route exact path="/public/services/:buildingId" component={ServiceForm}/>
				<Route exact path="/public/contservices/:id" component={ServiceContainer}/>
				<Route exact path="/public/expenses/:apartmentNumber/:apartmentName" component={UserExpenses}/>
				<Route
					exact path="/public/AddComplaints/:id"
					render={({ match }) => <UserAddComplaints match={match} />}
				/>
				
			</BrowserRouter>
		</Container>
	);
}

export default AppPublic;