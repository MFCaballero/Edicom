import axios from 'axios';
import { GET_ALL_SERVICES_URL, SERVICES_URL } from './utils';
export const GET_ALL_SERVICES = 'GET_ALL_SERVICES ';
export const POST_SERVICE = 'POST_SERVICE';
export const PUT_SERVICE = 'PUT_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const FIND_SERVICE = 'FIND_SERVICE';
export const GET_SERVICES_BUILDING = 'GET_SERVICES_BUILDING';
export const FILTER_SERVICES = 'FILTER_SERVICES';
export const SORT_SERVICES = 'SORT_SERVICES';
export const FILTER_SERVICES_ADMIN = 'FILTER_SERVICES_ADMIN';

export function getServices() {
    return function(dispatch) {
        return axios.get(GET_ALL_SERVICES_URL)
        .then(data => {
            dispatch({
                type: GET_ALL_SERVICES,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_SERVICES,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function getServicesBuilding(id) {
    return function(dispatch) {
        return axios.get(`${GET_ALL_SERVICES_URL}/${id}`)
        .then(data => {
            dispatch({
                type: GET_SERVICES_BUILDING,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_SERVICES_BUILDING,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function filterServices(data) {
    return{
        type: FILTER_SERVICES,
        payload: data
    }
}

export function filterServicesAdmin(data) {
    return{
        type: FILTER_SERVICES_ADMIN,
        payload: data
    }
}

export function sortServices(data) {
    return{
        type: SORT_SERVICES,
        payload: data
    }
}

export function postService(body) {
    return function(dispatch){
        return axios.post(SERVICES_URL,body)
        .then(status => {
            dispatch({
                type: POST_SERVICE,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: POST_SERVICE,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function putService(body) {
    return function(dispatch){
        return axios.put(SERVICES_URL,body)
        .then(status => {
            dispatch({
                type: PUT_SERVICE,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: PUT_SERVICE,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function deleteService(id) {
    return function(dispatch) {
        return axios.delete(`${SERVICES_URL}/${id}`)
        .then(data => {
            dispatch({
                type: DELETE_SERVICE,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: DELETE_SERVICE,
                payload: {
                    status: "error"
                }
            })
        })
    }
}


export function findService(id) {
    return function(dispatch) {
        return axios.get(`${SERVICES_URL}/${id}`)
        .then(data => {
            dispatch({
                type: FIND_SERVICE,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: FIND_SERVICE,
                payload: {
                    status: "error"
                }
            })
        })
    }
}