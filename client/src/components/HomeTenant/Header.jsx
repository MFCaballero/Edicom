import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Collapse } from '@material-ui/core';
import { useState } from 'react';
import { Link as Scroll } from 'react-scroll';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loggingIn, handleSendEmail, emailToToken } from '../../redux/logging/loggingActions';
import { useForm } from '../../utils/useForm';
import { correoElectronico } from "../../utils/validations"


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import logoEdicom from '../../utils/logoEdicom.png';
import logoEdicom2 from '../../utils/logo-Edicom.png';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import swal from "sweetalert";
import {ThemeProvider} from '@material-ui/core/styles';
import theme from '../themeStyle';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        // border: 'black 2px solid'
    },
    appbar: {
        background: '#212121',
        border: 'black 2px solid',
        fontcolor: 'white',
        height: '70px'
    },
    appbarWrapper: {
        width: "80%",
        cursor: "pointer",
        margin: '0 auto',

    },
    appbarTitle: {
        color: 'white',
        flexGrow: '1',
        fontSize: '30px',
        // border: 'red 2px solid'
    },
    ingresar: {
        color: 'white',
        fontSize: '20px',
        // border: 'red 2px solid'
    },
    icon: {
        color: '#00ff7f',
        fontSize: '1rem',
    },
    colorText: {
        color: '#00ff7f'
    },
    container: {
        padding: '150px',
    },
    title: {
        /*      marginLeft:'160px', */
        color: '#212121',
        fontSize: '60px',
        fontWeight: '900',
    },
    goDown: {
        color: '#00ff7f',
        fontSize: '4rem',

    },
    flexCenter: {
        display: 'flex',
        justifyContent: 'center',
    },
    paper: {
        margin: theme.spacing(2, 3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'transparent',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#00ff7f',
        color: '#212121',
    },
    bottonIngresar: {
        display: 'flex',
        flexWrap: 'no-wrap',
        textAlign: 'center',
        alignItems: 'center',
    },
    form: {
        color: 'black',
        width: '23%',
        height: '20%',
        borderRadius: 'theme.shape.borderRadius',
        backgroundColor: 'none',
        // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
        marginTop: '100px',
        marginLeft: '70%'
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        backgroundColor: '#00ff7f',
    },
    root2: {
        height: '80vh',
        width: '100%',
        // marginRight: '208px',
        // border: 'blue 2px solid'
    },
    root1: {
        height: '80vh',
        margin: '300px',
        marginRight: '208px',
        border: 'green 2px solid'

    },
    inputs: {

        backgroundColor: '#000000',
        opacity: '3'
    },
    boton: {
        textDecoration: 'none',
        color: 'white'
    },
    // texto:{
    //     marginTop:'12px'
    // }
}));



export const Header = () => {



    const classes = useStyles();
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        setChecked(true)
    }, [])
    const dispatch = useDispatch();
    const history = useHistory();


    const { state: user, handleChange } = useForm(
        {
            email: "",
            password: "",
        }
    )

    const { email: username, password } = user;            //destructuring

    const { authData, tokenToConfirm } = useSelector(state => {
        return {
            authData: state.loggingReducer.authData,
            tokenToConfirm: state.loggingReducer.tokenToConfirm,
        };
    });

    const { first_logging, name, token } = authData

    useEffect(() => {

        if (token) {
            if (!first_logging) {
                window.location.href = 'http://localhost:3000/'
            }
            else {
                dispatch(emailToToken(username))
                //hacer el dispatch para pedir el tokenToConfirm para este email
            }
        }
    }, [authData, dispatch])

    useEffect(() => {
        if (first_logging) {
            if (tokenToConfirm?.length > 2) {
                /*     history.push(`/logging/restaurarcontraseña?${tokenToConfirm}`) */
                window.location.href = `http://localhost:3000/logging/restaurarcontraseña?${tokenToConfirm}`;
            }
        }
    }, [tokenToConfirm])


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!correoElectronico(user.email)) {
            swal("El correo electronico es incorrecto ", "Por favor revise los datos!", "warning");
        }
        else {
            console.log("despache")
            dispatch(loggingIn(user)) // ----> va a modificar nuestro authData en el store!
        }
    };


    function handleEmail() {
        var email = prompt("Introduzca su correo:", "");
        if (!correoElectronico(email)) {
            swal("El correo electronico es invalido ", "Por favor revise los datos!", "warning");
        }
        else {
            dispatch(handleSendEmail(email))
        }
    }

    const [open, setOpen] = React.useState(false);
    function handleOpen() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    return (
        <ThemeProvider theme={theme}>
        <div className={classes.root} id="header">

            <AppBar className={classes.appbar} elevation={0}>
                <Toolbar className={classes.appbarWrapper}>
                    {/* <h2 className={classes.appbarTitle}>Edi<span className={classes.colorText}>com.</span></h2> */}
                    <CssBaseline />
                    <div className="homeHeaderBar">
                        <h1 className="edicomLogoContainer">
                            <img src={`${window.location.origin}/assets/logo-Edicom-negative.png`} alt="Edicom" className="edicomLogo" />
                        </h1>
                        <div className={classes.bottonIngresar}>
                            <Avatar className={classes.avatar} onClick={handleOpen}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <span onClick={handleOpen}>Ingresar</span>
                        </div>
                    </div>

                    <div className={classes.paper}>


                        <Modal
                            aria-labelledby="transition-modal-title"
                            aria-describedby="transition-modal-description"
                            className={classes.modal}
                            open={open}
                            onClose={handleClose}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >

                            <Fade in={open}>
                                <div className={classes.paper}>
                                    <form onSubmit={handleSubmit} className={classes.form} noValidate>
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            autoComplete="email"
                                            autoFocus
                                            value={username}
                                            style={{ backgroundColor: 'transparent' }}
                                            className={classes.inputs}
                                            onChange={(e) => {
                                                handleChange(e)
                                            }
                                            }
                                        />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            className={classes.inputs}
                                            name="password"
                                            label="Contraseña"
                                            type="password"
                                            id="password"
                                            autoComplete="current-password"
                                            style={{ backgroundColor: 'transparent' }}
                                            value={password}
                                            onChange={(e) => {
                                                handleChange(e);
                                            }
                                            }
                                        />
                                       
                                        
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="secondary"
                                            className={classes.submit}

                                        >
                                            Ingresar
                                        </Button>
                                        <Grid container>
                                            <Grid item xs>
                                                <Link href="#" className={classes.boton} onClick={handleEmail} variant="body2">
                                                    Olvidaste la constraseña?
                                                </Link>
                                            </Grid>
                                            
                                        </Grid>
                                    </form>
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                </Toolbar>
            </AppBar>


            <div className={classes.root2}>
                <Collapse in={checked}
                    {...(checked ? { timeout: 1000 } : {})}
                    collapsedHeight={10}
                >
                    <div className={classes.container}>
                        <h2 className={classes.title}>
                            Administrar edificios,<br />
                            ahora es más fácil.
                        </h2>
                        <div className={classes.flexCenter}>
                            <Scroll to='Text' smooth={true}>
                                <IconButton>
                                    <ExpandMoreIcon className={classes.goDown} />
                                </IconButton>
                            </Scroll>
                        </div>
                    </div>

                </Collapse>

            </div>

        </div>
        </ThemeProvider>
    )
}
