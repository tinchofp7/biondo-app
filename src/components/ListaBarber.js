import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Typography, CardMedia, CardContent, CardActionArea, Card, } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import ReservaTurno from './ReservaTurno'

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
    const [barberSelect, setBarberSelect] = useState({});
    const setBarber = (id) =>{
        setBarberSelect(id)
    }
    props.saveBarber(barberSelect);
    let lista = barberos.map( barbero =>{   
    return (<Card className={classes.card} key={barbero.nombre} onClick={()=> setBarber(barbero)}>
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

  const mapStateToProps = (state) =>{
    return {
        barberSelect: state.barberSelect
    }
  }

  const saveBarber = (barberSelect)=>{
    return {
        type: 'SET_BARBERO',
        barberSelect: barberSelect
    }
  }

  const mapDispatchToProps = {
    saveBarber: saveBarber
  }

  

export default connect(mapStateToProps,mapDispatchToProps)(ListaBarber)