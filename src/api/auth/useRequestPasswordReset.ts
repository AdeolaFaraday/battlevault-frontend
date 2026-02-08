import { ApolloError, useMutation } from '@apollo/client';
import { REQUEST_PASSWORD_RESET_MUTATION } from '@/src/graphql/auth/mutation';

const useRequestPasswordReset = (
    onCompleted: (data: TRequestPasswordResetResponse) => void,
    _onError?: (error: ApolloError) => void
) => {
    const onError = (error: ApolloError) => {
        console.error(error);
    };

    const [requestReset, states] = useMutation<TRequestPasswordResetResponse>(
        REQUEST_PASSWORD_RESET_MUTATION,
        {
            onCompleted,
            onError: _onError || onError,
        }
    );

    const performRequest = (email: string) => {
        requestReset({ variables: { email } });
    };

    return { requestReset: performRequest, ...states };
};

export default useRequestPasswordReset;
