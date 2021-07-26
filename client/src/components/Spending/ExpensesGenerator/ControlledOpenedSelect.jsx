import React, { useState } from "react";
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({

  formControl: {
    minWidth: 120
  }
}));

export default function ControlledOpenSelect({ handleChangeSup, controlledLabel, name, options }) {


  const classes = useStyles();
  const [age, setAge] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">{controlledLabel}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          name={name}
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={(e) => {
            handleChange(e)
            handleChangeSup(e)
          }}
        >
          {options.map(option => {
            
            return <MenuItem value={option.value}>{option.text}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}