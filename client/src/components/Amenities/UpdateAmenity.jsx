import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, makeStyles, Grid, } from '@material-ui/core';
import styles from './UpdateAmenity.module.css'
import { Person, Home } from '@material-ui/icons';
import { getAmenityById, updateAmenity, deleteAmenity } from '../../redux/amenities/amenitiesActions'
import { Link, useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Domain } from '@material-ui/icons';
import swal from "sweetalert";
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 100,
		marginBottom: 30,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width: 500,
		justifyContent: 'center',
	},
	title: {
		fontSize: 30,
	},
	last: {
		padding: 30,
	}
}));

export function UpdateAmenity() {
	const { amenityDetail } = useSelector(state => state.amenitiesReducer);
	const { id } = useParams();
	const dispatch = useDispatch();
	const classes = useStyles();
	const history = useHistory();
	const reg = new RegExp('^[0-9]+$'); //just numbers test

	const [input, setInput] = useState({
		amenity_type: "",
		quantity: "1",
		capacity: "",
		amenity_detail: ""
	})



	// const [input, setInput] = useState({
	// 	id: id,
	// 	amenity_type: amenityDetail.amenity_type,
	//     quantity: amenityDetail.quantity,
	// 	capacity: amenityDetail.capacity,
	//     amenity_detail: amenityDetail.amenity_detail
	// })

	//-----------------------------------------------------------

	useEffect(() => {
		dispatch(getAmenityById(id))
	}, [dispatch])

	useEffect(() => {
		console.log('amenityDetail', amenityDetail)
		if (amenityDetail !== undefined && Array.isArray(amenityDetail)) {
			amenityDetail.filter(amenity => amenity.id === parseInt(id))
			setInput({
				id,
				amenity_type: amenityDetail.filter(amenity => amenity.id === parseInt(id))[0].amenity_type,
				quantity: amenityDetail.filter(amenity => amenity.id === parseInt(id))[0].quantity,
				capacity: amenityDetail.filter(amenity => amenity.id === parseInt(id))[0].capacity,
				amenity_detail: amenityDetail.filter(amenity => amenity.id === parseInt(id))[0].amenity_detail

			})
		} else {
			dispatch(getAmenityById(id))
		}

	}, [amenityDetail, dispatch, id])


	const [error, setError] = useState({//Control the error red border of the inputs
		amenity_type: false,
		quantity: false,
		capacity: false,
		amenity_detail: false,
	})
	const [helperText, setHelperText] = useState({//Control the warning message
		amenity_type: "Ingrese un Amenity",
		quantity: "Ingrese la cantidad",
		capacity: "Cuantas personas pueden usarlo",
		amenity_detail: "Ingrese un Detalle",
	})

	const helperInit = {
		amenity_type: "Ingrese un Amenity",
		quantity: "Ingrese la cantidad",
		capacity: "Cuantas personas pueden usarlo",
		amenity_detail: "Ingrese un Detalle",
	}


	const handleInputChange = (e, change) => {
		/* Validate(e.target) */
		if ((change !== "quantity" && change !== "capacity") || reg.test(e.target.value) || e.target.value === '') {
			setError({
				...error,
				[change]: false
			})
			setHelperText({
				...helperText,
				[change]: helperInit[change]
			})
			setInput({
				...input,
				[e.target.name]: e.target.value
			})
		} else {
			setError({
				...error,
				[change]: true
			})
			setHelperText({
				...helperText,
				[change]: "Solo puedes ingresar numeros!"
			})
		}
	}

	const handleSubmit = e => {

		if(input.amenity_type !== "" && input.quantity !== "" && input.capacity !== ""){
			dispatch(updateAmenity(input));
			swal('Amenity actualizado exitosamente', "Gracias!", "success");
			history.goBack()
		}else{
			swal('Debe llenar todos los campos', 'Por favor reviselos!', 'warning');
		}
	};

	const deleteHandler = () => {
		dispatch(deleteAmenity(id))
			.then(swal("Se ha eliminado el amenity!", "Gracias!", "success"))
			.then(history.goBack())
	}

	const cancelHandler = () => {
		history.goBack()
	}


	return (
		<ThemeProvider theme={theme}>
			<div className="extContCAF">
				<h1>Editar Amenity</h1>
				<form noValidate autoComplete="off" >
					<div className={styles.form}>
						<div className={styles.left}>
							<div className={styles.item}>
								<Domain fontSize="large" />
								<TextField
									error={error["amenity_type"]}
									variant="outlined"
									helperText={[helperText["amenity_type"]]}
									id="amenity_type"
									label="Amenity"
									name="amenity_type"
									value={input.amenity_type || ''}
									onChange={(e) => handleInputChange(e, "amenity_type")}
								/>
							</div>
							<div className={styles.item}>
								<PeopleAltIcon fontSize="large" />
								<TextField
									variant="outlined"
									error={error["capacity"]}
									helperText={[helperText["capacity"]]}
									id="capacity"
									label="Turnos disponibles"
									name='capacity'
									value={input.capacity || ''}
									onChange={(e) => handleInputChange(e, "capacity")}
								/>
							</div>
						</div>
						<div className={styles.left}>
							<div className={styles.item}>
								<AssignmentIcon fontSize="large" />
								<TextField
									multiline={true}
									rowsMax={4}
									variant="outlined"
									error={error["amenity_detail"]}
									helperText={[helperText["amenity_detail"]]}
									id="amenity_detail"
									label="Detalle"
									name='amenity_detail'
									value={input.amenity_detail || ''}
									onChange={(e) => handleInputChange(e, "amenity_detail")}
								/>
							</div>
						</div>
					</div>

					<Button
						id={styles.submit}
						style={{ fontWeight: 1000, marginTop: 50 }}
						color="secondary"
						onClick={handleSubmit}
						variant="contained"
					>
						Guardar Cambios
					</Button>
					<Button
						id={styles.submit}
						style={{ fontWeight: 1000, marginTop: 50 }}
						color="primary"
						variant="contained"
						onClick={deleteHandler}
					>
						Eliminar Amenity
					</Button>
					<Button
						id={styles.submit}
						style={{ fontWeight: 1000, marginTop: 50 }}
						color="primary"
						variant="contained"
						onClick={cancelHandler}
					>
						Cancelar
					</Button>
				</form>
			</div>
		</ThemeProvider>
	)
}
export default UpdateAmenity;