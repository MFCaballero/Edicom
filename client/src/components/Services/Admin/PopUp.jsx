import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import { useDispatch, useSelector } from 'react-redux';
import { getServices, putService, deleteService } from '../../../redux/services/servicesAction';
import styles from "./Styles.module.css";
import CircularProgress from '@material-ui/core/CircularProgress';

export default function PopUp(props) {

    const buildings = useSelector(state => state.buildingReducer.allBuildings);
    const dispatch = useDispatch();
    const setPop = props.setPop;
    const[loading, setLoading] = useState(false)

    const handleOpen = () => {
        setLoading(true)
        dispatch(putService({id: props.alertProps.id}))
        setTimeout(()=>{
            dispatch(getServices())
            setLoading(false)
            setPop(false)
        }, 2000)
    }

    const handleClose = () => {
        setLoading(true)
        dispatch(deleteService(props.alertProps.id))
        setTimeout(()=>{
            dispatch(getServices())
            setLoading(false)
            setPop(false)
        }, 2000)
    }

    return (props.display) ? (
        <ThemeProvider theme={theme}>
            <div className='popUpAlert'>
                <div className='popup-inner'>
                    <div className='btnX'>
                        <input className='XinputBtn' type="button" value="X" onClick={() => props.setDisplay(false)} />
                    </div>
                    <div className='contExtDetailAlert'>
                        <h2>
                            {props.alertProps.title}
                        </h2>
                        <h4>
                            {props.alertProps.detail}
                        </h4>
                        <h4>
                            Proveedor: {props.alertProps.provider}
                        </h4>
                        <h4>
                            Matricula: {props.alertProps.enrollment || 'no aplica'}
                        </h4>
                        <h4>
                            Contacto: {props.alertProps.contact}
                        </h4>
                        <h4>
                            Fecha: {props.alertProps.date}
                        </h4>
                        <h4>
                            Edificio: {props.alertProps.building}
                        </h4>
                        <h4>
                            Estado: {props.alertProps.state}
                        </h4>
                        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginLeft: 20}}>
                        {
                            loading ? <CircularProgress color="secondary" /> :
                            <div>
                                <Button id={styles.button} onClick={handleOpen} style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                                 Aceptar
                                </Button>
                                
                                <Button id={styles.button} onClick={handleClose} style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                                    Eliminar
                                </Button>
                            </div>
                        }
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    ) : "";
}