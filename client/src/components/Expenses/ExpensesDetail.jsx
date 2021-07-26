import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ENGLISH_TO_SPANISH_MONTH } from "../../utils/constant";

import {
   Box,
   Button,
   Collapse,
   IconButton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import { StatusExpenses } from "./StatusExpenses";


export default function ExpensesDetail(props) {
  
    const useRowStyles = makeStyles({
        root: {
           '& > *': {
              borderBottom: 'unset',
           },
        },
     });

    // const [ row, setRow ] = useState(props.row);
    const [ open, setOpen ] = React.useState(false);

    const classes = useRowStyles();
  
    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
{/*           <TableCell component="th" scope="row">
            {props.row.id}
          </TableCell> */}
          <TableCell align="right">{props.row.cata_apartment}</TableCell>
          <TableCell align="right">{props.row.number_apartment}</TableCell>
          <TableCell align="right">{props.row.mt2}</TableCell>
          {/* <TableCell align="right">{row.state}</TableCell> */}
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Expensas
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Mes</TableCell>
                      <TableCell>Año</TableCell>
                      <TableCell align="right">Importe [ $ ]</TableCell>
                      <TableCell align="right">Estado</TableCell>
                      {/* <TableCell align="right">Total price ($)</TableCell> */}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.row.expenses.map((expense) => (
                      <TableRow key={expense.id}>
                          <TableCell component="th" scope="row">
                            {ENGLISH_TO_SPANISH_MONTH[expense.month]}
                          </TableCell>
                          <TableCell>{expense.year}</TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat('es-AR', {currency: 'ARS', style: 'currency'}).format(expense.amount)}
                          </TableCell>
                          <TableCell align="right">
                            <StatusExpenses
                              expense={expense}
                            />
                          </TableCell>
                          {/* <TableCell align="right">
                            {Math.round(expense.amount * row.price * 100) / 100}
                          </TableCell> */}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }