import axios from 'axios';
import { GET_ALL_SUBSCRIPTIONS_URL, SUBSCRIPTIONS_URL } from './utils';
export const GET_ALL_SUBSCRIPTIONS = 'GET_ALL_SUBSCRIPTIONS';
export const POST_SUBSCRIPTION = 'POST_SUBSCRIPTION';
export const PUT_SUBSCRIPTION = 'PUT_SUBSCRIPTION';
export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';
export const FIND_SUBSCRIPTION = 'FIND_SUBSCRIPTION';
export const GET_SUBSCRIPTIONS_BUILDING = 'GET_SUBSCRIPTIONS_BUILDING';


export function getSubscriptions() {
    return function(dispatch) {
        return axios.get(GET_ALL_SUBSCRIPTIONS_URL)
        .then(data => {
            dispatch({
                type: GET_ALL_SUBSCRIPTIONS,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ALL_SUBSCRIPTIONS,
                payload: {
                    data: "error"
                }
            })
        })
    }
}

export function getSubscriptionsBuilding(id) {
    return function(dispatch) {
        return axios.get(`${GET_ALL_SUBSCRIPTIONS_URL}/${id}`)
        .then(data => {
            dispatch({
                type: GET_SUBSCRIPTIONS_BUILDING,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: GET_SUBSCRIPTIONS_BUILDING,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function postSubscription(body) {
    return function(dispatch){
        return axios.post(SUBSCRIPTIONS_URL,body)
        .then(status => {
            dispatch({
                type: POST_SUBSCRIPTION,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: POST_SUBSCRIPTION,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function putSubscription(body) {
    return function(dispatch){
        return axios.put(SUBSCRIPTIONS_URL,body)
        .then(status => {
            dispatch({
                type: PUT_SUBSCRIPTION,
                payload: status
            })
        })
        .catch(err => {
            dispatch({
                type: PUT_SUBSCRIPTION,
                payload: {
                    status: "error"
                }
            })
        })
    }
}

export function deleteSubscription(id) {
    return function(dispatch) {
        return axios.delete(`${SUBSCRIPTIONS_URL}/${id}`)
        .then(data => {
            dispatch({
                type: DELETE_SUBSCRIPTION,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: DELETE_SUBSCRIPTION,
                payload: {
                    status: "error"
                }
            })
        })
    }
}


export function findSubscription(id) {
    return function(dispatch) {
        return axios.get(`${SUBSCRIPTIONS_URL}/${id}`)
        .then(data => {
            dispatch({
                type: FIND_SUBSCRIPTION,
                payload: data
            })
        })
        .catch(err => {
            dispatch({
                type: FIND_SUBSCRIPTION,
                payload: {
                    status: "error"
                }
            })
        })
    }
}
