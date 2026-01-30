import { useQuery } from "@apollo/client";
import { GET_TOURNAMENT_BRACKET } from "@/src/graphql/game/queries";
import { GetTournamentBracketResponse, TournamentBracket } from "@/src/types/tournament";

export const useTournamentBracket = (tournamentId: string) => {
    const { data, loading, error, refetch } = useQuery<GetTournamentBracketResponse>(GET_TOURNAMENT_BRACKET, {
        variables: { tournamentId },
        skip: !tournamentId,
    });

    const bracket: TournamentBracket | undefined = data?.getTournamentBracket?.success
        ? data.getTournamentBracket.data
        : undefined;

    return {
        bracket,
        loading,
        error,
        message: data?.getTournamentBracket?.message,
        refetch
    };
};
