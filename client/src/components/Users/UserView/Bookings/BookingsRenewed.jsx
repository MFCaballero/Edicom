import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1)
    }
  }
}));

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    }
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiAccordionDetails);

export default function CustomizedAccordions() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        square
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Primer amenity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className={classes.root}>
            <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
            >
              <Button>07:00 a 09:00 - 4 cupos - Reservar</Button>
              <Button disabled>09:00 a 11:00 - 0 cupos - Lleno</Button>
              <Button color="secondary">
                11:00 a 13:00 - 4 cupos - Cancelar
              </Button>
            </ButtonGroup>
          </div>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Segundo Amenity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>No hay turnos para la fecha buscada</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Tercer amenity</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ButtonGroup
            orientation="vertical"
            color="primary"
            aria-label="vertical contained primary button group"
            variant="contained"
          >
            <Button>08:00 a 09:00 - 4 cupos - Reservar</Button>
            <Button disabled>09:00 a 10:00 - 0 cupos - Lleno</Button>
            <Button color="secondary">
              10:00 a 11:00 - 4 cupos - Cancelar
            </Button>
            <Button>11:00 a 12:00 - 0 cupos - Reservar</Button>
            <Button>12:00 a 13:00 - 0 cupos - Reservar</Button>
            <Button>13:00 a 14:00 - 0 cupos - Reservar</Button>
            <Button>14:00 a 15:00 - 0 cupos - Reservar</Button>
            <Button>15:00 a 16:00 - 0 cupos - Reservar</Button>
            <Button>16:00 a 17:00 - 0 cupos - Reservar</Button>
            <Button>17:00 a 18:00 - 0 cupos - Reservar</Button>
          </ButtonGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
