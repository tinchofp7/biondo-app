import React, {useState} from 'react';
import firebase from './firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import MaterialTable from 'material-table';
import {ChevronLeft, ChevronRight} from '@material-ui/icons'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block',
		marginLeft: theme.spacing.unit * 10,
		marginRight: theme.spacing.unit * 3,
		marginTop: theme.spacing.unit * 10,
	},
})

const ListaTurnos = (props)=>{
    const { classes } = props
    const [isLoading, setIsLoading] = useState(true);
    const [state, setState] = useState({
        columns: [
          { title: 'Barbero', field: 'barbero' },
          { title: 'Cliente', field: 'cliente' },
          { title: 'Fecha del turno', field: 'diaTurno', type: 'date' },
          { title: 'Hora', field: 'time' },
        ],
        data: [
          { barbero: 'Pedro', cliente: 'Tinch', diaTurno: '2/30/2020', time: "17:00" },
            { barbero: 'Rodolfo', cliente: 'Josele', diaTurno: '2/30/2020', time: "18:00" },
        ],
      });


      return (
          <div className={classes.main}>
            <ChevronLeft/>
            Dia Anterior
            -    
            Dia Siguiente
            <ChevronRight/>
        <MaterialTable
          title="Martes 3 de Febrero de 2020 (hoy)"
          columns={state.columns}
          data={state.data}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.push(newData);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  if (oldData) {
                    setState(prevState => {
                      const data = [...prevState.data];
                      data[data.indexOf(oldData)] = newData;
                      return { ...prevState, data };
                    });
                  }
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  setState(prevState => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }, 600);
              }),
          }}
        />
      </div>
      )
    }

export default withStyles(styles)(ListaTurnos)
