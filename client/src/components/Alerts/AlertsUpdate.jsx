import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import styles from "./AlertsUpdate.module.css";
import { TextField, Button, MenuItem } from '@material-ui/core';
import swal from "sweetalert";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';
import {
    putAlert, sendEmail
} from '../../redux/alerts/alertActions';
import { getSubscriptionsBuilding } from '../../redux/subscriptions/subscriptionsActions';
import {
    getBuildings
} from '../../redux/building/buildingActions';
import { findAlert, deleteAlert } from "../../redux/alerts/alertActions"
import { getAlerts, filterAlerts } from '../../redux/alerts/alertActions';

const AlertsUpdate = (props) => {
    const date = new Date;
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch(); //dispatch setup
    const buildings = useSelector(state => state.buildingReducer);
    const alert = useSelector(state => state.alertsReducer);
    const subscriptions = useSelector(state => state.subscriptionsReducer.buildingSubscriptions);


    const currencies = [
        {
            value: 'alta',
            label: 'Alta',
        },
        {
            value: 'media',
            label: 'Media',
        },
        {
            value: 'baja',
            label: 'Baja',
        }
    ];


    const [input, setInput] = useState({
        date: date,
        concept: "",
        detail: "",
        important: "",
        building: ""
    })

    useEffect(() => {
        dispatch(getBuildings())
        dispatch(findAlert(id))
    }, [dispatch]);

    useEffect(() => {
        alert.findAlert[0] &&
            setInput({
                ...input,
                date: alert.findAlert[0].date,
                concept: alert.findAlert[0].concept,
                important: alert.findAlert[0].importance,
                building: alert.findAlert[0].buildingId,
                detail: alert.findAlert[0].details || ""
            })
    }, [alert.findAlert]);


    const [error, setError] = useState({
        date: false,
        concept: false,
        detail: false,
        important: false,
        building: false,
    });

    const saveHandler = () => {
        let today = new Date()
        if (input.concept !== "" && input.important !== "" && input.building !== "" && input.date !== null && (input.date > today.setDate(today.getDate() - 1))) {
            setError({
                date: false,
                concept: false,
                detail: false,
                important: false,
                building: false
            });
            setInput({
                date: date,
                concept: "",
                detail: "",
                important: "",
                building: ""
            })
            let body = {
                id: id,
                date: input.date,
                concept: input.concept,
                details: input.detail,
                building: input.building,
                importance: input.important
            }
            dispatch(getSubscriptionsBuilding(input.building))
            .then(subscriptions !== null && dispatch(putAlert(body)))
            .then(subscriptions !== null && dispatch(sendEmail({subscriptions: subscriptions.filter(e => e.user !== null), update: true, body: {date: input.date,
                concept: input.concept,
                details: input.detail,
                importance: input.important}})))
            .then(subscriptions !== null ? swal("Se ha modificado la alerta!", "Gracias!", "success") : swal("Alerta no modificada!", "Intente de nuevo!", "warning"))
            .then(subscriptions !== null && history.goBack())
            dispatch(getAlerts());
        } else {
            if (input.building === "") setError({ ...error, building: true });
            if (input.important === "") setError({ ...error, important: true });
            if (input.concept === "") setError({ ...error, concept: true });
            swal("Debe completar la fecha, concepto, importancia y el edificio", "Por favor revise los datos!", "warning");
            if(!(input.date > today.setDate(today.getDate() - 1))) swal("La fecha ingresada no puede ser antes que la fecha de hoy", "Por favor revise los datos!", "warning");
        }
    }

    const deleteHandler = () => {
        dispatch(deleteAlert(id))
                .then(swal("Se ha eliminado la alerta!", "Gracias!", "success"))
                .then(history.goBack())
                dispatch(getAlerts());
    }

    const handleChange = (e, change) => {
        if (change === "concept") setError({ ...error, concept: false })
        if (change !== "date") e = e.target.value;
        setInput({ ...input, [change]: e })
    }

    const cancelHandler = () => {
		history.goBack()
	}

    return (
        <ThemeProvider theme={theme}>
            <div id={styles.cont}>
                <h1>Modificar alerta:</h1>
                <div id={styles.formCont}>
                    <form
                        noValidate
                        autoComplete="off"
                        onSubmit={saveHandler}
                    >
                        <div id={styles.form}>
                            <div id={styles.left}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <div className={styles.box}>
                                        <KeyboardDatePicker
                                            id={styles.input}
                                            name="date"
                                            margin="normal"
                                            color="secondary"
                                            id="date-picker-dialog"
                                            label="Fecha"
                                            format="MM/dd/yyyy"
                                            value={input.date}
                                            onChange={e => handleChange(e, "date")}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }} />
                                    </div>
                                </MuiPickersUtilsProvider>
                                <div className={styles.box}>
                                    <TextField variant="outlined"
                                        id={styles.input}
                                        label="Concepto"
                                        value={input.concept}
                                        error={error.concept}
                                        onChange={e => handleChange(e, "concept")} />
                                </div>
                                <div className={styles.box}>
                                    <TextField variant="outlined"
                                        id={styles.input}
                                        label="Detalles"
                                        multiline
                                        value={input.detail}
                                        onChange={e => handleChange(e, "detail")} />
                                </div>
                            </div>
                            <div id={styles.right}>
                                <div className={styles.box}>
                                    <TextField variant="outlined"
                                        id={styles.input}
                                        label="Importancia"
                                        value={input.important}
                                        error={error.important}
                                        select
                                        onChange={e => handleChange(e, "important")} >
                                        {currencies.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                                <div className={styles.box}>
                                    <TextField variant="outlined"
                                        id={styles.input}
                                        label="Seleccione un edificio"
                                        value={input.building}
                                        select
                                        error={error.building}
                                        onChange={e => handleChange(e, "building")} >
                                        {buildings.allBuildings && buildings.allBuildings.map((option) => (
                                            <MenuItem key={option.id} value={option.id}>
                                                {option.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </div>
                            </div>
                        </div>
                        <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-around', alignItems:'center', width: '80%', marginLeft: -70, marginTop:50}}>
                        <Button
                            id={styles.submit}
                            style={{ fontWeight: 1000 }}
                            color="secondary"
                            variant="contained"
                            onClick={saveHandler}
                        >
                            Modificar alerta
                        </Button>
                        <Button
                            id={styles.submit}
                            style={{ fontWeight: 1000, marginLeft: 20 }}
                            color="primary"
                            variant="contained"
                            onClick={deleteHandler}
                        >
                            Eliminar alerta
                        </Button>
                        <Button 
                            id={styles.submit}
                            style={{ fontWeight: 1000 , marginLeft: 20}}
                            color="secondary"
                            variant="contained"
                            onClick={cancelHandler}
                        >
                            Cancelar
                        </Button>
                        </div>
                    </form>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default AlertsUpdate;