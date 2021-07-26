import { GET_ALL_SERVICES, POST_SERVICE, PUT_SERVICE, DELETE_SERVICE, FIND_SERVICE,
    GET_SERVICES_BUILDING, FILTER_SERVICES, SORT_SERVICES, FILTER_SERVICES_ADMIN } from './servicesAction';
import { filterServices } from './utils';

const initialState = {
    allServices: [],
    filteredServices: [],
    filteredServicesAdmin: [],
    findService: {},
    buildingServices: null,
    postStatus: 0,
    putStatus: 0,
    deleteStatus: 0,
}

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SERVICES:
            return {
                ...state,
                allServices: action.payload.data,
                filteredServicesAdmin: action.payload.data
            }
        case POST_SERVICE:
            return {
                ...state,
                postStatus: action.payload.status
            }
        case PUT_SERVICE:
            return {
                ...state,
                putStatus: action.payload.status
            }
        case DELETE_SERVICE:
            return {
                ...state,
                deleteStatus: action.payload.status
            }
        case FIND_SERVICE:
            return {
                ...state,
                findService: action.payload.data
            }
        case FILTER_SERVICES:
            if(!action.payload)  return{
                ...state,
                filteredServices: [...state.buildingServices]
            }
            return{
                ...state,
                filteredServices: [...state.buildingServices].filter( (elem) => elem.title.toLowerCase().includes(action.payload.toLowerCase()) )
            }
        case GET_SERVICES_BUILDING:
            return {
                ...state,
                buildingServices: action.payload.data,
                filteredServices: action.payload.data
            }
        case SORT_SERVICES:
            if(action.payload === 'az') return{
                ...state,
                filteredServices: [...state.filteredServices].sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
            }
            if(action.payload === 'stars')return{
                ...state,
                filteredServices: [...state.filteredServices].sort((a,b) => (a.ratings.reduce((tot, acc, curr) => {
                    return tot + acc.rating
                  },0) / a.ratings.length > b.ratings.reduce((tot, acc, curr) => {
                    return tot + acc.rating
                  },0) / b.ratings.length) ? -1 : ((b.ratings.reduce((tot, acc, curr) => {
                    return tot + acc.rating
                  },0) / b.ratings.length > a.ratings.reduce((tot, acc, curr) => {
                    return tot + acc.rating
                  },0) / a.ratings.length) ? 1 : 0))
            }
        case FILTER_SERVICES_ADMIN:
            return {
                ...state,
                filteredServicesAdmin: filterServices(state.allServices, action.payload.building, action.payload.status)
            }
        default:
            return state;
    }
}