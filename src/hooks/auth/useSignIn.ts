import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup } from 'firebase/auth';


const useSignIn = () => {
    const router = useRouter();
    const handGoogleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider).then((data) => {
            console.log({ data });
        }).catch((error) => {
            console.log({ error });
        })
    }

    const { login, loading } = useUserSignIn(
        (data) => {
            if (data?.login?.success) {
                toast.success(data?.login?.message)
                router.push("/")
            } else {
                toast.error(data?.login?.message)
            }
        },
    )
    const handleUserSignIn = (data: TSignInSchema) => {
        login(data)
    }

    return {
        loading,
        handGoogleSignIn,
        handleUserSignIn
    }
}

export default useSignIn;