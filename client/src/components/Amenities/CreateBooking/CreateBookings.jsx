import {createBooking} from '../../../redux/booking/bookingActions';
import {useDispatch, useSelector} from 'react-redux';
import { Modal, TextField, Button} from '@material-ui/core'
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { useState } from 'react';
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import theme from '../../themeStyle'
import ControlledOpenSelect from '../../Spending/ExpensesGenerator/ControlledOpenedSelect'


const CreateBookings = ({visibility, changeVisibility, idAmenity}) => {

    const useStyles = makeStyles((theme) => ({
      root: {
         flexGrow: 1,
      },
      modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '1px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%', 
        transform: 'translate(-50%, -50%)',
    },
      paper: {
         padding: theme.spacing(2),
         textAlign: "center",
         color: theme.palette.text.secondary,
        },
      container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(1),
    width: 230,
    marginTop: theme.spacing(2)
  },
   }));



    const initialData = {
        idAmenity: idAmenity,
        dateStart: new Date(),
        dateEnd: new Date(),
        timeStart: '07:30',
        timeEnd: '21:30',
        duration: '08:00'
    }

    const [input, setInput] = useState(initialData)
    const {bookingCreated} = useSelector(state => state.bookingReducer); 
    const dispatch = useDispatch();

    console.log('ESTE ES EL ESTADO BOOKING DE REDUX', bookingCreated)

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
         })
        console.log("InputGENERAL",input)
    }

    const handledateStartChange = (date)=>{
        setInput({...input,
            dateStart: date
            })
            console.log("handleStartDateChaneg",input)
    }    
    const handledateEndChange = (date)=>{
        setInput({...input,
            dateEnd: date
            })
            console.log("handleStartDateChaneg",input)
    }    
    const handleCreateBooking = (e) => {
        console.log(input)
        console.log("Mariano rompiste todooooooo")
        dispatch(createBooking(input))
        
    }    

    const styles = useStyles();

    const body = (


        <form>
            <div className={styles.modal}>
            <div align="center">
                <h2>Crear Turno</h2>
            </div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                
                           <KeyboardDatePicker
                              name="dateStart"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Fecha de inicio"
                              format="dd/MM/yyyy"
                              value={input.dateStart}
                              onChange={handledateStartChange}
                              KeyboardButtonProps={{
                                 "aria-label": "change date",
                              }}
                           />
                    
                    
                           <KeyboardDatePicker
                              name="dateEnd"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Hasta"
                              format="dd/MM/yyyy"
                              value={input.dateEnd}
                              onChange={handledateEndChange}
                              KeyboardButtonProps={{
                                 "aria-label": "change date",
                              }}
                    />
                    <TextField
                        id="time"
                        label="Inicio"
                        name="timeStart"
                        type="time"
                        className={ styles.textField}
                        value={input.timeStart}
                        onChange={handleChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <TextField
                        id="time"
                        label="Fin"
                        name="timeEnd"
                        type="time"
                        className={styles.textField}
                        value={input.timeEnd}
                        onChange={handleChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                    <TextField
                        id="time"
                        label="Duración"
                        type="time"
                        name="duration"
                        className={styles.textField}
                        value={input.duration}
                        onChange={handleChange}
                        InputLabelProps={{
                        shrink: true,
                        }}
                        inputProps={{
                        step: 300, // 5 min
                        }}
                    />
                
                

                </MuiPickersUtilsProvider>
            <div align="right">
                <Button color="secondary"
                    onClick= {
                        (e) => {
                            changeVisibility(!visibility)
                            handleCreateBooking(e)
                        }
                    }
                > 
                    Generar 
                </Button> 
                <Button
                    onClick={() => changeVisibility(!visibility)}
                > 
                    Cancelar 
                </Button>
            </div>
            
        </div>
        <br/><br/>
        
        </form>
        
    )
    return (
        
        <>
        
        <Modal
            open={visibility}
            body={body}
            >
                {body}
        </Modal>
    
        </>
      );
}
 
export default CreateBookings;