import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyA6hkiE7zKJBL7G3_-Fw9BvNfH4Vn5k0Tk",
	authDomain: "devcoder-a8af0.firebaseapp.com",
	databaseURL:
		"https://devcoder-a8af0-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "devcoder-a8af0",
	storageBucket: "devcoder-a8af0.firebasestorage.app",
	messagingSenderId: "491693442047",
	appId: "1:491693442047:web:de0d9fbafc76df0f229dca",
	measurementId: "G-8VKN4QTB7J",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleAuthProvider = new GoogleAuthProvider();

export async function getCreatorName() {
  try {
    const userDoc = await getDoc(doc(db, 'users', auth.currentUser?.uid || 'default'));
    if (userDoc.exists()) {
      return userDoc.data().name || 'Unknown Creator';
    } else {
      console.log('No such document!');
      return 'Unknown Creator';
    }
  } catch (error) {
    console.error('Error fetching creator name:', error);
    return 'Error fetching name';
  }
}

export { auth, db, googleAuthProvider };