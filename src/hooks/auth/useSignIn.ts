import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAlert } from '../common/useAlert';
import useUserSignIn from '@/src/api/auth/useUserSignin';
import { auth, googleAuthProvider } from '@/src/lib/firebase';
import { getRedirectResult, signInWithPopup, signInWithRedirect, UserCredential } from 'firebase/auth';
import useSocialAuth from '@/src/api/auth/useSocialAuth';
import { useAppDispatch } from '@/src/lib/redux/hooks';
import { setLoggedInUserDetails } from '@/src/lib/redux/authSlice';
import { authTokenStorage } from '@/src/lib/authToken';
import { useEffect } from 'react';

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

    useEffect(() => {
        console.log("=== COMPONENT MOUNTED ===");
        console.log("Current URL:", window.location.href);
        console.log("URL params:", window.location.search);
        console.log("URL hash:", window.location.hash);

        const checkRedirect = async () => {
            try {
                console.log("Calling getRedirectResult...");
                const result = await getRedirectResult(auth);
                console.log("getRedirectResult returned:", result);

                if (result) {
                    console.log("✅ Got redirect result!");
                    console.log("User:", result.user.email);
                    setGoogleLoading(true);
                    const token = await result.user.getIdToken();
                    console.log("Token obtained:", token.substring(0, 20) + "...");
                    socialAuth({ token });
                } else {
                    console.log("❌ getRedirectResult returned null");
                }
            } catch (err: unknown) {
                console.error("❌ Redirect error:", {
                    code: (err as { code: string }).code,
                    message: (err as { message: string }).message,
                    fullError: err
                });
                setGoogleLoading(false);
            }
        };

        checkRedirect();
    }, []);

    // useEffect(() => {
    //     getRedirectResult(auth).then((result) => {
    //         console.log("REDIRECT_RESULT", result);
    //         if (result) {
    //             setGoogleLoading(true);
    //             result.user.getIdToken().then((token) => {
    //                 console.log("GOOGLE_ID_TOKEN_REDIRECT", token);
    //                 socialAuth({ token });
    //             }).catch(() => setGoogleLoading(false));
    //         }
    //     }).catch((err) => {
    //         console.error("Redirect Sign In Error", err);
    //         setGoogleLoading(false);
    //     });
    // }, []);

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

    const handGoogleSignInRedirect = async () => {
        console.log("=== INITIATING REDIRECT ===");
        console.log("Current URL:", window.location.href);
        console.log("Auth domain:", auth.app.options.authDomain);
        setGoogleLoading(true);
        try {
            await signInWithRedirect(auth, googleAuthProvider);
        } catch (error) {
            console.error("Error initiating redirect:", error);
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
        handGoogleSignInRedirect,
        handleUserSignIn
    };
};

export default useSignIn;