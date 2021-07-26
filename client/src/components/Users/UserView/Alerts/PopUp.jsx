import React from 'react';
import moment from 'moment';
import './AlertsUser.css';

export default function PopUp(props) {

    return (props.display) ? (
        <div className= 'popUpAlert'>
            <div className = 'popup-innerAlertsUser'>
            <div className = 'btnX'>
            <input className='XinputBtnAlertsUser' type="button"  value="X" onClick={() => props.setDisplay(false)} />
            </div>
            <div className= 'contExtDetailAlert'>
                <h5>
                    {moment(props.alertProps.date).format("DD/MM/YYYY")}
                </h5>
                <h2>
                    {props.alertProps.concept}
                </h2>
                <h4>
                {props.alertProps.details}
                </h4>
                <h5>
                    Importancia: {props.alertProps.importance}
                </h5>
            </div>
            </div>
        </div>
    ): "";
}