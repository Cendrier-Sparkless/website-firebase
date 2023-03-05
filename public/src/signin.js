// Import des fonction
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-auth.js";

// Configuration Firebase (tokens etc.)
const firebaseConfig = {
	apiKey: "AIzaSyDK9CBlRpEGKjjx-oF3_uG5OJYPz_SRCEw",
	authDomain: "sparkless-cendrier.firebaseapp.com",
	databaseURL: "https://sparkless-cendrier-default-rtdb.europe-west1.firebasedatabase.app",
	projectId: "sparkless-cendrier",
	storageBucket: "sparkless-cendrier.appspot.com",
	messagingSenderId: "815670919585",
	appId: "1:815670919585:web:4084839b1ae8aa9d7f0be0",
	measurementId: "G-E0ZTDZX84K",
};

const app = initializeApp(firebaseConfig); // Initialise Firebase
var auth = getAuth(app); //Obtention de l'instance Auth

// ------------------------------------------------------------------------------------------

// Test de disponibilité d'email
document.querySelector(".inscrire").addEventListener(
	"click",
	function (e) {
		let email = document.querySelector("#email").value;
		let password = document.querySelector("#password").value;
		// As httpOnly cookies are to be used, do not persist any state client side.
		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

		// When the user signs in with email and password.
		firebase
			.auth()
			.signInWithEmailAndPassword("user@example.com", "password")
			.then((user) => {
				// Get the user's ID token as it is needed to exchange for a session cookie.
				return user.getIdToken().then((idToken) => {
					// Session login endpoint is queried and the session cookie is set.
					// CSRF protection should be taken into account.
					// ...
					const csrfToken = getCookie("csrfToken");
					return postIdTokenToSessionLogin("/sessionLogin", idToken, csrfToken);
				});
			})
			.then(() => {
				// A page redirect would suffice as the persistence is set to NONE.
				return firebase.auth().signOut();
			})
			.then(() => {
				window.location.assign("/profile");
			});
	},
	false
);
