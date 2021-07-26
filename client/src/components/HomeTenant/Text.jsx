import React from 'react'

import { makeStyles } from '@material-ui/core';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { Collapse } from '@material-ui/core';
import { useState } from 'react';
import { Link as Scroll } from 'react-scroll';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',

    },
    appbar: {
        background: 'none',

    },
    appbarWrapper: {
        width: "80%",
        cursor: "pointer",
        margin: '0 auto',
        

    },
    appbarTitle: {
        marginRight: '150px',
        flexGrow: '1',
    },
    icon: {
        color: '#00ff7f',
        fontSize: '1rem',

    },
    colorText: {
        color: '#FF0000'
    },
    container: {
        textAlign: 'center',
        fontSize: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '10vh',
    },
    container2: {
        textAlign: 'center',
        fontSize: '23px',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '150px'


    },
    title: {
        /*      marginLeft:'160px', */
        color: '#00ff7f',
        fontSize: '3rem',
       

    },
    goDown: {
        color: '#00ff7f',
        fontSize: '4rem',
        marginRight: '150px'
    },
    container3: {
        marginRight: '200px'
    },
    boton: {
        justifyContent: 'center',
        alignItems: 'center',
      
    }


}));
const Text = ({ checked }) => {
    
    const classes = useStyles();
    return (
        <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
            <div className={classes.color}>
                <div >
                <div className={classes.container}>
                        <h2  className={classes.appbarTitle}>Quiénes Somos?</h2>

                    </div>

                    <Toolbar className={classes.appbarWrapper}>
                        <p align="right" className={classes.container2}>Somos una empresa dedicada de software ,radicada en Argentina,
                            líderes en innovación y tecnologías que sean simples para el usuario . <br></br>
                            
                            
                            Actualmente nos dedicamos al desarrollo de un sistema de consorcio con
                            el objetivo maximizar ganancias y reducir perdidas. 
                        </p>
                        <br />

                    </Toolbar>
                    <Scroll to='ImageCard' className={classes.boton} smooth={true}>
                        <IconButton>
                            <ExpandMoreIcon className={classes.goDown} />
                        </IconButton>
                    </Scroll>
                </div>
            </div>
        </Collapse>
    )
}

export default Text
