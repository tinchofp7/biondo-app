import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { CssBaseline, CircularProgress } from '@material-ui/core'

import firebase from '../components/firebase'
import '../styles.css'
import Register from '../components/Register';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import SelectBarber from '../components/SelectBarber';
import GeneralDrawer from '../components/GeneralDrawer';

/* const URL = 'http://localhost:3000/'; */
/* const process = require('../env.json'); */
const theme = createMuiTheme()

const AppRouter = () => {
    const [firebaseInitialized, setFirebaseInitialized] = useState(false)

    useEffect(() => {
        firebase.isInitialized().then(val => {
            setFirebaseInitialized(val)
        })
    })
    const isLogin = () => {
        return firebase.getCurrentUsername()
    }

    return firebaseInitialized !== false ?
        (
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter>
                    <div>
                        <Switch>
                            {console.log('PUBLIC_URL:', process.env.PUBLIC_URL)}
                            <Route path={`${process.env.PUBLIC_URL}/login`} render={(props) => !isLogin() ? (<Login {...props} url={URL} />) : (<GeneralDrawer {...props} url={URL} /> , <Dashboard {...props} url={URL} />)} />
                            <Route path={`${process.env.PUBLIC_URL}/register`} render={(props) => !isLogin() ? (<Register {...props} url={URL} />) : (<GeneralDrawer {...props} url={URL} /> , <Dashboard {...props} url={URL} />)} />
                            <Route path={`${process.env.PUBLIC_URL}/`} render={(props) => !isLogin() ? (<Login {...props} url={URL} />) : ([<GeneralDrawer {...props} url={URL} />, <Dashboard {...props} url={URL} />])} exact={true} />
                            <Route path={`${process.env.PUBLIC_URL}/dashboard`} render={(props) => [<GeneralDrawer {...props} url={URL} />, <Dashboard {...props} url={URL} />]} />
                            <Route path={`${process.env.PUBLIC_URL}/reservaDeTurno`} render={(props) => [<GeneralDrawer {...props} url={URL} />, <SelectBarber {...props} url={URL} />]} />
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        ) : <div id="loader"><CircularProgress /></div>;
}

export default AppRouter; 