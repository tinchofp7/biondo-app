/* import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import RadioButtons from './RadioButtons';
import SimpleList from './SimpleList';
import firebase from './firebase'
import {CircularProgress } from '@material-ui/core'
import Calendar from 'react-calendar';


function ShiftReservation (props){
    const mapa =[
        {time:"13:00", isAv: true},
        {time:"14:00", isAv: true},
        {time:"15:00", isAv: true},
        {time:"16:00", isAv: true},
        {time:"17:00", isAv: true},
        {time:"18:00", isAv: true},
        {time:"19:00", isAv: true},
        {time:"20:00", isAv: true},
        {time:"21:00", isAv: true}
    ]
    const [consultaApi, setConsultaApi ] = useState([])
    const [isLoading, setIsLoading ] = useState(true)
    const [dateTurnSelect, setDateTurnSelect] = useState(new Date())
    const idBarbero = props.match.params.idBarbero
    useEffect(
        () => {
                    console.log(idBarbero)
                    loadTurnos()
                    .then(function(data){
                        console.log(data)
                        setConsultaApi(data)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 2000);
                    })
                }, [])
            
    function mergeDias(barber, inputY, inputM, inputD) {
        const diaElegido = barber.años.map(e => {
            if (e.año === inputY) {
                return e.meses.map(mes => {
                    if (mes.mes === inputM) {
                        return mes.dias.map(dia => {
                            if (dia.dia === inputD) {
                                return dia
                            }
                        })
                    }
                })
            }
        })
        if (diaElegido === undefined) {
            return mapa;
        } else {
            const mapaFinal = mapa.map(horaAv => {
                diaElegido.forEach(resp => {
                    if (resp.data.time == horaAv.time) {
                        horaAv.isAv = false
                    }
                })
                return horaAv
            })
            return mapaFinal
        }
    }
    function loadTurnos (){
        let arri = []
        return new Promise( resolve => { firebase.db.collection("turnos").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                arri.push({id: doc.id, data: doc.data()})
            });
        });
        resolve(
            arri
            )
        })}
        
        return(
        <div>
            <Calendar value={dateTurnSelect} minDate={new Date()} onClickDay={(value) => setDateTurnSelect(value)} />
         {isLoading ? <CircularProgress />
         :
         <div>{consultaApi.map(hora =><SimpleList valor={hora.time} color={hora.isAv} disable={!hora.isAv}></SimpleList>)}</div>}
        </div>
        )
}

export default withRouter(ShiftReservation); */

import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import firebase from './firebase'
import {CircularProgress } from '@material-ui/core'
import Calendar from 'react-calendar';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';



function ShiftReservation (props){
    const { barberSelect } = props;
    const t1 = new Date("2019-11-30 13:00");
    const t2 = new Date("2019-11-30 20:30");
    let turnos = [];
    let barber = {}
    
    while(t1.getTime() <= t2.getTime()){
        turnos.push(t1.getHours() +':'+(t1.getMinutes() == 0? "00" : t1.getMinutes() ))
        t1.setMinutes(t1.getMinutes() + 30);
    }
    
    
    //t.setSeconds(t.getSeconds() + 10);
    //const rangoLaboral = 
    //de Lunes a Sabados de 13:00 a 21:00
    const mapa =[
        {time:"13:00", isAv: true},
        {time:"14:00", isAv: true},
        {time:"15:00", isAv: true},
        {time:"16:00", isAv: true},
        {time:"17:00", isAv: true},
        {time:"18:00", isAv: true},
        {time:"19:00", isAv: true},
        {time:"20:00", isAv: true},
        {time:"21:00", isAv: true}
    ]

    const [arrayTurnos, setArrayTurnos ] = useState([])
    const [isLoading, setIsLoading ] = useState(true)
    const [dateTurnSelect, setDateTurnSelect] = useState(new Date())

    useEffect(
        () => {
            loadTurnos()
                .then(function (data) {
                    setArrayTurnos(data);
                    console.log(data)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000)
                })
        }, [])

    

    const useStyles = makeStyles({
      root: {
        width: '100%',
        overflowX: 'auto',
      },
      table: {
        minWidth: 650,
      },
    });

    const loadTurnos = ()=>{
        var turnos = []
        return new Promise( resolve => {
        if(process.env.NODE_ENV === 'production'){ 
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
        let valueFormat = value.toLocaleDateString()
        setDateTurnSelect(valueFormat)
    }
    
    const classes = useStyles();        
    return(
        
        <div>
            {isLoading ? <CircularProgress />
                :
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
                                    {turnos.map(hora =>
                                        <Grid key={hora} item xs={12} sm={6} md={3}  >
                                            <Chip color="primary" style={{ fontSize: "18px", display: "flex", height: "100%" }} onClick={() => console.log(hora)} label={hora} />
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        </div>
            }
        </div>



    )
}

const mapStateToProps = (state) =>{
    return {
        barberSelect: state.barberSelect
    }
  }
  

export default connect(mapStateToProps)(ShiftReservation);