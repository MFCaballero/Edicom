import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
   makeStyles,
   Grid,
   Button,
   TextField,
   FormControl,
   InputLabel,
   Select,
   MenuItem,
   RadioGroup,
   FormControlLabel,
   Radio,
} from "@material-ui/core";
import { Domain, Home, MeetingRoom } from "@material-ui/icons";
import "./CreateApartment.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../themeStyle";
import {
   numeroPositivo,
   numeroPositivoEntero,
} from "../../../utils/validations";

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

const CreateApartmentForm = ({
   input,
   setInput,
   error,
   setError,
   allBuildings,
   handleSubmit,
}) => {
   const history = useHistory();
   const classes = useStyles();
   const [open, setOpen] = useState(false);
   const [disableButton, setdisableButton] = useState(false);

   /* const [error, setError] = useState({//Control the error red border of the inputs
		building: false,
        cata_apartment: false,
		mt2: false,
		number_apartment: false,
    }) */
   const [helperText, setHelperText] = useState({
      //Control the warning message
      building: "Seleccione un Edificio",
      cata_apartment: "Certificacion Catastral",
      mt2: "Metros Cuadrados",
      number_apartment: "Numero y/o letra del apartamento",
   });

   useEffect(() => {
      Validate("building");
      Validate("cata_apartment");
      Validate("mt2");
      Validate("number_apartment");
   }, [error]);

   const Validate = (field) => {
      switch (field.name) {
         case "building":
            if (field.value < 1) {
               setError({ ...error, building: true });
               setHelperText({
                  ...helperText,
                  building: "Seleccione un Edificio",
               });
            } else {
               setError({ ...error, building: false });
               setHelperText({ ...helperText, building: "" });
            }
            break;
         case "cata_apartment":
            if (!/^[A-Za-z0-9 ,.'-]{3,20}$/.test(field.value)) {
               setError({ ...error, cata_apartment: true });
               if (field.value.length < 3) {
                  setHelperText({
                     ...helperText,
                     cata_apartment: "Es muy corto",
                  });
               } else if (field.value.length > 20) {
                  setHelperText({
                     ...helperText,
                     cata_apartment: "Es muy largo",
                  });
               } else {
                  setHelperText({
                     ...helperText,
                     cata_apartment: "Contiene caracteres no aceptados",
                  });
               }
            } else {
               setError({ ...error, cata_apartment: false });
               setHelperText({ ...helperText, cata_apartment: "" });
            }
            break;
         case "mt2":
            if (!/^[0-9 ,.']{2,10}$/.test(field.value)) {
               setError({ ...error, mt2: true });
               if (field.value.length < 2) {
                  setHelperText({ ...helperText, mt2: "Es muy corto" });
               } else if (field.value.length > 10) {
                  setHelperText({ ...helperText, mt2: "Es muy largo" });
               } else {
                  setHelperText({
                     ...helperText,
                     mt2: "Solo se permiten numeros, comas y puntos",
                  });
               }
            } else {
               setError({ ...error, mt2: false });
               setHelperText({ ...helperText, mt2: "" });
            }
            break;
         case "number_apartment":
            if (!/^[A-Z0-9-]{1,5}$/.test(field.value)) {
               setError({ ...error, number_apartment: true });
               if (field.value.length < 2) {
                  setHelperText({
                     ...helperText,
                     number_apartment: "Es muy corto",
                  });
               } else if (field.value.length > 5) {
                  setHelperText({
                     ...helperText,
                     number_apartment: "Es muy largo",
                  });
               } else {
                  setHelperText({
                     ...helperText,
                     number_apartment: "Solo se permiten mayusculas y numeros",
                  });
               }
            } else {
               setError({ ...error, number_apartment: false });
               setHelperText({ ...helperText, number_apartment: "" });
            }
            break;
         default:
            break;
      }
   };

   const handleInputChange = function (e) {
      //SE AGREGO ESTO POR SI NO ANDA
      if (e.target.name === "mt2") {
         if (numeroPositivo(e.target.value)) {
            setInput({ ...input, [e.target.name]: parseInt(e.target.value) });
            setError(false);
         } else {
            setError(true);
         }
      } else {
         //HASTA ACA
         setInput({
            ...input,
            [e.target.name]: e.target.value,
         });
         Validate(e.target);
      }
   };

   const handleClose = () => {
      setOpen(false);
   };

   const handleOpen = () => {
      setOpen(true);
   };
   const handleRadio = (event) => {
      setInput({ ...input, state: event.target.value });
   };
   function cancelHandle() {
      history.goBack();
   }

   return (
      <ThemeProvider theme={theme}>
         <div className="extContCAF">
            <h1>Crear Departamento</h1>
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
                        open={open}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        value={input.building}
                        onChange={handleInputChange}
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
                  <Grid item xs={6}>
                     <Grid container spacing={1} alignItems="center">
                        <Grid>
                           <Domain />
                        </Grid>
                        <Grid item>
                           <TextField
                              error={error["cata_apartment"]}
                              helperText={[helperText["cata_apartment"]]}
                              id="cata_apartment"
                              label="U Catastral"
                              name="cata_apartment"
                              value={input.cata_apartment}
                              onChange={handleInputChange}
                           />
                        </Grid>
                     </Grid>
                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <Home />
                        </Grid>
                        <Grid item>
                           <TextField
                              /* 	error={error["mt2"]} */ /* 
								helperText={[helperText["mt2"]]}   */
                              id="mt2"
                              label="Mt2"
                              name="mt2"
                              type="number"
                              value={input.mt2}
                              onChange={handleInputChange}
                           />
                        </Grid>
                     </Grid>
                     <Grid container spacing={1} alignItems="center">
                        <Grid item>
                           <MeetingRoom />
                        </Grid>
                        <Grid item>
                           <TextField
                              error={error["number_apartment"]}
                              helperText={[helperText["number_apartment"]]}
                              id="number_apartment"
                              name="number_apartment"
                              label="Nº Departamento"
                              value={input.number_apartment}
                              onChange={handleInputChange}
                           />
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid>
                     <Grid
                        container
                        spacing={1}
                        alignItems="center"
                        className={`${classes.last}`}
                     >
                        <Grid item>
                           <FormControl>
                              <RadioGroup
                                 row
                                 value={input.state}
                                 onChange={handleRadio}
                              >
                                 <FormControlLabel
                                    value="1"
                                    control={<Radio />}
                                    label="OCUPADO"
                                 />
                                 <FormControlLabel
                                    value="0"
                                    control={<Radio />}
                                    label="DESOCUPADO"
                                 />
                              </RadioGroup>
                           </FormControl>
                           <br />
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
                           disabled={disableButton}
                           onClick={handleSubmit}
                           variant="contained"
                        >
                           Agregar Depto
                        </Button>
                     </Grid>
                     <Grid item>
                        <Button
                           style={{
                              fontWeight: 1000,
                              marginTop: 50,
                              marginLeft: 5,
                           }}
                           color="secondary"
                           variant="contained"
                           onClick={cancelHandle}
                        >
                           {" "}
                           Cancelar{" "}
                        </Button>
                     </Grid>
                  </Grid>
               </Grid>
            </form>
         </div>
      </ThemeProvider>
   );
};
export default CreateApartmentForm;
