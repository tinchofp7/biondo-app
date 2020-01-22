import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import SettingsIcon from '@material-ui/icons/Settings';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import { Typography, TextField} from '@material-ui/core';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withRouter } from 'react-router-dom'

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

const ResumenTurno = ()=>{
  return (
    <div>
    <TextField
      id="outlined-full-width"
      label="Barbero"
      style={{ margin: 8 }}
      placeholder="Ulises Perez Gomez"
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
      placeholder="20/01/2020"
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
      placeholder="13:00"
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

function getStepContent(step, barberos) {
  switch (step) {
    case 0:
      return (
          <ListaBarber barberos={barberos}/>
      );
    case 1:
      return <ShiftReservation />;
    case 2:
      return <ResumenTurno/>
    default:
      return 'Unknown step';
  }
}
const CustomizedSteppers = (props)=> {
  const {barberos, history} = props;
const classes = useStyles();
const [activeStep, setActiveStep] = React.useState(0);
const steps = getSteps();

const handleNext = () => {
  setActiveStep(prevActiveStep => prevActiveStep + 1);
};

const handleBack = () => {
  setActiveStep(prevActiveStep => prevActiveStep - 1);
};

const handleReset = () => {
  setActiveStep(0);
};

const MiModal = (props)=>{
  debugger
const MySwal = withReactContent(Swal)
  return(
    MySwal.fire({
      title: <p>Tu turno ha sido reservado correctamente</p>,
      footer: 'Recordá llegar 5 minutos antes del horario reservado',
      icon:"success",
      confirmButtonText:"Cerrar",
      onClose: () => {
        props.props.history.push('/dashboard')
      }
    })
  )
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
      {activeStep === steps.length ? (
        <MiModal props={props}/>  
      ) : (
        <div style={{textAlign: "center"}}>
          <Typography variant="overline" className={classes.instructions}>{getStepContent(activeStep, barberos)}</Typography>
          <div>
            <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Anterior
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              {activeStep === steps.length - 1 ? 'Reservar' : 'Siguiente'}
            </Button>
          </div>
        </div>
      )}
    </div>
  </div>
);
}
export default  withRouter(CustomizedSteppers)
