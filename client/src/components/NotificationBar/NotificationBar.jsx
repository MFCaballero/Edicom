import { stripTrailingSlash } from 'history/PathUtils';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./NotificationBar.module.css";
import { Button } from '@material-ui/core';
import { getComplaints } from "../../redux/complaints/complaintsActions";
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

const NotificationBar = (props) => {

    let Notifications = props.notifications;
    let quantity = props.quantity;
    Notifications = Notifications.filter(noti => { if (noti.seen === false) return true })
    Notifications = Notifications.slice(Notifications.length - 4);

    const render = () => {
        if (quantity === 0) {
            return (
                <div className={styles.zero}>
                    <h1>No hay nuevos reclamos!</h1>
                    <Link to="/complaints">
                        <Button style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                            Ver todos los reclamos
                        </Button>
                    </Link>
                </div >
            )
        } else {
            return (<div className={styles.items}>
                {Notifications?.map((noti) => {
                    return (
                        <div className={styles.item} key={noti.id} >
                            <div className={styles.subj}>
                                {noti.subject}
                            </div>
                            <div className={styles.data}>
                                <div>
                                    <div className={styles.importance}>
                                        Importancia: {noti.importance}
                                    </div>
                                    <div className={styles.building}>
                                        Edificio: {noti.building.name}
                                    </div>
                                </div>
                                <div className={styles.date}>
                                    {moment(noti.date).format("DD/MM/YYYY")}
                                </div>
                            </div>
                        </div>
                    )
                })
                }
                                <div className={styles.all} >
                    <Link to="/complaints">
                        <Button style={{ fontWeight: 1000 }} variant="contained" color="secondary" size="small" >
                            Ver todos los reclamos
                        </Button>
                    </Link>
                </div>
            </div>)
        }
    }

    return (
        <div className={styles.box}>
            <div className={styles.cont}>
                {render()}
            </div>
        </div>
    )
}


export default NotificationBar;