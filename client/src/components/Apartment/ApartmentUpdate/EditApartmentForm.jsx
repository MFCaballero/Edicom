import {useState, useEffect} from 'react';
import {getApartmentById, deleteApartmentById} from '../../../redux/apartments/apartmentsActions'
import axios from 'axios';
import { FormControl, FormControlLabel, Button, RadioGroup, Radio, TextField, makeStyles,Grid } from '@material-ui/core';
import {useSelector, useDispatch} from 'react-redux';
import { useParams } from 'react-router-dom'
import { Link, useHistory } from 'react-router-dom'
import BuildingDetail from '../../Buildings/BuildingDetail/BuildingDetail';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import '../ApartmentAdd/CreateApartment.css';
import { Domain, Home, MeetingRoom } from '@material-ui/icons';
import swal from "sweetalert";
import { numeroPositivo } from "../../../utils/validations"

const useStyles = makeStyles((theme)=>({
    root: {
		marginTop: 50,
		marginBottom: 30,
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
		width:500,
        
	},
	title:{
		fontSize: 30,
	},
	last: {
		padding: 30,
	}
}));
export function EditApartmentForm(props) {
    const history = useHistory();
    const classes = useStyles();

    const { apartmentDetail, apartmentDeleted } = useSelector( state => state.apartmentReducer);

    const { id } = useParams();
    
    const dispatch = useDispatch();

    const [apartment, setApartment] = useState({
        cata_apartment: "",
        mt2: 0, //si no llega a andar se modifico esto, se puso 0 en vez de string vacio
		number_apartment: "",
        state: 0
    })

    useEffect(() => {
        dispatch(getApartmentById(id))
    },[dispatch, id])

    useEffect(() => {
        if(apartmentDetail) {
            
            var {cata_apartment, mt2, number_apartment, state} = apartmentDetail
            
            setApartment({
                cata_apartment: cata_apartment, 
                mt2: mt2,
                number_apartment: number_apartment,
                state: state
            })
        }
    },[apartmentDetail])

    const [error, setError] = useState(false);

    const handleInputChange = function (e) {
        switch (e.target.name) {
            case "cata_apartment":
                setApartment({
                    ...apartment,
                    cata_apartment: e.target.value,
                })
                break;
            case "mt2":
                //FALTA VALIDAR ACA NUMEROS NEGATIVOS
                if (e.target.name === "mt2") {
                    if (numeroPositivo(e.target.value)) {
                        setApartment({ ...apartment, [e.target.name]: parseInt(e.target.value) });
                    } else {
                        setError(true)
                    }
                } else {
                    setApartment({
                        ...apartment,
                        mt2: e.target.value,
                    })

                }
                break;
            case "number_apartment":
                setApartment({
                    ...apartment,
                    number_apartment: e.target.value,
                })
                break;
            default:
                break;
        }
    }

    const handleRadio = function (e) {
        setApartment({
            ...apartment,
            state: e.target.value === "OCUPADO" ? 1 : 0,
        })
    }

    const handleSubmit = function(e, id, data){
        axios
            .put(`http://localhost:3001/apartments/${id}`, data, {
                headers: {'Content-Type': 'application/json'},
            })
            .then(r => {
                swal("Departamento modificado exitosamente!", "Gracias!", "success");
                history.push(`/buildingDetail/${r.data.buildingId}`)
             },
             err => {
                 console.log(err.response) 
                 swal("Error al modificar el dpto", "si cambia el nro de dpto verifique que elija uno desocupado", "error")
             }
             ) 
    }
    const handleDelete = (e, id, data) => {
        dispatch(deleteApartmentById(id))
        .then(() =>{
            swal("Departamento Eliminado Exitosamente", `Apartamento ${apartmentDetail?.cata_apartment} Eliminado`)
            history.push(`/buildingDetail/${apartmentDetail?.buildingId}`)
        })
    }
    function cancelHandle (){
        history.goBack()
    }

	return (
        <ThemeProvider theme={theme}>
		<div className= 'extContCAF'>
            <h1>Departamento Nº {apartmentDetail?.number_apartment || ""}</h1>
			<FormControl className={classes.root}>
            <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid style={{marginRigth:'50px'}}>
                <FormControl>
                    <TextField style={{marginTop: '20px'}} 
                        variant="outlined"
                        label= "Un Catastral:" 
                        name="cata_apartment" 
                        value={apartment.cata_apartment} 
                        onChange={handleInputChange} 
                        error={!/^[A-Za-z0-9,.'-]{2,20}$/.test(apartment.cata_apartment)} 
                    />
                </FormControl><br/>
                <FormControl>
                    <TextField style={{marginTop: '20px'}} 
                        variant="outlined" 
                        label= "Mt2:" 
                        name="mt2" 
                        type="number"
                        value={apartment.mt2} 
                        onChange={handleInputChange} 
                        error={!/^[+]*[-\s/0-9]{3,20}$/.test(apartment.mt2)} 
                    />
                </FormControl><br/>
                <FormControl>
                    <TextField style={{marginTop: '20px'}} 
                        variant="outlined"
                        label= "N° Departamento:" 
                        name="number_apartment" 
                        value={apartment.number_apartment} 
                        onChange={handleInputChange} 
                        error={!/^[A-Za-z0-9,.'-]{1,20}$/.test(apartment.number_apartment)} 
                    />
                </FormControl><br/>
                </Grid>
                <Grid>
                <FormControl>
                    <RadioGroup value={apartment.state === 1 ? "OCUPADO" : "DESOCUPADO"} onChange={handleRadio} style={{marginLeft: '70px'}} >
                        <FormControlLabel value="OCUPADO" control={<Radio/>} label="OCUPADO"/>
                        <FormControlLabel value="DESOCUPADO" control={<Radio/>} label="DESOCUPADO"/>
                    </RadioGroup>
                </FormControl><br />
                </Grid>
                </Grid>
                <Link className={classes.last}>
                    <Button
                            style={{fontWeight: 1000}} variant="contained" color="secondary" 
                            onClick={(e) => handleSubmit(e, id, apartment)}
                            style={{marginTop: '20px'}} >Guardar Cambios</Button>
                </Link> 
                <Link className={classes.last}>
                    <Button
                            style={{fontWeight: 1000}} variant="contained" color="secondary" 
                            onClick={(e) => handleDelete(e, id, apartment)}
                            style={{marginTop: '-90px', width:'165px'}} >Eliminar</Button>
                </Link>
                <Button
                    style={{ fontWeight: 1000 }}
                    color="secondary"
                    variant="contained"
                    onClick={cancelHandle}
                >
                    Cancelar
                </Button>
            </FormControl>
		</div>
        </ThemeProvider>
	);
};

export default EditApartmentForm;
