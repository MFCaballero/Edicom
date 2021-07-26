import React from 'react';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


export default function SimpleCard(props) {

  return (
    <div className='alert'>
      <CardContent className='contentCard'>
        <h5 className="hs" gutterBottom>
          {props.building}
        </h5>
        <h3 className="hs">
          {props.concept}
        </h3>
      </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" style={{ fontWeight: 1000 ,}} size="small">Detalle</Button>
        </CardActions>
    </div>
  );
}
