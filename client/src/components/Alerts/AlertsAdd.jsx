import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import styles from "./AlertsAdd.module.css";
import { TextField, Button, MenuItem } from '@material-ui/core';
import swal from "sweetalert";
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { useHistory, useParams } from 'react-router-dom';
import {
    postAlert, sendEmail
} from '../../redux/alerts/alertActions';
import { getSubscriptionsBuilding } from '../../redux/subscriptions/subscriptionsActions';
import {
    getBuildings
} from '../../redux/building/buildingActions';
import { getAlerts, filterAlerts } from '../../redux/alerts/alertActions';

const AlertsAdd = (props) => {
    const date = new Date();
    const history = useHistory();
    const dispatch = useDispatch(); //dispatch setup
    const buildings = useSelector(state => state.buildingReducer);
    const subscriptions = useSelector(state => state.subscriptionsReducer.buildingSubscriptions);
    const {buildingId} = useParams();

    useEffect(() => {
        dispatch(getBuildings())
    }, [dispatch]);

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
        building: buildingId || ""
    })


    const [error, setError] = useState({
        date: false,
        concept: false,
        detail: false,
        important: false,
        building: false,
    });

    const saveHandler = () => {
        let today = new Date()
        if (input.concept !== "" && input.important !== "" && input.building !== "" && (input.date > today.setDate(today.getDate() - 1))) {
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
                date: input.date,
                concept: input.concept,
                details: input.detail,
                building: input.building,
                importance: input.important
            }
            dispatch(getSubscriptionsBuilding(input.building))
                .then(subscriptions !== null && dispatch(postAlert(body)))
                .then(subscriptions !== null && dispatch(sendEmail({subscriptions: subscriptions.filter(e => e.user !== null), update: false, body: {date: input.date,
                    concept: input.concept,
                    details: input.detail,
                    importance: input.important}})))
                .then(subscriptions !== null ? swal("Se ha creado la alerta!", "Gracias!", "success") : swal("Alerta no creada!", "Intente de nuevo!", "warning"))
                .then(subscriptions !== null && history.goBack())
                dispatch(getAlerts());
                
        } else {
            if (input.building === "") setError({ ...error, building: true });
            if (input.important === "") setError({ ...error, important: true });
            if (input.concept === "") setError({ ...error, concept: true });
            swal("Debe completar el concepto, la importancia y el edificio", "Por favor revise los datos!", "warning");
            if(!(input.date > today.setDate(today.getDate() - 1))) swal("La fecha ingresada no puede ser antes que la fecha de hoy", "Por favor revise los datos!", "warning");
        }
    }

    const handleChange = (e, change) => {
        if (change !== "date") e = e.target.value;
        setInput({ ...input, [change]: e })
    }

    const cancelHandler = () => {
		history.goBack()
	}

    return (
        <ThemeProvider theme={theme}>
            <div id={styles.cont}>
                <h1>Crear alerta:</h1>
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
                                            format="dd/MM/yyyy"
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
                                        id={styles.important}
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
                                        id={styles.building}
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
                        <div style={{marginLeft: -100}}>
                        <Button
                            id={styles.submit}
                            style={{ fontWeight: 1000 }}
                            color="secondary"
                            variant="contained"
                            onClick={saveHandler}
                        >
                            Crear alerta
                        </Button>
                        <Button 
                            id={styles.submit}
                            style={{ fontWeight: 1000, marginLeft:20 }}
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

export default AlertsAdd;