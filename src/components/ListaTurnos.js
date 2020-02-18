import React, { useState, useEffect, Component } from 'react';
import firebase from './firebase';
import withStyles from '@material-ui/core/styles/withStyles';
import MaterialTable from 'material-table';
import { ChevronLeft, ChevronRight} from '@material-ui/icons';
import {CircularProgress, Avatar, Typography} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import Swal from 'sweetalert2';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 15,
    marginRight: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 12,
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    display: "inline-flex",
    marginRight: "3%"
  },
})

const ListaTurnos = (props) => {
  const { classes } = props
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingRec, setIsLoadingRec] = useState(false)
  const [state, setState] = useState({
    columns: [
    { title: 'Cliente', field: 'avatarCliente', type: 'url', render: rowData => {return(
      <>
      <Avatar alt={rowData.nombreCliente} src={rowData.avatarCliente} className={classes.large}/>
      <Typography variant="subtitle2" style={{display: "ruby-text", marginBottom:"3%"}}>
      {rowData.nombreCliente}
      </Typography>
      </>
      )
  }},
    { title: 'Barbero', field: 'nombreBarbero' },
      { title: 'Horario', field: 'hora', defaultSort: "asc" },
    ],
    data: [],
  });
  let fecha = new Date();
  let fechaFormateada = fecha.getMonth() + 1 + "/" + fecha.getDate() + "/" + fecha.getFullYear();
  const [date, setDate] = useState(fechaFormateada);

  useEffect(() => {
    cargaTurnos()
  }, [date])
  
  async function cargaTurnos() {
    const res = await obtenerTurnos();
      setState({
        ...state,
        data: res
      })
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
  }
  const obtenerTurnos = ()=>{
    return firebase.getBookingsByDate(date)
  }

  const setDia = (value)=>{
    setIsLoading(true)
    setDate(value)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  const obtenerTituloFecha = () => {
    var dateFormat = new Date(date.replace(/-+/g, '/'));
    var options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    const title = dateFormat.toLocaleDateString('es-AR', options).toUpperCase();
    const fechaActual = new Date(date);
    const fechaAnterior = new Date(fechaActual.setDate(fechaActual.getDate() - 1));
    const fechaSiguiente = new Date(fechaActual.setDate(fechaActual.getDate() + 2));
    return (
      <><ChevronLeft style={{ fontSize: 40 }} onClick={() => setDia(fechaAnterior.toLocaleDateString('en-US'))} />
        <Typography variant="h5" style={{ display: "ruby-text", marginBottom: "1%" }}>
          {title}
        </Typography>
        <ChevronRight style={{ fontSize: 40 }} onClick={() => setDia(fechaSiguiente.toLocaleDateString('en-US'))} />
      </>)
  }
  const atendido = async id => {
    const resp = await firebase.updateBookingAttended(id)
    cargaTurnos()
  }

    function addBarbero(){


    (async () => {
     
            const { value: nombre } = await Swal.fire({
              title: 'Ingresar Nombre',
              input: 'text',      
              showCancelButton: true,
              inputValidator: (value) => {
                if (!value) {
                  return 'Necesitas escribir un nombre!'
                }
              }
              
            })
            
            
            if (nombre) {   
                    const { value: apellido } = await Swal.fire({
                        title: 'Ingresar Apellido',
                        input: 'text',      
                        showCancelButton: true,
                        inputValidator: (value) => {
                              if (!value) {
                                return 'Necesitas escribir un apellido!'
                              }
                        }
                    })
                    
                      if (apellido) {
                        
                              const { value: photoUrl } = await Swal.fire({
                                title: 'Ingresar Url de foto',
                                input: 'text',      
                                showCancelButton: true,
                                    inputValidator: (value) => {
                                          if (!value) {
                                            return 'Necesitas escribir una URL!'
                                          }                                   
                                                                            
                                    }

                              })
                              if(photoUrl) {
                                firebase.db.collection("turnBarber").doc().set({
                                  name: nombre,
                                  lastname: apellido,
                                  photoUrl: photoUrl
                                })

                                Swal.fire(
                                'Barbero agregado correctamente',
                                'Se añadió a la colección',
                                'success' 
                                )
                              }
                      }
                      
             }              
    })()};
   
  return (        
        <div className={classes.main}>
      {isLoading ? <CircularProgress/> :
      <>
          <MaterialTable
            title={obtenerTituloFecha()}
            columns={state.columns}
            data={state.data}
            localization={{
              body: {
                emptyDataSourceMessage: "No existen turnos"
              },
              header: {
                actions: "Atendido"
              },
              toolbar: {
                searchPlaceholder: "Buscar"
              }             
            }}
            actions={[
              {
                icon: () => {
                  return <DoneIcon />
                },
                tooltip: 'Atendido',
                onClick: (event, rowData) => {
                  atendido(rowData.id)
                }
              }
            ]}
            options={{
              headerStyle: {
                backgroundColor: "#3f51b5",
                color: '#FFF',
                textAlign: "center"
              },
              cellStyle: {
                textAlign: "center"
              }
            }}

            editable={{
              onRowAdd:  newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                })
            }}
                     
          />
          <div className={classes.root}>
      
              <Button variant="contained" color="secondary" onClick={addBarbero}>
                Agregar Barbero
              </Button>
          </div> 
           
      </>}
    </div>
    
  )
}

export default withStyles(styles)(ListaTurnos)

