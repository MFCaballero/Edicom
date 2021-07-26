import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
   makeStyles,
   Grid,
   Button,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
} from "@material-ui/core";
import { Person, Email, VpnKey, Phone } from "@material-ui/icons";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themeStyle";
import { getAllApartments } from "../../../redux/apartments/apartmentsActions";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: 50,
      marginBottom: 30,
      border: 5,
      display: "flex",
   },
   formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: 500,
   },
   last: {
      padding: 8,
   },
}));

const CreateUserForm = ({
   error,
   setError,
   input,
   setInput,
   allBuildings,
   handleSubmit,
}) => {
   const { allApartments } = useSelector((state) => state.apartmentReducer);

   const dispatch = useDispatch();
   const history = useHistory();

   const classes = useStyles();
   const [buildingOpen, setBuildingOpen] = useState(false);
   const [apartmentOpen, setApartmentOpen] = useState(false);
   const regOnlyNumbers = new RegExp("^[0-9]+$"); //just numbers test
   const regOnlyletters = new RegExp(/^[a-zA-Z\s]+$/);

   const [helperText, setHelperText] = useState({
      //Control the warning message
      name: "Ingrese un Nombre",
      email: "Ingrese un Correo",
      password: "Ingrese un Password",
      contact: "Numero de Telefono",
      isDeleted: "Ingrese un is deleted",
   });

   useEffect(() => {
      Validate("name");
      Validate("email");
      Validate("password");
      Validate("contact");
   }, [error]);

   const Validate = (field) => {
      switch (field.name) {
         case "name":
            if (!/^[A-Za-z .'-]{3,20}$/.test(field.value)) {
               setError({ ...error, name: true });
               if (field.value.length < 3) {
                  setHelperText({ ...helperText, name: "Es muy corto" });
               } else if (field.value.length > 20) {
                  setHelperText({ ...helperText, name: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     name: "No se permiten caracteres especiales",
                  });
               }
            } else {
               setError({ ...error, name: false });
               setHelperText({ ...helperText, name: "" });
            }
            break;
         case "email":
            if (
               !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
                  field.value
               )
            ) {
               setError({ ...error, email: true });
               if (field.value.length < 3) {
                  setHelperText({ ...helperText, email: "Es muy corto" });
               } else if (field.value.length > 20) {
                  setHelperText({ ...helperText, email: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     email: "Contiene caracteres no aceptados",
                  });
               }
            } else {
               setError({ ...error, email: false });
               setHelperText({ ...helperText, email: "" });
            }
            break;
         case "password":
            if (
               !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,60}$/.test(
                  field.value
               )
            ) {
               setError({ ...error, password: true });
               if (field.value.length < 8) {
                  setHelperText({ ...helperText, password: "Es muy corto" });
               } else if (field.value.length > 60) {
                  setHelperText({ ...helperText, password: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     password: "1 nro, 1 mayus y 1 min",
                  });
               }
            } else {
               setError({ ...error, password: false });
               setHelperText({ ...helperText, password: "" });
            }
            break;
         case "contact":
            if (!/^[+0-9-]{8,20}$/.test(field.value)) {
               setError({ ...error, contact: true });
               if (field.value.length < 8) {
                  setHelperText({ ...helperText, contact: "Es muy corto" });
               } else if (field.value.length > 20) {
                  setHelperText({ ...helperText, contact: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     contact: "Solo se permiten numeros",
                  });
               }
            } else {
               setError({ ...error, contact: false });
               setHelperText({ ...helperText, contact: "" });
            }
            break;
         default:
            break;
      }
   };
   const handleInputChange = function (e, change) {
      if (change === "contact") {
         //only numbers
         if (regOnlyNumbers.test(e.target.value) || e.target.value === "") {
            setError({ ...error, [change]: false });
            setHelperText({
               ...helperText,
               [change]: "",
            });
            setInput({
               ...input,
               [e.target.name]: e.target.value,
            });
         } else {
            setError({ ...error, [change]: true });
            setHelperText({
               ...helperText,
               [change]: "Solo puede ingresar numeros!",
            });
         }
      } else if (change === "name") {
         if (regOnlyletters.test(e.target.value) || e.target.value === "") {
            setError({ ...error, [change]: false });
            setHelperText({
               ...helperText,
               [change]: "",
            });
            setInput({
               ...input,
               [e.target.name]: e.target.value,
            });
         } else {
            setError({ ...error, [change]: true });
            setHelperText({
               ...helperText,
               [change]: "Solo puede ingresar letras!",
            });
         }
      } else {
         setInput({
            ...input,
            [e.target.name]: e.target.value,
         });
         Validate(e.target);
      }
   };

   const handleBuildingClose = () => {
      setBuildingOpen(false);
   };

   const handleBuildingOpen = () => {
      setBuildingOpen(true);
   };
   const handleApartmentClose = () => {
      setApartmentOpen(false);
   };

   const handleApartmentOpen = () => {
      setApartmentOpen(true);
   };
   const handleBuildingChange = (e) => {
      dispatch(getAllApartments(e.target.value));
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   };
   const cancelHandler = () => {
      history.goBack();
   };

   return (
      <ThemeProvider theme={theme}>
         <div className="extContCAF">
            <h1>Crear Usuario</h1>
            <Grid
               container
               direction="row"
               justify="center"
               alignItems="center"
            >
               <Grid item>
                  <FormControl
                     className={classes.formControl}
                     error={error["building"]}
                  >
                     <InputLabel id="demo-controlled-open-select-label">
                        Seleccionar Edificio
                     </InputLabel>
                     <Select
                        labelId="demo-controlled-open-select-label"
                        id="building"
                        name="building"
                        open={buildingOpen}
                        onClose={handleBuildingClose}
                        onOpen={handleBuildingOpen}
                        value={input.building}
                        onChange={handleBuildingChange}
                     >
                        <MenuItem value="">
                           <em>None</em>
                        </MenuItem>
                        {allBuildings?.map((building) => {
                           return (
                              <MenuItem
                                 key={building.id}
                                 value={building.id}
                              >{` ${building.id} ${building.cata} ${building.name}`}</MenuItem>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Grid>
            </Grid>
            <Grid
               container
               direction="row"
               justify="center"
               alignItems="center"
            >
               <Grid item>
                  <FormControl
                     className={classes.formControl}
                     error={error["apartments"]}
                  >
                     <InputLabel id="demo-controlled-open-select-label">
                        Seleccionar Departamento
                     </InputLabel>
                     <Select
                        labelId="demo-controlled-open-select-label"
                        id="apartment"
                        name="apartment"
                        open={apartmentOpen}
                        onClose={handleApartmentClose}
                        onOpen={handleApartmentOpen}
                        value={input.apartment}
                        onChange={handleInputChange}
                     >
                        <MenuItem value="">
                           <em>None</em>
                        </MenuItem>
                        {allApartments?.map((apartment) => {
                           return (
                              <MenuItem
                                 key={apartment.id}
                                 value={apartment.id}
                              >{` ${apartment.id} ${apartment.cata_apartment} ${apartment.number_apartment}`}</MenuItem>
                           );
                        })}
                     </Select>
                  </FormControl>
               </Grid>
            </Grid>
            <form noValidate autoComplete="off">
               <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  className={`componentDataBox ${classes.root}`}
                  spacing={1}
               >
                  <Grid>
                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <Person />
                        </Grid>
                        <Grid item>
                           <TextField
                              variant="outlined"
                              error={error["name"]}
                              helperText={[helperText["name"]]}
                              id="name"
                              label="Nombre"
                              name="name"
                              value={input.name}
                              onChange={(e) => handleInputChange(e, "name")}
                           />
                        </Grid>
                     </Grid>

                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <Email />
                        </Grid>
                        <Grid item>
                           <TextField
                              variant="outlined"
                              error={error["email"]}
                              helperText={[helperText["email"]]}
                              id="email"
                              label="Correo"
                              name="email"
                              value={input.email}
                              onChange={handleInputChange}
                           />
                        </Grid>
                     </Grid>
                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <VpnKey />
                        </Grid>
                        <Grid item>
                           <TextField
                              variant="outlined"
                              error={error["password"]}
                              helperText={[helperText["password"]]}
                              id="password"
                              label="Contraseña"
                              name="password"
                              value={input.password}
                              onChange={handleInputChange}
                           />
                        </Grid>
                     </Grid>
                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <Phone />
                        </Grid>
                        <Grid item>
                           <TextField
                              variant="outlined"
                              error={error["contact"]}
                              helperText={[helperText["contact"]]}
                              id="contact"
                              name="contact"
                              label="Nº Telefono"
                              value={input.contact}
                              onChange={(e) => handleInputChange(e, "contact")}
                           />
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid
                     container
                     direction="row"
                     justify="center"
                     alignItems="center"
                  >
                     <Grid item>
                        <Button
                           style={{ fontWeight: 1000, marginTop: 50 }}
                           color="secondary"
                           onClick={handleSubmit}
                           variant="contained"
                        >
                           Agregar Usuario
                        </Button>
                     </Grid>
                     <Grid item>
                        <Button
                           style={{
                              fontWeight: 1000,
                              marginTop: 50,
                              marginLeft: 20,
                           }}
                           color="secondary"
                           onClick={cancelHandler}
                           variant="contained"
                        >
                           Cancelar
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </form>
         </div>
      </ThemeProvider>
   );
};
export default CreateUserForm;
