import axios from 'axios';

export const GET_ALL_AMENITIES = 'GET_ALL_AMENITIES';
export const CREATE_AMENITY = 'CREATE_AMENITY';
export const GET_AMENITY_BY_ID = 'GET_AMENITY_BY_ID';
export const UPDATE_AMENITY = 'UPDATE_AMENITY';
export const DELETE_AMENITY = 'DELETE_AMENITY';
export const GET_AMENITIES = 'GET_AMENITIES';

export function getAllAmenities(id_building) {
	return async function (dispatch) {
		const {data} = await axios.get(
			`http://localhost:3001/amenities/all/${id_building}`
		);
		dispatch({type: GET_ALL_AMENITIES, payload: data});
	};
}

export function createAmenity(amenity) {
	console.log("1. el amenity que entra a la action", amenity)
	return async function (dispatch) {
		const {data} = await axios.post(
			`http://localhost:3001/amenities/`,
			amenity
		);
		console.log('4. la data que vuelve del endPoint', data)
		dispatch({type: CREATE_AMENITY, payload: data});
	};
}

export function allAmenities() {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/amenities/`);
		dispatch({type: GET_AMENITIES, payload: data});
	};
}

export function getAmenityById(id) {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/amenities/?=id${id}`);
		dispatch({type: GET_AMENITY_BY_ID, payload: data});
	};
}

export function updateAmenity(amenity) {
	console.log("update amenity", amenity);
	return async function (dispatch) {
		const {data} = await axios.put(
			`http://localhost:3001/amenities/${amenity.id}`,
			amenity
		);
		dispatch({type: UPDATE_AMENITY, payload: data});
	};
}

export function deleteAmenity(id) {
	return async function (dispatch) {
		const {data} = await axios.delete(`http://localhost:3001/amenities/${id}`);
		dispatch({type: DELETE_AMENITY, payload: data});
	};
}
