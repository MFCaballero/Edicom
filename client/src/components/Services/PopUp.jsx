import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import GradeIcon from '@material-ui/icons/Grade';
import { getIdUser } from '../../redux/logging/loggingActions';
import { addRating, putRating, deleteRating } from '../../redux/ratings/ratingsAction';
import { getServicesBuilding } from '../../redux/services/servicesAction';
import { Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Services.css';


export default function PopUp(props) {

    //const userInfo = useSelector(state => state.loggingReducer.userId);
    const dispatch = useDispatch();
    const [rating,setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const userDetail = useSelector(state => state.userReducer.userDetail);
    const userInfo = {id: userDetail.id}
    const current = JSON.parse(localStorage.getItem('profile')).token;
    const Rating = props.service.ratings.find(e => e.userId === userInfo.id)
    const[loading, setLoading] = useState(false)

    /* useEffect(() => {
        dispatch(getIdUser(current))
    }, [dispatch]) */

    const handleScore = () => {
        setLoading(true)
        dispatch(addRating({rating: rating, serviceId: props.service.id, userId: userInfo.id}))
        setTimeout(() => {
            dispatch(getServicesBuilding(props.building))
            setLoading(false)
            props.setDisplay(false)
        }, 2000)
    }

    const handleEdit = () => {
        setLoading(true)
        dispatch(putRating({
            id: Rating.id,
            rating: rating
        }))
        setTimeout(() => {
            dispatch(getServicesBuilding(props.building))
            setLoading(false)
            props.setDisplay(false)
        }, 2000)
    }

    const handleDelete = () => {
        setLoading(true)
        dispatch(deleteRating(Rating.id))
        setTimeout(() => {
            dispatch(getServicesBuilding(props.building))
            setLoading(false)
            props.setDisplay(false)
        }, 2000)
    }

    return (props.display) ? (
        <div className= 'popUpAlert'>
            <div className = 'popup-innerAlertsUser'>
            <div className = 'btnX'>
            <input className='XinputBtnAlertsUser' type="button"  value="X" onClick={() => props.setDisplay(false)} />
            </div>
            <div className= 'contExtDetailAlert'>
                <h2>
                    {props.service.title}
                </h2>
                <h3>
                {props.service.detail}
                </h3>
                {
                    (props.service.ratings.length === 0 || !Rating) ?
                        <h4>
                        Usted no puntuó este servicio todavía. Deje una puntuación a continuación:
                        </h4> :
                        <h4>
                            Usted ya puntuó este servicio. Modifique o elimine su puntuación a continuación:
                        </h4>
                }
                <div>
                    {
                        [...Array(5)].map((star,i) => {
                            const ratingValue = i + 1;
                            return (
                                <label key={i}>
                                    <input 
                                    className = 'radioBtnPopUp'
                                    type="radio"
                                    name="rating"
                                    value= {ratingValue}
                                    onClick= {(e) => setRating(e.target.value)}
                                     />
                                    <GradeIcon
                                    style={{color: ratingValue <= (hover || rating) ? "#00ff7f" : "#e4e5e9", cursor: 'pointer'}}
                                    onMouseEnter={() => setHover(ratingValue)}
                                    onMouseLeave={() => setHover(null)}
                                    />

                                </label>
                            )
                        })
                    }
                </div>
                {
                    (props.service.ratings.length === 0 || !Rating) ?
                    (<div>
                        {loading ? <CircularProgress style={{marginTop:10}} color="secondary" /> :
                        <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25}} color="secondary" onClick={handleScore} variant="contained">Puntuar</Button>}
                    </div>) :
                    (<div>
                        {
                        loading ? <CircularProgress style={{marginTop:10}} color="secondary" /> :
                         <>
                        <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25}} color="secondary" onClick={handleEdit} variant="contained">Editar</Button>
                        <Button style={{fontWeight: 1000, marginTop: 25, marginBottom: 25, marginLeft: 30}} color="secondary" onClick={handleDelete} variant="contained">Eliminar</Button>
                        </>
                        }
                    </div>)
                }
            </div>
            </div>
        </div>
    ): "";
}