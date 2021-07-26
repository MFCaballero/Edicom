import React, { useEffect, useState } from "react";
import { Link , useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
   Button,
   Grid,
   InputLabel,
   MenuItem,
   FormControl,
   Select,
} from "@material-ui/core";
import { getAmenityById } from "../../../redux/amenities/amenitiesActions";
import { getBookingByAmenity, filterBookingsByGroup } from "../../../redux/booking/bookingActions";
import { DataGrid } from "@material-ui/data-grid";
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import filter from "../../../utils/filter-remove.png";
import PopUp from "./PopUp";
import styles from "./Styles.module.css";

function BookingsTable(props) {

   const dispatch = useDispatch();
   const history = useHistory();

   const allComplaints = useSelector(state => state.bookingReducer.bookingDetail)
   const bookingFilter = useSelector(state => state.bookingReducer.bookingFilter)


   useEffect(() => {
      dispatch(getBookingByAmenity(props.amenitieId))
   }, [dispatch])

   const [filter, setFilter] = useState(false);

   let complaints = [];

   if (!filter) {
      complaints = allComplaints?.map((booking) => {
         console.log(booking, "booking")
         let stateSpanish;
         if (booking.status === "free") stateSpanish = "Libre";
         if (booking.status === "cancelled") stateSpanish = "Cancelado";
         if (booking.status === "booked") stateSpanish = "Reservado";
         return {
            id: booking.id,
            start: moment(booking.start).format("DD/MM/YYYY -- H:mm"),
            date: moment(booking.finish).format("DD/MM/YYYY -- H:mm"),
            state: stateSpanish,
            createdAt: booking.createdAt,
            user: booking.user?.name || "Sin asignar."
         };
      });
   } else {
      console.log(bookingFilter)

      for (const groupBooking in bookingFilter) {
         {
            console.log({...bookingFilter[groupBooking][0], user:"Varios"}, "PUSHEO ESTO")
            complaints.push({...bookingFilter[groupBooking][0], user:"Varios", state:"Cambiar estado"})
         }
      }
   }


   const columns = [
      { field: "id", headerName: "ID", flex: 1.5, hide: true },
      { field: "createdAt", headerName: "createdAt", flex: 1.5, hide: true },
      { field: "start", headerName: "Comienzo", flex: 1 },
      { field: "date", headerName: "Fin", flex: 1 },
      { field: "user", headerName: "Usuario", flex: 1 },
      {
         field: "state", headerName: "Estado", flex: 1,
         renderCell: params => {
            if (!filter) {
               return (
                  <Link onClick={(e) => handleEventClick(e, params.row)}>
                     {params.row.state}
                  </Link>
               );
            } else {
               console.log(bookingFilter[params.row.date], "start", params.row.start)
               return (
                  <Link onClick={(e) => handleEventClickGroup(e, params.row.start)}>
                     {params.row.state}
                  </Link>
               );
            }
         },
      },
   ];

   const [displayPopUp, setDisplayPopUp] = useState(false);
   const [alertProps, setAlertProps] = useState({});
   const [inputFilter, sertInputFilter] = useState("All");

   const handleEventClick = (clickInfo, data) => {
      setAlertProps({
         id: data.id,
         title: data.concept,
         amenity: props.amenitieId,
         state: data.state,
         start: data.start,
         date: data.date,
         state: data.state,
      });
      setDisplayPopUp(true);
   };

   const handleEventClickGroup = (clickInfo, date) => {
      const data = bookingFilter[date]
      console.log(data, "ESTA ES LA DATA", date)

      setAlertProps({
         id: data,
         amenity: props.amenitieId
      });
      setDisplayPopUp(true);
   };

   const useStyles = makeStyles((theme) => ({
      root: {
         flexGrow: 1,
      },
      paper: {
         padding: theme.spacing(1),
         textAlign: "center",
         color: theme.palette.text.secondary,
      },
   }));


   async function handleSelectFilter(e) {


      console.log(e.target.value)

      if (e.target.value === "All") {
         setFilter(false);
         dispatch(getBookingByAmenity(props.amenitieId))
         sertInputFilter("All");

      } else if (e.target.value === "Hour") {
         setFilter(true);
         dispatch(getBookingByAmenity(props.amenitieId))
         sertInputFilter("Hour")
      }
      await dispatch(filterBookingsByGroup(complaints))
   }

   return (
      <div style={{ height: 400, width: "100%" }}>
         <div className="contSelectsAT">
            <PopUp
               setPop={setDisplayPopUp}
               display={displayPopUp}
               setDisplay={setDisplayPopUp}
               alertProps={alertProps}
            />
         </div>
         <InputLabel id="demo-controlled-open-select-label">
            Filtrar
         </InputLabel>
         <Select value={inputFilter} onChange={handleSelectFilter}>
            <MenuItem value="All">
               <em>Todos</em>
            </MenuItem>
            <MenuItem value="Hour">
               <em>Hora</em>
            </MenuItem>
         </Select>
         <div style={{ display: "flex", height: "100%" }}>
            <DataGrid sortModel={[
               {
                  field: 'createdAt',
                  sort: 'asce',
               },
            ]}
               rows={complaints} columns={columns} pageSize={5} />
         </div>
         <Link to={"/amenities"}>
            <Button id={styles.buttonBack} variant="contained" color="secondary" >Volver</Button>
         </Link>
      </div>
   );
}

export default BookingsTable;
