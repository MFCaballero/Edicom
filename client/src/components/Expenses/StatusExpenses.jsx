import { Button } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeStatus, filterExpenses, getExpenses } from "../../redux/expenses/expensesActions";
import swal from "sweetalert";


export const StatusExpenses = ({ expense }) => {

    const dispatch = useDispatch();

    const statusChanged = useSelector((state) => state.reducerExpenses.statusChanged);
    // const [state, setState] = useState(expense)

    function handleChangeStatus (id) {
        const confirmMessage = swal("Vas a cambiar el estado de este pago, estás seguro?", {
            buttons: ["Cancelar", "Confirmar"],
          });

        confirmMessage.then( res => {    
            dispatch(changeStatus(id))
            .then(() => {
                dispatch(getExpenses())
            })
        })
    }


    return (
        <Button
            style={{ fontWeight: 1000 }}
            color="primary"
            variant="contained"
            name="changeStatus"
            onClick={(e) => handleChangeStatus(expense.id)}
        >
            {expense.status}
        </Button>
    )
}
