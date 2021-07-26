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
import { Domain, Home, MeetingRoom } from "@material-ui/icons";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../themeStyle";
import { getAllApartments } from "../../redux/apartments/apartmentsActions";
import styles from "./CreateAmenityForm.module.css";
import AssignmentIcon from "@material-ui/icons/Assignment";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: 50,
      marginBottom: 30,
      border: 5,
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

const CreateAmenityForm = ({
   input,
   setInput,
   allBuildings,
   handleSubmit,
   errorIn,
   setError,
   setHelperText,
   helperTextIn,
}) => {
   const error = errorIn;
   const helperText = helperTextIn;
   const { allApartments } = useSelector((state) => state.apartmentReducer);
   const reg = new RegExp("^[0-9]+$"); //just numbers test

   const dispatch = useDispatch();

   const classes = useStyles();
   const [buildingOpen, setBuildingOpen] = useState(false);

   useEffect(() => {
      Validate("amenity_type");
      Validate("quantity");
      Validate("capacity");
      Validate("amenity_detail");
   }, [error]);

   const Validate = (field) => {
      switch (field.name) {
         case "amenity_type":
            if (!/^[A-Za-z .'-]{3,20}$/.test(field.value)) {
               setError({ ...error, amenity_type: true });
               if (field.value.length < 3) {
                  setHelperText({
                     ...helperText,
                     amenity_type: "Es muy corto",
                  });
               } else if (field.value.length > 20) {
                  setHelperText({
                     ...helperText,
                     amenity_type: "Es muy largo",
                  });
               } else {
                  setHelperText({
                     ...helperText,
                     amenity_type: "No se permiten caracteres especiales",
                  });
               }
            } else {
               setError({ ...error, amenity_type: false });
               setHelperText({ ...helperText, amenity_type: "" });
            }
            break;
         case "quantity":
            if (!/^([0-9])*$/.test(field.value)) {
               setError({ ...error, quantity: true });
               if (field.value.length < 3) {
                  setHelperText({ ...helperText, quantity: "Es muy corto" });
               } else if (field.value.length > 20) {
                  setHelperText({ ...helperText, quantity: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     quantity: "Contiene caracteres no aceptados",
                  });
               }
            } else {
               setError({ ...error, quantity: false });
               setHelperText({ ...helperText, quantity: "" });
            }
            break;
         case "capacity":
            if (
               !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,60}$/.test(
                  field.value
               )
            ) {
               setError({ ...error, capacity: true });
               if (field.value.length < 8) {
                  setHelperText({ ...helperText, capacity: "Es muy corto" });
               } else if (field.value.length > 60) {
                  setHelperText({ ...helperText, capacity: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     capacity: "1 nro, 1 mayus y 1 min",
                  });
               }
            } else {
               setError({ ...error, capacity: false });
               setHelperText({ ...helperText, capacity: "" });
            }
            break;
         case "amenity_detail":
            if (!/^[+0-9-]{0,200}$/.test(field.value)) {
               if (field.value.length > 200) {
                  setError({ ...error, amenity_detail: true });
                  setHelperText({
                     ...helperText,
                     amenity_detail: "Es muy largo",
                  });
               }
            } else {
               setError({ ...error, amenity_detail: false });
               setHelperText({ ...helperText, amenity_detail: "" });
            }
            break;
         default:
            break;
      }
   };
   const handleInputChange = function (e, change) {
      if (change === "capacity" || change === "quantity") {
         if (reg.test(e.target.value) || e.target.value === "") {
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

   const handleBuildingChange = (e) => {
      dispatch(getAllApartments(e.target.value));
      setInput({
         ...input,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <ThemeProvider theme={theme}>
         <div className="extContCAF">
            <h1>Nuevo Amenity</h1>
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

            <form noValidate autoComplete="off">
               <Grid
                  container
                  direction="row"
                  justify="space-around"
                  alignItems="center"
                  className={`componentDataBox ${classes.root}`}
                  spacing={1}
               >
                  <div className={styles.form}>
                     <div className={styles.left}>
                        <Grid container spacing={1} alignItems="center">
                           <div className={styles.item}>
                              <Domain fontSize="large" />
                              <TextField
                                 variant="outlined"
                                 error={error["amenity_type"]}
                                 helperText={[helperText["amenity_type"]]}
                                 id="amenity_type"
                                 label="Tipo de Amenity"
                                 name="amenity_type"
                                 value={input.amenity_type}
                                 onChange={handleInputChange}
                              />
                           </div>
                        </Grid>

                        <div className={styles.item}>
                           <PeopleAltIcon fontSize="large" />
                           <TextField
                              variant="outlined"
                              error={error["capacity"]}
                              helperText={[helperText["capacity"]]}
                              id="capacity"
                              label="Turnos disponibles"
                              name="capacity"
                              value={input.capacity}
                              onChange={(e) => handleInputChange(e, "capacity")}
                           />
                        </div>
                     </div>
                     <div className={styles.right}>
                        <Grid container spacing={1} alignItems="center"></Grid>
                        <Grid container spacing={1} alignItems="center">
                           <div className={styles.item}>
                              <AssignmentIcon fontSize="large" />
                              <TextField
                                 multiline={true}
                                 rowsMax={4}
                                 variant="outlined"
                                 error={error["amenity_detail"]}
                                 helperText={[helperText["amenity_detail"]]}
                                 id="amenity_detail"
                                 name="amenity_detail"
                                 label="Detalles"
                                 value={input.amenity_detail}
                                 onChange={handleInputChange}
                              />
                           </div>
                        </Grid>
                     </div>
                  </div>

                  <Grid
                     container
                     direction="row"
                     justify="center"
                     alignItems="center"
                  >
                     <Grid className={styles.button}>
                        <Button
                           style={{ fontWeight: 1000, marginTop: 50 }}
                           color="secondary"
                           variant="contained"
                           onClick={handleSubmit}
                        >
                           Agregar Amenity
                        </Button>
                     </Grid>

                     <Grid className={styles.button}>
                        <Link to={"./amenities"}>
                           <Button
                              style={{ fontWeight: 1000, marginTop: 50 }}
                              color="secondary"
                              variant="contained"
                              marginRigth="5px"
                           >
                              Cancelar
                           </Button>
                        </Link>
                     </Grid>
                  </Grid>
               </Grid>
            </form>
         </div>
      </ThemeProvider>
   );
};
export default CreateAmenityForm;
