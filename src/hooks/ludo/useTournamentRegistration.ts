import { useQuery } from "@apollo/client";
import { IS_USER_REGISTERED } from "@/src/graphql/game/queries";
import { IsUserRegisteredResponse } from "@/src/types/tournament";

export const useTournamentRegistration = (tournamentId: string) => {
    const { data, loading, error, refetch } = useQuery<IsUserRegisteredResponse>(IS_USER_REGISTERED, {
        variables: { tournamentId },
        skip: !tournamentId,
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
