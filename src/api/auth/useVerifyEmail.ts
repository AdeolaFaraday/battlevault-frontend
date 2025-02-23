import { ApolloError, useMutation } from '@apollo/client';
import { VERIFY_EMAIL_MUTATION } from '@/src/graphql/auth/mutation';

const useVerifyEmailApi = (
    onCompleted: (data: TVerifyEmailResponse) => void | undefined,
    _onError?: (error: ApolloError) => void | undefined
) => {
    const onError = (error: ApolloError) => {
        if (error) {
        }
    };

    const [_verifyEmail, states] =
        useMutation<TVerifyEmailResponse>(VERIFY_EMAIL_MUTATION, {
            onCompleted,
            onError: error => {
                _onError === undefined ? onError(error) : _onError(error);
            },
        });
    const verfiyEmail = ({ token }: { token: string }) => {
        _verifyEmail({
            variables: { token },
        });
    };
    return { verfiyEmail, ...states };
};

export default useVerifyEmailApi;
