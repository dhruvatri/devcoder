import { useNavigate } from 'react-router-dom';
import { GoogleImage } from "../../assets";
import './SignWithGoogle.css';
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../../utils/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../utils/firebase";

function SignWithGoogle() {
    const navigate = useNavigate();

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            if (result.user) {
                const user = result.user;
                const userDoc = doc(db, 'users', user.uid);
                const userSnapshot = await getDoc(userDoc);

                if (userSnapshot.exists()) {
                    const userData = userSnapshot.data();
                    if (userData.role) {
                        navigate('/dashboard');
                    } else {
                        navigate('/select-role');
                    }
                } else {
                    await setDoc(doc(db, 'users', user.uid), {
                        name: user.displayName || 'User',
                        email: user.email,
                        role: '',
                    });
                    navigate('/select-role');
                }
            }
        } catch (error) {
            console.error("Error during Google sign-in: ", error);
        }
    };

    return (
        <div className="google-sign-in">
            <p className="continue-p">Or Continue With</p>
            <div className="container">
                <img
                    src={GoogleImage}
                    alt="Sign in with Google"
                    onClick={googleLogin} 
                />
            </div>
        </div>
    );
}

export default SignWithGoogle;