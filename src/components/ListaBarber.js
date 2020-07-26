import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, CardMedia, CardContent, CardActionArea, Card, } from '@material-ui/core';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { connect } from 'react-redux';

const useStyles = makeStyles(theme => ({
    card: {
      maxWidth: 300,
      display: "inline-block",
      marginBottom: "1%"
    },
    cardSelect: {
      maxWidth: 300,
      display: "inline-block",
      marginBottom: "1%",
      border: '3px solid rgb(63, 81, 181)'
    }
  }));

const ListaBarber = (props) => {
  const classes = useStyles();
  const { barberos } = props;
  const [barberSelect, setBarberSelect] = useState({});
  const setBarber = (id) => {
    setBarberSelect(id)
  }
  const matches = useMediaQuery('(min-width:700px)');
  const styleCarouselDesktop = { marginBottom: "3%" };
  const styleCarouselMobile = { marginBottom: "20%" };
  props.saveBarber(barberSelect);
  let lista = barberos.map(barbero => {
    return (<Card className={(barberSelect == barbero) ? classes.cardSelect : classes.card} key={barbero.nombre} onClick={() => setBarber(barbero)}>
      <CardActionArea >
        <CardMedia
          component="img"
          alt={"Foto de " + barbero.nombre + " " + barbero.apellido}
          height="250"
          weight="250"
          image={barbero.photoUrl}
          title={"Foto de " + barbero.nombre + " " + barbero.apellido}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {barbero.nombre + " " + barbero.apellido}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    )
  }
  )
  return (
    <div style={matches ? styleCarouselDesktop : styleCarouselMobile}>
      <Carousel
        slidesPerPage={matches ? 3 : 1}
        offset={30}
        centered
        arrows
        infinite
        autoPlay={4000}
      >
        {lista}
      </Carousel>
    </div>
  )
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