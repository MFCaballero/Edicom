import {
	CREATE_AMENITY,
	DELETE_AMENITY,
	GET_ALL_AMENITIES,
	GET_AMENITY_BY_ID,
	UPDATE_AMENITY,
	GET_AMENITIES,
} from '../amenities/amenitiesActions';

const initialState = {
	Amenities: [],
	amenityDetail: undefined,
	amenityCreated: [],
	amenityDeleted: [],
};

const amenitiesReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_AMENITIES:
			return {
				...state,
				Amenities: action.payload,
			};
		case GET_AMENITIES:
			return {
				...state,
				Amenities: action.payload,
			};
		case CREATE_AMENITY:
			return {
				...state,
				amenityCreated: action.payload,
			};
		case GET_AMENITY_BY_ID:
			return {
				...state,
				amenityDetail: action.payload,
			};
		case UPDATE_AMENITY:
			return {
				...state,
				amenityDetail: action.payload,
			};
		case DELETE_AMENITY:
			return {
				...state,
				amenityDeleted: action.payload,
			};
		default:
			return state;
	}
};
export default amenitiesReducer;
