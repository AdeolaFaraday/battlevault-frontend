"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/src/lib/redux/hooks";
import { setLoggedInUserDetails } from "@/src/lib/redux/authSlice";
import { mapAuthPayloadToCommon } from "@/src/utils/auth-utils";
// import { authTokenStorage } from "@/src/lib/authToken";
import useMe from "@/src/api/auth/useMe";

export default function AuthCallback() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const fetchRef = useRef(false);

    const { getMe } = useMe((data) => {
        if (data?.me?.success) {
            const payload = data?.me?.data?.user;
            const common = mapAuthPayloadToCommon({ user: payload });

            dispatch(setLoggedInUserDetails({
                isUserLoggedIn: true,
                ...common
            }));

            router.replace("/");
        } else {
            router.replace("/signin?error=Failed to fetch user data");
        }
    }, () => {
        router.replace("/signin?error=Authentication error");
    });

    useEffect(() => {
        if (fetchRef.current) return;

        const params = new URLSearchParams(window.location.search);
        // const token = params.get("token");
        const error = params.get("error");

        if (error) {
            router.replace(`/signin?error=${error}`);
            return;
        }

        // if (!token) {
        //     router.replace("/signin");
        //     return;
        // }

        fetchRef.current = true;

        // 1. Store token immediately so authLink can pick it up
        // authTokenStorage.set(token);

        // 2. Fetch user data via GraphQL
        getMe();

    }, [getMe, router]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#0A0A0B]">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
                <p className="text-white/40 text-sm font-medium animate-pulse">Completing sign in...</p>
            </div>
        </div>
    );
}
