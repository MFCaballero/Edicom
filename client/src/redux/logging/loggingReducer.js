import { LOGGING_REJECT, LOGOUT ,LOGGING_IN_SUCCESS, SEND_EMAIL, TOKEN_TO_EMAIL, EMAIL_TO_TOKEN, GET_USER_ID } from './loggingActions';

const initialState = {
    authData: {
        first_logging: null,
        message: null,
        name: null,
        token: null
    },
    success: false,
    err: {},
    recoveryMail: null,
    tokenToConfirm: null,
    userId: null
};


const loggingReducer = (state = initialState, action) => {

    switch (action.type) {
       //elimine reducer normal 

        case LOGGING_IN_SUCCESS:{
            return{
                ...state,
                authData:action.payload,
                success:true
            }
        }

        case LOGGING_REJECT:
            return {
                ...state,
                err: action.payload,
            };

        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: initialState.authData }

        case SEND_EMAIL:
            return {...state}


        case TOKEN_TO_EMAIL:
            return {
                ...state, recoveryMail: action.payload.mail
            }

        case EMAIL_TO_TOKEN:
            return {
                ...state, tokenToConfirm: action.payload.token
            }
        case GET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }

        default:
            return state
    }
}
export default loggingReducer;