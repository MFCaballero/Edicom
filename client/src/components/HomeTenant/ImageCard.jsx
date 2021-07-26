
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Collapse } from '@material-ui/core';

const useStyles = makeStyles({


    div1: {
        alingItems: 'center',
        margin:'30px',
     

    },


    tarjeta: {
        maxWidth: 645,
        background: 'rgba(0,0,0,0.5)',
        margin: '1px',
        padding: '6px',
        width: '370px',
        height: '630px',
        


    },
    media: {
        height: 440,
    },
    div: {
        marginRight: '100px',

    },
    title: {

        fontWeight: 'bold',
        fontSize: '2rem',
        color: '#fff',
        /*    marginLeft:'10px', */
        textAlign: 'justify'
    },
    desc: {

        fontSize: '1.1rem',
        color: '#ddd',
        textAlign: 'justify',
        /*   marginRight:'10px' */

    },

});

export default function ImageCard({ place, checked }) {
    const classes = useStyles();

    return (
        <div className={classes.div1}>

            <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
                <Card className={classes.tarjeta}>
                    <CardMedia
                        className={classes.media}
                        image={place.imageUrl}
                        title="Contemplative Reptile"
                    />
                    <CardContent className={classes.div} >
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="h1"
                            className={classes.title}
                        >
                            {place.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                            className={classes.desc}
                        >
                            {place.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Collapse>

        </div>

    );
}