import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup, UserCredential } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { mapAuthPayloadToCommon } from '@/src/utils/auth-utils';
import { authTokenStorage } from '@/src/lib/authToken';

const useSignIn = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { success, error } = useAlert();
    const [googleLoading, setGoogleLoading] = useState(false);

    const onCompleted = (data: TCommonResponseData, successStatus: boolean, message: string) => {
        if (successStatus) {
            dispatch(setLoggedInUserDetails({
                isUserLoggedIn: true,
                ...data
            }));
            success("Sign In Successful", message);
            router.push("/");
        } else {
            error("Sign In Failed", message);
        }
    };

    const { socialAuth, loading: socialAuthLoading } = useSocialAuth(
        (data) => {
            setGoogleLoading(false);
            const payload = data?.socialAuth?.data;
            const common = mapAuthPayloadToCommon(payload);
            onCompleted(common, data?.socialAuth?.success, data?.socialAuth?.message);
        },
        () => {
            setGoogleLoading(false);
        }
    );




    const handGoogleSignIn = async () => {
        setGoogleLoading(true);
        await auth.signOut();
        signInWithPopup(auth, googleAuthProvider).then((data: UserCredential) => {
            data.user?.getIdToken().then((token) => {
                // console.log("GOOGLE_ID_TOKEN_POPUP", token);
                socialAuth({ token });
            });
        }).catch((error) => {
            console.log({ error });
            setGoogleLoading(false);
        });
    };

    const handGoogleSignInRedirect = () => {
        const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
        const redirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/google/callback`;
        const scope = encodeURIComponent('profile email');
        const responseType = 'code';
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=offline&prompt=select_account`;

        window.location.href = authUrl;
    };

    const { login, loading } = useUserSignIn(
        (data) => {
            const payload = data?.login?.data;
            const common = mapAuthPayloadToCommon(payload);
            authTokenStorage.set(payload?.token as string);
            onCompleted(common, data?.login?.success, data?.login?.message);
        },
    );

    const handleUserSignIn = (data: TSignInSchema) => {
        login(data);
    };

    return {
        loading,
        isGoogleLoading: googleLoading || socialAuthLoading,
        handGoogleSignIn,
        handGoogleSignInRedirect,
        handleUserSignIn
    };
};

export default useSignIn;