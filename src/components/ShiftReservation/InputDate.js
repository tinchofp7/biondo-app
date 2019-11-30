import 'date-fns';
import React, { useState} from 'react';
import { Grid, InputLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import firebase from '../firebase'

export default function MaterialUIPickers() {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };
  async function numbers (){
  return await firebase.getCurrentUserQuote()
  } 
  const numerito = numbers()

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Elegí la fecha:"
          minDate= {new Date()}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          />
          <InputLabel htmlFor="quote"></InputLabel>
      </Grid>
    </MuiPickersUtilsProvider>
  );

}

