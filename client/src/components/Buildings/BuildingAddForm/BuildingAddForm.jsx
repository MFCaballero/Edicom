import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { postBuilding, getBuildings } from '../../../redux/building/buildingActions';
import { TextField, Grid, Button, IconButton } from '@material-ui/core';
import {
    Domain,
    Room,
    Image,
    Receipt,
    ListAlt,
    MeetingRoom,
    PhotoCamera,
} from '@material-ui/icons';
import uploadIcon from '../../../upload-1118929_1280.png';
import styles from './BuildingAddForm.module.css';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../themeStyle';
import swal from "sweetalert";
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
} from 'react-places-autocomplete';
import PlacesAutocomplete from 'react-places-autocomplete';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function BuildingAddForm() {
    const reg = new RegExp('^[0-9]+$');
    const [buildingData, setBuildingData] = useState({
        cata: '',
        floor: '',
        cant_apartments: '',
        name: '',
        address: '',
        image: '',
        lat: "",
        lng: ""
    });
    const history = useHistory();

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

    const dispatch = useDispatch();

    function handleChange(e, change) {
        if (typeof change === "undefined"){
            var change = e.target.name;
            var text = e.target.value;        }
        else{
            var text = e;
        }
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
            return setError({
                //set the error of that input in true
                ...error,
                [change]: true,
            });
        } else if (!reg.test(buildingData[change]) || text !== '') {
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
            (change !== 'cant_apartments' && change !== 'floor') ||
            reg.test(text) ||
            text === ''
        ) {
            setBuildingData({
                ...buildingData,
                [change]: text,
            });
        }
    }

    function imgHandler(e) {
        let img = e.target.files[0];
        if (
            img.type === 'image/jpeg' ||
            img.type === 'image/jpg' ||
            img.type === 'image/png'
        ) {
            setBuildingData({ ...buildingData, image: img });
        } else swal("Tipo de archivo no soportado", "Los archivos solo pueden ser JPG, PNG o JPEG", "error");
    }

    function handleSubmit(e) {
        e.preventDefault();
        setError({
            floor: false,
            cant_apartments: false,
            name: false,
            address: false,
            cata: false,
            image: false,
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
        if (
            !/\S/.test(buildingData.name) ||
            !/\S/.test(buildingData.floor) ||
            !/\S/.test(buildingData.cant_apartments) ||
            !/\S/.test(buildingData.cata) ||
            !/\S/.test(buildingData.address)
        ) {
            return swal("Debe completar todos los campos", "Por favor revise los datos!", "warning");;
        }
        const formData = new FormData();
        formData.append('image', buildingData.image);
        formData.append(
            'body',
            JSON.stringify({
                cata: buildingData.cata,
                floor: buildingData.floor,
                cant_apartments: buildingData.cant_apartments,
                name: buildingData.name,
                address: buildingData.address,
                latitude: buildingData.lat || null,
                longitude: buildingData.lng || null
            })
        );
        setBuildingData({
            cata: '',
            floor: '',
            cant_apartments: '',
            name: '',
            address: '',
            image: '',
        });
        dispatch(postBuilding(formData))
        .then(dispatch(getBuildings()))
        .then(swal("Edificio Creado!", "Gracias!", "success"))
        .then(history.goBack())
    }

    function renderImg() {
        if (!buildingData.image) return uploadIcon;
        else return URL.createObjectURL(buildingData.image);
    }

    const handleSelect = async (value) => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);
        setBuildingData({ ...buildingData, lat: latlng.lat, lng: latlng.lng })
    }

    const handleSelectItem = async (e, sug) => {
        const results = await geocodeByAddress(sug.description);
        const latlng = await getLatLng(results[0])
        setBuildingData({ ...buildingData, lat: latlng.lat, lng: latlng.lng, address: sug.description })
    }

    function cancelHandle (){
        history.goBack()
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={styles.contUpdateB}>
                <h1 className='h1BuildingAddForm'>Crear edificio:</h1>
                <form action="" className={styles.formCont}>
                    <div className={styles.form}>
                        <div className={styles.item}>
                            <Domain fontSize="large" />
                            <TextField
                                name="name"
                                label="Nombre del edificio"
                                value={buildingData.name}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.item}>
                            <Receipt fontSize="large" />
                            <TextField
                                name="cata"
                                label="Nº Catastral"
                                value={buildingData.cata}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.item}>
                            <ListAlt fontSize="large" />
                            <TextField
                                error={error.floor}
                                helperText={warning.floor}
                                name="floor"
                                label="Pisos"
                                value={buildingData.floor}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                        <div className={styles.item}>
                            <MeetingRoom fontSize="large" />
                            <TextField
                                error={error.cant_apartments}
                                helperText={warning.cant_apartments}
                                name="cant_apartments"
                                label="Departamentos"
                                value={buildingData.cant_apartments}
                                variant="outlined"
                                onChange={handleChange}
                            />
                        </div>
                        <div
                            container
                            id={styles.location}
                            className={styles.item}
                            item
                            justify="space-between"
                        >
                            <LocationOnIcon className={styles.iconAdress} fontSize="large" />
                            <PlacesAutocomplete
                                value={buildingData.address}
                                onChange={(e) => handleChange(e, "address")}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div className={styles.locInput}>
                                        <TextField
                                            error={error.address}
                                            helperText={warning.address}
                                            variant="outlined"
                                            {...getInputProps({
                                                placeholder: "Direccion",
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
                    <div className={styles.right}>
                        <div className={styles.item}>
                            <img
                                className={styles.img}
                                alt="Building pic"
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
                        <div className={styles.guardarCambios}>
                            <Button variant="contained" color="secondary" onClick={handleSubmit} style={{ fontWeight: 1000 }}>
                                Confirmar
                            </Button>
						    <Button style={{ fontWeight: 1000, marginLeft: 20 }} color="secondary" variant="contained" onClick={cancelHandle}>Cancelar</Button>
                        </div>
                    </div>
                </form>
            </div>
        </ThemeProvider>
    );
}

export default BuildingAddForm;
