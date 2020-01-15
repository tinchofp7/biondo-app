import React, { useEffect, useState} from 'react';
import {withRouter } from 'react-router-dom';
import firebase from './firebase'
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import NavigateNext from '@material-ui/icons/NavigateNext';  
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import StepperColor from './StepperColor';


const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: "inherit",
      maxHeight: "inherit",
      backgroundColor: "white",
    },
    bigAvatar: {
        marginRight: "20px"
    },
    borde: {
        border: "1px solid white",
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
        if(process.env.NODE_ENV == 'production'){ 
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
        
    function ListItemLink(props) {
        return <ListItem className={classes.borde} button component="a" {...props} />;
    }
        return(
        <div>
         {isLoading ? <Skeleton variant="rect" width={480} height={800} />
         :
         <div className={classes.root}>
        <StepperColor 
        barberos={barbersArray}
        />
{/*             <ListItemLink href={ `${process.env.PUBLIC_URL}/seleccionar_dia/${ barbero.id }` }>
                <Avatar alt="Remy Sharp" src={barbero.photoUrl} className={classes.bigAvatar} />
                <ListItemText primary={barbero.nombre + " " + barbero.apellido}  />
                    <NavigateNext />
             </ListItemLink> */}
             )
         }
         </div>}
        </div>
    )
}

export default withRouter(SelectBarber);