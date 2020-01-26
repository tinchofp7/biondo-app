import React from 'react';
import firebase from './firebase'
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import { Typography, TextField, Stepper, Step, StepLabel, StepConnector, Button, CircularProgress} from '@material-ui/core';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { connect } from 'react-redux';

import ShiftReservation from './ShiftReservation';
import ListaBarber from './ListaBarber';


const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

function ColorlibStepIcon(props) {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <SettingsIcon />,
    2: <GroupAddIcon />,
    3: <VideoLabelIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: "64px",
    textAlign: "center"
  },
  button: {
    marginRight: theme.spacing(10),
    marginTop: theme.spacing(10)
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(10),
  }
}));

function getSteps() {
  return ['Elegí a tu barbero favorito', 'Selecciona día y hora', 'Confirma'];
}

const ResumenTurno = (state)=>{
  const { barberSelect, diaSelect, horaSelect } = state.state;
  const diaSeteado = diaSelect.split("/");
  return (
    <div>
    <TextField
      id="outlined-full-width"
      label="Barbero"
      style={{ margin: 8 }}
      placeholder={barberSelect.nombre + " " + barberSelect.apellido}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      InputProps={{
        readOnly: true
      }}
    />
    <TextField
      id="outlined-full-width"
      label="Fecha del turno"
      style={{ margin: 8 }}
      placeholder={diaSeteado[1] + "/" + diaSeteado[0] + "/" + diaSeteado[2]}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      InputProps={{
        readOnly: true
      }}
    />
    <TextField
      id="outlined-full-width"
      label="Horario"
      style={{ margin: 8 }}
      placeholder={horaSelect}
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      InputProps={{
        readOnly: true
      }}
    />
  </div>
  )
}

function getStepContent(step, barberos, state) {
  switch (step) {
    case 0:
      return <ListaBarber barberos={barberos}/>
    case 1:
      return <ShiftReservation />;
    case 2:
      return <ResumenTurno state={state}/>
    default:
      return <><p>Reservando turno</p><CircularProgress/></>
  }
}
const ReservaTurno = (props)=> {
  const {barberos} = props;
const classes = useStyles();
const [activeStep, setActiveStep] = React.useState(0);
const steps = getSteps();

const handleNext = () => {
  setActiveStep(prevActiveStep => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep(prevActiveStep => prevActiveStep - 1);
};

  const reservaTurnoFinal = (props) => {
    const MySwal = withReactContent(Swal);
    const { barberSelect, diaSelect, horaSelect } = props;
    const idUser = firebase.getCurrentUserID()
    const turno = {
      idBarbero: barberSelect.id,
      idCliente: idUser,
      dia: diaSelect,
      hora: horaSelect,
      fueAtendido: false,
    }
    firebase.setNewTurn(turno)
      .then(resp => {
        console.log("Turno creado correctamente: ", resp.id);
        return (
          MySwal.fire({
            title: <p>Tu turno ha sido reservado correctamente</p>,
            footer: 'Recordá llegar 5 minutos antes del horario reservado',
            icon: "success",
            confirmButtonText: "Cerrar",
            onClose: () => {
              props.history.push("/")
            }
          })
        )
      })
      .catch(function (error) {
        console.error("Error al añadir turno: ", error);
        return (
          MySwal.fire({
            title: <p>UPS ! Ha ocurrido un error al reservar el turno</p>,
            footer: 'Lo sentimos',
            icon: "error",
            confirmButtonText: "Cerrar",
            onClose: () => {
              props.history.push("/")
            }
          })
        )
      });
  }
  const nextIsActive = (props) => {
    const {barberSelect, horaSelect} = props;
    switch (activeStep) {
      case 0:
        if (barberSelect.id == null) {
          return true
        } else {
          return false
        }
      case 1:
        if (horaSelect == "") {
          return true
        } else {
          return false
        }
      case 2:
        return false
      default:
        return true
    }
  }
return (
  <div className={classes.root}>
    <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
    <div>
        <div style={{textAlign: "center"}}>
          <Typography variant="overline" className={classes.instructions}>{getStepContent(activeStep, barberos, props)}</Typography>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length ? reservaTurnoFinal(props) : handleNext}
              className={classes.button}
              disabled={nextIsActive(props)}
            >
              {activeStep === steps.length - 1 ? 'Reservar' : 'Siguiente'}
            </Button>
          </div>
        </div>  
    </div>
  </div>
);
}

const mapStateToProps = (state) =>{
  return {
      barberSelect: state.barberSelect,
      diaSelect: state.diaSelect,
      horaSelect: state.horaSelect
  }
}

export default connect(mapStateToProps)(ReservaTurno)
