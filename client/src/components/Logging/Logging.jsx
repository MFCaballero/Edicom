import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loggingIn, handleSendEmail, emailToToken } from '../../redux/logging/loggingActions';
import { useForm } from '../../utils/useForm';
import {correoElectronico} from "../../utils/validations"

import {
    Grid,
    Button,
    TextField,
    makeStyles,
} from "@material-ui/core";


const Logging = () => {

    const useStyles = makeStyles((theme) => ({
        root: {
          marginTop: 50,
          marginBottom: 30,
        },
        margin: {
          margin: theme.spacing(1),
        },
      }));
    
    const dispatch = useDispatch();
    const classes = useStyles();
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
    
    const {first_logging, name, token} = authData

    useEffect(() => {

        if(token){
            if(!first_logging){                
                history.push('/');
            }
            else{
                dispatch(emailToToken(username))
                //hacer el dispatch para pedir el tokenToConfirm para este email
            }
        }
    }, [authData, dispatch])

    useEffect(() => {
        if(first_logging){        
            if(tokenToConfirm?.length > 2){
                history.push(`/logging/restaurarcontraseña?${tokenToConfirm}`)
            }
        }
    }, [tokenToConfirm])


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!correoElectronico(user.email)){
            alert ("El correo electronico es incorrecto")
        }
        else{
            dispatch(loggingIn(user)) // ----> va a modificar nuestro authData en el store!
        }
    };

    
    function handleEmail(){
        var email = prompt("Introduzca su correo:", "");
        if(!correoElectronico(email)){
            alert ("no se introdujo un correo electrónico valido")
        }
        else{
            dispatch(handleSendEmail(email))
        }
    }


    return (
        <div style={{ marginTop: '100px', marginLeft: '100px' }}>
  
            <form onSubmit={handleSubmit}>

                <h3>Iniciar Sesion</h3>

                <Grid marginTop="50">
                    <TextField
                        className={classes.margin}
                        id="email"
                        name="email"
                        label="email"
                        value={username}
                        onChange={(e) => {
                            handleChange(e)
                        }
                    }
                    />
                </Grid>
                
                <Grid marginTop="50">
                    <TextField
                        className={classes.margin}
                        id="password"
                        name="password"
                        label="password"
                        type="password"
                        value={password}
                        onChange={(e) => {
                            handleChange(e);
                        }
                    }
                    />
                </Grid>

                <Grid>
            
                    <Button
                        className={classes.margin}
                        variant="contained"
                        color="primary"
                        type="submit"
                        >
                    Iniciar Sesión
                    </Button>
                </Grid>
            </form>

            <Grid>
                <Button
                    className={classes.margin}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={handleEmail}
                    >
                Olvide mi contraseña
                </Button>
            </Grid>

        </div>
    )
}


export default Logging;