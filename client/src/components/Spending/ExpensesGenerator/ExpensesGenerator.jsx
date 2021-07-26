import React, { useState } from 'react'
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Modal, Select, TextField } from '@material-ui/core'
import { SPANISH_MONTHS } from '../../../utils/constant'
import ControlledOpenSelect from './ControlledOpenedSelect'
import { useDispatch } from 'react-redux'
import { postExpenses } from '../../../redux/expenses/expensesActions'
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({

    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: 'white',
        border: '1px solid black',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top: '50%',
        left: '50%', 
        transform: 'translate(-50%, -50%)',
    },
    textfield: {
        width: '70%',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    }
}))

export const ExpensesGenerator = ({visibility, changeVisibility, idBuildings, nameBuildings}) => {

    const initialData = {
        idBuildings: idBuildings,
        nameBuildings: nameBuildings,
        month: SPANISH_MONTHS[(new Date()).getMonth()],
        year: (new Date()).getFullYear()
    }

    const dispatch = useDispatch();
    const [data, setData] = useState(initialData) 
        
    const styles = useStyles();

    const handleGenerateExpenses = (e) => {

        const actionPostExpenses = dispatch(postExpenses(data.idBuildings, data.month, data.year))
        actionPostExpenses.then((res) => {
            if(res instanceof Error) {
                console.log(res)
                swal('El mes ya tiene las expensas liquidadas!', "Verifique el mes", "error");
            }
            else{
                console.log(res)
                swal('Expensas generadas correctamente', "Gracias!", "success");
                changeVisibility(!visibility)
            }

        }, err => {
            console.log(err);
            swal('Expensas ya estaban liquidadas!', "Verifique el mes", "error");
        })
    }

    const handleChange = (e) => {
        console.log(e)
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    
    const body = (

        <form className={styles.modal}>
            <div align="center">
                <h2>Formulario</h2>
            </div>
            <TextField
                label='Id Edificio'
                className={styles.textfield}
                value={idBuildings}
            />
            <br/>
            <TextField
                label='Edificio'
                className={styles.textfield}
                value={nameBuildings}
            />
            <br/>
                <ControlledOpenSelect 
                    // data={data}
                    handleChangeSup={handleChange} 
                    controlledLabel="Año" 
                    name="year"
                    id="year"
                    options={
                    [
                        {value: 2021, text: 2021},
                        {value: 2022, text: 2022},
                        {value: 2023, text: 2023}
                    ]}
                />
            <br/>
                <ControlledOpenSelect 
                    handleChangeSup={handleChange} 
                    controlledLabel="Mes" 
                    name="month"
                    id="month"
                    options={
                    [
                        {value: 0, text: "Enero"},
                        {value: 1, text: "Febrero"},
                        {value: 2, text: "Marzo"},
                        {value: 3, text: "Abril"},
                        {value: 4, text: "Mayo"},
                        {value: 5, text: "Junio"},
                        {value: 6, text: "Julio"},
                        {value: 7, text: "Agosto"},
                        {value: 8, text: "Septiembre"},
                        {value: 9, text: "Octubre"},
                        {value: 10, text: "Noviembre"},
                        {value: 11, text: "Diciembre"}
                    ]}
                />
            <br/><br/>
            <div align="right">
                <Button
                    onClick={(e) => handleGenerateExpenses()}
                > 
                Generar 
                </Button>
                <Button
                    onClick={() => changeVisibility(!visibility)}
                > 
                Cancelar 
                </Button>
            </div>
        </form>
    )


    return (
        <div>
            <Modal
                open={visibility}
            >
                {body}
            </Modal>
        </div>
    )
}
