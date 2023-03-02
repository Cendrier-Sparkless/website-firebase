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
		e.preventDefault();
		let email = document.querySelector("#email").value;
		if (email != "") {
			// On fait un usage détourné de cette fonction car il n'y a pas de fonction ayant pour paramètre uniquement l'email
			// C'est normal car cela peut causer un problème de sécurité en donnant à un utilisateur l'information
			// comme quoi l'email existe et donc qu'il n'y a plus qu'à chercher le password.
			// et qui retourne l'existance ou non de l'email.
			fetchSignInMethodsForEmail(auth, email)
				.then((valeur_retour) => {
					// Retourne la chaine 'password' si l'email existe, sinon retourne une chaine vide
					if (valeur_retour != "") {
						// vaut 'password"
						let errorField = document.querySelector("#errorMessage");
						errorField.innerHTML = "Un compte existe déjà avec cette adresse email";
					} else {
						// Le user n. C'est que l'email existe
						let errorField = document.querySelector("#errorMessage");
						errorField.innerHTML = "Adresse email disponible";
						let email = document.querySelector("#email").value;
						let password = document.querySelector("#password").value;
						createUserWithEmailAndPassword(auth, email, password)
							// Traite si execution correcte de createUserWithEmailAndPassword
							.then((userCredentials) => {
								console.log(userCredentials);
								let errorField = document.getElementById("errorMessage");
								errorField.innerHTML = "Compte créé"; // Change le contenu de la div erreur_api
								window.location.href = "";
							})
							// Traite au cas ou createUserWithEmailAndPassword retourne une erruer
							.catch((error) => {
								let errorField = document.getElementById("errorMessage");
								errorField.innerHTML = error.code + " : " + error.message;
							});
					}
				})
				.catch((error) => {
					// L'appel se plante, c'est que l'email n'existe pas donc qu'il est disponible
					let errorField = document.querySelector("#errorMessage");
					errorField.innerHTML = error.code + "-" + error.message;
				});
		} else {
			let errorField = document.querySelector("#errorMessage");
			errorField.innerHTML = "Vous devez saisir une adresse email";
		}
	},
	false
);
