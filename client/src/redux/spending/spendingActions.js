import axios from 'axios';
export const POST_SPENDING = 'POST_SPENDING';
export const PUT_SPENDING = 'PUT_SPENDING';
export const GET_SPENDINGS = 'GET_SPENDINGS';
export const FILTER_SPENDING = 'FILTER_SPENDINGS';
export const DELETE_SPENDING = 'DELETE_SPENDINGS';
export const GET_BUILDING_SPENDINGS = 'GET_BUILDING_SPENDINGS';

export function postSpending(data) {
	return function (dispatch) {
		return axios
			.post(' http://localhost:3001/spendings/add ', data)
			.then(res => {
				dispatch({type: POST_SPENDING, payload: res.data});
			});
	};
}

export function putSpending(data) {
	return function (dispatch) {
		return axios.put(' http://localhost:3001/spendings/add ', data).then(
			res => {
				dispatch({type: PUT_SPENDING, payload: res.data});
			},
			err => {
				alert('No tienes los permisos para hacer esta modificación');
			}
		);
	};
}

//-------------------ver delete------------------------
export function deleteSpending(id) {
	return function (dispatch) {
		return axios
			.delete(` http://localhost:3001/spendings/del/${id} `) // ver
			.then(res => {
				dispatch({type: DELETE_SPENDING, payload: res.data});
			});
	};
}
//-------------------ver delete------------------------

export function totalSpending() {
	return function (dispatch) {
		return axios.get('http://localhost:3001/spendings/all').then((res, req) => {
			dispatch({type: GET_SPENDINGS, payload: res.data});
		});
	};
}

export function filterSpending(payload) {
	console.log('payload', payload);
	return {type: 'FILTER_SPENDINGS', payload};
}

export function buildingSpendings(id) {
	return function (dispatch) {
		return axios
			.get(`http://localhost:3001/spendings/all?buildingId=${id}`)
			.then(data => {
				dispatch({
					type: GET_BUILDING_SPENDINGS,
					payload: data,
				});
			});
	};
}
