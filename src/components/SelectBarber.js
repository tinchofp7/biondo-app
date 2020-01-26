import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import firebase from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';

import ReservaTurno from './ReservaTurno';


const useStyles = makeStyles(theme => ({
    root: {
      backgroundColor: "white",
      display: "flex"
    },
    bigAvatar: {
        marginRight: "20px"
    },
    borde: {
        border: "1px solid black",
    },
    card: {
        maxWidth: 200,
        marginLeft: "20%"
    }
  }));

function SelectBarber (props){
    const classes = useStyles();
    const [isLoading, setIsLoading ] = useState(true)
    const [barbersArray, setBarbersArray] = useState([])
    useEffect(
        () => {
            loadBarbers()
                .then(function (data) {
                    setBarbersArray(data)
                    console.log(data)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000);
                })
        }, [])

    function loadBarbers (){
        var barberos = []
        return new Promise( resolve => {
        if(process.env.NODE_ENV === 'production'){ 
            firebase.db.collection("turnBarber").get()
            .then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    barberos.push({id: doc.id, nombre: doc.data().name, apellido: doc.data().lastname, photoUrl: doc.data().photoUrl})
                });
            })
        }else{
            import('../data/barberos').then( module =>{
                setBarbersArray(module.default.barberos);//TODO SETEARLO EN USEEFFECT
            })
        }
        resolve(
            barberos
            )
        })}
        
        return(
        <div>
         {isLoading ? <Skeleton variant="rect" width={1300} height={600} />
         :
         <div className={classes.root}>
        <ReservaTurno
        history={props.history} 
        barberos={barbersArray}
        />
             )
         }
         </div>}
        </div>
    )
}

export default withRouter(SelectBarber);