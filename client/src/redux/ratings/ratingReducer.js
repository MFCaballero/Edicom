import { ADD_RATINGS, PUT_RATINGS, GET_RATINGS, DELETE_RATINGS, RATINGS_BY_SERVICE } from './ratingsAction';

const initialState = {
    ratingList: [],
    ratingFiltered: null,
};


const expensesReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_RATINGS:
            return { ...state, ratingList: state.ratingList.concat(action.payload) };

        case PUT_RATINGS:
            return state;
        
        case GET_RATINGS:
            return { ratingList: action.payload, ratingFiltered:action.payload };

        case DELETE_RATINGS:
            return state;
        
        case RATINGS_BY_SERVICE:
            return { ...state, ratingFiltered:action.payload.data };            

        default:
            return state
                
    }
}

export default expensesReducer;