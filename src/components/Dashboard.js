import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button, Container } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from './firebase'
import { withRouter } from 'react-router-dom'
import { blue } from '@material-ui/core/colors'

import ListaTurnos from './ListaTurnos';

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 6,
		marginRight: theme.spacing.unit * 3,
		marginTop: theme.spacing.unit * 10,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 545,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
		color: blue
	},
})

function Dashboard(props) {
	const { classes } = props
	const [ isLoading, setIsLoading ] = useState(true);
	const [ isAdmin, setIsAdmin ] = useState(true);
	const [ proximoTurno, setProximoTurno ] = useState(null);
	
	useEffect(() => {
		if(!firebase.auth.currentUser) {
			// not logged in
			props.history.replace('/login')
		}
		async function ver(){
			const admin = await isAdmino();
			setIsAdmin(admin);
			setIsLoading(false)
		}
		async function proximoTurno(){
			const uid = firebase.getCurrentUserID()
			const resp = await firebase.getNextBookingUser(uid);
			setProximoTurno(resp);
		}
		proximoTurno()
		ver();
	})

	const isAdmino = () => {
		return new Promise(resolve => {
			const uid = firebase.getCurrentUserID()
			firebase.db.collection("turnBarber").doc(uid)
				.get()
				.then(function (resp) {
					if (resp.exists) {
						resolve(true)
					} else {
						resolve(false)
					}
				})
		}
		)
	}
	const fechaFormateada = (dia)=>{
		let date = new Date(dia);
		return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
	}
	
	return (
		<>
		{isLoading ? <CircularProgress className={classes.main}/>
		:		
		(<>
		{isAdmin ? <ListaTurnos />
		: 
		<main className={classes.main}>
			<Container fixed>
			<Paper className={classes.paper}>
				<Avatar className={classes.avatar}>
					<VerifiedUserOutlined />
				</Avatar>
				<Typography component="h1" variant="h5">
					Hola { firebase.getCurrentUsername() } !
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					onClick={goToReservTurn}
					className={classes.submit}>
					Reservá tu turno
          		</Button>
				</Paper>
			</Container>
			{!!proximoTurno.dia &&
			<Container fixed>
			<Paper className={classes.paper}>
				<Typography component="h1" variant="h5">
					Próximo turno: {fechaFormateada(proximoTurno.dia) + " " + proximoTurno.hora + "hs"}
				</Typography>
				</Paper>
			</Container>}
		</main>}
			</>)}
		</>
		
	)

	function goToReservTurn(){
		props.history.push('/reservaDeTurno')
	}
}

export default withRouter(withStyles(styles)(Dashboard))