import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, React } from 'react';
import {
    getBuildingDetail,
    putBuilding,
    deleteBuilding,
    getBuildings
} from '../../../redux/building/buildingActions';
import { useParams, useHistory } from 'react-router-dom';
import { Button, TextField, Grid, IconButton } from '@material-ui/core';
import BusinessIcon from '@material-ui/icons/Business';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
import FormatAlignJustifyOutlinedIcon from '@material-ui/icons/FormatAlignJustifyOutlined';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { translate } from './Translate';
import styles from './BuildingUpdate.module.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import swal from "sweetalert";

function BuildingUpdate() {
    const { id } = useParams(); //Building id from query params
    const Build = useSelector(state => state.buildingReducer); //Use selector setup
    const dispatch = useDispatch(); //dispatch setup
    const reg = new RegExp('^[0-9]+$'); //just numbers test
    const history = useHistory();

    const [currentLoc, setCurrentLoc] = useState("Direccion");

    useEffect(() => {
        //useEffect to get the current bulding info
        dispatch(getBuildingDetail(id))
    }, [dispatch]);

    useEffect(() => {
        Build.detailBuilding[0] && setCurrentLoc(Build.detailBuilding[0].address)
    }, [Build.detailBuilding]);


    const currentDirection = () => {
        setCurrentLoc(Build.detailBuilding[0].address)
    }

    const [editMode, setEditMode] = useState({
        //Control the read mode or edit mode for every input
        name: false,
        address: false,
        cata: false,
        floor: false,
        cant_apartments: false,
    });


    const [error, setError] = useState({
        //Control the error red border of the inputs
        floor: false,
        cant_apartments: false,
        name: false,
        address: false,
        cata: false,
        image: false,
    });

    const [warning, setWarning] = useState({
        //Control the warning message
        floor: '',
        cant_apartments: '',
        name: '',
        address: '',
        cata: '',
        image: '',
    });

    const Building = {
        //Initial state for the inputs
        cata: '',
        floor: '',
        cant_apartments: '',
        name: '',
        address: '',
        image: '',
    };


    const [input, setInput] = useState({
        //Control the user inputs for every input
        name: Building.name,
        cata: Building.cata,
        floor: Building.floor,
        cant_apartments: Building.cant_apartments,
        address: Building.address,
        image: Building.image,
        lat: "",
        lng:""
    });

    const inputHandler = (change, text) => {
        //input handler to change the state when the user write
        if (
            (change === 'floor' || change === 'cant_apartments') &&
            !reg.test(text)
        ) {
            //if somone try to enter not a number in floor and aparments
            setWarning({
                //set warning msg
                ...warning,
                [change]: 'Solo puedes ingresar numeros!',
            });
            setError({
                //set the error of that input in true
                ...error,
                [change]: true,
            });
        } else if (!reg.test(input[change]) || text !== '') {
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
        }
        if (
            (change !== 'floor' && change !== 'cant_apartments') ||
            reg.test(text) ||
            text === ''
        ) {
            //just numbers in floor and cant_apartments
            setInput({
                ...input,
                [change]: text,
            });
        }
    };

    const editModestatus = change => {
        //shows the data according to the status mode (read, write or preview )
        if (!editMode[change]) {
            //if is set to read mode
            if (input[change] === Building[change]) {
                //shows the current value if the user didn't write anything yet
                return (
                    <h2>
                        {translate[change]}:{' '}
                        {Build.detailBuilding[0] &&
                            Build.detailBuilding[0][change.toLowerCase()]}
                    </h2>
                );
            } else {
                //shows the preview of the changes if the user did write something
                return (
                    <h2>
                        {translate[change]}: {input[change]}
                    </h2>
                );
            }
        } else {
            //if is set to write mode
            return (
                <TextField
                    error={error[change]}
                    helperText={warning[change]}
                    variant="outlined"
                    label={translate[change]}
                    onChange={e => inputHandler(change, e.target.value)}
                    value={input[change]}
                />
            );
        }
    };

    const changeModeStatus = e => {
        //change the status between read only or write
        const toChange =
            (e.target.offsetParent && e.target.offsetParent.name) || e.target.name; //save the item name
        setEditMode({
            //change the status of the item to the opposite
            ...editMode,
            [toChange]: !editMode[toChange],
        });
    };

    const saveHandler = e => {
        //send the data to change in the data base
        e.preventDefault();
        setError({
            floor: false,
            cant_apartments: false,
            name: false,
            address: false,
            cata: false,
            image: false,
        });
        setInput({
            //set all the inputs to the initial state
            name: Building.name,
            cata: Building.cata,
            floor: Building.floor,
            cant_apartments: Building.cant_apartments,
            address: Building.address,
            image: Building.image,
        });
        setWarning({
            //set all the warnings in nothing
            floor: '',
            cant_apartments: '',
            name: '',
            address: '',
            cata: '',
            image: '',
        });
        setEditMode({
            //set all the items in read mode again.
            name: false,
            address: false,
            cata: false,
            floor: false,
            cant_apartments: false,
        });
        if (
            /\S/.test(input.name) ||
            /\S/.test(input.floor) ||
            /\S/.test(input.cant_apartments) ||
            /\S/.test(input.cata) ||
            /\S/.test(input.address) ||
            input.image !== ''
        ) {
            //cannot be just white space
            const formData = new FormData();
            formData.append('image', input.image);
            formData.append(
                'body',
                JSON.stringify({
                    id: id,
                    cata: input.cata || Build.detailBuilding[0].cata, //if there is nothing writed in an input just re save the current data
                    floor: input.floor || Build.detailBuilding[0].floor,
                    cant_apartments:
                        input.cant_apartments || Build.detailBuilding[0].cant_apartments,
                    name: input.name || Build.detailBuilding[0].name,
                    address: input.address || Build.detailBuilding[0].address,
                    latitude: input.lat || Build.detailBuilding[0].latitude,
                    longitude: input.lng || Build.detailBuilding[0].longitude
                })
            );
            dispatch(putBuilding(formData)).then(() =>
                dispatch(getBuildingDetail(id))
            ); //re render the info of the component and now the changes are the curren data
            swal("Se guardaron los cambios!", "Gracias!", "success");
            history.goBack()
        } else {
            swal("Debe completar todos los campos", "Por favor revise los datos!", "warning");
        }
    };

    const imgHandler = e => {
        let img = e.target.files[0];
        if (
            img.type === 'image/jpeg' ||
            img.type === 'image/jpg' ||
            img.type === 'image/png'
        ) {
            setInput({ ...input, image: img });
        } else swal("Tipo de archivo no soportado", "Los archivos solo pueden ser JPG, PNG o JPEG", "error");;
    };

    const renderIMG = () => {
        if (Build.detailBuilding[0]) {
            if (input.image === '') return Build.detailBuilding[0].image;
            else {
                return URL.createObjectURL(input.image);
            }
        } else {
            return 'false';
        }
    };

    const deleteHandler = () => {
        dispatch(deleteBuilding(parseInt(id)))
        .then(dispatch(getBuildings()))
        .then(swal("Edificio borrado con exito!", "Gracias!", "success"))
        .then(history.goBack())
    }

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);
        setInput({...input, lat: latlng.lat, lng: latlng.lng})
    }

    const handleSelectItem = async (e, sug) => {
        const results = await geocodeByAddress(sug.description);
        const latlng = await getLatLng(results[0])
        setInput({...input, lat: latlng.lat, lng: latlng.lng, address: sug.description})
    }
    
    function cancelHandle (){
        history.goBack()
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.contUpdateB}>
                <h1 className={styles.header}>Modificar edificio:</h1>
                <form
                    className={styles.formCont}
                    noValidate
                    autoComplete="off"
                    onSubmit={saveHandler}
                >
                    <div className={styles.form}>
                        <div>
                            <div
                                container
                                className={styles.item}
                                justify="space-between"
                            >
                                <BusinessIcon className={styles.icon} fontSize="large" />
                                {editModestatus('name')}
                                <Button
                                    style={{ fontWeight: 1000 }}
                                    color="secondary"
                                    className={styles.button}
                                    variant="contained"
                                    name="name"
                                    onClick={changeModeStatus}
                                >
                                    EDITAR
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div
                                container
                                className={styles.item}
                                item
                                justify="space-between"
                            >
                                <FormatAlignJustifyOutlinedIcon
                                    className={styles.icon}
                                    fontSize="large"
                                />
                                {editModestatus('cata')}
                                <Button
                                    color="secondary"
                                    className={styles.button}
                                    variant="contained"
                                    style={{ fontWeight: 1000 }}
                                    name="cata"
                                    onClick={changeModeStatus}
                                >
                                    EDITAR
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div
                                container
                                className={styles.item}
                                item
                                justify="space-between"
                            >
                                <ListAltOutlinedIcon className={styles.icon} fontSize="large" />
                                {editModestatus('floor')}
                                <Button
                                    color="secondary"
                                    className={styles.button}
                                    style={{ fontWeight: 1000 }}
                                    variant="contained"
                                    name="floor"
                                    onClick={changeModeStatus}
                                >
                                    EDITAR
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div
                                container
                                className={styles.item}
                                item
                                justify="space-between"
                            >
                                <MeetingRoomIcon className={styles.icon} fontSize="large" />
                                {editModestatus('cant_apartments')}
                                <Button
                                    color="secondary"
                                    className={styles.button}
                                    style={{ fontWeight: 1000 }}
                                    variant="contained"
                                    name="cant_apartments"
                                    onClick={changeModeStatus}
                                >
                                    EDITAR
                                </Button>
                            </div>
                        </div>
                        <div>
                            <div
                                container
                                id={styles.location}
                                className={styles.item}
                                item
                                justify="space-between"
                            >
                                <LocationOnIcon className={styles.icon} fontSize="large" />
                                <PlacesAutocomplete
                                    value={input.address}
                                    onChange={(e) => inputHandler("address", e)}
                                    onSelect={handleSelect}
                                >
                                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                        <div className={styles.locInput}>
                                            <TextField
                                                error={error.address}
                                                helperText={warning.address}
                                                variant="outlined"
                                                {...getInputProps({
                                                    placeholder: currentLoc,
                                                    className: 'location-search-input',
                                                })}
                                            />
                                            <div className={styles.dropdown}>
                                                {loading && <div>Loading...</div>}
                                                {suggestions.map(suggestion => {
                                                    const className = suggestion.active
                                                        ? 'suggestion-item--active'
                                                        : 'suggestion-item';
                                                    // inline style for demonstration purpose
                                                    const style = suggestion.active
                                                        ? { backgroundColor: '#00ff7f', cursor: 'pointer' }
                                                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                    return (
                                                        <div onClick={e => handleSelectItem(e, suggestion)}>
                                                            <div key={suggestion.index}
                                                                {...getSuggestionItemProps(suggestion, {
                                                                    className,
                                                                    style,
                                                                })}
                                                            >
                                                                <span onClick={e => handleSelectItem(e, suggestion)}>{suggestion.description}</span>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                </PlacesAutocomplete>
                            </div>
                        </div>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.item}>
                            <img alt="Profile pic" className={styles.img} src={renderIMG()} />
                            <IconButton color="primary" variant="contained" component="label">
                                <PhotoCamera style={{ fontSize: 40, marginLeft: 5 }} />
                                <input
                                    onChange={imgHandler}
                                    name="image"
                                    type="file"
                                    accept="image/png, image/jpeg"
                                    hidden
                                />
                            </IconButton>
                        </div>
                        <div className={styles.guardarCambios}>
                            <Button
                                style={{ fontWeight: 1000 }}
                                color="secondary"
                                variant="contained"
                                onClick={saveHandler}
                            >
                                Guardar Cambios
                            </Button>
                            <Button
                                style={{ fontWeight: 1000, marginLeft: 15 }}
                                color="primary"
                                variant="contained"
                                onClick={deleteHandler}
                            >
                                Borrar Edificio
                            </Button>
                            <Button
                                style={{ fontWeight: 1000, marginLeft: 15 }}
                                color="secondary"
                                variant="contained"
                                onClick={cancelHandle}
                            >
                                Cancelar
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default BuildingUpdate;
