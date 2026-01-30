import { useMutation } from "@apollo/client";
import { REGISTER_FOR_TOURNAMENT_MUTATION } from "../../graphql/game/mutations";
import { useAlert } from "../common/useAlert";

export const useRegisterForTournament = () => {
    const alerts = useAlert();

    const [registerMutation, { loading }] = useMutation(REGISTER_FOR_TOURNAMENT_MUTATION, {
        onCompleted: (data) => {
            if (data?.registerForTournament?.success) {
                alerts.success("Registration Successful", data.registerForTournament.message || "You have been registered for the tournament.");
            } else {
                alerts.error("Registration Failed", data?.registerForTournament?.message || "Could not register for the tournament.");
            }
        },
        onError: (err) => {
            alerts.error("Registration Error", err.message || "An unexpected error occurred during registration.");
        }
    });

    const register = async (tournamentId: string) => {
        try {
            await registerMutation({
                variables: {
                    tournamentId
                }
            });
        } catch (error) {
            // Error is handled in onError
            console.error("Tournament registration error:", error);
        }
    };

    return {
        register,
        loading
    };
};
