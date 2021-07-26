import {
	CREATE_USER,
	DELETE_USER,
	GET_ALL_USERS,
	GET_USER,
	UPDATE_USER,
	GET_ALL_USERS_FOR_LIST,
	GET_ALL_USERS_BY_BUILDING,
	ERR_CREATE_USER
} from '../users/userActions';

const initialState = {
	users: [],
	userDetail: undefined,
	userUpdate: 0,
	errCreateUser: false
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_USERS:
			return {
				...state,
				users: action.payload,
			};
		case CREATE_USER:
			return {
				...state,
				userDetail: action.payload,
			};
		case ERR_CREATE_USER:
			return { 
				...state,
				errCreateUser: !state.errCreateUser
			}
		case GET_USER:
			return {
				...state,
				userDetail: action.payload,
			};
		case UPDATE_USER:
			console.log('ACTION ACA', action.payload);
			return {
				...state,
				userUpdate: action.payload.status,
			};
		case DELETE_USER:
			return {
				...state,
				userDetail: action.payload,
			};
		case GET_ALL_USERS_FOR_LIST:
			return {
				...state,
				users: action.payload,
			};
		case GET_ALL_USERS_BY_BUILDING:
			return {
				...state,
				users: action.payload,
			};
		default:
			return state;
	}
};
export default userReducer;
