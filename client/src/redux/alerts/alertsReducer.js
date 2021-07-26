import { GET_ALL_ALERTS, POST_ALERT, PUT_ALERT, DELETE_ALERT, FILTER_ALERTS , FIND_ALERT, FIND_ALERTS_BUILDING} from './alertActions';
import { filterAlerts } from './utils';

const initialState = {
    allAlerts: [],
    filteredAlerts: [],
    postStatus: 0,
    putStatus: 0,
    deleteStatus: 0,
    findAlert: 0,
    findAlertsBuilding: []
}

export default function alertsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_ALERTS:
            return {
                ...state,
                allAlerts: action.payload.data,
                filteredAlerts: action.payload.data
            }
        case POST_ALERT:
            return {
                ...state,
                postStatus: action.payload.status
            }
        case PUT_ALERT:
            return {
                ...state,
                putStatus: action.payload.status
            }
        case DELETE_ALERT:
            return {
                ...state,
                deleteStatus: action.payload.status
            }
        case FILTER_ALERTS:
            return {
                ...state,
                filteredAlerts: filterAlerts(state.allAlerts, action.payload.building, action.payload.importance, action.payload.since, action.payload.upTo)
            }
        case FIND_ALERT:
            return {
                ...state,
                findAlert: action.payload.data
            }
        case FIND_ALERTS_BUILDING:
            return {
                ...state,
                findAlertsBuilding: action.payload.data
            }
        default:
            return state;
    }
}