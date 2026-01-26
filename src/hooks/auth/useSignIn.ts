import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';


const useSignIn = () => {
    const dispatch = useAppDispatch()
    const router = useRouter();
    const { success, error } = useAlert();
    const [googleLoading, setGoogleLoading] = useState(false);

    const onCompleted = (data: TCommonResponseData, successStatus: boolean, message: string) => {
        if (successStatus) {
            dispatch(setLoggedInUserDetails({
                isUserLoggedIn: true,
                ...data
            }))
            success("Sign In Successful", message)
            router.push("/")
        } else {
            error("Sign In Failed", message)
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