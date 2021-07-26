import React, { useEffect, useState } from "react";
import { getExpenses, filterExpenses } from "../../redux/expenses/expensesActions";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../themeStyle';
import styles from "../Spending/board.module.css"         //AGREGAR UN CSS PROPIO DE ESTE COMPONENTE!
import ExpensesDetail from './ExpensesDetail'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import { getBuildings } from "../../redux/building/buildingActions";
import swal from 'sweetalert';



//------------------------ MATERIAL UI




function createApartment(id, cata_apartment, number_apartment, mt2, state, expenses) {
  return {
      id,
      cata_apartment,
      number_apartment,
      mt2,
      state,
      expenses
  };
}



export default function ExpensesTable() {
   
   
   const dispatch = useDispatch();
   
   // No se si anda
   /*  const apartamentArray = useSelector((state) => state.apartmentsReducer); */
   const expensesArray = useSelector((state) => state.reducerExpenses.expensesArray);
   const allBuildings = useSelector((state) => state.buildingReducer.allBuildings)
   const filterBuildings = useSelector((state) => state.reducerExpenses.filterArray)
   const statusChanged = useSelector((state) => state.reducerExpenses.statusChanged);
   
   
   useEffect(() => {
      dispatch(getExpenses());
      dispatch(getBuildings());
   }, [dispatch]);
   

   // ----------------------seleccion del edificio--------------------------

   const [building, setBuilding] = useState({
      building: "All",
      apartment: "All"
   });
  
   useEffect(() => {
      dispatch(filterExpenses(building));
   }, [building]);

   function handleSelectBuilding (e){

      var buildingId = ""

      if(e.target.value!=="All"){
         buildingId = allBuildings.filter(building => building.name === e.target.value)[0].id
      }
      else{
         buildingId = "All"
      }
      setBuilding({ ...building, [e.target.name]: buildingId })
      // dispatch(filterExpenses(building))
   }
   
   function handleSelectApartment (e){
      console.log(e.target.name)
      if(building.building==="All"){swal("No se puede elegir departamento sin selecciona edificio", "Por favor revise los datos!", "warning")}
      
      else{
         setBuilding({ ...building, [e.target.name]: e.target.value })
      }
   }

   const rows = filterBuildings.map( (apartment) => {

      return createApartment(apartment.id, 
         apartment.cata_apartment, 
         apartment.number_apartment, 
         apartment.mt2, 
         apartment.state,
         apartment.Expenses
         )
   })

  return (
   <ThemeProvider theme={theme}>
   <div className={styles.header}>
      <h1>Expensas</h1>
      <div id={styles.filters}>
      <FormControl style={{ width: "200px" }}>
         <InputLabel id="demo-controlled-open-select-label">
            Edificio
         </InputLabel>
         <Select  name="building" onChange={handleSelectBuilding}>
            <MenuItem value="All">
               <em>All</em>
            </MenuItem>

            {allBuildings.map((building, index) => (
               <MenuItem
                  value={building.name}
                  key={index}
               >
                  {building.name}
               </MenuItem>
            ))}
         </Select>
      </FormControl>


{/*       <div className={styles.filRight}> */}
      <FormControl id={styles.filRight} style={{ width: "200px" }}>
         <InputLabel id="demo-controlled-open-select-label">
            Departamento
         </InputLabel>
         <Select name="apartment" onChange={handleSelectApartment}>
            <MenuItem value="All">
               <em>All</em>
            </MenuItem>

            {filterBuildings.map((apartment, index) => (
               <MenuItem
                  value={apartment.number_apartment}
                  key={index}
               >
                  {apartment.number_apartment}
               </MenuItem>
            ))}
         </Select>
      </FormControl></div>
{/*       </div> */}

      <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
         <TableHead>
            <TableRow>
               <TableCell />
{/*                <TableCell>Id</TableCell> */}
               <TableCell align="right">Nº&nbsp;Catastral</TableCell>
               <TableCell align="right">Nº&nbsp;Dpto</TableCell>
               <TableCell align="right">Mt2</TableCell>
               {/* <TableCell align="right">State</TableCell> */}
            </TableRow>
         </TableHead>
         <TableBody>
            {rows.map((apartment) => (
            <ExpensesDetail key={apartment.id} row={apartment} statusChanged={statusChanged}/>
            ))}
         </TableBody>
      </Table>
      </TableContainer>
      </div>
    </ThemeProvider>
  );
}