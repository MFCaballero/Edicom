import axios from 'axios';

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const CREATE_USER = 'CREATE_USER';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const GET_ALL_USERS_FOR_LIST = 'GET_ALL_USERS_FOR_LIST';
export const GET_ALL_USERS_BY_BUILDING = 'GET_ALL_USERS_BY_BUILDING';
export const ERR_CREATE_USER = 'ERR_CREATE_USER';

export function getUserByApartment(id_apartment) {
	return async function (dispatch) {
		const {data} = await axios.get(
			`http://localhost:3001/users/all/${id_apartment}`
		);
		dispatch({type: GET_ALL_USERS, payload: data});
	};
}
export function getUsersByBuilding(id_building) {
	return async function (dispatch) {
		const {data} = await axios.get(
			`http://localhost:3001/users/allByBuilding/${id_building}`
		);
		dispatch({type: GET_ALL_USERS_BY_BUILDING, payload: data});
	};
}
export function getAllUsersForList() {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/users/getall`);
		dispatch({type: GET_ALL_USERS_FOR_LIST, payload: data});
	};
}

// export function createUser(user) {
// 	return async function (dispatch) {
// 		const {data} = await axios.post(`http://localhost:3001/users/`, user);
// 		dispatch({type: CREATE_USER, payload: data});
// 	};
// }

export function createUser(user) {
	return function (dispatch) {
		return axios.post(`http://localhost:3001/users/`, user).then(
			res => {
				console.log('respuesta exitosa', res);
				dispatch({type: CREATE_USER, payload: res.data});
			},
			err => {
				return new Error(err);
			}
		);
	};
}

export function getUser(id) {
	return async function (dispatch) {
		const {data} = await axios.get(`http://localhost:3001/users/${id}`);
		dispatch({type: GET_USER, payload: data});
	};
}

export function updateUser(user) {
	console.log('ESTO LLEGA EN EL USER DE ACTION', user);
	return async function (dispatch) {
		const {status} = await axios.put(
			`http://localhost:3001/users/${user.id}`,
			user
		);
		dispatch({type: UPDATE_USER, payload: status});
	};
}

export function deleteUser(id) {
	return async function (dispatch) {
		const {data} = await axios.delete(
			`http://localhost:3001/users/delete/${id}`
		);
		dispatch({type: DELETE_USER, payload: data});
	};
}
