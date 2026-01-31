import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithRedirect, getRedirectResult } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { authTokenStorage } from '@/src/lib/authToken';

const mapAuthPayloadToCommon = (payload: unknown): TCommonResponseData => {
    if (!payload) {
        // Fallback empty structure; runtime calls should guard against this
        return {
            _id: '',
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    const { token, user } = payload as {
        token?: string;
        user?: Partial<TCommonResponseData>;
    };

    const result: TCommonResponseData = {
        _id: user?._id ?? '',
        firstName: user?.firstName ?? '',
        lastName: user?.lastName ?? '',
        email: user?.email ?? '',
        userName: user?.userName,
        bio: user?.bio,
        role: user?.role,
        token,
    };

    // Persist token if present
    if (token) {
        authTokenStorage.set(token);
    }

    return result;
};

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

    const redirectResultProcessed = useRef(false);

    useEffect(() => {
        const handleRedirectResult = async () => {
            if (redirectResultProcessed.current) return;

            try {
                console.log("handleRedirectResult");
                const result = await getRedirectResult(auth);
                console.log("handleRedirectResult result", result);
                if (result) {
                    redirectResultProcessed.current = true;
                    console.log("handleRedirectResult result found, processing...");
                    setGoogleLoading(true);
                    const token = await result.user.getIdToken();
                    if (token) {
                        socialAuth({ token });
                    }
                }
            } catch (error: unknown) {
                console.log({ googleRedirectError: error });
                setGoogleLoading(false);
            }
        };

        handleRedirectResult();
    }, [socialAuth]);

    const handGoogleSignIn = async () => {
        setGoogleLoading(true);
        try {
            // Force Google to re-prompt account chooser by signing out first
            await auth.signOut();

            googleAuthProvider.setCustomParameters({
                prompt: "select_account"
            });

            // Implement sign in with redirect
            await signInWithRedirect(auth, googleAuthProvider);

            /* 
            // Previous Popup Implementation
            signInWithPopup(auth, googleAuthProvider).then((data: UserCredential) => {
                data.user?.getIdToken().then((token) => {
                    socialAuth({ token });
                });
            }).catch((error) => {
                console.log({ error });
                setGoogleLoading(false);
            });
            */
        } catch (error: unknown) {
            console.log({ error });
            setGoogleLoading(false);
        }
    };

    const { login, loading } = useUserSignIn(
        (data) => {
            const payload = data?.login?.data;
            const common = mapAuthPayloadToCommon(payload);
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
        handleUserSignIn
    };
};

export default useSignIn;