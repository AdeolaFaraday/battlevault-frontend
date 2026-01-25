import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';


const useSignIn = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const [googleLoading, setGoogleLoading] = useState(false);

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

    const { socialAuth, loading: socialAuthLoading } = useSocialAuth(
        (data) => {
            setGoogleLoading(false);
            onCompleted(data?.socialAuth?.data as TCommonResponseData, data?.socialAuth?.success, data?.socialAuth?.message);
        },
        () => {
            setGoogleLoading(false);
        }
    )
    const handGoogleSignIn = () => {
        setGoogleLoading(true);
        signInWithPopup(auth, googleAuthProvider).then((data: UserCredential) => {
            data.user?.getIdToken().then((token) => {
                socialAuth({ token })
            })
        }).catch((error) => {
            console.log({ error });
            setGoogleLoading(false);
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
        isGoogleLoading: googleLoading || socialAuthLoading,
        handGoogleSignIn,
        handleUserSignIn
    }
}

export default useSignIn;