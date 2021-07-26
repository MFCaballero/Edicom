import {
   CREATE_BOOKING,
   ALL_BOOKINGS,
   GET_BOOKING_BY_ID,
   DELETE_BOOKING,
   FILTER_BOOKING,
   PUT_BOOKING,
   TAKE_BOOKING,
   CANCEL_BOOKING,
   FILTER_BOOKING_GROUP,
   GET_TAKED_BOOKING_BY_ID,
} from "./bookingActions";

const initialState = {
   bookingCreated: [],
   allBookings: [],
   bookingDetail: [],
   bookingDeleted: [],
   bookingFilter: {},
   putBooking: [],
   takedBookings: [],
   bookingNoToquesMauriQueSeRompeFilter: [],
};

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case CREATE_BOOKING:
         return {
            ...state,
            bookingCreated: [...state.bookingCreated, action.payload],
         };
      case ALL_BOOKINGS:
         return {
            ...state,
            allBookings: action.payload,
         };
      case GET_BOOKING_BY_ID:
         return {
            ...state,
            bookingDetail: action.payload,
         };
      case PUT_BOOKING:
         return {
            ...state,
            putBooking: action.payload,
         };
      case GET_TAKED_BOOKING_BY_ID:
         return {
            ...state,
            takedBookings: action.payload,
         };
      case FILTER_BOOKING:
         console.log("El Payload del reducer!!!!!!!!!1", action.payload);
         return {
            ...state,
            bookingNoToquesMauriQueSeRompeFilter: state.allBookings.filter(
               (booking) => {
                  return (
                     `${new Date(booking.start).getDate()} ${new Date(
                        booking.start
                     ).getMonth()}` ===
                     `${action.payload.getDate()} ${action.payload.getMonth()}`
                  );
               }
            ),
         };
      case TAKE_BOOKING:
         return {
            ...state,
            takedBookings: action.payload,
         };
      case CANCEL_BOOKING:
         return {
            ...state,
            takedBookings: action.payload,
         };
      case FILTER_BOOKING_GROUP:
         return {
            ...state,
            bookingFilter: action.payload,
         };
      default:
         return state;
   }
};

export default reducer;
