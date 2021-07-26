import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import swal from "sweetalert";
import { useHistory } from 'react-router-dom';
import { postService } from '../../../redux/services/servicesAction';
import { getBuildings } from '../../../redux/building/buildingActions';
import { numeroPositivoEntero, correoElectronico } from '../../../utils/validations';
import '../Services.css';


const ServiceFormAdmin = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const {allBuildings} = useSelector(state => state.buildingReducer);
    const [buildingOpen, setBuildingOpen] = useState(false);

    useEffect(() => {
        dispatch(getBuildings())
    }, [dispatch])


    const [input, setInput] = useState({
        title: "",
        provider: "",
        enrollment: "",
        contact: "",
        detail: "",
        building: ""
    })


    const [error, setError] = useState({
        title: false,
        provider: false,
        detail: false,
        enrollment: false,
        contact: false,
        building: false
    });

    const [warning, setWarning] = useState({
        //Control the warning message
        title: "",
        provider: "",
        enrollment: "",
        contact: "",
        detail: "",
        building: ""
    });

    const handleBuildingClose = () => {
		setBuildingOpen(false);
        
	};

	const handleBuildingOpen = () => {
		setBuildingOpen(true);
	}; 

    function handleChange(e, change) {
        var text = e.target.value;
        if(change === 'enrollment' && !numeroPositivoEntero(text)){
            setWarning({
                //set warning msg
                ...warning,
                [change]: 'Solo puedes ingresar numeros!',
            });
            return setError({
                //set the error of that input in true
                ...error,
                [change]: true,
            });
        }else if(change === 'contact' && (!numeroPositivoEntero(text) && !correoElectronico(text))){
            setWarning({
                //set warning msg
                ...warning,
                [change]: 'El contacto debe ser un numero o un email!',
            });
            setError({
                //set the error of that input in true
                ...error,
                [change]: true,
            });
            setInput({
                ...input,
                [change]: text,
            });
        }
        else {
            setWarning({
                //set warning msg
                ...warning,
                [change]: '',
            });
            setError({
                //set the error of that input in true
                ...error,
                [change]: false,
            });
            setInput({
                ...input,
                [change]: text,
            });
        }
        
    }

    /* const handleBuildingChange =  (e) => {
		setInput({
			...input,
			building: e.target.value, 
		});
	} */

    const saveHandler = () => {
        if (input.title !== "" && input.provider !== "" && input.contact !== "" && input.building !== "" && (numeroPositivoEntero(input.enrollment) || input.enrollment === "") && (numeroPositivoEntero(input.contact) || correoElectronico(input.contact))) {
            setError({
                title: false,
                provider: false,
                detail: false,
                enrollment: false,
                contact: false,
                building: false
            });
            setInput({
                title: "",
                provider: "",
                enrollment: "",
                contact: "",
                detail: "",
                building: ""
            })
            setWarning({
                title: "",
                provider: "",
                enrollment: "",
                contact: "",
                detail: "",
                building: ""
            })
            let body = {
                title: input.title,
                provider: input.provider,
                enrollment: input.enrollment,
                contact: input.contact,
                detail: input.detail,
                buildingId: input.building
            }
            dispatch(postService(body))
            swal("Solicitud creada con éxito. Por favor apruébela para que aparezca en la vista de los usuarios.", "Gracias!", "success")
            history.goBack()
                
        } else {
            if (input.title === "" || input.provider === "" || input.contact === "" || input.building === ""){
            setError({
                title: true,
                provider: true,
                detail: false,
                enrollment: false,
                contact: false,
                building: true
            });
            return swal("Debe completar el título, el proveedor, el contacto y el edificio", "Por favor revise los datos!", "warning");
            }
            if(!numeroPositivoEntero(input.contact) && !correoElectronico(input.contact)) {
                setError({ title: false,
                    provider: false,
                    detail: false,
                    enrollment: false,
                    contact: true,
                    building: false
                });
                return swal("El campo ingresado en contacto debe ser un número o un email", "Por favor revise los datos!", "warning");
            }
        }
        /* else {
            if (input.title === "" || input.provider === "" || input.contact === "" || input.building === "") {
                setError({title: true,
                    provider: true,
                    detail: false,
                    enrollment: false,
                    contact: true,
                    building: true
                });
                return swal("Debe completar el título, el proveedor, el contacto y el edificio", "Por favor revise los datos!", "warning");
            }
            if(!numeroPositivoEntero(input.enrollment)){
                setError({title: false,
                    provider: false,
                    detail: false,
                    enrollment: true,
                    contact: false,
                    building: false
                });
                return swal("El campo ingresado en matricula debe ser un número", "Por favor revise los datos!", "warning");
            } 
            
        } */
    }

    /* const handleChange = (e, change) => {
        if (change !== "date") e = e.target.value;
        setInput({ ...input, [change]: e })
    } */

    const cancelHandler = () => {
		history.goBack()
	}

    return (
        <ThemeProvider theme={theme}>
            <div className= 'contExtServiceFormAdmin'>
                <h1>Postear Servicio Util:</h1>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={saveHandler}
                >
                    <div>
                    <FormControl style={{width:500, marginLeft: 65}}>
						<InputLabel id="demo-controlled-open-select-label">Seleccionar Edificio</InputLabel>
						<Select
							labelId="demo-controlled-open-select-label"
							id="building"
							name="building"
							open={buildingOpen}
							onClose={handleBuildingClose}
							onOpen={handleBuildingOpen}
							value={input.building}
							onChange={e => handleChange(e, "building")}
                            error={error.building}
						>
						<MenuItem value="">
						<em>None</em>
						</MenuItem>
						{allBuildings?.map(building => {
							return (
								<MenuItem key={building.id} value={building.id}>{` ${building.id} ${building.cata} ${building.name}`}</MenuItem>
							)
						})}
						</Select>
					</FormControl>
                    </div>
                    <div className='contIntServiceForm'>
                        <div className='rigthServiceForm'>
                            <div>
                            <TextField variant="outlined"
                                style={{margin: 10, width: 300}}
                                label="Título"
                                name='title'
                                value={input.title}
                                error={error.title}
                                onChange={e => handleChange(e, "title")} />
                            </div>
                            <div>
                            <TextField variant="outlined"
                                style={{margin: 10, width: 300}}
                                label="Proveedor"
                                //multiline
                                name='provider'
                                value={input.provider}
                                error={error.provider}
                                onChange={e => handleChange(e, "provider")} />
                            </div>
                        </div>
                        <div >
                            <div>
                                <TextField variant="outlined"
                                    style={{margin: 10, width: 300}}
                                    label="Matrícula"
                                    name='enrollment'
                                    value={input.enrollment}
                                    error={error.enrollment}
                                    helperText={warning.enrollment}
                                    onChange={e => handleChange(e, "enrollment")} />
                            </div>
                            <div>
                                <TextField variant="outlined"
                                    style={{margin: 10, width: 300}}
                                    label="Contacto"
                                    name='contact'
                                    value={input.contact}
                                    error={error.contact}
                                    helperText={warning.contact}
                                    onChange={e => handleChange(e, "contact")} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <TextField variant="outlined"
                            style={{margin: 10, width: 620}}
                            label="Detalle"
                            multiline
                            name='detail'
                            value={input.detail}
                            onChange={e => handleChange(e, "detail")} />
                    </div>
                    <div className='btnLineServiceForm'>
                    <Button
                        style={{ fontWeight: 1000, marginRight: 50 }}
                        color="secondary"
                        variant="contained"
                        onClick={saveHandler}
                    >
                        Postear Servicio
                    </Button>
                    <Button 
                        style={{ fontWeight: 1000}}
                        color="secondary"
                        variant="contained"
                        onClick={cancelHandler}
                    >
                        Cancelar
                    </Button>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default ServiceFormAdmin;