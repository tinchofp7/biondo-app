import firebase from 'firebase'
import 'firebase/auth'  

const config = {
    apiKey: "AIzaSyDtobeLfzL1H_YrZgypo6UxNIaqR6oEoKA",
    authDomain: "biondo-auth.firebaseapp.com",
    databaseURL: "https://biondo-auth.firebaseio.com",
    projectId: "biondo-auth",
    storageBucket: "biondo-auth.appspot.com",
    messagingSenderId: "251692779872",
    appId: "1:251692779872:web:b49d12a7db401fced6f605",
    measurementId: "G-EV27LSJV79"
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

	getCurrentUserPhoto() {
		return this.auth.currentUser.photoURL
	}

	getCurrentUserID() {
		return this.auth.currentUser.uid
	}

	setNewTurn(turn) {
		return new Promise((resolve, reject) => {
			this.db.collection("turnos").add(turn)
				.then(function (docRef) {
					resolve(docRef);
				})
				.catch(function (error) {
					reject(error)
				});
		})
	}
}

export default new Firebase()