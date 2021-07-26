import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, MenuItem, Grid, Button, IconButton } from '@material-ui/core';
import DateFnsUtils from "@date-io/date-fns";
import {
    Domain,
    Room,
    Image,
    Receipt,
    ListAlt,
    MeetingRoom,
    PhotoCamera,
} from '@material-ui/icons';
import {
    MuiPickersUtilsProvider, KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../../themeStyleUser';
import swal from "sweetalert";
import { createComplaints } from '../../../../redux/complaints/complaintsActions';
import { getBuildings } from '../../../../redux/building/buildingActions';
import { getAllUsersForList } from '../../../../redux/users/userActions';
import { getAllApartments } from '../../../../redux/apartments/apartmentsActions';
import moment from "moment";
import { makeStyles } from '@material-ui/core';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import SubjectIcon from '@material-ui/icons/Subject';
import reclamos from '../../../../utils/reclamo.jpg'

const useStyles = makeStyles((theme) => ({

    contUpdateB:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '100px',
        marginTop: '100px'
    },
    formCont :{
        display: 'flex',
        flexDirection: 'row',
        justifyContent:' space-between',
        alignItems: 'center',
        height: '500px',
    },
    form :{
        marginTop: '20px',
        minWidth: '500px',
    },
    button :{
        maxHeight: '35px',
        top: '10px',
        marginLeft: '7px',
    },
    icon :{
        margintop: '12px',
        marginLeft: '12px',
    },
    img :{
        height: '250px',
        width: '400px',
        borderRadius: '10px',
        marginBottom: '20px',
        marginLeft: '30px',
    },
    
    item :{
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '300px',
    },
    
    
    guardarCambios :{
        marginTop: '20px',
        fontWeight: '1000',
    },
    
    right :{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
    },
    
    location:{
        width: '300px',
    },
    
    dropdown:{
        position: 'absolute',
        zIndex: '1',
        width: '250px',
    },
    select:{
        width:'210px'
    },
    boton:{
        color:'#212121',
        background: '#00ff7f'
    }
    
    
    
}))


const UserAddComplaints = ({props,  errorIn, setError, setHelperText,  helperTextIn}) => {

    const error = errorIn;
    const helperText = helperTextIn;
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('profile')));


    

    //importancia
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


   
    //traigo edificio , usuarios y departamentos
    const { buildingArray, usersArray, allApartments } = useSelector(state => {
        return {
            buildingArray: state.buildingReducer.allBuildings,
            usersArray: state.userReducer.users,
            allApartments: state.apartmentReducer.allApartments
        };
    });
    const [loading, setLoading] = useState(true)
   
    function fetchData() {
        dispatch(getAllUsersForList())
        dispatch(getBuildings())
        dispatch(getAllApartments())
    }


    //traigo los datos
    useEffect(() => {

        dispatch(getBuildings());
        dispatch(getAllUsersForList());
        dispatch(getAllApartments(1));
    }
        , [dispatch]);

    function getNames() {
        setComplaints({ ...complaints, id_Buildings: buildingArray?.filter(a => a.id === parseInt(id))[0].name })
        return (complaints.id_Buildings)
    }

    const { id } = useParams()
    currentUser.id = id

    const [complaints, setComplaints] = useState({
        name:'',
        id_Buildings: '',
        apartment: '',
        date:  new Date(new Date()),
        subject: '',
        details: '',
        importance: '',
        image: '',
        id_Users: id

    });
 

    if (loading && buildingArray && buildingArray?.length > 0 && usersArray && usersArray?.length > 0 && allApartments && allApartments?.length > 0) {

        console.log('userArray', usersArray)

        let idApartment = usersArray?.filter(a => a.id === parseInt(id))[0].apartmentId

        setComplaints({
            ...complaints,
            id_Buildings: buildingArray?.filter(a => a.id === parseInt(id))[0].id,
            name: buildingArray?.filter(a => a.id === parseInt(id))[0].name,
            apartment: allApartments?.filter(a => a.id === parseInt(idApartment))[0].number_apartment,

        })
        setLoading(false)
    }

   
    const history = useHistory();
    const dispatch = useDispatch();

    const handleValidationDate = (e) => {

        const date = {
            "month": [e.getMonth()],
            "year": e.getFullYear()
        }
        setComplaints({
            ...complaints,
            date: e,
        })
    }

    //tomo el valor del input
    const handleChange = (e) => {
        setComplaints({
            ...complaints,
            [e.target.name]: e.target.value,
        });
        
        
    };

    //funcion para cargar imagen
    function imgHandler(e) {
        let img = e.target.files[0];
        if (
            img.type === 'image/jpeg' ||
            img.type === 'image/jpg' ||
            img.type === 'image/png'
        ) {
            setComplaints({ ...complaints, image: img });
        } else swal("Tipo de archivo no soportado", "Los archivos solo pueden ser JPG, PNG o JPEG", "error");
    }

    //funcion para mostrar la imagen precargada
    function renderImg() {
        if (!complaints.image) return reclamos;
        else return URL.createObjectURL(complaints.image);
    }
    
    function cancelHandle (){
        history.goBack()
    }
    //despacho accion
    const handleSubmit = (e) => {
       
         const complaintsSend = JSON.stringify(  {
            id_Buildings: complaints.id_Buildings,
            apartment: complaints.apartment,
            date: complaints.date,
            subject: complaints.subject,
            details: complaints.details,
            importance: complaints.importance,
            id_Users: id,
            
        });
       
        if(complaints.subject === ''  || complaints.importance ==='' || complaints.details ==='' || complaints.date === '' ){
            console.log("ENTRA IF ")
            return swal("Debe completar el concepto, la importancia y el edificio", "Por favor revise los datos!", "warning");
        }else{
            
            const formData = new FormData();
            formData.append('image', complaints.image);
            formData.append(
                'body',complaintsSend)
    
            e.preventDefault();
                console.log(formData)
            dispatch(createComplaints(formData ));
            swal("Reclamo enviado correctamente!, pronto estaremos en contacto.", "Gracias!", "success")
            setComplaints(complaints)
        }
    

    };


    return (
        <div>
            <ThemeProvider theme={theme}>
                <div className={classes.contUpdateB}>
                    <h1 className='h1BuildingAddForm'>Crear Reclamo:</h1>
                    <form action="" className={classes.formCont}>
                        <div className={classes.form}>
                            <div className={classes.item}>
                                <Domain fontSize="large" />

                                <TextField
                                    name="name"
                                    label="Nombre del edificio"
                                    value={complaints.name}
                                    variant="outlined"

                                />

                            </div>
                            <div className={classes.item}>
                                <Domain fontSize="large" />
                                <TextField
                                    name="apartment"
                                    label="Departamento"
                                    value={complaints.apartment}
                                    variant="outlined"

                                />
                            </div>
                            <div className={classes.item}>
                               
                                <CalendarTodayIcon/>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        name="date"
                                        margin="normal"
                                        id="date"
                                        format="dd/MM/yyyy"
                                        value={complaints.date}
                                        variant="outlined"
                                        onChange={(e) => {
                                            // handleInputChange(e)
                                            handleValidationDate(e)
                                        }
                                        }
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </div>


                            <div className={classes.item}>
                                <SubjectIcon/>
                                <TextField
                                    name="subject"
                                    label="Asunto"
                                    value={complaints.subject}
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.item}>
                                <Receipt fontSize="large" />
                                <TextField
                                    name="details"
                                    label="Detalle"
                                    value={complaints.details}
                                    variant="outlined"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={classes.item}>
                                <Receipt fontSize="large" />
                                <TextField
                                className={classes.select}
                                    select
                                    name="importance"
                                    label="Importancia"
                                    value={complaints.importance}
                                    variant="outlined"
                                    defaultValue='Importancia'
                                    onChange={e => handleChange(e, "importance")}>
                                    {
                                        currencies && currencies?.map((option) => {
                                            return (
                                                <option key={option.value} value={option.value}  defaultValue='Importancia'>
                                                    {option.value}
                                                </option>
                                            );
                                        })
                                    }


                                </TextField>

                            </div>

                        </div>
                        <div className={classes.right}>
                            <div className={classes.item}>
                                <img
                                    
                                    className={classes.img}
                                    alt="Reclamos"
                                    src={renderImg()}
                                />
                                <IconButton color="primary" variant="contained" component="label">
                                    <PhotoCamera style={{ fontSize: 40, marginLeft: 5 }} />
                                    <input
                                        onChange={imgHandler}
                                        name="image"
                                        type="file"
                                        label="Foto"
                                        accept="image/png, image/jpeg"
                                        hidden
                                    />
                                </IconButton>
                            </div>
                            <div className={classes.guardarCambios}>
                                <Button variant="contained" color="#00ff7f" onClick={handleSubmit} style={{ fontWeight: 1000, background:'#00ff7f'  }}>
                                    Confirmar
                                </Button>
                               
						    <Button style={{ fontWeight: 1000 }} color="black" variant="contained" onClick={cancelHandle} style={{ fontWeight: 1000, background:'#00ff7f', marginLeft:'10px'}} >Cancelar</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </ThemeProvider>
            


        </div>
    )
}

export default UserAddComplaints
