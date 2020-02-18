import React, { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import firebase from './firebase'
import {CircularProgress, Chip, Grid } from '@material-ui/core'
import Calendar from 'react-calendar';

const styles = theme => ({
  select: {
    border: '1px solid rgb(63, 81, 181)',
    borderRadius: '10%'
    }
});


const ShiftReservation = (props) =>{
    const { barberSelect, classes } = props;
    const t1 = new Date("2019-11-30 13:00");
    const t2 = new Date("2019-11-30 20:30");
    let turnos = [];

    while(t1.getTime() <= t2.getTime()){
        turnos.push(t1.getHours() +':'+(t1.getMinutes() === 0? "00" : t1.getMinutes() ))
        t1.setMinutes(t1.getMinutes() + 30);
    }
    
    //t.setSeconds(t.getSeconds() + 10);
    //const rangoLaboral = 
    //de Lunes a Sabados de 13:00 a 21:00
    const mapa =[
        {hora:"13:00"},{hora:"13:30"},{hora:"14:00"},{hora:"14:30"},
        {hora:"15:00"},{hora:"15:30"},{hora:"16:00"},{hora:"16:30"},
        {hora:"17:00"},{hora:"17:30"},{hora:"18:00"},{hora:"18:30"},
        {hora:"19:00"},{hora:"19:30"},{hora:"20:00"},{hora:"20:30"}
    ]

    let fechaFormateada = new Date();
    let fechaFinal = fechaFormateada.getMonth()+1 + "/" + fechaFormateada.getDate() + "/" + fechaFormateada.getFullYear();
    const [arrayTurnos, setArrayTurnos ] = useState([]);
    const [isLoading, setIsLoading ] = useState(true);
    const [dateTurnSelect, setDateTurnSelect] = useState(fechaFinal);
    const [timeTurnSelect, setTimeSelect] = useState("");

    props.saveDia(dateTurnSelect);
    props.saveHora(timeTurnSelect);

    useEffect(
        () => {
            loadTurnos()
                .then(function (data) {
                    setArrayTurnos(data);
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 1000)
                })
        }, [])

    const loadTurnos = ()=>{
        var turnos = []
        return new Promise( resolve => {
        if(process.env.REACT_APP_NODE_ENV === 'production'){ 
            firebase.db.collection("turnos").where("idBarbero", "==", barberSelect.id)
            .get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    turnos.push({dia: doc.data().dia, hora: doc.data().hora})
                });
            })
        }else{
            import('../data/turnos').then( module =>{
                setArrayTurnos(module.default.turnos);
            })
        }
        resolve(
            turnos
            )
        })}
    const formatFecha = (value) => {
        let valueFormat = value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
        setTimeSelect("")
        setDateTurnSelect(valueFormat)
    }
    
    const getTimes = (turnosDados) => {
        let turnosFinal = [];
        if (turnosFinal) {
            mapa.forEach(
                (turnos) => {
                 const existe = turnosDados.some(e => {
                        if ((turnos.hora === e.hora)&&(e.dia === dateTurnSelect)) {
                            turnos.isReservado = true;
                            turnosFinal.push(turnos);
                            return true
                        }
                    });
                if(!existe){
                    turnosFinal.push(turnos);
                }
                })
            }
            return turnosFinal
    }

    const turnoNoDisponible = (props)=>{
        const MySwal = withReactContent(Swal)
          return(
            MySwal.fire({
              title: <p>Este turno ya ha sido dado</p>,
              footer: 'Selecciona otro horario',
              icon:"warning",
              confirmButtonText:"Cerrar",
            })
          )
        }
    return(
        
        <>
            {isLoading ? <CircularProgress />
                :
                <>
                        <div style={{ display: "inline-flex" }}>
                            <div style={{ boxShadow: "5px 5px 25px", display: "flex", marginLeft:"15%" }}>
                                <Calendar
                                value={new Date(dateTurnSelect)}
                                minDate={new Date()}
                                onClickDay={(value) => formatFecha(value)}
                                />
                            </div>
                            <div style={{ marginLeft: "10%", marginRight: "10%" }}>
                                <Grid container spacing={3}>
                                    {getTimes(arrayTurnos).map(turno =>{
                                        return(<Grid key={turno.hora} item xs={12} sm={6} md={3} className={(timeTurnSelect === turno.hora) ? classes.select : ""}>
                                            <Chip color={(turno.isReservado ? "secondary" : "primary")}
                                            style={{ fontSize: "18px", display: "flex", height: "100%" }}
                                            onClick={() => turno.isReservado ? turnoNoDisponible() : setTimeSelect(turno.hora)}
                                            label={turno.hora}
                                            />
                                        </Grid>)
                                        }
                                    )}
                                </Grid>
                            </div>
                        </div>
                        </> 

            }
        </>
    )
}

const mapStateToProps = (state) =>{
    return {
        barberSelect: state.barberSelect,
        diaSelect: state.diaSelect,
        horaSelect: state.horaSelect
    }
}

const saveDia = (diaSelect)=>{
return {
    type: 'SET_DIA',
    diaSelect: diaSelect
}
}

const saveHora = (horaSelect)=>{
    return {
        type: 'SET_HORA',
        horaSelect: horaSelect
    }
}

const mapDispatchToProps = {
saveDia: saveDia,
saveHora: saveHora
}

export default withStyles(styles)(connect(mapStateToProps,mapDispatchToProps)(ShiftReservation));