import axios from 'axios';

import { 
    GET_ALL_COMPLAINTS_URL, 
    PUT_SEEN_COMPLAINT_URL, 
    PUT_STATE_COMPLAINT_URL, 
    GET_COMPLAINTS_BY_USER_URL ,
    ADD_COMPLAINTS
} from './utils';

export const GET_ALL_COMPLAINTS = 'GET_ALL_COMPLAINTS';
export const PUT_SEEN_COMPLAINT = 'PUT_SEEN_COMPLAINT'; 
export const PUT_STATE_COMPLAINT = 'PUT_STATE_COMPLAINT'; 
export const FILTER_COMPLAINTS = 'FILTER_COMPLAINTS';
export const GET_COMPLAINTS_BY_USER = 'GET_COMPLAINTS_BY_USER';
export const CREATE_COMPLAINTS = 'CREATE_COMPLAINTS';

export function getComplaints() {
    return function(dispatch) {
        return axios.get(GET_ALL_COMPLAINTS_URL)
        .then(data => {
            
            dispatch({
                type: GET_ALL_COMPLAINTS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_COMPLAINTS,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function putSeenComplaint(id) {
    return function(dispatch) {
        return axios.put(`${PUT_SEEN_COMPLAINT_URL}${id}`)
        .then(data => {
            dispatch({
                type: PUT_SEEN_COMPLAINT,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: PUT_SEEN_COMPLAINT,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function putStateComplaint(id, newState) {
    return function(dispatch) {
        return axios.put(`${PUT_STATE_COMPLAINT_URL}${id}`, {state: newState})
        .then(data => {
            dispatch({
                type: PUT_SEEN_COMPLAINT,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: PUT_SEEN_COMPLAINT,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function filterComplaints(payload) {
	return {type: FILTER_COMPLAINTS, payload};
}

export function getComplaintsByUser(id) {
    return function(dispatch) {
        return axios.get(`${GET_COMPLAINTS_BY_USER_URL}${id}`)
        .then(data => {
            dispatch({
                type: GET_COMPLAINTS_BY_USER,
                payload: data
            });
        })
        .catch((error) => {
            dispatch({
                type: GET_COMPLAINTS_BY_USER,
                payload: 'Error getting user complaints!'
            });
        })
    };
};
export function createComplaints(body) {
    return function(dispatch) {
        return axios.post('http://localhost:3001/complaints/',body)
        .then(data => {
            
            dispatch({
                type: CREATE_COMPLAINTS,
                payload: data
            })
            
        })
        .catch(err => {
            dispatch({
                type: CREATE_COMPLAINTS,
                payload: {
                    data: "error"
                }
            })
        })
    }
}