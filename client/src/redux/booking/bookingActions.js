import axios from 'axios';
import {groupBy} from '../../utils';

export const CREATE_BOOKING = 'CREATE_BOOKING';
export const ALL_BOOKINGS = 'ALL_BOOKINGS';
export const GET_BOOKING_BY_ID = 'GET_BOOKING_BY_ID';
export const DELETE_BOOKING = 'DELETE_BOOKING';
export const FILTER_BOOKING = 'FILTER_BOOKING';
export const PUT_BOOKING = 'PUT_BOOKING';
export const TAKE_BOOKING = 'TAKE_BOOKING';
export const CANCEL_BOOKING = 'CANCEL_BOOKING';
export const FILTER_BOOKING_GROUP = 'FILTER_BOOKING_GROUP';
export const GET_TAKED_BOOKING_BY_ID = 'GET_TAKED_BOOKING_BY_ID';

export function createBooking(booking) {
	return async function (dispatch) {
		const {data} = await axios.post(`http://localhost:3001/bookings/`, booking);
		dispatch({type: CREATE_BOOKING, payload: data});
	};
}

export function getAllBookings() {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/bookings/`);
		dispatch({type: ALL_BOOKINGS, payload: data});
	};
}

export function getBookingByAmenity(amenityId) {
	return async function (dispatch) {
		const {data} = await axios.get(
			`http://localhost:3001/bookings/byAmenity/${amenityId}`
		);
		dispatch({type: GET_BOOKING_BY_ID, payload: data});
	};
}

export function getBookingById(id) {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/bookings/${id}`);
		dispatch({type: GET_BOOKING_BY_ID, payload: data});
	};
}


export function getTakedBookings(userId) {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/bookings/taked/${userId}`);
		dispatch({type: GET_TAKED_BOOKING_BY_ID, payload: data});
	};
}

export function putBooking(id, body) {
	return async function (dispatch) {
		const {data} = await axios.put(
			`http://localhost:3001/bookings/${id}`,
			body
		);
		dispatch({type: PUT_BOOKING, payload: data});
	};
}

export function filterBookings(payload) {
	return {type: FILTER_BOOKING, payload};
}

export function takeBooking(payload) {
	console.log(payload);
	return async function (dispatch) {
		const {data} = await axios.put(
			`http://localhost:3001/bookings/takeBooking/${payload.bookingId}/${payload.userId}`
		);
		dispatch({type: TAKE_BOOKING, payload: data});
	};
}

export function cancelBooking(payload) {
	console.log(payload);
	return async function (dispatch) {
		const {data} = await axios.put(
			`http://localhost:3001/bookings/cancelBooking/${payload}`
		);
		dispatch({type: CANCEL_BOOKING, payload: data});
	};
}

export function filterBookingsByGroup(data) {
	const groups = groupBy(data, 'start');
	console.log(groups, "FILTER");
	return {type: FILTER_BOOKING_GROUP, payload: groups};
}
