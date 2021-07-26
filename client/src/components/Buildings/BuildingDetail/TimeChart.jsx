import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { buildingSpendings } from '../../../redux/spending/spendingActions';
import { Line } from 'react-chartjs-2';
import { dataLine } from './cleaning_data';
import './BuildingDetail.css';


export default function BSChart({date, buildingId}) {
    const building_spendings = useSelector(state => state.reducerSpending.buildingSpendings);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(buildingSpendings(buildingId))
    }, [dispatch])

    const raw_data = building_spendings && building_spendings.filter(e => new Date(e.date).getFullYear() === new Date().getFullYear())

    const amount = raw_data && dataLine(raw_data).map(e => e = e.amount);


    const data = {
        labels: ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],
        datasets:[
            {
                label: "Gastos por Mes",
                fill: false,
                borderColor: "#00ff7f",
                backgroundColor: "#00ff7f",
                data: amount,

            }
        ]
        
    }

    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    // This more specific font property overrides the global property
                    font: {
                        size: 20,
                    },
                    color: '#212121',
                },
                
            },
        },
    }

    return (
        <Line width={100} height={300} data={data} options={options}/>
    )
}