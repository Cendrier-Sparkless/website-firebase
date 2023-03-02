import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//-----------------------------------------------------------------------------------------

// Add a new document in collection "cities"

document.querySelector("#bouton").addEventListener(
	"click",
	function (e) {
		e.preventDefault();
		setDoc(doc(db, "users", "IQ65jsZYBBMks7U5iOAF"), {
			nom: "Lucas",
			prenom: "Spitzer",
			email: "lucasspitzer30@gmail.com",
			password: "admin30",
			nbrcig: "22",
		});
	},
	false
);
