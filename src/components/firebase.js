import firebase from 'firebase'
import 'firebase/auth'  

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
}

class Firebase {
	constructor() {
		firebase.initializeApp(config)
        this.auth = firebase.auth()  
        this.db = firebase.firestore()
		this.providers = {
			googleProvider: new firebase.auth.GoogleAuthProvider(),
			emailAndPass: new firebase.auth.EmailAuthProvider()
		  };

	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
    }

    loginWithGoogle() {
		return this.auth.signInWithPopup(this.providers.googleProvider)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName.split(" ")[0]
	}

	getCurrentUsernameComplete() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	getCurrentUserPhoto() {
		return this.auth.currentUser.photoURL
	}

	getCurrentUserID() {
		return this.auth.currentUser.uid
	}

	setNewBooking(booking) {
		return new Promise((resolve, reject) => {
			this.db.collection("turnos").add(booking)
				.then(function (docRef) {
					resolve(docRef);
				})
				.catch(function (error) {
					reject(error)
				});
		})
	}

	getBookingsByDate(date){
		var bookings = []
		return new Promise((resolve, reject) => {
			this.db.collection("turnos")
			.where("dia", "==", date)
			.where("fueAtendido", "==", false)
			.get()
			.then( querySnapshot => {
                querySnapshot.forEach(
					doc => {
					bookings.push({
						id: doc.id,
						dia: doc.data().dia,
						hora: doc.data().hora,
						nombreBarbero: doc.data().nombreBarbero,
						nombreCliente: doc.data().nombreCliente,
						idBarbero: doc.data().idBarbero,
						idCliente: doc.data().idCliente,
						fueAtendido: doc.data().fueAtendido,
						avatarCliente: doc.data().avatarCliente
					})
				});
				resolve(bookings)
			})
			.catch( err =>{
				reject(err)
			})
		})
	}

	updateBookingAttended(id) {
		return new Promise((resolve, reject) => {
			this.db.collection("turnos").doc(id)
				.update({
					fueAtendido: true
				})
				.then(res => {
					console.log("Documento actualizado")
					resolve(res)
				})
				.catch(err => {
					console.error("Error al actualizar el documento: " + err);
					reject(err)
				})
		}
		)
	}

	getBookingsByUser(id) {
		var bookings = []
		return new Promise((resolve, reject) => {
			this.db.collection("turnos")
			.where("idCliente", "==", id)
			.where("fueAtendido", "==", false)
			.get()
			.then( querySnapshot => {
                querySnapshot.forEach(
					doc => {
					bookings.push({
						id: doc.id,
						dia: doc.data().dia,
						hora: doc.data().hora,
						nombreBarbero: doc.data().nombreBarbero,
						nombreCliente: doc.data().nombreCliente,
						idBarbero: doc.data().idBarbero,
						idCliente: doc.data().idCliente,
						fueAtendido: doc.data().fueAtendido,
						avatarCliente: doc.data().avatarCliente
					})
				});
				resolve(bookings)
			})
			.catch( err =>{
				reject(err)
			})
		})
	}

	getNextBookingUser(id) {
		var booking = {}
		return new Promise((resolve, reject) => {
			this.db.collection("turnos")
			.where("idCliente", "==", id)
			.where("fueAtendido", "==", false)
			.get()
			.then( querySnapshot => {
				querySnapshot.forEach(
					doc =>{
						booking.id= doc.id
						booking.dia= doc.data().dia
						booking.hora= doc.data().hora
						booking.nombreBarbero= doc.data().nombreBarbero
						booking.nombreCliente= doc.data().nombreCliente
						booking.idBarbero= doc.data().idBarbero
						booking.idCliente= doc.data().idCliente
						booking.avatarCliente= doc.data().avatarCliente
					}
				)
				resolve(booking)
			})
			.catch( err =>{
				reject(err)
			})
		})
	}
}

export default new Firebase()