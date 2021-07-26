import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { putBooking } from '../../../redux/booking/bookingActions';
import { getBookingByAmenity, filterBookingsByGroup } from "../../../redux/booking/bookingActions";
import styles from "./Styles.module.css";
import moment from "moment";

export default function PopUp(props) {

    const dispatch = useDispatch();
    const setPop = props.setPop

    const allBookings = useSelector(state => state.bookingReducer.bookingDetail)

    const freeBooking = async (event) => {
        console.log("entra free booking")
        if (!Array.isArray(props.alertProps.id)) {
            console.log("modo individual")
            await dispatch(putBooking(props.alertProps.id, { status: "free" }))
        } else {
            props.alertProps.id.map(async (booking) => {
                await dispatch(putBooking(booking.id, { status: "free" }))
                console.log(booking, "esto entra en el grupo", booking.id)
            })
            let bookings = await allBookings?.map((booking) => {
                let stateSpanish;
                console.log("changing state", moment(booking.start).format("DD/MM/YYYY -- H:mm"), props.alertProps.id[0].start)
                if (moment(booking.start).format("DD/MM/YYYY -- H:mm") !== props.alertProps.id[0].start) {
                    if (booking.status === "free") stateSpanish = "Libre";
                    if (booking.status === "cancelled") stateSpanish = "Cancelado";
                    if (booking.status === "booked") stateSpanish = "Reservado";
                } else {
                    stateSpanish = "Libre"
                }
                return {
                    id: booking.id,
                    start: moment(booking.start).format("DD/MM/YYYY -- H:mm"),
                    date: moment(booking.finish).format("DD/MM/YYYY -- H:mm"),
                    state: stateSpanish,
                    createdAt: booking.createdAt,
                    user: booking.user?.name || "Sin asignar."
                };
            });
            console.log(bookings, "bookings a agrupar")
            await dispatch(filterBookingsByGroup(bookings))
            console.log("modo grupo")
        }
        console.log(props.alertProps)
        dispatch(getBookingByAmenity(props.alertProps.amenity))
        setPop(false)
    }

    const cancelBooking = async (event) => {
        if (!Array.isArray(props.alertProps.id)) {
            console.log("modo individual")
            await dispatch(putBooking(props.alertProps.id, { status: "cancelled" }))
        } else {
            console.log("modo grupo")
            props.alertProps.id.map(async (booking) => {
                console.log(booking, "esto entra en el grupo", booking.id)
                await dispatch(putBooking(booking.id, { status: "cancelled" }))
            })
            let bookings = await allBookings?.map((booking) => {
                let stateSpanish;
                console.log("changing state", moment(booking.start).format("DD/MM/YYYY -- H:mm"), props.alertProps.id[0].start)
                if (moment(booking.start).format("DD/MM/YYYY -- H:mm") !== props.alertProps.id[0].start) {
                    if (booking.status === "free") stateSpanish = "Libre";
                    if (booking.status === "cancelled") stateSpanish = "Cancelado";
                    if (booking.status === "booked") stateSpanish = "Reservado";
                } else {
                    stateSpanish = "Cancelado"
                }
                return {
                    id: booking.id,
                    start: moment(booking.start).format("DD/MM/YYYY -- H:mm"),
                    date: moment(booking.finish).format("DD/MM/YYYY -- H:mm"),
                    state: stateSpanish,
                    createdAt: booking.createdAt,
                    user: booking.user?.name || "Sin asignar."
                };
            });
            console.log(bookings, "bookings a agrupar")
            await dispatch(filterBookingsByGroup(bookings))
            console.log("modo grupo")
        }
        console.log(props.alertProps)
        dispatch(getBookingByAmenity(props.alertProps.amenity))
        setPop(false)
    }

    const takeBooking = async (event) => {
        if (!Array.isArray(props.alertProps.id)) {
            console.log("modo individual")
            await dispatch(putBooking(props.alertProps.id, { status: "booked" }))
        } else {
            console.log("modo grupo")
            props.alertProps.id.map(async (booking) => {
                console.log(booking, "esto entra en el grupo", booking.id)
                await dispatch(putBooking(booking.id, { status: "booked" }))
            })
            let bookings = await allBookings?.map((booking) => {
                let stateSpanish;
                console.log("changing state", moment(booking.start).format("DD/MM/YYYY -- H:mm"), props.alertProps.id[0].start)
                if (moment(booking.start).format("DD/MM/YYYY -- H:mm") !== props.alertProps.id[0].start) {
                    if (booking.status === "free") stateSpanish = "Libre";
                    if (booking.status === "cancelled") stateSpanish = "Cancelado";
                    if (booking.status === "booked") stateSpanish = "Reservado";
                } else {
                    stateSpanish = "Reservado"
                }
                return {
                    id: booking.id,
                    start: moment(booking.start).format("DD/MM/YYYY -- H:mm"),
                    date: moment(booking.finish).format("DD/MM/YYYY -- H:mm"),
                    state: stateSpanish,
                    createdAt: booking.createdAt,
                    user: booking.user?.name || "Sin asignar."
                };
            });
            console.log(bookings, "bookings a agrupar")
            await dispatch(filterBookingsByGroup(bookings))
            console.log("modo grupo")
        }
        console.log(props.alertProps)
        dispatch(getBookingByAmenity(props.alertProps.amenity))
        setPop(false)
    }

    return (props.display) ? (
        <ThemeProvider theme={theme}>
            <div className='popUpAlert'>
                <div className='popup-inner'>
                    <div className='btnX'>
                        <input className='XinputBtn' type="button" value="X" onClick={() => props.setDisplay(false)} />
                    </div>
                    <div className='contExtDetailAlert'>
                        <Button id={styles.button} onClick={freeBooking} style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                            Liberar Turno
                        </Button>
                        <Button id={styles.button} onClick={cancelBooking} style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                            Cancelar Turno
                        </Button>
                        <Button id={styles.button} onClick={takeBooking} style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                            Reservar Turno
                        </Button>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    ) : "";
}