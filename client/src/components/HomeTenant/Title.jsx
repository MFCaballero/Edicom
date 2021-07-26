import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const UseStyles = makeStyles((theme) => ({
    //bajo la imagen en responsive

    container: {
        textAlign: 'center',
        marginRight:'70px'
       
    },
}))

const title = () => {
    const classes = UseStyles();
    return (
        <div>
            <div className={classes.container}>
                <h1 className={classes.container}>Ventajas</h1>
            </div>
        </div>
    )
}

export default title
