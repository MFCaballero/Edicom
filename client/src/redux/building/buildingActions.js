import axios from 'axios';
import { GET_ALL_BUILDINGS_URL, GET_DETAIL_BUILDING_URL, POST_BUILDING_URL, PUT_BUILDING_URL, DELETE_BUILDING_URL } from './utils';
export const GET_ALL_BUILDINGS = 'GET_ALL_BUILDINGS';
export const GET_BUILDING = 'GET_BUILDING';
export const POST_BUILDING = 'POST_BUILDING';
export const PUT_BUILDING = 'PUT_BUILDING';
export const DELETE_BUILDING = 'DELETE_BUILDING';

export function getBuildings() {
    return function(dispatch) {
        return axios.get(GET_ALL_BUILDINGS_URL)
        .then(data => {
            
            dispatch({
                type: GET_ALL_BUILDINGS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_BUILDINGS,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function getBuildingDetail(id) {
    return function(dispatch) {
        return axios.get(`${GET_DETAIL_BUILDING_URL}${id}`)
        .then(data => {
            dispatch({
                type: GET_BUILDING,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_BUILDING,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function postBuilding(body) {
    return function(dispatch){
        return axios.post(POST_BUILDING_URL,body)
        .then(status => {
            dispatch({
                type: POST_BUILDING,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: POST_BUILDING,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function putBuilding(body) {
    return function(dispatch){
        return axios.put(PUT_BUILDING_URL,body)
        .then(status => {
            dispatch({
                type: PUT_BUILDING,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: PUT_BUILDING,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function deleteBuilding(id) {
    return function(dispatch) {
        return axios.delete(`${DELETE_BUILDING_URL}/${id}`)
        .then(data => {
            dispatch({
                type: DELETE_BUILDING,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: DELETE_BUILDING,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function getTraerSesion(token) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/buildings/getSesion/${token}`)
        .then(data => {
            dispatch({
                type: "GET_SESION",
                payload: data
            })
        })
        // .catch(err => {
        //     dispatch({
        //         type: ,
        //         payload: {
        //             status: ""
        //         }
        //     })
        // })
    }
}