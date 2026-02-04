import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

console.log("Existing Firebase apps:", getApps().map(app => app.name));

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_MESSAGING_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
};

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

console.log("Firebase initialized:", {
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId,
    hasApp: getApps().length > 0
});

const googleAuthProvider = new GoogleAuthProvider();

const auth = getAuth(app);
const firestore = getFirestore(app);

auth.onAuthStateChanged((user) => {
    console.log("Auth state changed:", user ? user.email : "No user");
});

export {
    auth,
    googleAuthProvider,
    firestore
}