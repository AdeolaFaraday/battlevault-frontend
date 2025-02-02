import { auth, googleAuthProvider } from '@/src/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import { toast } from 'sonner'


const useSignin = () => {

    const handGoogleSignin = () => {
        signInWithPopup(auth, googleAuthProvider).then((data) => {
            console.log({ data });
        }).catch((error) => {
            console.log({ error });
        })
    }

    return {
        handGoogleSignin
    }
}

export default useSignin;