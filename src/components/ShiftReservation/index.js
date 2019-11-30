import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import RadioButtons from '../RadioButtons';
import SimpleList from '../SimpleList';
import firebase from '../firebase'
import {CircularProgress } from '@material-ui/core'
import Calendar from 'react-calendar';
import SimpleSelect from '../SimpleSelect';


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
    const [dateTurn, setDateTurn] = useState(new Date())
    const [barbersArray, setBarbersArray] = useState([])
    useEffect(
        () => {
                    loadTurnos()
                    .then(function(data){
                        console.log(data)
                        setConsultaApi(data)
                        setTimeout(() => {
                            setIsLoading(false)
                        }, 2000);
                    })
                    loadBarbers()
                    .then(function(data){
                        setBarbersArray(data)
                        console.log(data)
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
    function loadBarbers (){
        let barberos = []
        return new Promise( resolve => { firebase.db.collection("barbers").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                barberos.push({id: doc.id, nombre: doc.data().name, apellido: doc.data().lastname, photoUrl: doc.data().photoUrl})
            });
        });
        resolve(
            barberos
            )
        })}
        
            return(
        <div>
            <Calendar value={dateTurn} minDate={new Date()} onClickDay={(value) => setDateTurn(value)} />
            <SimpleSelect />
         {isLoading ? <CircularProgress />
         :
         <div>{consultaApi.map(hora =><SimpleList valor={hora.time} color={hora.isAv} disable={!hora.isAv}></SimpleList>)}</div>}
        </div>
    )
}

export default withRouter(ShiftReservation);