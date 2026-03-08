import { useQuery } from "@apollo/client";
import { IS_USER_REGISTERED } from "@/src/graphql/game/queries";
import { IsUserRegisteredResponse } from "@/src/types/tournament";
import { useAppSelector } from "@/src/lib/redux/hooks";
import { RootState } from "@/src/lib/redux/store";

export const useTournamentRegistration = (tournamentId: string) => {
    const { loggedInUserDetails: currentUser, isUserLoggedIn } = useAppSelector((state: RootState) => state.auth);
    const isAuthenticated = isUserLoggedIn === true;
    const { data, loading, error, refetch } = useQuery<IsUserRegisteredResponse>(IS_USER_REGISTERED, {
        variables: { tournamentId },
        skip: !tournamentId || !isAuthenticated,
    });

    const isRegistered: boolean = data?.isUserRegistered?.success
        ? data.isUserRegistered.data.isRegistered
        : false;

    return {
        isRegistered,
        loading,
        error,
        message: data?.isUserRegistered?.message,
        refetch
    };
};
