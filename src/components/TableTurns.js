import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles({
  root: {
    width: '50%',
  },
  paper: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});


export default function SimpleTable(props) {
  const classes = useStyles();
  const { name, lastname, turns } = props;

  return (
    <div>
      <h1>{name+' '+lastname}</h1>
      <Paper className={classes.root}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Turnos</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {turns.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row}
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary">Reservar Turno</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}