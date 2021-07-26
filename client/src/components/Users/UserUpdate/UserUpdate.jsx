import {useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { Button, TextField, makeStyles,Grid, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { Person, Email, Phone } from '@material-ui/icons';
import { getUser, updateUser } from '../../../redux/users/userActions';
import { useHistory } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';

import swal from "sweetalert";

const useStyles = makeStyles((theme)=>({
    root: {
		marginTop: 100,
		marginBottom: 30,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width:500,
        justifyContent: 'center',
	},
	title:{
		fontSize: 30,
	},
	last: {
		padding: 30,
	}
}));

export function UserUpdate() {
    const {id} = useParams();
    const {userDetail} = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const classes = useStyles();
	const history = useHistory();
	const regOnlyNumbers = new RegExp('^[0-9]+$'); //just numbers test
	const regOnlyletters = new RegExp(/^[a-zA-Z\s]+$/)


    const [input, setInput] = useState({})

    useEffect(() => {
        if(userDetail !== undefined){
            setInput({
                id: id,
                name : userDetail.name,
                email : userDetail.email,
                contact : userDetail.contact,
                isDeleted : userDetail.isDeleted
            })
        }else{
            dispatch(getUser(id))
		}	
    },[dispatch, id, userDetail])

	useEffect(() => {
		dispatch(getUser(id))
	},[dispatch])
    useEffect(() => {

    },[input,setInput])

    const [error, setError] = useState({//Control the error red border of the inputs
		name: false,
        email: false,
		contact: false,
        isDeleted:false
    })
	const [helperText, setHelperText] = useState({//Control the warning message
		name: "Ingrese un Nombre",
        email: "Ingrese un Correo",
		contact: "Numero de Telefono",
        isDeleted:""
    })
    

	const handleInputChange = function (e, change) {
		if (change === 'contact') { //only numbers
			if (regOnlyNumbers.test(e.target.value) || e.target.value === '') {
				setError({...error, [change]: false});
				setHelperText({
					...helperText,
					[change]: '',
				});
				setInput({
					...input,
					[e.target.name]: e.target.value,
				});
			} else {
				setError({...error, [change]: true});
				setHelperText({
					...helperText,
					[change]: 'Solo puede ingresar numeros!',
				});
			}
		}else if(change === 'name'){
			if (regOnlyletters.test(e.target.value) || e.target.value === '') {
				setError({...error, [change]: false});
				setHelperText({
					...helperText,
					[change]: '',
				});
				setInput({
					...input,
					[e.target.name]: e.target.value,
				});
			} else {
				setError({...error, [change]: true});
				setHelperText({
					...helperText,
					[change]: 'Solo puede ingresar letras!',
				});
			}	
		}else{
			setInput({
				...input,
				[e.target.name]: e.target.value,
			});
			Validate(e.target);
		}
	
	};
	const handleSubmit = e => {

		if (Object.values(input).every(field => field !== '') && Object.values(error).every(value => value === false)) {
			setError({
				name: false,
				email: false,
				contact: false,
				isDeleted: false
			})
			let body = {
				id: input.id,
				name: input.name,
				email: input.email,
				contact: input.contact,
				isDeleted: input.isDeleted

			}
			dispatch(updateUser(body));
			swal('Usuario actualizado exitosamente', "Gracias!", "success");
			history.goBack()
		} else {
			if (input.name === "") setError({ ...error, name: true });
            if (input.email === "") setError({ ...error, email: true });
            if (input.contact === "") setError({ ...error, contact: true });
            swal("Debe completar el nombre, email y numero de contacto", "Por favor revise los datos!", "warning");
		}

	} 

    const handleRadio = function (e) {
        setInput({
            ...input,
            isDeleted: e.target.value === "BANNED" ? true : false,
        })
    }

    const Validate = (field) => {
		switch (field.name){
			case "name":
				if(!/^[A-Za-z .'-]{3,20}$/.test(field.value)) {
					setError({...error, name: true})
					if(field.value.length < 3) {setHelperText({...helperText, name: "Es muy corto"})}
                    else if (field.value.length > 20) {setHelperText({...helperText, name: "Es muy largo"})}
                    else{setHelperText({...helperText, name: "No se permiten caracteres especiales"})}
				}else{
					setError({...error, name: false})
					setHelperText({...helperText, name: ""})
				}
				break;
			case "email":
				if(!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(field.value)) {
					setError({...error, email: true})
					if(field.value.length < 3) {setHelperText({...helperText, email: "Es muy corto"})}
					else if(field.value.length > 20) {setHelperText({...helperText, email: "Es muy largo"})}
					else{setHelperText({...helperText, email: "Contiene caracteres no aceptados"})}
				}
				else{
					setError({...error, email: false})
					setHelperText({...helperText, email: ""})
				}
				break;
			case "contact":
				if(!/^([0-9])*$/.test(field.value)) {
					setError({...error, contact: true})
					if(field.value.length < 8) {setHelperText({...helperText, contact: "Es muy corto"})}
					else if(field.value.length > 20) {setHelperText({...helperText, contact: "Es muy largo"})}
					else{setHelperText({...helperText, contact: "Solo se permiten numeros"})}
				}
				else{
					setError({...error, contact: false})
					setHelperText({...helperText, contact: ""})
				}
				break;
			default:
				break;
		}
	}

	function cancelHandle (){
        history.goBack()
    }

    return(
		<ThemeProvider theme={theme}>
        <>
            <form noValidate autoComplete="off" >
			<Grid container direction="row" justify="space-around" alignItems="center" className={`componentDataBox ${classes.root}`} spacing={1}>
                <Grid item xs={6}>
					<h1>Editar usuario</h1>
                    <Grid container spacing={1} alignItems="center" justify="center">
                        <Grid>
                            <Person />
                        </Grid>
                        <Grid item>
                            <TextField 
							variant="outlined"
								error={error["name"]}
								helperText={[helperText["name"]]}
								id="name" 
								label="Nombre" 
								name="name"
								value={input.name || ''}
								onChange={e => handleInputChange(e, 'name')}
							/>
                        </Grid>
                    </Grid>
					
					<Grid container spacing={1} alignItems="center" justify="center">
                        <Grid item>
							<Email />
                        </Grid>
                        <Grid item>
                            <TextField
							variant="outlined"
								error={error["email"]}
								helperText={[helperText["email"]]}  
								id="email" 
								label="Correo" 
								name='email'
								value={input.email || ''}
								onChange={handleInputChange}
							/>
                        </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="center" justify="center">
                        <Grid item>
                            <Phone />
                        </Grid>
                        <Grid item>
                            <TextField
							variant="outlined"
								error={error["contact"]}
								helperText={[helperText["contact"]]}
								id="contact"
								name="contact"
								label="Nº Telefono" 
								value={input.contact || ''}
								onChange={e => handleInputChange(e, 'contact')}
							/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <RadioGroup value={input.isDeleted ? "BANNED" : "ALLOWED"} onChange={handleRadio} >
                        <FormControlLabel value={"ALLOWED"} control={<Radio/>} label="PERMITIDO"/>
                        <FormControlLabel value={"BANNED"} control={<Radio/>} label="BANNEADO"/>
                    </RadioGroup>
                </Grid>
                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item>
                        <Button style={{fontWeight: 1000, marginTop: 50, marginRight: 10}} color="secondary" onClick={handleSubmit} variant="contained">Guardar Cambios</Button>
                    </Grid>
					<Grid item>
						<Button style={{ fontWeight: 1000, marginTop: 50, marginLeft: 20}} color="secondary" variant="contained" onClick={cancelHandle}>Cancelar</Button>
                    </Grid>
                </Grid>
			</Grid>
        </form>
        </>
		</ThemeProvider>
    )
}
export default UserUpdate;