import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import {makeStyles, Grid, Button, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core';
import { findSubscription, postSubscription, putSubscription, deleteSubscription } from '../../../../redux/subscriptions/subscriptionsActions';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../themeStyle';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import './AlertsUser.css';


const useStyles = makeStyles((theme)=>({
    root: {
		marginTop: 50,
		marginBottom: 30,
		border:5
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width:500,
	},
	last: {
		padding: 8,
	}
}));

export default function Subscriptions(props) {
    const id = props.match.params.id;
    const classes = useStyles();
    const history = useHistory();
    const [state,setState] = useState(null);
    const subscription = useSelector(state => state.subscriptionsReducer.findSubscription);
    const dispatch = useDispatch();

	const handleRadio = (event) => {
        setState(event.target.value)
	};

    const handleSubscribe = () => {
        dispatch(postSubscription({alerts: state, userID: id}))
        .then(swal("Subscripción realizada con éxito!", "Gracias!", "success"))
        .then(history.goBack())
    }

    const handleEdit = () => {
        dispatch(putSubscription({alerts: state, id: subscription.id}))
        .then(swal("Subscripción modificada con éxito!", "Gracias!", "success"))
        .then(history.goBack())
    }

    const handleDelete = () => {
        dispatch(deleteSubscription(subscription.id))
        .then(swal("Subscripción eliminada con éxito!", "Gracias!", "success"))
        .then(history.goBack())
    }
	
    useEffect(() => {
        dispatch(findSubscription(id))
    }, [dispatch])

    return (
		<ThemeProvider theme={theme}>
        <div className= 'extContSubscriptionsUser'>
            <h1>
				Mis Subscripciones por mail:
			</h1>
            {
                subscription === null ? <h4>No tienes ninguna Subscripción</h4> : <h4>{ subscription && subscription.alerts === 'all' ? 'Estas Subscripto a Todas las Notificaciones' : 'Estas Subscripto sólo a las Notificaciones Importantes'}</h4>
            }
			<div className='contIntSubscriptionsUser'>
            {
                subscription === null ? <h1>Subscribirme a Notificaciones:</h1> : <h1>Editar Mi Subscripción</h1>
            }
                <div>
					<Grid container spacing={1} alignItems="center" justifyContent="center" className={`${classes.last}`}>
                        <Grid item>
						<FormControl >
							<RadioGroup row value={state} onChange={handleRadio}>
								<FormControlLabel style={{fontWeight: 1000}} value="important" control={<Radio/>} label="IMPORTANTES"/>
								<FormControlLabel style={{fontWeight: 1000, marginLeft:'20px'}} value="all" control={<Radio/>} label="TODAS"/>
							</RadioGroup>
						</FormControl><br/>
						</Grid>
					</Grid>
				</div>
                {
                    subscription === null ? (<div>
                    <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25}} color="secondary" onClick={handleSubscribe} variant="contained">Subscribirme</Button>
                </div>) : (<div>
                    <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25}} color="secondary" onClick={handleEdit} variant="contained">Editar</Button>
                    <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25, marginLeft: 30}} color="secondary" onClick={handleDelete} variant="contained">Eliminar</Button>
                </div>)
                }
			</div>
        </div>
		</ThemeProvider>
    )
}
