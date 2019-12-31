import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from '../components/Register';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import SelectBarber from '../components/SelectBarber';
import Home from '../components/Home';

import firebase from '../components/firebase'
import React, { useState, useEffect } from 'react'
import '../components/App/styles.css'
import ShiftReservation from '../components/ShiftReservation'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'

/* const URL = 'http://localhost:3000/'; */
/* const process = require('../env.json'); */
const theme = createMuiTheme()

const AppRouter =() => {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})
    return firebaseInitialized !== false ? 
    (
        
        <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
    <div>
        <Switch>
            {console.log('PUBLIC_URL:' , process.env.PUBLIC_URL)}
            <Route path={`${process.env.PUBLIC_URL}/`} render={(props) => <Home {...props} url={URL}/>} exact={true} />
            <Route path={`${process.env.PUBLIC_URL}/dashboard`} render={(props) => <Dashboard {...props} url={URL}/>} />
            <Route path={`${process.env.PUBLIC_URL}/login`} render={(props) => <Login {...props} url={URL}/>} />
            <Route path={`${process.env.PUBLIC_URL}/register`} render={(props) => <Register {...props} url={URL}/>}/>
            <Route path={`${process.env.PUBLIC_URL}/elegir_barbero`} render={(props) => <SelectBarber {...props} url={URL}/>}/>
            <Route path={`${process.env.PUBLIC_URL}/seleccionar_dia/:idBarbero`} render={(props) => <ShiftReservation {...props} url={URL}/>}/>
            <Route component={NotFound}/>
        </Switch>
    </div>
    </BrowserRouter>
    </MuiThemeProvider>
) : <div id="loader"><CircularProgress /></div>;
}

export default AppRouter; 