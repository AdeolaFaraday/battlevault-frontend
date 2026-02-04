import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { signInWithPopup, signInWithRedirect, UserCredential, onAuthStateChanged } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch, useAppSelector } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { mapAuthPayloadToCommon } from '@/src/utils/auth-utils';
import { useRef, useEffect } from 'react';


const useSignIn = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { success, error } = useAlert();
    const [googleLoading, setGoogleLoading] = useState(false);
    const isUserLoggedIn = useAppSelector((state) => state.auth.isUserLoggedIn);
    const authProcessingRef = useRef<string | null>(null);

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

    useEffect(() => {
        // Check for pending social auth flag
        const pendingAuth = typeof window !== 'undefined' ? sessionStorage.getItem('pendingSocialAuth') : null;

        if (!pendingAuth) return; // Exit if no pending auth flag

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user ? user : "No user");
            if (user && isUserLoggedIn !== true) {
                // Prevent duplicate processing for same user if already in progress
                if (authProcessingRef.current === user.uid) return;

                authProcessingRef.current = user.uid;
                setGoogleLoading(true);

                // Using (user as any).accessToken as requested by the user
                const token = (user as unknown as { accessToken: string }).accessToken;

                if (token) {
                    console.log("Token found:", token);
                    sessionStorage.removeItem('pendingSocialAuth'); // Clear flag
                    socialAuth({ token });
                } else {
                    user.getIdToken().then((idToken) => {
                        console.log("idToken found:", idToken);
                        sessionStorage.removeItem('pendingSocialAuth'); // Clear flag
                        socialAuth({ token: idToken });
                    }).catch(() => {
                        authProcessingRef.current = null;
                        setGoogleLoading(false);
                    });
                }
            } else if (!user) {
                authProcessingRef.current = null;
                // Don't clear flag here, user might not be loaded yet
            }
        });

        return () => unsubscribe();
    }, []);


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
        setGoogleLoading(true);
        sessionStorage.setItem('pendingSocialAuth', 'true');
        signInWithRedirect(auth, googleAuthProvider);
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
        handGoogleSignInRedirect,
        handleUserSignIn
    };
};

export default useSignIn;