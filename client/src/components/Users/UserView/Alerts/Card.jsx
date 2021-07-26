import React, { useState } from "react";
import PopUp from './PopUp';
import './AlertsUser.css';

export default function Card({alert}){
    const [displayPopUp, setDisplayPopUp] = useState(false);

    const handleClick = () => {
        setDisplayPopUp(true);
    }

    return(
        <>
        <PopUp display={displayPopUp} setDisplay={setDisplayPopUp} alertProps = {alert}/>
        <div key={alert.id} className='cardAlertsUserView' onClick={handleClick}>
            <h2>
                {alert.concept}
            </h2>
        </div> 
        </>
    )
}