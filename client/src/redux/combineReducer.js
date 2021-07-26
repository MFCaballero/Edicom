import {combineReducers} from 'redux';

import reducerSpending from './spending/spendingReducer';
import apartmentReducer from './apartments/apartmentsReducer';
import buildingReducer from './building/buildingReducer';
import reducerExpenses from './expenses/expensesReducer';
import alertsReducer from './alerts/alertsReducer';
import userReducer from './users/userReducer';
import loggingReducer from './logging/loggingReducer';
import amenitiesReducer from './amenities/amenitiesReducer';
import complaintsReducer from './complaints/complaintsReducer';
import subscriptionsReducer from './subscriptions/subscriptionReducer';
import bookingReducer from './booking/bookingReducer';
import servicesReducer from './services/servicesReducer';
import ratingReducer from './ratings/ratingReducer';
import paymentsReducer from './payments/paymentsReducer';


export const reducers = combineReducers({
	bookingReducer: bookingReducer,
	userReducer: userReducer,
	reducerSpending: reducerSpending,
	apartmentReducer: apartmentReducer,
	buildingReducer: buildingReducer,
	reducerExpenses: reducerExpenses,
	alertsReducer: alertsReducer,
	loggingReducer: loggingReducer,
	amenitiesReducer: amenitiesReducer,
	complaintsReducer: complaintsReducer,
	subscriptionsReducer: subscriptionsReducer,
	servicesReducer: servicesReducer,
	ratingReducer: ratingReducer,
	paymentsReducer: paymentsReducer,
});

export default reducers;
