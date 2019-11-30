import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import firebase from './firebase'

const useStyles = makeStyles(theme => ({
  margin: {
    margin: 5
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ButtonSizes(props) {
  const classes = useStyles();
  const [selectColor, setSelectColor ] = useState({
    color:"secondary",
    isActive: false
  })

  const actualDate = props => {
    console.log("Click")
  }
  return (
    <div>
      <div>
        <Button onClick={actualDate} color="primary" variant="contained" size="small" className={classes.margin}>
          Hoy
        </Button>
        <Button onClick={actualDate} color="primary" variant="contained" size="small" className={classes.margin}>        
          Sab
        </Button>
        <Button onClick={actualDate} color="primary" variant="contained" size="small" className={classes.margin}>        
          Mar
        </Button>
        <Button onClick={actualDate} color="primary" variant="contained" size="small" className={classes.margin}>        
          Mier
        </Button>
        <Button onClick={actualDate} color="primary" variant="contained" size="small" className={classes.margin}>        
          Jue
        </Button>
      </div>
    </div>
  );

}