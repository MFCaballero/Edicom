import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import {
  postSpending,
  putSpending,
  deleteSpending,
  totalSpending,
} from "../../redux/spending/spendingActions";
import { getBuildings } from "../../redux/building/buildingActions";
import { Link } from "react-router-dom";
import "./form.css";
import {
  Domain,
  Receipt,
  ListAlt,
  Event,
  Loyalty,
  AttachMoney,
} from "@material-ui/icons";
import {
  InputLabel,
  NativeSelect,
  Grid,
  Button,
  Container,
  TextField,
  makeStyles,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeStyle";
import swal from "sweetalert";
import moment from "moment";
import { numeroPositivo } from "../../utils/validations"
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { getInvoicedExpenses } from "../../redux/expenses/expensesActions";
import { MONTHS } from "../../utils/constant";


const Form = (props) => {
  const history = useHistory();
  const {buildingId} = useParams()
  console.log('buildingId', buildingId)

  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: 50,
      marginBottom: 30,
    },
    margin: {
      margin: theme.spacing(1),
    },
  }));

  const [error, setError] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  //tendria que traer con un use selector el listado de edificios y con un use effect ejecutarlo

  const { buildingArray, totalSpend, invoicedExpenses } = useSelector(state => {
    return {
      buildingArray: state.buildingReducer.allBuildings,
      totalSpend: state.reducerSpending.totalSpending,
      invoicedExpenses: state.reducerExpenses.invoicedExpenses
    };
  });


  useEffect(() => {
    dispatch(getBuildings());
    dispatch(totalSpending());
    dispatch(getInvoicedExpenses());
  }, [dispatch]);
  
 
  let newSpending = {
    date: new Date(),
    building: buildingId || "",
    concept: "",
    supplier: "",
    details: "",
    amount: 0
  }  

  const { id } = useParams()

  if (props.match.path !== "/spendings/newSpending" && !buildingId) {

    if(totalSpend){
      newSpending = {
        building: totalSpend && totalSpend.filter((elem) => elem.id === parseInt(id))[0] && totalSpend
          .filter((elem) => elem.id === parseInt(id))[0].buildingId,
  
        date: totalSpend && (totalSpend.filter((elem) => elem.id === parseInt(id))[0] 
        && totalSpend.filter((elem) => elem.id === parseInt(id))[0].date),
        
        concept: totalSpend && (totalSpend.filter((elem) => elem.id === parseInt(id))[0] 
        && totalSpend.filter((elem) => elem.id === parseInt(id))[0].concept),
  
        supplier: totalSpend && (totalSpend.filter((elem) => elem.id === parseInt(id))[0] 
        && totalSpend.filter((elem) => elem.id === parseInt(id))[0].supplier),
  
        details: totalSpend && (totalSpend.filter((elem) => elem.id === parseInt(id))[0] 
        && totalSpend.filter((elem) => elem.id === parseInt(id))[0].details),
  
        amount: totalSpend && (totalSpend.filter((elem) => elem.id === parseInt(id))[0] 
        && totalSpend.filter((elem) => elem.id === parseInt(id))[0].amount),
      };
    }
  }

  

  //con este estado tomo el valor seleccionado
  const [spending, setSpending] = useState(newSpending);
  const [selectedBuild, setSelectedBuild] = useState({ id: buildingId || [] });


  const handleSelect = (e) => {
    let select = document.getElementById("building");
    if (select!==0) {
      let selectValue = select.options[select.selectedIndex].value;
      let selectedBuildName = select.options[select.selectedIndex].innerText;
      setSelectedBuild({
        ...selectedBuild,
        name: selectedBuild.id.concat(selectedBuildName),
      });
      /*  let selectBuild = spending.bulding.push(selectValue); */
      setSpending({ ...spending, building: parseInt(selectValue) });
    }
 
  };

  const handleInputChange = (e) => {
    if (e.target.name === "amount") {
      if (numeroPositivo(e.target.value)) {
        setSpending({...spending,[e.target.name]: parseInt(e.target.value)})
        setError(false)
      } 
      else {
        setError(true)
      }
    } 
    else {
      setSpending({
        ...spending,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleValidationDate = (e) => {

    if(e === null) return false

    const date = {
      "month": MONTHS[e.getMonth()],
      "year": e.getFullYear()
    }

    for (const elem of invoicedExpenses) {
      if (date.year === elem.year && date.month === elem.month) {
        swal('"No se puede cargar gastos en meses donde ya se liquidaron las expensas', 'warning');
        return;
      }
    }

    setSpending({
      ...spending,
      date: e,
    })

  }

  const handleUpdate = async (e) => {
    if(spending.building === 0 || spending.concept=== "" || spending.supplier === "" || spending.details === "" || spending.amount <= 0 || isNaN(spending.amount)){
      swal('Debe llenar todos los campos', 'Por favor reviselos!', 'warning');
    } 
    else {
      await dispatch(putSpending([parseInt(props.match.params.id), spending]));
      swal("Gasto Editado!", "Gracias!", "success");
      history.goBack()
    }
  }

  const handleDelete = async (e) => {
    //
    await dispatch(deleteSpending(parseInt(props.match.params.id)));
    await swal("Gasto Eliminado!", "Gracias!", "success");
    history.goBack();
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if( spending.building === null || spending.building === "" || spending.concept=== "" || spending.supplier === "" || spending.details === "" || spending.amount <= 0 || isNaN(spending.amount)){
      return swal('Faltan agregar datos', 'Por favor revise los campos!', 'warning');
    }
  
    await dispatch(postSpending(spending));
    await dispatch(totalSpending());
    await swal("Gasto Agregado!", "Gracias!", "success");
    setSpending(
      (newSpending = {
        date: moment(new Date(new Date())).format("L"),
        building: "",
        concept: "",
        supplier: "",
        details: "",
        amount: 0,
      })
    );

    history.goBack();    
  };

  const back = () =>{
    history.goBack();
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="mainContainer">
        <form>
          <Container>
            <div className="componentHeading1">
              <h1>
              {props.match.path === "/spendings/newSpending" ? 'Agregar gasto' : 'Modificar gasto'}
              </h1>
            </div>
          </Container>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            margin="auto"
            className="componentDataBox"
            spacing={1}
          >
            <Grid item xs={6}>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <Domain fontSize="large" />
                </Grid>
                <Grid item>
                  <InputLabel htmlFor="select">Edificio</InputLabel>
                  <NativeSelect
                    onChange={handleSelect}
                    name="building"
                    id="building"
                    value={spending.building}
                  >
                    <option disabled value="">
                      Seleccione un edificio
                    </option>

                    {buildingArray && buildingArray.length > 0
                      ? buildingArray.map((building) => {
                        return (
                          <option key={building.id} value={building.id}>
                            {building.name}
                          </option>
                        );
                      })
                      : ""}
                  </NativeSelect>
                  {/* <TextField id="building-name" label="Nombre" defaultValue="Nombre del edificio" /> */}
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <Event fontSize="large" />
                </Grid>
                <Grid item>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      variant="outlined"
                      name="date"
                      margin="normal"
                      id="date"
                      format="dd/MM/yyyy"
                      value={spending.date}
                      onChange={(e) => {
                        // handleInputChange(e)
                        handleValidationDate(e)
                      }
                      }
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>

                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <ListAlt fontSize="large" />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    id="concepto"
                    name="concept"
                    label="Concepto"
                    defaultValue="Concepto"
                    value={spending.concept}
                    onChange={handleInputChange}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <Loyalty fontSize="large" />
                </Grid>
                <Grid item>
                  <TextField
                    variant="outlined"
                    id="proveedor"
                    label="Proveedor"
                    value={spending.supplier}
                    onChange={handleInputChange}
                    name="supplier"
                    placeholder="supplier"
                    defaultValue="Proveedor"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={6}>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <AttachMoney fontSize="large" />
                </Grid>
                <Grid item style={{ width: "80%" }}>
                  <TextField
                    variant="outlined"
                    width="80%"
                    id="monto"
                    type="number"
                    label="Monto"
                    defaultValue="1"
                    value={spending.amount}
                    min="1"
                    onChange={handleInputChange}
                    name="amount"
                    error={error ? true : false}
                    helperText={error ? "No se puede ingresar numeros negativos " : ""}
                  />
                </Grid>
              </Grid>
              <Grid
                container
                spacing={1}
                alignItems="flex-end"
                className="element"
              >
                <Grid item>
                  <Receipt fontSize="large" />
                </Grid>
                <Grid item>
                  <TextField
                    multiline={true}
                    rowsMax={4}
                    variant="outlined"
                    id="detalles"
                    label="Detalles"
                    defaultValue="Detalles"
                    value={spending.details}
                    onChange={handleInputChange}
                    name="details"
                    placeholder="details"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              <Grid item>
                {(props.match.path === "/spendings/newSpending" || buildingId) ? (
                  <Link to={"./board"}>
                    <Button
                      style={{ fontWeight: 1000 }}
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={handleAdd}
                    >
                      Agregar Gasto
                    </Button>
                    <Button
                      style={{ fontWeight: 1000 }}
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={back}
                    >
                      Cancelar
                    </Button>
                    <Button
                      style={{ fontWeight: 1000 }}
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      onClick={back}
                    >
                      Ver todos los gastos
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Button
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      style={{ fontWeight: 1000 }}
                      onClick={handleUpdate}
                    >
                      Actualizar
                    </Button>
                    <Button
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      style={{ fontWeight: 1000 }}
                      onClick={back}
                    >
                      Cancelar
                    </Button>
                    <Button
                      className={classes.margin}
                      variant="contained"
                      color="secondary"
                      type="button"
                      style={{ fontWeight: 1000 }}
                      onClick={handleDelete}
                    >
                      Eliminar
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </ThemeProvider>
  );
};

export default Form;
