import React, { useState, useEffect } from 'react'
import './styles.css'
import { CircularProgress } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from '../firebase'

import HomePage from '../HomePage/Home'
import Login from '../Login'
import Register from '../Register'
import Dashboard from '../Dashboard'
import ShiftReservation from '../ShiftReservation'
import SelectBarber from '../SelectBarber'
import GeneralDrawer from '../GeneralDrawer';


export default function App() {

	const [firebaseInitialized, setFirebaseInitialized] = useState(false)

	useEffect(() => {
		firebase.isInitialized().then(val => {
			setFirebaseInitialized(val)
		})
	})


	return firebaseInitialized !== false ? (
		<Router>
			<div>
			<Switch>
			<GeneralDrawer />
				<Route exact path="/" component={HomePage} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/elegir_peluquero" component={SelectBarber} />
				<Route exact path="/reservar_turno" component={ShiftReservation} />
			</Switch>
			</div>
		</Router>
	) : <div id="loader"><CircularProgress /></div>
}