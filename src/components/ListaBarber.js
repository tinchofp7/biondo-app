import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, CardMedia, CardContent, CardActionArea, Card, } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import StepperColor from './StepperColor'

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 300,
      display: "inline-block",
      marginLeft: "5%",
    }
  }));

const ListaBarber = (props) => {
    const classes = useStyles();
    const { barberos } = props;
    const [barberSelect, setBarberSelect] = useState("");
    const setBarber = (id) =>{
        setBarberSelect(id);
    }
    let lista = barberos.map( barbero =>{
    return (<Card className={classes.card} key={barbero.nombre} onClick={()=> setBarber(barbero.id)}>
                  <CardActionArea >
                      <CardMedia
                          component="img"
                          alt="Contemplative Reptile"
                          height="140"
                          image={barbero.photoUrl}
                          title="Contemplative Reptile"
                      />
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                              {barbero.nombre + " " + barbero.apellido}
                          </Typography>
                      </CardContent>
                  </CardActionArea>
              </Card>
      )}
      )
      return lista
  }

export default  withRouter(ListaBarber)