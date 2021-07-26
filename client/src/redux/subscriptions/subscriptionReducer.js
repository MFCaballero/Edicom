import { GET_ALL_SUBSCRIPTIONS, POST_SUBSCRIPTION, PUT_SUBSCRIPTION, DELETE_SUBSCRIPTION, FIND_SUBSCRIPTION, GET_SUBSCRIPTIONS_BUILDING } from './subscriptionsActions';

const initialState = {
    allSubscriptions: [],
    findSubscription: {},
    buildingSubscriptions: null,
    postStatus: 0,
    putStatus: 0,
    deleteStatus: 0,
}

export default function subscriptionsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_SUBSCRIPTIONS:
            return {
                ...state,
                allSubscriptions: action.payload.data,
            }
        case POST_SUBSCRIPTION:
            return {
                ...state,
                postStatus: action.payload.status
            }
        case PUT_SUBSCRIPTION:
            return {
                ...state,
                putStatus: action.payload.status
            }
        case DELETE_SUBSCRIPTION:
            return {
                ...state,
                deleteStatus: action.payload.status
            }
        case FIND_SUBSCRIPTION:
            return {
                ...state,
                findSubscription: action.payload.data
            }
        case GET_SUBSCRIPTIONS_BUILDING:
            return {
                ...state,
                buildingSubscriptions: action.payload.data
            }
        default:
            return state;
    }
}