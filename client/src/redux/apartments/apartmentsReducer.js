import {
	ALL_APARTMENTS,
	CREATE_APARTMENT,
	GET_APARTMENT_BY_ID,
	DELETE_APARTMENT_BY_ID,
} from './apartmentsActions';

const initialState = {
	apartmentCreated: [],
	apartmentDetail: [],
	allApartments: [],
	apartmentDeleted: []
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_APARTMENT:
			return {
				...state,
				apartmentCreated: [...state.apartmentCreated, action.payload],
			};
		case ALL_APARTMENTS:
			return {
				...state,
				allApartments: action.payload,
			};
		case GET_APARTMENT_BY_ID:
			return {
				...state,
				apartmentDetail: action.payload,
			};
		case DELETE_APARTMENT_BY_ID:
			return {
				...state,
				apartmentDeleted: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
