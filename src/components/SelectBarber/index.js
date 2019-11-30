import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import firebase from '../firebase'
import {CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext';  
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 400,
      maxHeight: 800,
      border: "1px solid",
      display: "inline-block",
      position: "relative",
      color: "white",
      backgroundColor: "black"
    },
    bigAvatar: {
        marginRight: "20px"
    },
    borde: {
        border: "1px solid white",
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
                    console.log(props.history)
                    setTimeout(() => {
                        setIsLoading(false)
                    }, 2000);
                })
        }, [])

    function loadBarbers (){
        let barberos = []
        return new Promise( resolve => { firebase.db.collection("turnBarber").get()
        .then(function(querySnapshot) {
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
         {isLoading ? <Skeleton variant="rect" width={480} height={800} />
         :
         <div className={classes.root}>
        <ListItem className={classes.borde}>
            <ListItemText primary="Elegí a tu barbero favorito:" />
        </ListItem>
        {
         barbersArray.map(
             barbero =>
                <ListItem className={classes.borde} button>
                <Avatar alt="Remy Sharp" src={barbero.photoUrl} className={classes.bigAvatar} />
                <ListItemText primary={barbero.nombre + " " + barbero.apellido}/>
                    <NavigateNext />
                </ListItem>
             )
         }</div>}
        </div>
    )
}

export default withRouter(SelectBarber);