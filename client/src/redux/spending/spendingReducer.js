import {
	POST_SPENDING,
	GET_SPENDINGS,
	FILTER_SPENDING,
	DELETE_SPENDING,
	PUT_SPENDING,
	GET_BUILDING_SPENDINGS
} from '../spending/spendingActions';

const initialState = {
	addSpending: null,
	totalSpending: [], //cambiar x spending
	filterSpending: [],
	buildingSpendings: []
};

const SpendingReducer = (state = initialState, action) => {
	switch (action.type) {
		case PUT_SPENDING:
			return {...state, filterSpending: action.payload};
		case POST_SPENDING:
			return {...state, filterSpending: action.payload};
		case DELETE_SPENDING: //
			return {...state, filterSpending: action.payload};
		case GET_SPENDINGS:
			return {totalSpending: action.payload, filterSpending: action.payload};
		case GET_BUILDING_SPENDINGS:
			return {
				...state,
				buildingSpendings: action.payload.data
			}
		case FILTER_SPENDING:
			if (action.payload.concept === 'All' || action.payload.concept === '') {
				if(action.payload.buildingId === 'All' || action.payload.buildingId === '')
					return {...state, filterSpending: state.totalSpending	
						.filter(s => {
							return new Date(s.date) >= action.payload.since;
						})
						.filter(s => new Date(s.date) <= action.payload.upTo)
				};
				else{
					return {...state, filterSpending: state.totalSpending	
						.filter(s => {
							return new Date(s.date) >= action.payload.since;
						})
						.filter(s => new Date(s.date) <= action.payload.upTo)
						.filter(s => s.buildingId === action.payload.buildingId)
					}
				}
					
			}

			if (action.payload.concept !== 'All') {
				if(action.payload.buildingId === 'All' || action.payload.buildingId === ''){
					return {...state, filterSpending: state.totalSpending
						.filter(s => s.concept === action.payload.concept)
						.filter(s => {
							return new Date(s.date) >= action.payload.since;
						})
						.filter(s => new Date(s.date) <= action.payload.upTo)					
					};
				}
				else{
					return {...state, filterSpending: state.totalSpending
						.filter(s => s.concept === action.payload.concept)
						.filter(s => {
							return new Date(s.date) >= action.payload.since;
						})
						.filter(s => new Date(s.date) <= action.payload.upTo)	
						.filter(s => s.buildingId === action.payload.buildingId)				
					};
				}
				
			}
			break;
		default:
			return state;
	}
};

export default SpendingReducer;
