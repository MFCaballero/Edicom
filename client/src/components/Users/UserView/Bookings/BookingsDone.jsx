import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import { useStyles } from '@material-ui/pickers/views/Calendar/Day';
import { useSelector } from 'react-redux';
import moment from 'moment';



export const BookingsDone = ( {handleCancelBooking} ) => {
    
    const { takedBookings } = useSelector(state => state.bookingReducer)
    const { allBookings } = useSelector((state) => state.bookingReducer)
    const { Amenities } = useSelector(state => state.amenitiesReducer)
    const { userDetail } = useSelector(state => state.userReducer)

    console.log('takedBookings', takedBookings)

    const classes = useStyles();

    return (
        <div>
            <div className={classes.title}>
                <h2 >Mis reservas</h2>
            </div>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="caption table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amenitie</TableCell>
                            <TableCell align="right">Fecha</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => ( */}
                        {
                            takedBookings?.map((booking, i) => {
                                if(booking.status !== "cancelled"){
                                    return (
                                        <TableRow>
                                            <TableCell component="th" scope="row">
                                                {Amenities && Amenities?.map((amenity) => {
                                                    return (amenity.id === booking.amenityId) ? <p>{amenity.amenity_type}</p> : null
                                                    })
                                                }
                                            </TableCell>
                                            <TableCell align="right">
                                                {moment(booking.start).format('LLL')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button variant="contained" onClick={() => handleCancelBooking(booking.id)}>Cancelar</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            })

                        }
                        {/*  <TableRow >
                            <TableCell component="th" scope="row">
                                Pileta
                            </TableCell>
                            <TableCell align="right">26/06/2021</TableCell>
                            <TableCell align="right"><Button variant="contained">Cancelar</Button></TableCell>
                        </TableRow> */}

                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
