import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';
import ShiftReservation from './ShiftReservation';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import NavigateNext from '@material-ui/icons/NavigateNext';  


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 120,
    maxHeight: 40,
    backgroundColor: "red",
    border: "1px solid",
    display: "inline-block",
    position: "relative",
    
  },
  rootNo:{
    width: '100%',
    maxWidth: 120,
    maxHeight: 40,
    backgroundColor: "green",
    border: "1px solid",
    display: "inline-block",
    position: "relative"
  }
}));


export default function SimpleList(props) {
  ShiftReservation.PropTypes = {
    valor: PropTypes.string.isRequired,
    color: PropTypes.bool.isRequired,
    disable: PropTypes.bool.isRequired
  }
  const { valor, color, disable } = props;
  console.log(valor)
  const classes = useStyles();

  return (
    <div className={color ? classes.rootNo : classes.root}>
        <ListItem color="primary" disabled={disable} button>
          <ListItemText primary={valor}/>
          <NavigateNext />
        </ListItem>
    </div>
  );
}