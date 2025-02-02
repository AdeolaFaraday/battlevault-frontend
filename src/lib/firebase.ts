import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


const firebaseConfig = {
    
};

const app = initializeApp(firebaseConfig);

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth(app);

export {
    auth,
    googleAuthProvider
}
