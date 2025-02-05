import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';


const useSignIn = () => {
    const router = useRouter();

    const onCompleted = (success: boolean, message: string) => {
        if (success) {
            toast.success(message)
            router.push("/")
        } else {
            toast.error(message)
        }
    }

    const { socialAuth } = useSocialAuth(
        (data) => onCompleted(data?.socialAuth?.success, data?.socialAuth?.message)
    )
    const handGoogleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider).then((data: any) => {
            socialAuth({ token: data?.user?.accessToken })
        }).catch((error) => {
            console.log({ error });
        })
    }

    const { login, loading } = useUserSignIn(
        (data) => onCompleted(data?.login?.success, data?.login?.message),
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