
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
   totalSpending,
   filterSpending,
} from "../../redux/spending/spendingActions";
import { getBuildings } from "../../redux/building/buildingActions";
import {
   Container,
   Button,
   Grid,
   InputLabel,
   MenuItem,
   FormControl,
   Select,
} from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
   MuiPickersUtilsProvider,
   KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeStyle";
import styles from "./board.module.css";
import moment from "moment";
import AddIcon from '@material-ui/icons/Add';
import filter from '../../utils/filter-remove.png';
import { ExpensesGenerator } from "./ExpensesGenerator/ExpensesGenerator.jsx";
import swal from "sweetalert";


const Board = (props) => {

   //--------------------------- Creando estructura de la tabla ------------------------

   const columns = [
      { field: "id", headerName: "ID", flex: 1.5, hide: true },
      { field: "building", headerName: "Edificio", flex: 3 },
      { field: "date", headerName: "Fecha", flex: 3 },
      { field: "concept", headerName: "Concepto", flex: 3 },
      { field: "details", headerName: "Detalle", flex: 5 },
      { field: "amount", headerName: "Importe", flex: 3 },
      {
         field: "edit",
         headerName: "Editar - Eliminar",
         type: "",
         flex: 3,

         renderCell: (params) => (
            <Link to={__dirname + `spendings/board/${params.id}/edit`}>
               <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  style={{ marginLeft: 16, fontWeight: 1000 }}
               >
                  Editar
               </Button>
            </Link>
         ),
      },
   ];

   // ------------------------

   const useStyles = makeStyles((theme) => ({
      root: {
         flexGrow: 1,
      },
      paper: {
         padding: theme.spacing(2),
         textAlign: "center",
         color: theme.palette.text.secondary,
      },
   }));

   const classes = useStyles();
   const dispatch = useDispatch();


   const { filterSpend, buildingArray } = useSelector((state) => {
      return {
         filterSpend: state.reducerSpending.filterSpending,
         totalSpend: state.reducerSpending.totalSpending,
         buildingArray: state.buildingReducer.allBuildings,
      };
   });



   const spendings = filterSpend.map((spending) => {
      return {
         id: spending.id,
         building: buildingArray.filter(building => building.id === spending.buildingId)[0]?.name,
         date: moment(spending.date).format("DD/MM/YY"),
         concept: spending.concept,
         details: spending.details,
         amount: new Intl.NumberFormat('es-AR', {currency: 'ARS', style: 'currency'}).format(spending.amount),
      };
   });

   useEffect(() => {
      // envia a las acciones
      dispatch(totalSpending());
      dispatch(getBuildings());
   }, [dispatch]);

   const date1 = new Date("2021-01-01T00:00:00");
   const date2 = new Date(new Date());

   const [showedExpensesGenerator, setShowedExpensesGenerator] = useState(false)

   const [input, setInput] = useState({
      since: date1,
      upTo: date2,
      concept: "All",
      buildingId: "All",
      buildingName: "All"
   });

   useEffect(() => {
      dispatch(filterSpending(input));
   }, [dispatch, input, setInput]);

   function handleSinceChange(date) {
      setInput({ ...input, since: date });
   }

   function handleUpToChange(date) {
      setInput({ ...input, upTo: date });
   }

   function handleSelectBuilding(e) {
      var buildingId = "All"
      if (e.target.value !== "All" && e.target.value) {
         buildingId = buildingArray.filter(
            (b) => b.name === e.target.value
         )[0]?.id;
         // e.target.value = buildingId;
      } else {
         e.target.value = "All";
      }
      setInput({ ...input, [e.target.name]: buildingId, buildingName: e.target.value });
   }

   function handleSelectConcept(e){
      if (e.target.value !== "All" && e.target.value) {
        const concept = filterSpend.map(
          (spending) => {
            return spending.concept})
          .filter(
            (b) => {
              return b === e.target.value
            }
          )[0];
        e.target.value = concept;
      } else {
        e.target.value = "All";
   }
   setInput({ ...input, [e.target.name]: e.target.value });

   }

   function handleSelectAll(e) {
      setInput({ since: date1, upTo: date2, concept: "All", buildingId: "All" });
      dispatch(filterSpending({ since: date1, upTo: date2, concept: "All", buildingId: "All" }));
   }

   function toggleFormExpensesGenerator(){
      if(input.buildingId !== 'All'){
         setShowedExpensesGenerator(!showedExpensesGenerator)
      }
      else{
         swal("Primero debe filtrar por el edificio al que le quiere generar las expensas", "Filtre y vuelva a intentar", "info");
      }
   }

   return (
      <ThemeProvider theme={theme}>
         <div className={styles.header}>
            <div className={styles.componentHeading1}>
               <h1>Gastos:</h1>
               <div>
                  <Button
                     variant="contained"
                     color="secondary"
                     style={{minWidth:'30px',maxWidth:'30px',minHeight:'30px',maxHeight:'30px', marginLeft: '20px'}}
                     href="./newSpending"
                  >
                     <AddIcon style={{ fontSize: 25, color: "#212121" }}/>
                  </Button>
                  <Button
                     variant="contained"
                     color="secondary"
                     style={{minWidth:'30px',minHeight:'30px', marginLeft: '500px'}}
                     onClick={toggleFormExpensesGenerator}
                  >
                     Generar Expensas
                  </Button>
               </div>
            </div>
            <Container className={classes.root}>
                  <div className={styles.date}>
                     <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid
                           container justify="flex-start" alignItems="center" className={classes.paper} item xs={6} sm={3}
                        >
                           <KeyboardDatePicker
                              name="since"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Desde"
                              format="dd/MM/yyyy"
                              value={input.since}
                              onChange={handleSinceChange}
                              KeyboardButtonProps={{
                                 "aria-label": "change date",
                              }}
                           />
                        </Grid>

                        <Grid
                           container justify="flex-start" alignItems="center" style ={{marginLeft: "-60px"}} className={classes.paper} item xs={6} sm={3}
                        >
                           <KeyboardDatePicker
                              name="upTo"
                              margin="normal"
                              id="date-picker-dialog"
                              label="Hasta"
                              format="dd/MM/yyyy"
                              value={input.upTo}
                              onChange={handleUpToChange}
                              KeyboardButtonProps={{
                                 "aria-label": "change date",
                              }}
                           />
                        </Grid>

                        <Grid
                           container justify="flex-start" alignItems="center" style ={{marginLeft: "-60px", marginTop:"7px"}} className={classes.paper} item xs={6} sm={3}
                        >
                           <FormControl style={{ width: "200px" }}>
                              <InputLabel id="demo-controlled-open-select-label">
                                 Concepto
                              </InputLabel>
                              <Select name="concept" onChange={handleSelectConcept} value={input.concept}>
                                 <MenuItem value="">
                                    <em>All</em>
                                 </MenuItem>

                                 {filterSpend.map((spending, index) => (
                                    <MenuItem
                                       value={spending.concept}
                                       key={index}
                                    >
                                       {spending.concept}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Grid>

                        <Grid
                           container justify="flex-start" alignItems="center" style ={{marginLeft: "-60px", marginTop:"7px"}} className={classes.paper} item xs={6} sm={3}
                        >
                           <FormControl style={{ width: "200px" }}>
                              <InputLabel id="demo-controlled-open-select-label">
                                 Edificio
                              </InputLabel>
                              <Select 
                                 name="buildingId" onChange={handleSelectBuilding} value={input.buildingName}>
                                 <MenuItem value="">
                                    <em>All</em>
                                 </MenuItem>

                                 {buildingArray.map((building, index) => (
                                    <MenuItem value={building.name} key={index}>
                                       {building.name}
                                    </MenuItem>
                                 ))}
                              </Select>
                           </FormControl>
                        </Grid>
                     </MuiPickersUtilsProvider>
                     <Button variant="contained" color="secondary" style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px', marginLeft: "-100px", marginTop: "20px"}} onClick={handleSelectAll}>
                        <img style={{width: "25px", height:"25px"}} src={filter}></img>
                     </Button>
                  </div>
                  {
                     showedExpensesGenerator
                     ?
                     // <p>Mostrar generador de expesas</p>
                     <ExpensesGenerator 
                        visibility={showedExpensesGenerator} 
                        changeVisibility={setShowedExpensesGenerator}
                        idBuildings={input.buildingId}
                        nameBuildings={input.buildingName}
                        year={null}
                        month={null}
                     />
                     :
                     false
                  }
                  <Container style={{ height: 400, width: "100%" }}>
                     <Container style={{ display: "flex", height: "100%", width: "100%"}}>
                        <DataGrid
                        sortModel={[
                           {
                             field: 'date',
                             sort: 'desc',
                           },
                         ]}
                           rows={spendings}
                           columns={columns}
                           pageSize={5}
                        />
                     </Container>
                  </Container>
            </Container>
         </div>
      </ThemeProvider>
   );
};

export default Board;
