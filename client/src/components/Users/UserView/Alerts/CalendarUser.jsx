import { useSelector, useDispatch } from "react-redux";
import React, { useEffect } from "react";
import Calendar from "../../../Buildings/BuildingDetail/Calendar";
import { getUser } from '../../../../redux/users/userActions';
import { getBuildingDetail } from '../../../../redux/building/buildingActions';
import "./AlertsUser.css";

export default function CalendarUser(props){
    const id = props.match.params.id;
    const user_detail = useSelector(state => state.userReducer.userDetail);
    const building = useSelector(state => state.buildingReducer.detailBuilding);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser(id))
    }, [dispatch])

    useEffect(() => {
        user_detail && dispatch(getBuildingDetail(user_detail.apartment.buildingId))
    }, [dispatch, user_detail])

    if(building.length > 0) {
        return (
            <div style={{marginTop: -100}}>
            <div className= 'contExtPresentacionBuilding'>
                <div className="contTitleBuildingPresentation">
                    <h1>
                        Edificio: {building[0].name}
                    </h1>
                </div>
                <div className = 'contIntPresentacionBuilding'>
                <img className = 'imgBuildingPresentation' src={building[0].image} alt="" />
                <div className='textBuildingPresentation'>
                <div className ='lineTextBP'>
                <h2 className='titleLineTextBP'>Dirección:</h2>
                <h2>{building[0].address}</h2>
                </div>
                <div className ='lineTextBP'>
                <h2 className='titleLineTextBP'>Catastro:</h2>
                <h2>{building[0].cata}</h2>
                </div>
                <div className ='lineTextBP'>
                <h2 className='titleLineTextBP'>Cantidad de Pisos:</h2>
                <h2>{building[0].floor}</h2>
                </div>
                <div className ='lineTextBP'>
                <h2 className='titleLineTextBP'>Cantidad de Departamentos:</h2>
                <h2>{building[0].cant_apartments}</h2>
                </div>
                </div>
                </div>
                <h1 style={{marginTop: 100, marginBottom: -20}}>
                Calendario:
                </h1>
            </div>
            <div className='contExtCalendarUserView'>
            <Calendar buildingId={user_detail && user_detail.apartment.buildingId} user={true}/>
            </div>
            </div>
        )
    }else {
        return (
            <div>
                <h1>
                    Loading...
                </h1>
            </div>
        )
    }
}
