import {GET_ALL_BUILDINGS, GET_BUILDING, POST_BUILDING, PUT_BUILDING, DELETE_BUILDING} from './buildingActions';

const initialState = {
    allBuildings: [],
    detailBuilding: {},
    postStatus: 0,
    putStatus: 0,
    deleteStatus: 0,


    activeSesion: null
}

export default function buildingReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_BUILDINGS:
            return {
                ...state,
                allBuildings: action.payload.data
            }
        case GET_BUILDING:
            return {
                ...state,
                detailBuilding: action.payload.data
            }
        case POST_BUILDING:
            return {
                ...state,
                postStatus: action.payload.status
            }
        case PUT_BUILDING:
            return {
                ...state,
                putStatus: action.payload.status
            }
        case DELETE_BUILDING:
            return {
                ...state,
                deleteStatus: action.payload.status
            }
        case "GET_SESION":
            return {
                ...state,
                activeSesion: action.payload.data
            }
        default:
            return state;
    }
}