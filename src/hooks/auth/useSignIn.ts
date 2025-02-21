import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';


const useSignIn = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();

    const onCompleted = (data: TCommonResponseData, success: boolean, message: string) => {
        if (success) {
            dispatch(setLoggedInUserDetails({
                isUserLoggedIn: true,
                ...data
            }))
            toast.success(message)
            router.push("/")
        } else {
            toast.error(message)
        }
    }

    const { socialAuth } = useSocialAuth(
        (data) => onCompleted(data?.socialAuth?.data as TCommonResponseData, data?.socialAuth?.success, data?.socialAuth?.message)
    )
    const handGoogleSignIn = () => {
        signInWithPopup(auth, googleAuthProvider).then((data: any) => {
            socialAuth({ token: data?.user?.accessToken })
        }).catch((error) => {
            console.log({ error });
        })
    }

    const { login, loading } = useUserSignIn(
        (data) => onCompleted(data?.login?.data as TCommonResponseData, data?.login?.success, data?.login?.message),
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