import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button, Container } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase from '../firebase'
import { withRouter } from 'react-router-dom'
import IconLabelTabs from '../IconLabelTabs';
import { blue } from '@material-ui/core/colors'

const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
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

	
	const [quote, setQuote] = useState('')
	
	useEffect(() => {
		if(!firebase.getCurrentUsername()) {
			// not logged in
			alert('Please login first')
			props.history.replace('/login')
		}else{
			console.log("aa")
		}
	})

	return (
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
				<IconLabelTabs />
			</Container>
		</main>
	)

	async function logout() {
		await firebase.logout()
		props.history.push('/')
	}
	function goToReservTurn(){
		props.history.push('/elegir_peluquero')
	}
}

export default withRouter(withStyles(styles)(Dashboard))