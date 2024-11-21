import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  
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
