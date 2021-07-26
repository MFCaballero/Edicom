import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBuildingDetail } from '../../../redux/building/buildingActions';
import {Button} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import './BuildingDetail.css';

export default function BuildingPresentation({buildingId}){
    let building = useSelector(state => state.buildingReducer.detailBuilding);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getBuildingDetail(buildingId))
        return (()=> building = null)
    }, [dispatch])

    if(building.length > 0) {
        return (
            <div className= 'contExtPresentacionBuilding'>
                <div className="contTitleBuildingPresentation">
                    <h1>
                        Edificio: {building[0].name}
                    </h1>
                    <Link to= {`/BuildingUpdate/${building[0].id}`} className="link">
                        <Button variant="contained" color="secondary" style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px'}}>
                            <AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                        </Button>
                    </Link>
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